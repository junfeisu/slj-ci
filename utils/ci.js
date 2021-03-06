import { spawn } from 'child_process'
import shell from 'shelljs'
import fs from 'fs'
import path from 'path'
import { sendMessage } from '../socket/status'
import { sendLog } from '../socket/log'
import yamlParser from './yamlParser'
import judgeType from './interal/judgeType'
import docker, { createContainer } from '../models/docker/docker'
import { getContainer } from '../models/docker/container'

const HOME_PWD = process.env.HOME
const PROJECT_PWD = 'sljCiProjects'

let ciArgs = {}
const scripts = []
const result = {}
/*
 @status 0: waiting 1: executing 2: success 3: fail
 */
let status = 0

// Observer of result.status
Object.defineProperty(result, 'status', {
  get: function () {
    return status
  },
  set: function (value) {
    if (value === status) {
      return
    }

    status = value
    sendMessage('updateStatus', value, ciArgs.historyId)
  }
})

// create a directory to store all projects
const createProjectPwd = () => {
  let projectHomePath = path.resolve(HOME_PWD, PROJECT_PWD)
  if (!fs.existsSync(projectHomePath)) {
    fs.mkdirSync(projectHomePath)
  }
}

const isProjectExist = () => {
  const { projectName } = ciArgs
  let projectPath = path.resolve(HOME_PWD, PROJECT_PWD, projectName)

  if (fs.existsSync(projectPath)) {
    pullProject(projectPath)
  } else {
    cloneProject(projectPath)
  }
}

// This project already exists locally
const pullProject = (projectPath) => {
  shell.cd(projectPath)

  const { branch, historyId } = ciArgs
  // Notice the ci is executing
  result.status = 1

  let gitRemote = shell.exec('git remote').stdout.replace('\n', '')
  const pullStream = spawn('git', ['pull', gitRemote, branch])

  pullStream.stdout.on('data', data => {
    sendLog('updateLog', {
      cmd: `git pull ${gitRemote} ${branch}`,
      log: data.toString()
    }, historyId)
  })

  pullStream.stderr.on('data', err => {
    sendLog('updateLog', {
      cmd: `git pull ${gitRemote} ${branch}`,
      log: err.toString()
    }, historyId)
  })

  pullStream.on('exit', code => {
    if (!code) {
      parseScript()
    }
  })
}

// This project doesn't exist locally
const cloneProject = (projectPath) => {
  const { repoUrl, projectName, historyId } = ciArgs

  shell.cd(path.resolve(HOME_PWD, PROJECT_PWD))
  result.status = 1

  const cloneStream = spawn('git', ['clone', repoUrl, projectName])

  cloneStream.stdout.on('data', data => {
    sendLog('updateLog', {
      cmd: `git clone ${repoUrl} ${projectName}`,
      log: data.toString()
    }, historyId)
  })

  cloneStream.stderr.on('data', data => {
    sendLog('updateLog', {
      cmd: `git clone ${repoUrl} ${projectName}`,
      log: data.toString()
    }, historyId)
  })

  cloneStream.on('exit', code => {
    if (!code) {
      shell.cd(projectPath)
      parseScript()
    }
  })
}

const parseScript = () => {
  const { branch, commitId, historyId } = ciArgs
  const gitHEAD = commitId ? commitId : branch
  const checkoutResult = shell.exec(`git checkout ${gitHEAD}`)

  // code is 0 for success
  if (!checkoutResult.code) {
    let yamlPath = path.resolve(process.cwd(), '.slj.yml')
    if (!fs.existsSync(yamlPath)) {
      sendMessage('updateStatus', 3, historyId)
      sendLog('updateLog', {
        cmd: 'parse yaml',
        log: '[slj-ci:error]: .slj.yml is need'
      }, historyId)
      return
    }

    parseYaml(yamlPath)
  }
}

// parse yaml
const parseYaml = yamlPath => {
  const parseResult = yamlParser(yamlPath)
  const { historyId } = ciArgs

  if (!parseResult.status) {
    result.status = 3
    sendLog('updateLog', {cmd: 'parse yaml', log: parseResult.data.message}, historyId)

    return
  }

  // sortScripts(parseResult.data)
  createDockerContainer(parseResult.data)
}

const createDockerContainer = async (option) => {
  let { image, name, envs } = options
  const { historyId } = ciArgs

  if (!image) {
    image = 'ubuntu:16.04'
  }

  if (!envs) {
    envs = []
  }
  
  try {
    const container = await createContainer(image, name, envs)
    console.log(container)
  } catch (err) {
    result.status = 3
    sendLog('updateLog', {
      cmd: 'create container',
      log: err.message || 'create container error'
    }, historyId)
  }
}

const addContainer = async (yamlContent) => {
  try {
    const { historyId, projectName } = ciArgs
    let { image, name, env } = yamlContent

    image = image ? image : 'ubuntu:16.04'
    name = name ? name + '-' + historyId : projectName + '-' + historyId,
    env = env ? env : []

    let containerID = 'bb09a24688dc20b60766c90c4affd8491bf215b4535582507b5eae5193a5585e'
    // const container = await createContainer(name, image, env)

    let container = getContainer(containerID)
    // await container.start()

    execContainer(container)
  } catch (err) {
    const { historyId } = ciArgs
    result.status = 3
    sendLog('updateLog', {cmd: 'create container', log: err.message}, historyId)
  }
}

const execContainer = async (container) => {
  let command = ''
  let scriptLen = scripts.length
  const { historyId } = ciArgs

  scripts.forEach((script, index) => {
    let isLast = !!(index === scriptLen - 1)
    command += isLast ? script : script + ' && '
  })

  console.log('command', command)
  try {
    const exec = await container.exec({Cmd: command, AttachStdin: true, AttachStdout: true, Tty: true})
    const stream = await exec.start({})
    stream.output.pipe(process.stdout, process.stderr)
  } catch (err) {
    // result.status = 3
    console.log(err)
    // sendLog('updateLog', {cmd: `exec ${command}`, log: err.message}, historyId)
    return
  }
}

// sort the scripts according to given priority
const sortScripts = (yamlContent) => {
  const priorities = ['before_install', 'before_script', 'script', 'after_script']
  priorities.forEach(priority => {
    let currentScript = yamlContent[priority]

    // 当命令为空或者空数组
    if (!currentScript || !currentScript.length) {
      return
    }

    if (judgeType(currentScript)('array')) {
      if (currentScript.length === 1) {
        scripts.push(currentScript[0])
        return
      }

      currentScript.forEach(val => {
        scripts.push(val)
      })
    } else {
      scripts.push(currentScript)
    }
  })

  addContainer(yamlContent)
  // runScriptsByOrder()
}

const runScriptsByOrder = () => {
  if (!scripts.length) {
    result.status = 2
    return
  }

  result.status = 1

  let script = scripts.shift().trim()

  execScript(script)
}

const execScript = (command) => {
  let args = command.split(/\s+/)
  let commandName = args.shift()
  const rs = spawn(commandName, args)
  const { historyId } = ciArgs

  rs.stdout.on('data', data => {
    sendLog('updateLog', {cmd: command, log: data.toString()}, historyId)
  })

  rs.stderr.on('data', data => {
    sendLog('updateLog', {cmd: command, log: data.toString()}, historyId)
  })

  rs.on('close', code => {
    if (code) {
      result.status = 3
      return
    }

    runScriptsByOrder()
  })
}

const init = (args) => {
  ciArgs = args
  createProjectPwd()
  isProjectExist()
}

export default init
