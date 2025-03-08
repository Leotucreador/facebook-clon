import React, { useState } from "react";
import { FaShare } from "react-icons/fa6";
import { supabase } from "../Lib/Supabase";

export const Share = ({ postId, usuario, texto, imagen, video }) => {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!postId) return;
    setLoading(true);

    const { error } = await supabase.from("posts").insert([
      {
        created_at: new Date(),
        usuario,
        texto: `📢 ${usuario} compartió una publicación: "${texto}"`,
        imagen,
        video,
        original_post_id: postId, // Guardamos referencia a la publicación original
      },
    ]);

    setLoading(false);
    if (error) {
      console.error("❌ Error al compartir:", error);
    } else {
      console.log("✅ Publicación compartida con éxito.");
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={loading}
      className="flex items-center gap-2 text-gray-400 hover:text-white"
    >
      <FaShare />
      <span>{loading ? "Compartiendo..." : "Compartir"}</span>
    </button>
  );
};
