import docker from './docker'

export function getContainer (containerID) {
  return docker.getContainer(containerID)
}

export function startContainer (containerID) {
  return docker.getContainer(containerID).start()
}

export async function stopContainer (containerID) {
  try {
    let container = getContainer(containerID)

    if (container) {
      container.inspect()
        .then()
    }
  } catch (err) {
    
  }
}

