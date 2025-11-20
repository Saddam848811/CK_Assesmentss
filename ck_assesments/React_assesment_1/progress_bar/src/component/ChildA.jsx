import React, { useContext, useEffect } from 'react'
import ChildB from './ChildB'
import { ColorContext, a } from './ContextProvider'

function ChildA() {


    const {setCount,count} = useContext(ColorContext)
    useEffect(()=>{
        setCount(1)
    },[])

    console.log(count,'child A');
    
    

  return (
    <div>
      <h1>child A</h1>
    </div>
  )
}

export default ChildA
