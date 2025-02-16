import React, { useEffect, useRef, useState } from 'react';
import { CiSquareAlert } from "react-icons/ci";
import { FaUserAlt } from 'react-icons/fa';
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

export const Profiles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    toast.loading("Cerrando sesión...");

    setTimeout(() => {
      toast.dismiss();
      toast.success("Hasta la proxima");
      navigate("/");
    }, 4000);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="hover:bg-gray-500 p-2 rounded-full focus:outline-none"
      >
        <FaUserAlt className="text-2xl" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 text-gray-700 bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="font-semibold">Leonardo Gutierrez</p>
              <p className="text-sm text-gray-500">Ver todos los perfiles</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded-lg focus:outline-none">
              Configuración y privacidad
            </button>
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded-lg focus:outline-none">
              Ayuda y soporte técnico
            </button>
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded-lg focus:outline-none">
              Pantalla y accesibilidad
            </button>
            <button className="w-full text-left flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none">
              <CiSquareAlert />Enviar comentarios
            </button>
            <button 
              onClick={handleLogout} 
              className="w-full text-left p-2 flex items-center text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none">
              <MdLogout />Cerrar sesión
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
};
