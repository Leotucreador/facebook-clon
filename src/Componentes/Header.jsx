import React, { useState } from 'react';
import { CgMenuGridR } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaFacebookMessenger, FaGamepad } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import { MdGroups, MdOutlineLiveTv } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { Profiles } from '../Pages/Profiles';
import { Friends } from '../Panel/Friends';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-[#252728] text-white">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/Home')}>
          <FaFacebook className="text-blue-500 text-4xl cursor-pointer" />
        </button>
        <div className="relative hidden md:flex items-center">
          <CiSearch className="text-gray-400 text-xl absolute left-3" />
          <input
            type="text"
            placeholder="Buscar en Facebook"
            className="bg-[#333334] rounded-3xl pl-10 pr-2 py-2 outline-none w-64 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="hidden md:flex space-x-6 text-gray-400">
        <button onClick={() => navigate('/Home')} title="Inicio" className={`hover:bg-gray-500 p-2 rounded-lg ${location.pathname === '/' ? 'text-blue-500' : ''}`}>
          <GoHome className="text-2xl" />
        </button>
        <button onClick={() => navigate('/Watch')} title="Video" className={`hover:bg-gray-500 p-2 rounded-lg ${location.pathname === '/Watch' ? 'text-blue-500' : ''}`}>
          <MdOutlineLiveTv className="text-2xl" />
        </button>
        <button onClick={() => navigate('/Home')} title="Grupo" className={`hover:bg-gray-500 p-2 rounded-lg ${location.pathname === '/Home' ? 'text-blue-500' : ''}`}>
          <MdGroups className="text-2xl" />
        </button>
        <button onClick={() => navigate('/Home')} title="Videojuegos" className={`hover:bg-gray-500 p-2 rounded-lg ${location.pathname === '/Home' ? 'text-blue-500' : ''}`}>
          <FaGamepad className="text-2xl" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/Messages')} title="Messenger" className="hover:bg-gray-500 p-2 rounded-full">
          <FaFacebookMessenger className="text-2xl" />
        </button>
        <button onClick={() => navigate('/Notification')} title="Notificaciones" className="hover:bg-gray-500 p-2 rounded-full">
          <IoNotifications className="text-2xl" />
        </button>
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          <CgMenuGridR />
        </button>
        <Profiles />
      </div>

      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-[#252728] p-4 flex flex-col items-center space-y-4 md:hidden">
          <button onClick={() => navigate('/Home')} title="Inicio" className="text-white text-lg">Inicio</button>
          <button onClick={() => navigate('/Watch')} title="Video" className="text-white text-lg">Videos</button>
          <button onClick={() => navigate('/Home')} title="Grupo" className="text-white text-lg">Grupos</button>
          <button onClick={() => navigate('/Home')} title="Videojuegos" className="text-white text-lg">Juegos</button>
        </div>
      )}
    </nav>
  );
};