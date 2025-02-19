import React from 'react'
import "./BreadCrum.css"
import { useNavigate } from 'react-router-dom'
const BreadCrum = () => {
  const Navigate = useNavigate();
  const Handle = ()=>{
    Navigate(-1)
  }
  return (
    <p className='bread-crum' onClick={Handle}>Back &gt;</p>
    
  )
}

export default BreadCrum
