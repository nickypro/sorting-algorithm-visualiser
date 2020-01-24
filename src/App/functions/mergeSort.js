import moveBack from './moveBack'
import timeout from './timeout'

const mergeSort = (initialArray, setArray, setRunning, setTargets, delay) => {
    setRunning(true)

    //we work with an internal function array for simplicity
    let arr = [...initialArray] 

    //we create an async function so we can have delays
    const doMergeSort = async (start, end, resolve =(()=>0) ) => {
      
      //the base case of a recursive algorithm
      if (start>=end) {
        resolve()
        return;
      }

      //we get the left and middle item 
      let l = start
      let r = Math.ceil( (end+start)/2 )

      //we sort the split of two arrays
      await new Promise(res => doMergeSort(l, r-1, res) )
      await new Promise(res => doMergeSort(r, end, res) ) 

      //we merge the two sorted arrays together
      while ( l<r & r<=end ) {
        // if left is small, look at the next left
        if (arr[l] < arr[r]) l++  
        
        //if left is bigger, move back and look at the next right 
        else {
          moveBack(arr, l, r)
          l++
          r++
          setArray(arr)
        }
        
        //visualise the sorting
        setTargets([l,r])
        await timeout(delay)
      }

      //fulfill the promise and return
      resolve()
      return;
    }

    //perform the async function
    doMergeSort(0, arr.length-1).then(() => setRunning(false))

    return
  }

export default mergeSort