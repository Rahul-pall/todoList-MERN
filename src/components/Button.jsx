import React from 'react'

const Button = ({btn,handleAdd}) => {
  return (
    <button
     className='px-8 border rounded-r-3xl hover:bg-green-600'
     onClick={handleAdd}
     >{btn}</button>
  )
}

export default Button
