import React from 'react'
import TaskItem from './TaskItem/TaskItem'

export default function Tasks(props) {
    return (
        <div>
            <button onClick={props.back}>Back</button>
            {props.takItems.map((value, index) => (<TaskItem key={index} value={value} clicked={() => props.selectTask(index)} />))}
        </div>
    )
}
