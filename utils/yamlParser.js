import Yaml from 'js-yaml'
import fs from 'fs'

const parse = (path) => {
  try {
    const yamlContent = Yaml.safeLoad(fs.readFileSync(path, 'utf8'))

    return yamlContent
  } catch (err) {
    console.log(err)
    return null
  }
}

export default parse
