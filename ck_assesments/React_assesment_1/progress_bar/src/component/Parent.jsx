import React from "react";
import ChildA from "./ChildA";
import ChildB from "./ChildB";
import { Provider } from "react-redux";
import store from "../redux/Store";

function Parent() {
  return (
    <Provider store={store}>
      <div>
        <h1>I am Parent</h1>
        <ChildA />
        <ChildB />
      </div>
    </Provider>
  );
}

export default Parent;
