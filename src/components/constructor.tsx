import React from 'react';
import { connect } from "react-redux";
import { state } from "../reducer/index";


function Constructor(props: any) {

  return (
    <div className="container form-group mt-5">
      <textarea
        onChange={(e) => { props.cahngesText(e.target.value) }}
        value={props.text}
        className="form-control my-textarea"
      />
      <div className="d-flex justify-content-center mt-4">
        <button
          onClick={props.readText}
          type="button"
          className="btn btn-danger"
        >Create</button>
      </div>
    </div>
  );
}

export default connect(
  (state: state) => ({
    text: state.text
  }),
  (dispatch) => ({
    cahngesText: (text: string) => {
      dispatch({ type: "CHANGESTEXT", text });
    },
    readText: () => {
      dispatch({ type: "READTEXT" });
    }
  })
)(Constructor);