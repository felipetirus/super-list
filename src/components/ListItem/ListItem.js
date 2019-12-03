import React from 'react'
import { TiDelete, TiEdit } from 'react-icons/ti'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

export default function ListItem(props) {

    let content = (
        <Auxiliary>
            <p style={{
                width: "150px", 
                display: "inline-block", 
                margin: "3px 0"}} 
                onClick={props.clicked}>{props.value}</p> 
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
                    value={props.value} />
                <button onClick={props.editElement}>OK</button>
            </Auxiliary>
        )
    }

    return (
        <div style={{
                width: "190px",
                border: "1px solid black",
                margin: "2px 0px"}}>
            {content}
        </div>
    )
}
