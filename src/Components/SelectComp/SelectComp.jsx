import React from 'react'
import "./SelectComp.css"
import { useNavigate } from 'react-router-dom'
import { Path } from '../../Route/Path';
import Logout from '../../Common/Logout/Logout';
const SelectComp = () => {
    
    const  Navigate = useNavigate();
    
    const HandleNavigate = (props)=>{
        if(props == "one"){
            Navigate(Path.Register);
        }
        else if(props == "two"){
            Navigate(Path.ScanBill);
        }
        else if(props == "three"){
          Navigate(Path.ShowProduct);
      }
    }
  return (
    <div>
      <div className='DashBoardComp-Parent'>
      <Logout/>
      </div>
    
    <div className='SelectComp-Parent-div'>
    <div className='SelectComp-main-div'>
    <button onClick={()=>{HandleNavigate("one")}} className='Button-blue'>Register Product</button>
    <button onClick={()=>{HandleNavigate("two")}} className='Button-blue'>Genrate Bill</button>
    <button onClick={()=>{HandleNavigate("three")}} className='Button-blue'>View Product</button>
    </div>
    
    </div>
    

    </div>
  )
}

export default SelectComp
