import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../Route/Path';

const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(Path.Select)
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Home
