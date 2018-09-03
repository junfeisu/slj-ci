import { exec } from 'child_process'
import parse from '../utils/yamlParser'

const webhookDeploy = {
  path: '/deploy',
  method: 'POST',
  handler: (req, h) => {
    // exec('git pull origin dev', {'cwd': '/home/sjffly/p'})
    const ciYaml = parse(path.resolve(process.env.PWD, './ci.yml'))
    console.log(ciYaml)
  }
}

export default [
  webhookDeploy,
]
