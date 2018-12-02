import React from 'react'


export default function ButtonLink(props) {
  return (
    <a 
        href={props.to}
        className="rcl--button_link">
        {props.children}
    </a>
  )
}
