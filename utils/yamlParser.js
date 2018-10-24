import Yaml from 'js-yaml'
import fs from 'fs'

const parse = (path) => {
  try {
    const yamlContent = Yaml.safeLoad(fs.readFileSync(path, 'utf8'))

    return {status: 1, data: yamlContent}
  } catch (err) {
    return {status: 0, data: err}
  }
}

export default parse
