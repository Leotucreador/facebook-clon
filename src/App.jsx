import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Watch from "./Pages/Watch";
import { Register } from "../Init/Register";
import { Login } from "../Init/Login";
import { Profiles } from "./Pages/Profiles";
import { Notification } from "./Pages/Notification";
import { Messages } from "./Pages/Messages";
import { User } from "./edit/User";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>

        <Route path="/Home" element={<Home/>}/>
        <Route path="/Watch" element={<Watch/>} />
        <Route path="/groups" element={<h1 className="text-center text-white">Grupos</h1>} />
        <Route path="/gaming" element={<h1 className="text-center text-white">Juegos</h1>} />
        <Route path="/menu" element={<h1 className="text-center text-white">Menú</h1>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/Notis" element={<Notification/>}/>
        <Route path="/Profiles" element={<Profiles/>} />
        <Route path="register" element={<Register/>}/>
        <Route path="User" element={<User/>}/>
      </Routes>
    </Router>
  );
}

export default App;
