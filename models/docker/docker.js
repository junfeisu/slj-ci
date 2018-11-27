import Docker from 'dockerode'

const docker = new Docker()
const binds = ['/var/run/docker.sock:/var/run/docker.sock']

export function createContainer (name, image, envs) {
  return new Promise((resolve, reject) => {
    docker.createContainer({
      Image: image,
      name: name,
      Tty: true,
      ExposedPorts: {
        '22/tcp': {},
        '8000/tcp': {}
      },
      Binds: binds,
      Env: envs,
      Cmd: ["/bin/bash"]
    }, (err, containerInfo) => {
      if (err) {
        reject(err)
      } else {
        resolve(containerInfo)
      }
    })
  })
}

export default docker
