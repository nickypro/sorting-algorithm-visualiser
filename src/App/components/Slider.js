import React from 'react'

const Slider = (props) => {
  const handleChange = (event) => {
    if (!props.isRunning) props.setValue(event.target.value)
  } 
  
  return(
    <input 
      type="range" 
      min={props.min ? props.min : "10"} 
      max={props.max ? props.max : "100"} 
      value={props.value} 
      onChange={handleChange} 
      className="slider">    
    </input>
  )
}

export default Slider