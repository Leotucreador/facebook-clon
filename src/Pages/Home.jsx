import React, { useState } from "react";
import { FaBell, FaUserAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Header } from "../Componentes/Header";
import { MostrarPost } from "../Componentes/MostrarPost";
import { Publicar } from "../Publics/Publicar";



const Home = () => {
  const [buscar, setBuscar] = useState('');

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#1C1C1D] flex flex-col lg:flex-row p-4">
        {/* Sidebar */}
        <div className="lg:w-1/4 w-full bg-[#1C1C1D] p-4 shadow-lg rounded-lg mb-4 lg:mb-0">
          <div className="flex flex-col space-y-4">
            <Link className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
              <FaUserAlt className="text-2xl" />
              <span>Perfil</span>
            </Link>
            <Link className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
              <FaUsers className="text-2xl" />
              <span>Amigos</span>
            </Link>
            <Link className="flex items-center space-x-3 text-gray-600 hover:text-blue-500">
              <FaBell className="text-2xl" />
              <span>Notificaciones</span>
            </Link>
          </div>
        </div>


        <div className="flex flex-col items-center lg:w-2/4 w-full bg-[#1C1C1D] p-4 shadow-lg rounded-lg mx-0 lg:mx-4">
          <Publicar />
          <MostrarPost />
        </div>

        <div className="lg:w-1/4 w-full bg-[#1C1C1D] p-4 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-600">Amigos sugeridos</h3>
          <div className="flex flex-col space-y-3 mt-4">
            {["Amigo 1", "Amigo 2"].map((amigo, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <span>{amigo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
