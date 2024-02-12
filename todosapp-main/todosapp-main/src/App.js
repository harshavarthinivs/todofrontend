import { Route, Routes } from "react-router-dom";

import Home from "./features/Home";
import Login from "./features/Login";
import Register from "./features/Register";
import Experiment from "./experiments/Experiment";

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/experiment" element={<Experiment />} />
    </Routes>
  );
}

export default App;
