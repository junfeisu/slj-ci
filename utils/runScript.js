import yamlParser from './yamlParser'
import path from 'path'
import { spawn } from 'child_process'
import judgeType from '../utils/judgeType'

const scripts = []

const parse = (yamlPath) => {
  return yamlParser(yamlPath)
}

const sortScripts = (yamlPath) => {
  let resolvedPath = path.resolve(__dirname, yamlPath)
  const initScripts = parse(resolvedPath)
  const priorities = ['before_install', 'before_script', 'script', 'after_script']
  priorities.forEach(priority => {
    let currentScript = initScripts[priority]

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
    return
  }

  let script = scripts.shift().trim()
  let commandComponents = script.split(/\s+/)
  let commandName = commandComponents.shift()

  execScript(commandName, commandComponents)
}

const execScript = async (commandName, args) => {
  const rs = spawn(commandName, args)

  rs.stdout.on('data', data => {
    console.log(data.toString())
  })

  rs.stderr.on('data', data => {
    console.log(data.toString())
  })

  rs.on('close', code => {
    if (!code) {
      runScriptsByOrder()
    }
  })
}

sortScripts('../ci.yml')
