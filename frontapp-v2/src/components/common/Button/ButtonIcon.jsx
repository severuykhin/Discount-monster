import React from 'react'

export default function ButtonIcon(props) {

  let className = `rcl--button rcl--button_icon ${props.cName ? props.cName : ''}`

  return (
    <button className={className}>
        { props.children }
    </button>
  )
}
