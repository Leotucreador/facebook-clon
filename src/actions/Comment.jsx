import { useState, useEffect } from "react";
import { supabase } from "../Lib/Supabase";
import { FaRegComment } from "react-icons/fa";

export const Comment = ({ postsid }) => {
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  console.log("ID del post recibido:", postsid); // Verificar si postsid tiene valor

  useEffect(() => {
    const cargarComentarios = async () => {
      if (!postsid) {
        console.error("postsid no está definido");
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select("comentarios")
        .eq("id", postsid)
        .single();

      if (error) {
        console.error("Error al cargar comentarios:", error);
        return;
      }

      setComentarios(data?.comentarios || []);
    };

    if (isOpen) cargarComentarios();
  }, [postsid, isOpen]);

  const enviarComentario = async (e) => {
    e.preventDefault();
    if (!comentario.trim()) return;
    if (!postsid) {
      console.error("No se puede enviar el comentario porque postsid es undefined");
      return;
    }

    const nuevosComentarios = [...comentarios, comentario];

    const { error } = await supabase
      .from("posts")
      .update({ comentarios: nuevosComentarios })
      .eq("id", postsid);

    if (error) {
      console.error("Error al enviar comentario:", error);
      return;
    }

    setComentario("");
    setComentarios(nuevosComentarios);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-400 hover:text-white">
        <FaRegComment /> Comentar
      </button>

      <div
        className={`absolute left-0 w-full bg-gray-800 rounded-lg p-3 transition-all duration-300 ${
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}>
        <form onSubmit={enviarComentario} className="flex items-center gap-2">
          <input
            type="text"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-70z0 text-white"
            placeholder="Escribe un comentario..."
          />
          <button type="submit" className="bg-blue-500 px-3 py-1 rounded text-white">
            ➤
          </button>
        </form>

        <div className="mt-2 space-y-2 max-h-[200px] overflow-y-auto">
          {comentarios.map((comment, index) => (
            <div key={index} className="p-2 bg-gray-700 rounded">
              <p className="text-white">{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
