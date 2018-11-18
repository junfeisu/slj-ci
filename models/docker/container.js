import docker from './docker'

export function removeContainer (containerID, options) {
  return docker.getContainer(containerID).remove(options)
}

export function startContainer (containerID, options) {
  return docker.getContainer(containerID).start()
}

export function stopContainer (ContainerID, options) {
  return docker.getContainer(containerID).stop(options)
}
