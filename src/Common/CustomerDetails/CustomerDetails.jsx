import React from 'react'
import "./CustomerDetails.css"
const CustomerDetails = ({label="Dummy",value="value",className="CustomerDetails-Main",bool=false,onChange}) => {
  return (
    <div className={className}>
      <label className='Blue-text'>{label}  :</label> 
     {bool == false && <span className='Span-text'>{value}</span>}
      {
        bool && 
        <input onChange={onChange} type="text"  className="DiscountInput" />
      }
    </div>
  )
}

export default CustomerDetails
