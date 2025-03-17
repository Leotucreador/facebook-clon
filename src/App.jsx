import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { Login } from "./Init/Login";
import { Register } from "./Init/Register";
import Watch from "./Pages/Watch";
import { Menu } from "./Pages/Menu";
import { Messages } from "./Pages/Messages";
import { Notification } from "./Pages/Notification";
import { Profiles } from "./Pages/Profiles";
import { User } from "./edit/User";
import { Friends } from "./Panel/Friends";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Watch" element={<Watch />} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Profiles" element={<Profiles />} />
        <Route path="/register" element={<Register />} />
        <Route path="/User" element={<User />} />
        <Route path="/Friends" element={<Friends />} />
      </Routes>
    </Router>
  );
}

export default App;
