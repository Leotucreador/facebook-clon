import { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { supabase } from "../Lib/Supabase";

export function Reacts({ postsid }) {
  const [reaccion, setReaccion] = useState(null);
  const [mostrarReacciones, setMostrarReacciones] = useState(false);

  const reacciones = [
    { tipo: "me gusta", icono: "👍"},
    { tipo: "me encanta", icono: "❤️"},
    { tipo: "me divierte", icono: "😂"},
    { tipo: "me asombra", icono: "😲"},
    { tipo: "me entristece", icono: "😔"},
    { tipo: "me enoja", icono: "😡"},
  ];

  useEffect(() => {
    const reaccionGuardada = localStorage.getItem(`reaccion_${postsid}`);
    if (reaccionGuardada) {
      setReaccion(reaccionGuardada);
    }
  }, [postsid]);

  const enviarReaccion = async (tipo) => {
    if (!postsid) {
      console.error("No se puede enviar la reacción porque postsid es undefined");
      return;
    }

    const nuevaReaccion = reaccion === tipo ? null : tipo; // Si ya existe, se elimina

    setReaccion(nuevaReaccion);
    setMostrarReacciones(false);

    if (nuevaReaccion) {
      localStorage.setItem(`reaccion_${postsid}`, nuevaReaccion);
    } else {
      localStorage.removeItem(`reaccion_${postsid}`);
    }

    const { error } = await supabase
      .from("posts")
      .update({ reactions: nuevaReaccion })
      .eq("id", postsid);

    if (error) {
      console.error("Error al guardar la reacción:", error);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setMostrarReacciones(!mostrarReacciones)}
        className="px-3 py-1 rounded-lg flex items-center gap-2 bg-gray-700 text-white"
      >
        {reaccion ? (
          <span>
            {reacciones.find((r) => r.tipo === reaccion)?.icono}
          </span>
        ) : (
          <FaThumbsUp />
        )}
        <span>Reaccionar</span>
      </button>

      {mostrarReacciones && (
        <div className="absolute bottom-full left-0 flex gap-2 p-2 bg-gray-800 rounded-lg transition-opacity duration-300">
          {reacciones.map(({ tipo, icono }) => (
            <button
              key={tipo}
              onClick={() => enviarReaccion(tipo)}
              className="text-2xl hover:scale-125 transition-transform duration-200"
            >
              {icono}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
