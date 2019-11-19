import React from 'react'

export default function ListItem(props) {
    return (
        <div onClick={props.clicked}>
            {props.value}
        </div>
    )
}
