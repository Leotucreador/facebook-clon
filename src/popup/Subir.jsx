import React, { useState, useEffect } from "react";
import { FaImages } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { supabase } from "../Lib/Supabase";

export const Subir = ({ cerrar }) => {
  const [text, setText] = useState("");
  const [nombre, setNombre] = useState("Cargando...");
  const [apellido, setApellido] = useState("Cargando...");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNombreYApellido = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData?.session?.user) {
          setNombre("Usuario no autenticado");
          setApellido("Desconocido");
          return;
        }
        const userEmail = sessionData.session.user.email;
        const { data, error } = await supabase
          .from("session")
          .select("nombre, apellido")
          .eq("email", userEmail)
          .maybeSingle();
        if (error || !data) {
          setNombre("Usuario sin datos");
          setApellido("Desconocido");
          return;}
        setNombre(data.nombre || "Sin nombre");
        setApellido(data.apellido || "Sin apellido");
      } catch (err) {
        setNombre("Error");
        setApellido("al obtener datos");
      }
    };
    fetchNombreYApellido();
  }, []);
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!text && !file) return;
    setLoading(true);

    let mediaUrl = null;
    const isVideo = file && file.type.startsWith("video/");
    const isImage = file && file.type.startsWith("image/");

    if (file && (isImage || isVideo)) {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("posts").upload(fileName, file);

      if (error) {
        alert("Error al subir archivo.");
        setLoading(false);
        return;
      }

      mediaUrl = `https://gpamixltmhtluwtqhvkp.supabase.co/storage/v1/object/public/posts/${fileName}`;
    }

    const { error } = await supabase.from("posts").insert([
      {
        created_at: new Date(),
        usuario: `${nombre} ${apellido}`,
        texto: text,
        imagen: isImage ? mediaUrl : null,
        video: isVideo ? mediaUrl : null,
      },
    ]);

    if (error) {
      alert("Error al publicar.");
    } else {
      setText("");
      setFile(null);
      setPreviewUrl(null);
      cerrar();
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form className="bg-[#252728] p-6 rounded-lg shadow-lg w-full max-w-md relative" onSubmit={handlePost}>
        <div className="flex justify-between items-center pb-2 border-b border-gray-600">
          <h2 className="text-lg font-semibold text-white">Crear Publicación</h2>
          <button
            onClick={cerrar}
            type="button"
            className="text-2xl cursor-pointer text-gray-300 hover:text-white">
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
            className="w-full bg-[#3A3B3C] text-white p-3 rounded-lg outline-none resize-none h-20"
          />
        </div>
        {previewUrl && (
          <div className="mt-3 w-full max-h-60 overflow-hidden rounded-lg">
            {file.type.startsWith("image/") ? (
              <img src={previewUrl} alt="Preview" className="w-full max-h-60 object-cover" />
            ) : (
              <video controls src={previewUrl} className="w-full max-h-60 object-cover" />
            )}
          </div>
        )}
        <label className="mt-3 flex items-center gap-2 bg-[#3A3B3C] p-2 rounded-lg cursor-pointer text-white text-sm">
          <FaImages className="text-green-400" />
          <span>Agregar foto o video</span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"/>
        </label>

        <button
          type="submit"
          disabled={(!text && !file) || loading}
          className={`w-full mt-3 p-2 rounded-lg font-semibold ${
            text || file ? "bg-blue-500 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
          {loading ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </div>
  );
};
