import React from 'react'
import { useEffect, useReducer } from 'react'


function Reducer() {

     const reducer =(state ,action)=>{

    state++
    console.log(state , "inside reducer");
    console.log(action.type);
    
    return state;
    

  }

  const [count, dispatch] = useReducer(reducer ,0)

useEffect(()=>{
  dispatch({type:"from dispatch"})

},[])
  console.log(count,"outside");
  return (
    <div>
        i am reducer


      
    </div>
  )
}

export default Reducer
