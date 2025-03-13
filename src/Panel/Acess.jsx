import React from 'react';
import { FaBell, FaUserAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Acess = () => {
  const navigate = useNavigate();

  return (
    <div className="lg:w-1/4 w-full fixed h-screen overflow-y-auto bg-[#1C1C1D] p-4 shadow-lg rounded-lg">
      <div className="flex flex-col space-y-4">
        <button onClick={() => navigate("/User")} className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
          <FaUserAlt className="text-2xl" />
          <span>Perfil</span>
        </button>
        <button onClick={() => navigate("/friends")} className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
          <FaUsers className="text-2xl" />
          <span>Amigos</span>
        </button>
        <button onClick={() => navigate("/notifications")} className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
          <FaBell className="text-2xl" />
          <span>Notificaciones</span>
        </button>
        <button onClick={() => navigate("/saved")} className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
          <FaBell className="text-2xl" />
          <span>Guardado</span>
        </button>
        <button onClick={() => navigate("/groups")} className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
          <FaUsers className="text-2xl" />
          <span>Grupos</span>
        </button>
        {Array.from({ length: 20 }).map((_, index) => (
          <button key={index} onClick={() => navigate(`/section${index + 1}`)} className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
            <FaUsers className="text-2xl" />
            <span>Sección {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
