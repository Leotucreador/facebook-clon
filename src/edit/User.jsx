import React, { useState } from "react";
import { Header } from "../Componentes/Header";

export const User = () => {
  const [Perfil, setPerfil] = useState(false);
  const [portada, setportada] = useState("");

  const userData = {
    name: "Leonardo Gutierrez",
    profilePicture:
      "https://scontent.fbga2-1.fna.fbcdn.net/v/t39.30808-6/474880126_1317482166054038_692638653519791678_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEEd2c3NxZOxu2XmImHEj9B6fwcD2lV1HTp_BwPaVXUdC_XBcX0dcExMdUbPS70Ucccp_RSk_6g5j3JxvgAXEzI&_nc_ohc=7uq6lyFJdckQ7kNvgHrejtZ&_nc_oc=Adic2tlNvXAo725Yt14ZPP4y_cNiM1P39Q5EdOebSw5juS68GXEYmHrEOiwtzXqOc7z_8ERHQVIF9gogfLQC-7lG&_nc_zt=23&_nc_ht=scontent.fbga2-1.fna&_nc_gid=AVGXt7iFsQ6tZYmYNjp5xuE&oh=00_AYAXbLdg7hVzWI03XLrKlqBhJJeab8NaYQ7JOp-fVGdZsQ&oe=67CD98BB",
    coverPhoto:
      "https://scontent.fbga2-1.fna.fbcdn.net/v/t39.30808-6/473193038_1310187870116801_8427908419221643874_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeFj6SzOa_gx_mrP6ctmLOOtnARX-KPyXU-cBFf4o_JdT7c3wFGIGt03RBPj_VcKkC9RzkYCt7CiuKyeBgEuCpcg&_nc_ohc=yN5jNe_FcNUQ7kNvgECS3VY&_nc_oc=AdhjYkeQfR6UZsdye1iUWyvONxvSyVbvlAJCqIBHyu3bHS3zNpOPheuAciQp5cgcrumbu7an7075XAEE-Qsvrn6n&_nc_zt=23&_nc_ht=scontent.fbga2-1.fna&_nc_gid=A7RDyd1WvmMKi3QjztOaCLh&oh=00_AYHsLEB9Z6QwT0QawdTXTkacIbSVG2UEqVe4Q73AgBRxwg&oe=67D12E17",
    bio: "Adicto a no hacer nada obligado a hacer todo",
    friends: 30,
  };

  const openModal = (image) => {
    setportada(image);
    setPerfil(true);
  };

  return (
    <>
      <Header />
      <section className="max-w-3xl mx-auto text-white bg-[#252728] shadow-lg rounded-lg overflow-hidden">
        {/* Portada */}
        <div className="relative">
          <img
            src={userData.coverPhoto}
            alt="Cover"
            className="w-full h-48 object-cover cursor-pointer"
            onClick={() => openModal(userData.coverPhoto)}
          />
          <div className="absolute bottom-[-50px] left-5">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md cursor-pointer"
              onClick={() => openModal(userData.profilePicture)}
            />
          </div>
        </div>

        {/* Información del usuario */}
        <div className="p-5 mt-12 text-center">
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p>{userData.bio}</p>
          <p className="mt-2">{userData.friends} amigos</p>
        </div>

        {/* Botones de interacción */}
        <div className="p-4 flex justify-around border-t">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Agregar amigo
          </button>
          <button className="bg-gray-200 text-black  px-4 py-2 rounded-lg hover:bg-gray-300">
            Mensaje
          </button>
        </div>
      </section>

      {/* Modal para ver la imagen completa */}
      {Perfil && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={portada}
              alt="Full View"
              className="max-w-full max-h-screen rounded-lg"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-2"
              onClick={() => setPerfil(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};