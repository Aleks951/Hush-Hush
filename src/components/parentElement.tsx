import React from 'react';
import { connect } from "react-redux";
import { state } from '../reducer';

function ParentElement(props: any) {
    const state: state = props.state;

    return (
        <React.Fragment>
            <label>Id</label>
            <input
                onChange={(e) => { props.changeInput("id", e.target.value) }}
                type="number"
                value={state.id}
                className="form-control"
            />
            <label>Name</label>
            <input
                onChange={(e) => { props.changeInput("name", e.target.value) }}
                type="text"
                value={state.name}
                className="form-control"
            />
            <div className="wrap-buttons">
                <button
                    onClick={() => {props.changesElement("CONTACTPHONES")}}
                    type="button"
                    className="btn btn-secondary"
                >Contact phones</button>
                <button
                    onClick={() => {props.changesElement("ADDRESSES")}}
                    type="button"
                    className="btn btn-secondary"
                >Addresses</button>
            </div>
        </React.Fragment>
    );
}

export default connect(
    (state: state) => ({
        state
    }),
    (dispatch) => ({
        changeInput: (target: string, value: string | number) => {
            dispatch({ type: "CHANGEINPUT", target, value });
        },
        changesElement: (showElement: string) => {
            dispatch({ type: "CHANGESELEMENT", showElement });
        }
    })
)(ParentElement);