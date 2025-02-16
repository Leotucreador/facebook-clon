import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./Componentes/Header";
import Home from "./Pages/Home";
import Watch from "./Pages/Watch";
import { Register } from "../Init/Register";
import { Login } from "../Init/Login";


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
        <Route path="/messages" element={<h1 className="text-center text-white">Mensajes</h1>} />
        <Route path="/notifications" element={<h1 className="text-center text-white">Notificaciones</h1>} />
        <Route path="/profile" element={<h1 className="text-center text-white">Perfil</h1>} />
        <Route path="register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
