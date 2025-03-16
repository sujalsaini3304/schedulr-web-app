import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Signup from "../components/Signup";
import Login from "../components/Login";
import ScheduleCreatePage from "../components/ScheduleCreatePage";
import EditPage from "../components/EditPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/schedule/create" element={<ScheduleCreatePage />} />
        <Route path="/schedule/edit" element={<EditPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
