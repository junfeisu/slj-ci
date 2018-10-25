import { spawn } from 'child_process'
import shell from 'shelljs'
import fs from 'fs'
import path from 'path'
import { sendMessage } from '../socket/status'
import { sendLog } from '../socket/log'
import parseYaml from './runScript'

const HOME_PWD = process.env.HOME
const PROJECT_PWD = 'sljCiProjects'

let ciArgs = {}

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
  sendMessage('updateStatus', 1, historyId)

  let gitRemote = shell.exec('git remote').stdout.replace('\n', '')
  const pullStream = spawn('git', ['pull', gitRemote, branch])

  pullStream.stdout.on('data', data => {
    sendLog('updateLog', {cmd: `git pull ${gitRemote} ${branch}`, log: data.toString()}, historyId)
  })

  pullStream.stderr.on('data', err => {
    sendLog('updateLog', {cmd: `git pull ${gitRemote} ${branch}`, log: err.toString()}, historyId)
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
  sendMessage('updateStatus', 1, historyId)

  const cloneStream = spawn('git', ['clone', repoUrl, projectName])

  cloneStream.stdout.on('data', data => {
    sendLog('updateLog', {cmd: `git clone ${repoUrl} ${projectName}`, log: data.toString()}, historyId)
  })

  cloneStream.stderr.on('data', data => {
    sendLog('updateLog', {cmd: `git clone ${repoUrl} ${projectName}`, log: data.toString()}, historyId)
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
      sendLog('updateLog', {cmd: 'parse yaml', log: '[slj-ci:error]: .slj.yml is need'}, historyId)
      return
    }

    parseYaml(yamlPath, historyId)
  }
}

const init = (args) => {
  ciArgs = args
  createProjectPwd()
  isProjectExist()
}

export default init
