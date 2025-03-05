import React from 'react'
import "./Success.css"
const Success = ({setBoolen,message}) => {
  return (
    <div className='Success-div'>
     <div className='Success-para'>
     <p>{message}</p>
     </div>
      <div className='Success-button-container'> 
        <button onClick={()=>{setBoolen(false)}} className='Success-button'>ok</button>
      </div>
    </div>
  )
}

export default Success
