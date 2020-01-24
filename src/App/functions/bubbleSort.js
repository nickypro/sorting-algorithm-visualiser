import timeout from './timeout'

const bubbleSort = (initialArray, setArray, setRunning, setTargets, delay) => {
    setRunning(true)

    const doBubbleSort = async () => {
      //we work with an internal function array for simplicity
      const arr = [...initialArray];
      
      //we move the maximum value to the end
      for (let currentMax = arr.length; currentMax > 0; currentMax--) {
        for (let i=1 ; i < currentMax ; i++) {
          
          setTargets([i-1, i])
          await timeout(delay)

          if ( arr[i-1] > arr[i] ){
            
            [arr[i], arr[i-1]] = [arr[i-1], arr[i]]

            setArray(arr)
            
          } 

        }
      }
    }

    doBubbleSort().then(() => setRunning(false));

  }

  export default bubbleSort