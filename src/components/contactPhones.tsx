import React from 'react';
import { connect } from "react-redux";
import { state } from '../reducer';

function ContactPhones(props: any) {
    const state: state = props.state;

    return (
        <React.Fragment>
            <button
                onClick={() => { props.changesElement("PARENT") }}
                type="button"
                className="btn btn-secondary"
            ><i className="fa fa-arrow-left" aria-hidden="true" /> Back
            </button>
            <div className="wrap-input-phon">
                <label>Phone</label>
                <div>
                    <input
                        onChange={(e) => { props.changeInput("phon", e.target.value) }}
                        type="number"
                        value={state.newPhon}
                        className="form-control"
                    />
                    <button
                        onClick={props.savePhon}
                        type="button"
                        className="btn btn-success btn-save"
                    >Save</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Phone</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {state.contactPhones.map((phone, i) => {
                        return (
                            <tr>
                                <td>{phone}</td>
                                <td className="wrap-trash">
                                    <i
                                        onClick={() => {props.removePhon(i)}}
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
        savePhon: () => {
            dispatch({ type: "SAVEPHONE" });
        },
        removePhon: (i: number) => {
            dispatch({ type: "REMOVPHONE", i });
        }
    })
)(ContactPhones);