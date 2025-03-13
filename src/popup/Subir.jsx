import React, { useState, useEffect } from "react";
import { FaImages } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { supabase } from "../Lib/Supabase";

export const Subir = ({ cerrar }) => {
  const [text, setText] = useState("");
  const [nombre, setNombre] = useState("Cargando...");
  const [apellido, setApellido] = useState("Cargando...");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNombreYApellido = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setNombre("Error al obtener sesión");
        setApellido("Error");
        return;
      }
      if (!sessionData?.session?.user) {
        setNombre("Usuario no autenticado");
        setApellido("Desconocido");
        return;
      }

      const userEmail = sessionData.session.user.email; // Usar el email del usuario

      const { data, error } = await supabase
        .from("session")
        .select("nombre, apellido") // Obtener tanto el nombre como el apellido
        .eq("email", userEmail) // Buscar por email
        .maybeSingle();

      console.log("Email del usuario autenticado:", userEmail);

      if (error) {
        setNombre("Error al obtener datos");
        setApellido("Error");
        return;
      }
      if (!data) {
        setNombre("Usuario sin datos");
        setApellido("Desconocido");
        return;
      }
      setNombre(data.nombre || "Usuario sin nombre");
      setApellido(data.apellido || "Usuario sin apellido");
    };

    fetchNombreYApellido();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = null;
    let videoUrl = null;

    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("posts").upload(fileName, file);
      if (error) {
        setLoading(false);
        return;
      }
      imageUrl = `https://gpamixltmhtluwtqhvkp.supabase.co/storage/v1/object/public/posts/${fileName}`;
    }

    if (videoFile) {
      const videoName = `${Date.now()}_${videoFile.name}`;
      const { error } = await supabase.storage.from("posts").upload(videoName, videoFile);
      if (error) {
        setLoading(false);
        return;
      }
      videoUrl = `https://gpamixltmhtluwtqhvkp.supabase.co/storage/v1/object/public/posts/${videoName}`;
    }

    const { error } = await supabase.from("posts").insert([
      {
        created_at: new Date(),
        usuario: `${nombre} ${apellido}`, // Combina el nombre y el apellido
        texto: text,
        imagen: imageUrl,
        video: videoUrl,
      },
    ]);

    if (!error) {
      setText("");
      setImage(null);
      setVideo(null);
      setFile(null);
      setVideoFile(null);
      cerrar();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form className="bg-[#252728] p-6 rounded-lg shadow-lg w-full max-w-md relative" onSubmit={handlePost}>
        <div className="flex justify-between items-center pb-2 border-b border-gray-600">
          <h2 className="text-lg font-semibold text-white">Crear Publicación</h2>
          <button onClick={cerrar} className="text-2xl cursor-pointer text-gray-300 hover:text-white">
            <IoClose />
          </button>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <img src="https://via.placeholder.com/40" alt="Perfil" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="text-white font-medium">{`${nombre} ${apellido}`}</h3>
            <div className="flex items-center text-sm text-gray-400">
              <GiEarthAmerica className="mr-1" />
              <span>Público</span>
            </div>
          </div>
        </div>

        <div className="mt-3 relative">
          <textarea
            placeholder="¿Qué estás pensando?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-[#3A3B3C] text-white p-3 rounded-lg outline-none resize-none h-20"/>
        </div>

        {image && (
          <div className="mt-3 w-full max-h-60 overflow-hidden rounded-lg">
            <img src={image} alt="Preview" className="w-full max-h-60 object-cover" />
          </div>
        )}

        {video && (
          <div className="mt-3 w-full max-h-60 overflow-hidden rounded-lg">
            <video controls src={video} className="w-full max-h-60 object-cover" />
          </div>
        )}

        <label className="mt-3 flex items-center gap-2 bg-[#3A3B3C] p-2 rounded-lg cursor-pointer text-white text-sm">
          <FaImages className="text-green-400" />
          <span>Agregar foto o video</span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (file.type.startsWith("image/")) {
                  setFile(file);
                  setImage(URL.createObjectURL(file));
                  setVideo(null);
                  setVideoFile(null);
                } else if (file.type.startsWith("video/")) {
                  setVideoFile(file);
                  setVideo(URL.createObjectURL(file));
                  setFile(null);
                  setImage(null);
                }
              }
            }}
            className="hidden"/>
        </label>
        <button
          type="submit"
          disabled={(!text && !image && !video) || loading}
          className={`w-full mt-3 p-2 rounded-lg font-semibold ${
            text || image || video ? "bg-blue-500 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
          {loading ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </div>
  );
};
