import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ABC from './component/ContextProvider'
// import ProgressBar from './component/ProgressBar'
import Test from './component/Test'
import Reducer from './component/Reducer'
import Memo from './component/Memo'
// import Anotherpage from './component/Anotherpage'
import CallBack from './component/CallBack'
import ChildA from './component/ChildA'
import Parent from './component/Parent'

function App() {

 
  

  return (
    <>

    {/* <Router>
      <Routes>
        <Route path='/' element={<Test/>}/>
        <Route path='/ap' element={<Anotherpage/>}/>
      </Routes>
    </Router> */}
  {/* <ProgressBar/> */}
  {/* <Test/> */}
  {/* <Reducer/> */}
      {/* <Memo/> */}
{/* <CallBack/> */}
      <Parent/>
  {/* <ABC/> */}
    </>
  )
}

export default App
