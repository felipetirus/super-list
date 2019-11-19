import React from 'react'

export default function TaskItem(props) {
    return (
        <div> 
            <input type="checkbox" onClick={props.clicked} value={props.value.selected}/>
             { props.value.name }
        </div>
    )
}
