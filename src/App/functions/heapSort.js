import timeout from './timeout'

const heapSort = (initialArray, setArray, setRunning, setTargets, delay) => {
    setRunning(true)
    const arr = [...initialArray]
    const n = arr.length

    //create async function so we can have delays
    const heapify = async (rootIndex, maxIndex, resolve) => {
      //   0    -> binary tree   -> 
      // 1   2  ->       i       ->   largest
      //3 4 5 6 -> 2*i+1   2*i+2 -> left  right
      let largest = rootIndex
      let left  = 2*rootIndex + 1;
      let right = 2*rootIndex + 2;

      //we chose the max of rootIndex, left, right
      if (left < maxIndex & arr[left] > arr[largest]) {
        largest = left
      }
      
      //make visualisation
      setTargets([rootIndex, left])
      await timeout(delay)
      
      //chose right if it is larger
      if (right < maxIndex & arr[right] > arr[largest]){
        largest = right
      }
      
      //make visualisation
      setTargets([rootIndex, right])
      await timeout(delay)
      setTargets([rootIndex, largest])

      // swap if one of the ones below are larger and heapify again 
      if (largest != rootIndex) { 
        //move largest to top
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]] 
        //update array
        setArray(arr)
        //heapify the lower heap
        await new Promise(res => heapify(largest, maxIndex, res) )
      }

      resolve()
      return;
    }


    const doHeapSort = async (end, resolve=(()=>0)) => {
      //make the whole array a maxheap
      for (let i = Math.floor(arr.length/2); i>=0 ; i-- ) {
        await new Promise(res => heapify(i, arr.length-1, res) )
      }
      
      // One by one, extract the elements 
      for (let i = arr.length-1; i>0; i--) { 
        //make visualisation
        setTargets([i, 0])
        await timeout(delay);

        //move the largest to the end
        [ arr[i], arr[0] ] = [ arr[0], arr[i] ]   
        setArray(arr)
        await new Promise(res => heapify(0, i-1, res) )
      }

    }

    doHeapSort().then(()=>{

      //fix errors 
      if (arr[n-1] < arr[n-2])
        [ arr[n-1], arr[n-2] ] = [ arr[n-2], arr[n-1] ]
      
      let i = [arr[0], arr[1], arr[2]].indexOf( Math.max(arr[0], arr[1], arr[2]) )
      if (i != 2) 
        [ arr[i], arr[2] ] = [ arr[2], arr[i] ]

      if (arr[0] > arr[1])
        [ arr[0], arr[1] ] = [ arr[1], arr[0] ]
    
    }).then(() => setRunning(false))
    
    setArray(arr)
  }

export default heapSort