import React from 'react';
import { connect } from "react-redux";
import { state } from "../reducer/index";

import Constructor from "./constructor";
import Result from "./result";

interface props {
  showResult: boolean
};

function App(props: props) {

  return (
    <React.Fragment>
      {props.showResult ? <Result /> : <Constructor />}
    </React.Fragment>
  );
}

export default connect(
  (state: state) => ({
    showResult: state.showResult
  }),
  (dispatch) => ({})
)(App);