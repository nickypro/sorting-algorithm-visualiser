const moveBack = (arr, backIndex, targetIndex) => {
  let temp = arr[targetIndex]
  for (let i = targetIndex; i>backIndex; i--) {
    arr[i] = arr[i-1]
  }
  arr[backIndex] = temp;
}

export default moveBack