import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vehicular from "./pages/Vehicular";
import Caseta from "./pages/Caseta";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vehicular" element={<Vehicular />} />
      <Route path="/caseta" element={<Caseta />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;