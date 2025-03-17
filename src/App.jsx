import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Importaciones dinámicas (lazy loading)
const Home = lazy(() => import("./Pages/Home"));
const Watch = lazy(() => import("./Pages/Watch"));
const Notification = lazy(() => import("./Pages/Notification"));
const Messages = lazy(() => import("./Pages/Messages"));
const User = lazy(() => import("./edit/User"));
const Login = lazy(() => import("./Init/Login"));
const Register = lazy(() => import("./Init/Register"));
const Profiles = lazy(() => import("./Pages/Profiles"));
const Gaming = lazy(() => import("./Pages/Gaming"));
const Menu = lazy(() => import("./Pages/Menu"));
const Groups = lazy(() => import("./Pages/Groups"));
const Friends = Lazy (()=> import("./Panel/Friends"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center p-4">Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Friends" element={<Friends/>}/>
          <Route path="/Groups" element={<Groups />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Watch" element={<Watch />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/Notis" element={<Notification />} />
          <Route path="/Profiles" element={<Profiles />} />
          <Route path="/register" element={<Register />} />
          <Route path="/User" element={<User />} />
          <Route path="/Gaming" element={<Gaming />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
