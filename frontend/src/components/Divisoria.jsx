import React from 'react'

const Divisoria = ({titulo}) => {
  return (
    <div>
      <h1 style={{color: "#8c52ff"}}>{titulo}</h1>
      <div style={{borderBottom: "2px solid #8c52ff", marginTop: 10, borderRadius: 10}}></div>
    </div>
  )
}

export default Divisoria