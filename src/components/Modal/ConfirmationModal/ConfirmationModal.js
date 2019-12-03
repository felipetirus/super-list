import React from 'react'

const confirmationModal = (props) => {
    return (
        <div style={{
                width: "300px",
                height: "100px",
                position: "fixed",
                top: "40%",
                left: "40%",
                border: "1px solid black",
                textAlign: "center"            
            }}>
            <p>{props.message}</p>
            <button onClick={props.closeModal}>Cancel</button>
            <button onClick={props.confirmModal}>Confirm</button>
        </div>
    )
}

export default confirmationModal;