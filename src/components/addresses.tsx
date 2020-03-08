import React from 'react';
import { connect } from "react-redux";
import { state } from '../reducer';

function Addresses(props: any) {
    const state: state = props.state;

    return (
        <React.Fragment>
            <button
                onClick={() => { props.changesElement("PARENT") }}
                type="button"
                className="btn btn-secondary"
            ><i className="fa fa-arrow-left" aria-hidden="true" /> Back
            </button>
            <div className="wrap-input-addresses">
                <label>Street</label>
                <input
                    onChange={(e) => { props.changeInput("street", e.target.value) }}
                    type="text"
                    value={state.newStreet}
                    className="form-control"
                />
                <label>City</label>
                <input
                    onChange={(e) => { props.changeInput("city", e.target.value) }}
                    type="text"
                    value={state.newCity}
                    className="form-control"
                />
                <label>Postal code</label>
                <input
                    onChange={(e) => { props.changeInput("postalCode", e.target.value) }}
                    type="number"
                    value={state.newPostalCode}
                    className="form-control"
                />
                <div>
                    <button
                        onClick={props.saveAddress}
                        type="button"
                        className="btn btn-success btn-save"
                    >Save</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Strit</th>
                        <th scope="col">City</th>
                        <th scope="col">Postal code</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {state.addresses.map((address, i) => {
                        return (
                            <tr>
                                <td>{address.street}</td>
                                <td>{address.city}</td>
                                <td>{address.postalCode}</td>
                                <td className="wrap-trash">
                                    <i
                                        onClick={() => { props.removeAddress(i) }}
                                        className="fa fa-trash"
                                        aria-hidden="true" />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
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
        },
        saveAddress: () => {
            dispatch({ type: "SAVEADDRESS"})
        },
        removeAddress: (i: number) => {
            dispatch({ type: "REMOVADDRESS", i });
        }
    })
)(Addresses);