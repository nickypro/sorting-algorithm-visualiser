import react from 'react'

const generateRandomArray = (length) => {
    const newArray = [];
    for (let i=0; i<length ; i++) {
      newArray.push(Math.random())
    }
    return newArray
}

export default generateRandomArray