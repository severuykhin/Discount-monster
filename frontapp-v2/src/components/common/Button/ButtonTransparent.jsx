import React from 'react'

export default function ButtonTransparent(props) {
  let onClickHandler = props.onClick || function () {}
  let styles = props.styles && Object.keys(props.styles).length > 0 ? props.styles : {}

  return (
    <button 
        onClick={onClickHandler}
        style={styles}
        className="rcl--button rcl--button_transparent">
        { props.children }
    </button>
  )
}
