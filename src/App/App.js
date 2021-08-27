import React ,{useEffect, useState} from 'react';
import './App.css'
import regeneratorRuntime from 'regenerator-runtime';

//import the visual components
import Slider from './components/Slider'
import DisplayArea from './components/DisplayArea'
import Menu from './components/Menu'
import Bar from './components/Bar'
import Switch from '@material-ui/core/Switch';

//import the function used
import generateRandomArray from './functions/generateRandomArray'
import bubbleSort from './functions/bubbleSort'
import mergeSort from './functions/mergeSort'
import quickSort from './functions/quickSort'
import heapSort from './functions/heapSort'
import {sin, cos} from './functions/trigFunctions'

function isMobile() {
  return window.innerWidth < 800;
}

const DELAYFACTOR = 40000
const DEFAULT_NUMBER_OF_BARS = 50

const App = () => {
  const [menuItems, setMenuItems] = useState(["Merge Sort", "Quick Sort", "Heap Sort", "Bubble Sort"]) 

  const [numberOfBars, setNumberOfBars] = useState(DEFAULT_NUMBER_OF_BARS)
  const [targets, setTargets] = useState([3,7])
  const [barHeights, setBarHeights] = useState([])
  
  const [delay, setDelay] = useState()
  const [isRunning, setRunning] = useState(false)
  const [sortAlgorithm, setSortAlgorithm] = useState("")
  
  const toggleCircleDisplay = (event) => setCircleDisplay(event.target.checked);
  const [isCircleDisplay, setCircleDisplay] = useState(true)
  
  const isTarget = (index) => (targets.includes(index))
  const isInOrder = (arr, i, j) => (arr[i] <= arr[j])
  const areTargetsInOrder = (i,j) => isInOrder(barHeights, targets[0], targets[1]) 

  const doSort = (algorithm) => {   
    if (isRunning) return     
    let sort;

    //use chosen sort algorithm
    switch (algorithm) {
      case "Bubble Sort": sort = bubbleSort; break;
      case "Merge Sort":  sort = mergeSort ; break;
      case "Heap Sort":   sort = heapSort;   break;
      case "Quick Sort":  sort = quickSort;  break;
      
      default: return;
    }

    sort(barHeights, setBarHeights, setRunning, setTargets, delay)    
  }

  const handleSortChoice = async (event) => {

    setSortAlgorithm(event.target.value)

    if ( isMobile() ) {
      doSort(event.target.value)
    }
  }

  //reset the bars
  const generateNewBars = () => {
    if (!isRunning)
    setBarHeights(generateRandomArray(numberOfBars))
  }
  useEffect( generateNewBars, [numberOfBars])

  //update the delay as the number of bars changes 
  const changeSwapDelay = () => {
    const n = numberOfBars
    setDelay(DELAYFACTOR/(n*n*Math.log10(n)))
  }
  useEffect( changeSwapDelay, [numberOfBars])

  return (
    <div>
      <style>
        {(isRunning)?`
        .menuButton {
          color: #222;
          cursor: default;
        }
        .menuButton:hover {
          text-decoration: none;
        }
        `:""}
      </style>
      <Menu> 
        
        <div style={{display: "flex"}}>
          <a href="https://github.com/pesvut/sorting-algorithm-visualiser">
            <img src="./assets/github-brands.svg" className="menuButton" style={{width: "1.5rem"}}/>
          </a>
          {" "}
          <button className="menuButton" onClick={generateNewBars}>
            Generate New Bars
          </button>
        </div>

        <label className="menuLabel" htmlFor="circleDisplay">
          Bars 
          <Switch
            checked={isCircleDisplay}
            onChange={toggleCircleDisplay}
            name="circleDisplay"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          Circle
        </label>

        <div className="sortAlgorithmButtons">
        {menuItems.map((text, index) => (
          <button 
            className="menuButton" 
            to="#" 
            key={text} 
            value={text}
            onClick={handleSortChoice}
            style={!text.localeCompare(sortAlgorithm) ? {color: "purple"} : {}}>
              {text}
          </button>
        ))}
        </div>
      
        <Slider min={5} value={numberOfBars} setValue={setNumberOfBars} isRunning={isRunning}></Slider>
        
        <button className="menuButton submitSortDesktop" onClick={() => doSort(sortAlgorithm)} 
          style={(sortAlgorithm) ? {backgroundColor: "#0074d9"} : {backgroundColor: "#ccc", cursor: "not-allowed"}}>
          Sort
        </button>

      </Menu>
      {/* List the bars for the bar chart */}
      { isCircleDisplay ? 
        <DisplayArea style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "flex-end"}}>
          <svg id="mid-circle" viewBox="0 0 200 200" style={{width:"80vmin", height:"80vmin"}}>
            
            {barHeights.map((h, index) => (
              <polygon points={`100,100  100,0  ${100*(1 + sin( 1/numberOfBars ))},${ 100*(1 - cos( 1/numberOfBars ))}`}
                       key={index} 
                       fill={`hsl(${h*360 }, 100%, 70%)`}
                       stroke={(isTarget(index)) ? (areTargetsInOrder()?"green":"red") : ""}
                       style={{
                        transformOrigin: "50% 50%",
                        transform: `rotate(${ index*360/(numberOfBars) }deg)`,
                       }}>
              </polygon>
            ))
            
            }
            </svg>
        </DisplayArea> 
            : 
        <DisplayArea style={{gridTemplateColumns: `repeat(${numberOfBars}, 1fr)`}}>
            {barHeights.map((h, index)=>(
            <Bar height={h} 
                 key={index} 
                 selected={ (isTarget(index)) ? (areTargetsInOrder()?"good":"bad") : false }>
            </Bar>
          ))}
        </DisplayArea>
        }

    </div>
  )
}


export default App
