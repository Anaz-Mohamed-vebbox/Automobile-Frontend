import React from 'react'
import "./Paragraph.css"
const Paragraph = ({className="",text="",onclick}) => {
  return (
    <p className={className} onClick={onclick}>{text}</p>
  )
}

export default Paragraph
