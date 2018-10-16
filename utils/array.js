import judgeType from './judgeType'

// search the item match the condition in [{}, {}]
const searchItem = (arr, condition) => {
  if (!isArray(arr) || !arr.length) {
    return
  }

  let result = {
    index: NaN,
    item: null
  }

  for (let i = 0, len = arr.length; i < len; i++) {
    let isSame = true
    for (let prop in condition) {
      if (arr[i][prop] === condition[prop]) {
        continue
      } else {
        isSame = false
        break
      }
    }

    if (isSame) {
      result.item = arr[i]
      result.index = i
      break
    }
  }

  return result
}

const isArray = arr => {
  return judgeType(arr)('array')
}

export {
  isArray,
  searchItem,
}

export default isArray
