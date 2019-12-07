import React from 'react'
import { TiDelete, TiEdit } from 'react-icons/ti'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

export default function TaskItem(props) {

    let content = (
        <Auxiliary>
            <p style={{
                width: "185px", 
                display: "inline-block", 
                margin: "3px 0"}} 
                onClick={props.clicked}> {props.value.name} </p>
            <TiEdit onClick={props.editClicked}/>
            <TiDelete onClick={props.deleteClicked}/>
        </Auxiliary>
    );

    if (props.editMode) {
        content = (
            <Auxiliary>
                <input 
                    style={{width: "150px"}}
                    type="text" 
                    onChange={props.changeEditNameHandler} 
                    value={props.value.name} />
                <button onClick={props.editElement}>OK</button>
            </Auxiliary>
        );
    }

    return (
        <div> 
            <input type="checkbox" onChange={props.clicked} checked={ props.value.selected }/>
             { content }
        </div>
    )
}
