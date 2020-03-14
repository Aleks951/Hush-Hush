import React from "react";

interface props {
    name: string,
    type: string,
    value: any,
    changesInput: Function,
    secondPath?: string
};

function CreateInput(props: props) {
    return (
        <div className="form-group">
            <label>{props.name}</label>
            <input
                onChange={(e) => {props.changesInput(e.target.value, props.name, (props.secondPath ? props.secondPath : null))}}
                type={props.type}
                value={props.value}
                className="form-control"
            />
        </div>
    );
};

export default CreateInput;