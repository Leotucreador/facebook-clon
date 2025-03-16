import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Watch from "./Pages/Watch";
import { Notification } from "./Pages/Notification";
import { Messages } from "./Pages/Messages";
import { User } from "./edit/User";
import { Login } from "./Init/Login";
import { Register } from "./Init/Register";
import { Profiles } from "./Pages/Profiles";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Watch" element={<Watch />} />
        <Route path="/groups" element={<Grupos />} />
        <Route path="/gaming" element={<Juegos />} />
        <Route path="/menu" element={<Menú/>} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/Notis" element={<Notification />} />
        <Route path="/Profiles" element={<Profiles />} />
        <Route path="/register" element={<Register />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
