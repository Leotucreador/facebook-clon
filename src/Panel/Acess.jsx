import React from 'react'
import { FaBell, FaUserAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Acess = () => {
  return (
    <div className="lg:w-1/4 w-full fixed h-screen overflow-y-auto bg-[#1C1C1D] p-4 shadow-lg rounded-lg">
      <div className="flex flex-col space-y-4">
        <Link to="/User" className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
          <FaUserAlt className="text-2xl" />
          Perfil
        </Link>
        <Link to="/friends" className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
          <FaUsers className="text-2xl" />
          Amigos
        </Link>
        <Link to="/notifications" className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
          <FaBell className="text-2xl" />
          Notifiaciones
        </Link>
        <Link to="/saved" className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
          <FaBell className="text-2xl" />
          Guardado
        </Link>
        <Link to="/groups" className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
          <FaUsers className="text-2xl" />
          Grupos
        </Link>
        {Array.from({ length: 20 }).map((_, index) => (
          <Link key={index} to={`/section${index + 1}`} className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
            <FaUsers className="text-2xl" />
            Sección {index + 1}
         </Link>
        ))}
      </div>
    </div>
  )
}
