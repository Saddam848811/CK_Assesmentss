import { useContext, useEffect } from "react"
import {ColorContext} from './ContextProvider'

function ChildB() {

   const {dispatch} = useContext(ColorContext);

   useEffect(()=>{

       dispatch({type:"addone"})
   },[])
   

  return (
    <div>
        <h1>child B</h1>
    </div>
  )
}

export default ChildB
