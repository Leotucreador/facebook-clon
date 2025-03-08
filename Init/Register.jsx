import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../src/Lib/Supabase";

export const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    apellido: "",
    email: "",
    password: "",
    phone: "",
    dia: "",
    mes: "",
    ano: "",
    genero: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const currentYear = new Date().getFullYear();
  const años = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const mesNumero = (meses.indexOf(formData.mes) + 1).toString().padStart(2, "0");
    const diaNumero = formData.dia.toString().padStart(2, "0");
    const fechaNacimiento = `${formData.ano}-${mesNumero}-${diaNumero}`;
    
    try {
      // Crear usuario en Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      if (authError) {
        setError(authError.message);
        alert("Error: " + authError.message);
        return;
      }

      // Obtener ID del usuario registrado
      const userId = data?.user?.id;
      if (!userId) {
        setError("No se pudo obtener el ID del usuario.");
        return;
      }

      // Insertar datos en la tabla 'sessions'
      const { error: dbError } = await supabase.from("session").insert([
        {
          nombre: formData.userName,
          apellido: formData.apellido,
          email: formData.email,
          password: formData.password, // ⚠️ Evita almacenar contraseñas en texto plano ⚠️
          telefono: formData.phone,
          genero: formData.genero,
        },
      ]);

      if (dbError) {
        setError(dbError.message);
        alert("Error: " + dbError.message);
        return;
      }

      alert("Registrado exitosamente!");
      navigate("/");
    } catch (err) {
      setError("Hubo un problema al registrar tu cuenta.");
      alert("Error: Hubo un problema al registrar tu cuenta.");
    }
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen bg-gray-100">
      <h1 className="text-6xl my-9 font-bold text-center text-blue-600">Facebook</h1>
      <div className="bg-white-100 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-center mt-2">Crea una cuenta</h2>
        <p className="text-sm text-center text-gray-600">Es rápido y fácil.</p>
        <form onSubmit={handleRegister}>
          <input type="text" name="userName" placeholder="Nombre" value={formData.userName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mt-3" />
          <input type="text" name="apellido" placeholder="Apellidos" value={formData.apellido} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mt-3" />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mt-3" />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mt-3" />
          <input type="tel" name="phone" placeholder="Número de móvil" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mt-3" />
          <div className="mt-3 grid grid-cols-3 gap-3">
            <select name="dia" value={formData.dia} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg">
              {dias.map((day) => <option key={day} value={day}>{day}</option>)}
            </select>
            <select name="mes" value={formData.mes} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg">
              {meses.map((month) => <option key={month} value={month}>{month}</option>)}
            </select>
            <select name="ano" value={formData.ano} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg">
              {años.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div className="mt-3 flex justify-between">
            <label className="flex items-center space-x-2">
              <input type="radio" name="genero" value="Mujer" onChange={handleChange} className="w-4 h-4" />
              <span>Mujer</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="genero" value="Hombre" onChange={handleChange} className="w-4 h-4" />
              <span>Hombre</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="genero" value="Personalizado" onChange={handleChange} className="w-4 h-4" />
              <span>Personalizado</span>
            </label>
          </div>
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold mt-4 hover:bg-green-700">Registrarte</button>
        </form>
        <Link to="/" className="text-center text-blue-600 mt-4 cursor-pointer hover:underline block">¿Ya tienes una cuenta?</Link>
      </div>
    </div>
  );
};
