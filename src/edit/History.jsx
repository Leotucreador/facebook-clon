import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Plus } from "lucide-react";
import { supabase } from "../Lib/Supabase";


export const History = () => {
  const [historias, sethistorias] = useState([]);

  useEffect(() => {
    const fetchhistorias = async () => {
      const { data, error } = await supabase.storage.from("history").list("", {
        limit: 10,
        sortBy: { column: "created_at", order: "desc" },
      });

      if (error) {
        console.error("Error al obtener historias:", error);
      } else {
        sethistorias(data);
      }
    };

    fetchhistorias();
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const filePath = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("history").upload(filePath, file);

    if (error) {
      console.error("Error al subir historia:", error);
    } else {
      sethistorias((prev) => [{ name: filePath }, ...prev]);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={"auto"}
        className="flex"
      >
        <SwiperSlide className="w-24">
          <label className="relative block cursor-pointer">
            <img
              src="https://via.placeholder.com/100"
              alt="Crear historia"
              className="w-24 h-32 object-cover rounded-lg"
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <Plus className="w-8 h-8 bg-blue-500 text-white rounded-full p-1" />
            </div>
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        </SwiperSlide>

        {historias.map((story) => (
          <SwiperSlide key={story.name} className="w-24">
            <img
              src={`${supabaseUrl}/storage/v1/object/public/history/${story.name}`}
              alt="Historia"
              className="w-24 h-32 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
