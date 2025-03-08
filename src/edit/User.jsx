import React, { useState, useEffect } from "react";
import { Header } from "../Componentes/Header";
import { supabase } from "../Lib/Supabase";


export const User = () => {
  const [nombre, setNombre] = useState("Cargando...");
  const [apellido, setApellido] = useState("Cargando...");
  const [userData, setUserData] = useState({
    name: "Cargando...",
    perfil: "https://via.placeholder.com/150",
    portada: "https://via.placeholder.com/800x300",
    bio: "Cargando...",
    friends: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData?.session?.user) {
        setNombre("Error al obtener sesión");
        setApellido("Error");
        return;
      }

      const userEmail = sessionData.session.user.email; // Obtener el email del usuario

      // Consultar los datos del usuario en la tabla 'session' por el email
      const { data, error } = await supabase
        .from("session")
        .select("nombre, apellido") // Obtener nombre, apellido, foto_perfil, portada, bio y amigos
        .eq("email", userEmail) // Filtrar por email
        .single(); // Obtener solo un resultado

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

      // Si se encuentran datos, actualizamos el estado
      setNombre(data.nombre || "Usuario sin nombre");
      setApellido(data.apellido || "Usuario sin apellido");

      setUserData({
        name: `${data.nombre} ${data.apellido}`,
        perfil: data.foto_perfil || "https://scontent.fbga2-1.fna.fbcdn.net/v/t39.30808-6/474880126_1317482166054038_692638653519791678_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEEd2c3NxZOxu2XmImHEj9B6fwcD2lV1HTp_BwPaVXUdC_XBcX0dcExMdUbPS70Ucccp_RSk_6g5j3JxvgAXEzI&_nc_ohc=lxPZ25dksMAQ7kNvgFbaGzh&_nc_oc=AdjHheQFOMPWKGFCiVAemt31HFzhkyPFgBeVZ0mxeTYamuQw76ChoHHTuceHCqjl-0py_EfGaFvQU6xsrvXOUQY6&_nc_zt=23&_nc_ht=scontent.fbga2-1.fna&_nc_gid=AGfB2XGuyx6u0G-zEMHujWD&oh=00_AYHh2GRbyDcits-MFCIszf5jHX00hy5wV8BzGNUE0rw9xQ&oe=67D1C57B",
        portada: data.portada || "https://scontent.fbga2-1.fna.fbcdn.net/v/t39.30808-6/473193038_1310187870116801_8427908419221643874_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeFj6SzOa_gx_mrP6ctmLOOtnARX-KPyXU-cBFf4o_JdT7c3wFGIGt03RBPj_VcKkC9RzkYCt7CiuKyeBgEuCpcg&_nc_ohc=Xg91hJEj13kQ7kNvgHaKtXU&_nc_oc=AdhXtFdIxKqcWhAHiAfvmFevNPHkw-m5K2qA3Yf8Ul1PtLTYUJUUfpMny8e5J4-_ep8kDPPl2U8ive5yb_vDSXm2&_nc_zt=23&_nc_ht=scontent.fbga2-1.fna&_nc_gid=AxdPw8RUPAxBq8lBhegXaAc&oh=00_AYGiA8yMeqy5lrNsho3sB6jnltsPOYs9rMsJULYGLGhMrQ&oe=67D19E97",
        bio: data.bio || "ola",
        friends: data.amigos || 0,
      });
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header />
      <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Portada */}
        <div className="relative">
          <img
            src={userData.portada}

            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-[-50px] left-5">
            <img
              src={userData.perfil}

              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>

        {/* Información del usuario */}
        <div className="p-5 mt-12 text-center">
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-gray-600">{userData.bio}</p>
          <p className="text-gray-500 mt-2">{userData.friends} amigos</p>
        </div>

        {/* Botones de interacción */}
        <div className="p-4 flex justify-around border-t">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Agregar amigo</button>
          <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Mensaje</button>
        </div>
      </section>
    </>
  );
};
