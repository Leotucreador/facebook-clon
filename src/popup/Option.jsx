import React, { useRef, useEffect } from 'react';
import { FaRegWindowClose, FaSave } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { IoCodeSlash } from "react-icons/io5";
import { MdAppBlocking, MdOutlineWatchLater } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";

export const Option = ({ listo, cerrar }) => {
    const menudesplegable = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menudesplegable.current && !menudesplegable.current.contains(event.target)) {
                cerrar();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cerrar]);

    if (listo) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div ref={menudesplegable} className="bg-white w-72 p-4 rounded-lg shadow-lg border border-gray-200 relative">
                {/* Botón para cerrar */}
                <button 
                    onClick={cerrar} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                    <VscChromeClose size={20} />
                </button>

                <section className="flex flex-col space-y-2">
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"><FaSave /> Guardar Publicación</button>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"><IoIosNotifications /> Activar notificaciones</button>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"><IoCodeSlash /> Insertar</button>
                    <hr className="border-gray-300" />
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"><FaRegWindowClose /> Ocultar publicación</button>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"><MdOutlineWatchLater /> Ocultar a usuario 30 días</button>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"><RiCloseCircleFill /> Dejar de seguir usuario</button>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"><GoReport /> Reportar publicación</button>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"><MdAppBlocking /> Bloquear usuario</button>
                </section>
            </div>
        </div>
    );
};
