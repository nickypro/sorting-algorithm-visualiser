import React from 'react'

const Bar = (props) => {
  return (
    <div style={{
      backgroundColor: (props.selected == "good") ? "green" :(props.selected == "bad")? "red" : "purple", 
      border: "1px solid rgba(255, 255, 255, 0.5)", 
      width:  "1fr",
      height: ( (props.height*75 + 5)+"vh")}}>
    </div>
  )
}

export default Bar;