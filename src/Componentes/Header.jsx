import React, { useState } from 'react';
import { CgMenuGridR } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaFacebookMessenger, FaGamepad } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import { MdGroups, MdOutlineLiveTv } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { Profiles } from '../Pages/Profiles';


export const Header = () => {
  const [buscar, setbuscar] = useState('');
  const location = useLocation(); // Obtenemos la ruta actual

  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-[#252728] text-white">
      {/* Logo y búsqueda */}
      <div className="flex items-center gap-3">
        <Link to="/Home">
          <FaFacebook className="text-blue-500 text-4xl cursor-pointer" />
        </Link>
        <CiSearch className="text-gray-400 text-xl mr-2" />
        <input
          type="text"
          placeholder="Buscar en Facebook"
          className="bg-[#333334] rounded-3xl px-2 py-2 outline-none w-full text-white placeholder-gray-400"
        />
      </div>

      {/* Iconos centrales */}
      <div className="flex space-x-8 text-gray-400">
        <Link to="/Home" title='Inicio' className={`hover:bg-gray-500 p-2 rounded-lg ${location.pathname === '/' ? 'text-blue-500' : ''}`}>
          <GoHome className="text-2xl" />
        </Link>
        <Link to="/Watch" title='Video' className={`hover:bg-gray-500 p-2 rounded-lg ${location.pathname === '/Watch' ? 'text-blue-500' : ''}`}>
          <MdOutlineLiveTv className="text-2xl" />
        </Link>
        <Link to="/Groups" title='Grupo' className={`hover:bg-gray-500 p-2 rounded-lg ${location.pathname === '/Groups' ? 'text-blue-500' : ''}`}>
          <MdGroups className="text-2xl" />
        </Link>
        <Link to="/Games" title='Videojuegos' className={`hover:bg-gray-500 p-2 rounded-lg ${location.pathname === '/Games' ? 'text-blue-500' : ''}`}>
          <FaGamepad className="text-2xl" />
        </Link>
      </div>

      {/* Iconos de perfil y notificaciones */}
      <div className="flex items-center space-x-4">
        <Link title='Menú' className="hover:bg-gray-500 p-2 rounded-full">
          <CgMenuGridR className="text-2xl" />
        </Link>
        <Link title='Messenger' className="hover:bg-gray-500 p-2 rounded-full">
          <FaFacebookMessenger className="text-2xl" />
        </Link>
        <Link title='Notificaciones' className="hover:bg-gray-500 p-2 rounded-full">
          <IoNotifications className="text-2xl" />
        </Link>
        {/* Integración del componente Profiles */}
        <Profiles />
      </div>
    </nav>
  );
};