import React from 'react';
import { connect } from "react-redux";
import { state } from "../reducer/index";

import CreateInput from "./createInput";

interface props {
    params: any,
    types: any,
    showObj: any,
    changesInput: Function,
    changesObj: Function,
    saveData: VoidFunction,
    delString: Function
};

function Result(props: props) {
    let arrInputs: Array<JSX.Element> = new Array();
    let arrButtons: Array<JSX.Element> = new Array();
    let params = props.params;
    let types = props.types;

    for (let key in params) {
        if (typeof (params[key]) === "object") {
            arrButtons.push(
                <button
                    onClick={() => { props.changesObj(key) }}
                    className="btn btn-warning"
                >{key}</button>
            );
        } else {
            arrInputs.push(
                <CreateInput
                    key={key}
                    name={key}
                    value={params[key]}
                    type={types[key]}
                    changesInput={props.changesInput}
                />
            );
        };
    };

    // если была нажата кнопка для перехода к другой форме
    // Блок наполнен инпутами (по условию) и таблицей
    if (props.showObj) {
        let arrInputs: Array<JSX.Element> = new Array();
        let head: Array<JSX.Element> = [
            <th>#</th>
        ];
        let body: Array<JSX.Element> = new Array();
        let objParams = params[props.showObj].values;
        let objTypes = types[props.showObj];
        let arrParams = params[props.showObj].stor;

        for (let key in objParams) {
            arrInputs.push(
                <CreateInput
                    key={key}
                    name={key}
                    value={objParams[key]}
                    type={objTypes[key]}
                    changesInput={props.changesInput}
                    secondPath={props.showObj}
                />
            );

            head.push(
                <th>{key}</th>
            );
        };

        head.push(
            <th>options</th>
        );

        body = arrParams.map((obj: any, i: number) => {
            let arr: Array<JSX.Element> = [
                <th scope="row">{i + 1}</th>
            ];
            for (let key in obj) {
                arr.push(
                    <td>{obj[key]}</td>
                );
            };
            arr.push(
                <td>
                    <i
                        onClick={() => { props.delString(i) }}
                        className="fa fa-trash"
                    />
                </td>
            );

            return (
                <tr>{arr}</tr>
            );
        });

        return (
            <div className="container form-group mt-5 border border-warning rounded p-5">
                <div className="mb-5">
                    <button
                        onClick={() => { props.changesObj(false) }}
                        className="btn btn-warning"
                    >Back</button>
                </div>
                {arrInputs}
                <div className="mb-5 mt-5 d-flex justify-content-center align-items-center">
                    <button
                        onClick={props.saveData}
                        className="btn btn-success"
                    >Save</button>
                </div>
                <table className="table">
                    <thead>{head}</thead>
                    <tbody>{body}</tbody>
                </table>
            </div>
        );
    };
    // end form

    return (
        <div className="container form-group mt-5 border border-warning rounded p-5">
            {arrInputs}
            <div className="d-flex justify-content-around mt-5">
                {arrButtons}
            </div>
        </div>
    );
};

export default connect(
    (state: state) => ({
        params: state.params,
        types: state.types,
        showObj: state.showObj
    }),
    (dispatch) => ({
        changesInput: (value: any, path: string, secondPath?: string) => {
            dispatch({ type: "CHANGESINPUT", value, path, secondPath });
        },
        changesObj: (value: any) => {
            dispatch({ type: "CHANGESOBJEKT", value });
        },
        saveData: () => {
            dispatch({ type: "SAVEDATA" });
        },
        delString: (i: number) => {
            dispatch({ type: "DELSTRING", i });
        }
    })
)(Result);