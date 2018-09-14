import parse from '../utils/yamlParser'
import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'

exec('docker image build -t slj-ci:0.0.1 .', (err, stdout, stderr) => {
  if (err) {
    throw err
    return
  }

  console.log(stdout)

  console.log(stderr)
})