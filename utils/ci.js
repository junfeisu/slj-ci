import { spawn } from 'child_process'
import shell from 'shelljs'
import fs from 'fs'
import path from 'path'

const HOME_PWD = process.env.HOME
const PROJECT_PWD = 'sljCiProjects'

let ciArgs = {}

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

const pullProject = (projectPath) => {
  shell.cd(projectPath)

  const { branch } = ciArgs
  let gitRemote = shell.exec('git remote').stdout.replace('\n', '')

  const pullStream = spawn('git', ['pull', gitRemote, branch])

  pullStream.stdout.on('data', data => {
    console.log(data.toString())
  })

  pullStream.stderr.on('data', err => {
    console.log(err.toString())
  })

  pullStream.on('exit', code => {
    console.log('git pull exit code is ', code)

    if (!code) {
      parseScript()
    }
  })
}

const cloneProject = (projectPath) => {
  shell.cd(path.resolve(HOME_PWD, PROJECT_PWD))
  const { repoUrl, projectName } = ciArgs
  const cloneStream = spawn(`git`, ['clone', repoUrl, projectName])

  cloneStream.stdout.on('data', data => {
    console.log(data.toString())
  })

  cloneStream.stderr.on('data', data => {
    console.log(data.toString())
  })

  cloneStream.on('exit', code => {
    console.log('git clone exit code is ', code)

    if (!code) {
      shell.cd(projectPath)
      parseScript()
    }
  })
}

const parseScript = () => {
  const { branch, commitId } = ciArgs
  const gitHEAD = commitId ? commitId : branch
  const checkoutResult = shell.exec(`git checkout ${gitHEAD}`)

  // code is 0 for success
  if (!checkoutResult.code) {
    if (!fs.existsSync(path.resolve(process.cwd(), '.slj.yml'))) {
      console.log('[slj-ci:error]: .slj.yml is need')
      return
    }

    console.log('parseYaml')
  }
}

const init = (args) => {
  ciArgs = args
  createProjectPwd()
  isProjectExist()
}

init({repoUrl: 'git@github.com:junfeisu/slj-ci.git', projectName: 'sljci', branch: 'master', commitId: ''})

export default init
