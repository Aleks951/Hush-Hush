import React from 'react';
import { connect } from "react-redux";
import { state } from '../reducer';

import ParentElement from "./parentElement";
import ContactPhones from "./contactPhones";
import Addresses from "./addresses";

function App(props: any) {
  let elementJSX: JSX.Element;
  if (props.showElement === "PARENT") {
    elementJSX = <ParentElement />;
  } else if (props.showElement === "CONTACTPHONES") {
    elementJSX = <ContactPhones />
  } else {
    elementJSX = <Addresses />
  };

  return (
      <div className="container my-wrap">
        {elementJSX!}
      </div>
  );
}

export default connect(
  (state: state) => ({
    showElement: state.showElement
  }),
  (dispatch) => ({})
)(App);