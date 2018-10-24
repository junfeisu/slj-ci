import path from 'path'
import { spawn } from 'child_process'
import yamlParser from './yamlParser'
import judgeType from '../utils/judgeType'
import { sendMessage } from '../socket/status'
import { sendLog } from '../socket/log'

const scripts = []
/*
 @status 0: waiting 1: executing 2: success 3: fail
 */
const result = {}
let status = 0
let historyId = ''

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
    sendMessage('updateStatus', value, historyId)
  }
})

// parse yaml
const parseYaml = (yamlPath, id) => {
  const parseResult = yamlParser(yamlPath)
  historyId = id

  if (!parseResult.status) {
    result.status = 3
    sendLog('updateLog', {cmd: 'parse yaml', log: parseResult.data.message}, historyId)

    return
  }

  sortScripts(parseResult.data)
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

  runScriptsByOrder()
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

  rs.stdout.on('data', data => {
    sendLog('updateLog', {cmd: command, log: data.toString()}, 1)
  })

  rs.stderr.on('data', data => {
    sendLog('updateLog', {cmd: command, log: data.toString()}, 1)
  })

  rs.on('close', code => {
    if (code) {
      result.status = 3
      return
    }

    runScriptsByOrder()
  })
}

export default parseYaml
