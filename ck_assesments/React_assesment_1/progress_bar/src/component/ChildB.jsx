import {ColorContext} from './ContextProvider'
import { useDispatch } from "react-redux";
import { increment } from "../redux/Actions";

function ChildB() {

  const dispatch = useDispatch();



  return (
    <div>
        <h1>child B</h1>
        <button onClick={()=>{
          dispatch(increment())
        }}>incremnt from b</button>

    </div>
  )
}

export default ChildB
