import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Timer from "./pages/timer";
import Counter from "./pages/counter";
import Authorized from "./component/authorized";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
    <Routes>
  <Route path="/" element={<Login />} />

  <Route element={<Authorized />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/counter" element={<Counter />} />
    <Route path="/timer" element={<Timer />} />
  </Route>

  <Route path="*" element={<NotFound />} />
</Routes>

    </>
  );
}

export default App;
