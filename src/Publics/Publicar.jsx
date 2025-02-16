import React, { useState } from "react";
import { FaVideo } from "react-icons/fa";
import { FcStackOfPhotos } from "react-icons/fc";
import { Subir } from "../popup/Subir";

export const Publicar = () => {
  const [subir, setSubir] = useState(false); // Corregido el nombre del estado

  return (
    <section className="bg-[#252728] mb-7 text-white p-4 rounded-lg shadow-md w-full max-w-md">
      {/* Input de publicación */}
      <div className="flex items-center justify-center gap-3">
        <img
          src="https://via.placeholder.com/40"
          alt="Perfil"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          onClick={() => setSubir(true)}
          placeholder="¿Qué estás pensando, Leonardo?"
          className="flex-1 bg-[#3A3B3C] text-white p-2 rounded-full outline-none"
          
        />
      </div>

      <hr className="my-3 border-gray-700" />

      <div className="flex justify-around ">

        <button className="flex items-center hover:bg-gray-500 gap-2 text-red-500">
          <FaVideo className="text-xl " />
          <span>Video en vivo</span>
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-500 text-green-500" onClick={() => setSubir(true)}>
          <FcStackOfPhotos className="text-xl" />
          <span>Foto/video</span>
        </button>
      </div>

      {subir && (<Subir subir={subir} cerrar={() => setSubir(false)} />)}
    </section>
  );
};
