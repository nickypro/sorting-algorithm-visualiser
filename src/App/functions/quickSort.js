import timeout from './timeout'
import moveBack from './moveBack'

const quickSort = (initialArray, setArray, setRunning, setTargets, delay) => {
    setRunning(true)

    //we work with an internal function array for simplicity
    let arr = [...initialArray] 

    //we create an async function so we can have delays
    const doQuickSort = async (start, end, resolve =(()=>0) ) => {
      
      //the base case of a recursive algorithm
      if (start>=end) {
        resolve()
        return;
      }

      //we get the leftmost (pivot) and rightmost item 
      let pivot = start
      let r = end

      //we move items in the array around the pivot
      while ( pivot<r ) {
        // if right is bigger than the pivot, keep it there
        if (arr[pivot] < arr[r]) r--
        
        //if right is smaller than the pivot, move it back
        else {
          moveBack(arr, pivot, r)
          pivot++ 
          setArray(arr)
        }
        
        //visualise the sorting
        setTargets([pivot,r])
        await timeout(delay)
      }

      //we sort the two arrays either side of the pivot
      await new Promise(res => doQuickSort(start, pivot-1, res) )
      await new Promise(res => doQuickSort(pivot+1, end, res) ) 


      //fulfill the promise and return
      resolve()
      return;
    }

    //perform the async function
    doQuickSort(0, arr.length-1).then(() => setRunning(false))

    return
  }

export default quickSort