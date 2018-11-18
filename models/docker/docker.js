import Docker from 'dockerode'

const docker = new Docker()
const binds = ['/var/run/docker.sock:/var/run/docker.sock']

export function createContainer (image, name, envs) {
  return docker.createContainer({
    Image: image,
    name: name,
    Tty: true,
    Env: envs,
    Binds: binds
  })
}

export default docker
