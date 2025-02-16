import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { FaImages, FaUserTag } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { GiEarthAmerica } from "react-icons/gi";
import EmojiPicker from "emoji-picker-react";
import { supabase } from "../Lib/Supabase";

export const Subir = ({ subir, cerrar }) => {
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!subir) return null;

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = null;

    // Si hay una imagen, subirla a Supabase Storage
    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("posts") 
        .upload(fileName, file);

      if (error) {
        console.error("Error al subir imagen:", error);
        setLoading(false);
        return;
      }

      // Obtener URL pública de la imagen
      imageUrl = `https://gpamixltmhtluwtqhvkp.supabase.co/storage/v1/object/public/posts/${fileName}`;
    }

    // Guardar la publicación en la tabla `posts`
    const { error } = await supabase.from("posts").insert([
      {
        created_at: new Date(),
        usuario: "Leonardo Gutiérrez",
        texto: text,
        imagen: imageUrl,
      },
    ]);

    if (error) {
      console.error("Error al guardar publicación:", error);
    } else {
      console.log("Publicación subida con éxito.");
      setText("");
      setImage(null);
      setFile(null);
      cerrar(); 
    }

    setLoading(false);
  };

  return (
    <>
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
              <h3 className="text-white font-medium">Leonardo Gutiérrez</h3>
              <div className="flex items-center text-sm text-gray-400">
                <GiEarthAmerica className="mr-1" />
                <span>Público</span>
              </div>
            </div>
          </div>

          <div className="mt-3 relative">
            <textarea
              placeholder="¿Qué estás pensando, Leonardo?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-[#3A3B3C] text-white p-3 rounded-lg outline-none resize-none h-20"
            />
            <button type="button" onClick={() => setShowPicker(!showPicker)} className="absolute bottom-2 right-3">
              <BsEmojiSmile className="text-yellow-400 text-2xl" />
            </button>
          </div>

          {showPicker && (
            <div className="absolute top-28 left-10 bg-[#1C1C1D] p-2 rounded-lg shadow-lg">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {image && (
            <div className="mt-3 relative">
              <img src={image} alt="Preview" className="w-full rounded-lg" />
              <button onClick={() => setImage(null)} className="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 rounded-full">
                <IoClose />
              </button>
            </div>
          )}

          <label className="mt-3 flex items-center gap-2 bg-[#3A3B3C] p-2 rounded-lg cursor-pointer text-white text-sm">
            <FaImages className="text-green-400" />
            <span>Agregar fotos/videos</span>
            <input type="file" onChange={handleImageUpload} className="hidden" />
          </label>

          <div className="mt-3 flex justify-around text-white text-sm">
            <button className="flex items-center gap-2 hover:text-gray-400">
              <FaUserTag className="text-blue-400" />
              Etiquetar amigos
            </button>
            <button className="flex items-center gap-2 hover:text-gray-400">
              <MdLocationOn className="text-red-400" />
              Ubicación
            </button>
          </div>

          <button
            type="submit"
            disabled={!text && !image || loading}
            className={`w-full mt-3 p-2 rounded-lg font-semibold 
                ${text || image ? "bg-blue-500 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"}
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Publicando..." : "Publicar"}
          </button>
        </form>
      </div>
    </>
  );
};
