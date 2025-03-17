import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { supabase } from '../Lib/Supabase';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await toast.promise(
                supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                }),
                {
                    loading: 'Cargando...',
                    success: 'Inicio de sesión exitoso',
                    error: (err) => `Error: ${err?.message || err}`, // Protegido contra errores inesperados
                }
            );

            // Mostrar respuesta completa en consola para depuración
            console.log("Respuesta Supabase:", data, error);

            if (!error) {
                navigate("/Home");
            } else {
                console.error("Error de Supabase:", error);
            }
        } catch (err) {
            // Manejo de errores que no sean de Supabase
            console.error("Error de autenticación:", err?.message || err);
        }
    };

    return (
        <>
            <Helmet>
                <title>Facebook - Entrar o Registrarse</title>
            </Helmet>

            <main className="bg-gray-100 h-screen flex items-center justify-center">
                <section className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-blue-600 text-5xl font-bold text-center">facebook</h1>
                    <h3 className="text-2xl font-semibold text-center mt-2">Inicia sesión en tu cuenta</h3>
                    <p className="text-gray-500 text-center mt-2">Haz clic en tu foto o añade una cuenta</p>

                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Correo electrónico o número de teléfono"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold mt-4 hover:bg-blue-700 transition"
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    <p className="text-center text-blue-600 mt-4 cursor-pointer hover:underline">
                        ¿Has olvidado la contraseña?
                    </p>

                    <hr className="my-4" />

                    <button
                        onClick={() => navigate('/Register')}
                        className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Crear una cuenta
                    </button>
                </section>
            </main>

            <Toaster position="top-center" />
        </>
    );
};
