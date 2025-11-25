import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../redux/Actions';

function ChildA() {
  const count = useSelector(state => state.count) // ✅ correct
  console.log(count);
  
const dispatch = useDispatch();
  return (
    <div>
      <h1>Child A</h1>
      {/* <p>Count: {count}</p> */}
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  )
}

export default ChildA
