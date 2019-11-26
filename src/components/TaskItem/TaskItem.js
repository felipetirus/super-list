import React from 'react'

export default function TaskItem(props) {
    return (
        <div> 
            <input type="checkbox" onChange={props.clicked} checked={ props.value.selected }/>
             { props.value.name }
        </div>
    )
}
