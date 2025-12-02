import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/Actions";

function ChildA() {
  const count = useSelector((state) => state.count);

  return (
    <div>
      <h1>{count} child a</h1>
    </div>
  );
}

export default ChildA;
