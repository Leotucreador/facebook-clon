import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaComment, FaShare, FaThumbsUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ReactPlayer from "react-player";
import { supabase } from "../Lib/Supabase";
import { Option } from "../popup/Option";

export function MostrarPost() {
  const [posts, setPosts] = useState([]);
  const [showOption, setShowOption] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al obtener publicaciones:", error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();

    // Suscribirse a nuevos posts en tiempo real
    const subscription = supabase
      .channel("realtime_posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          setPosts((prevPosts) => [payload.new, ...prevPosts]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="bg-[#252728] p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-800"></div>
              <div className="flex justify-between flex-1">
                <div className="flex flex-col">
                  <h3 className="font-semibold">{post.usuario}</h3>
                  <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2 text-2xl gap-2">
                  <button className="text-2xl" onClick={() => setShowOption(true)}>
                    <BsThreeDots />
                  </button>
                  <button>
                    <IoClose />
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-4 text-lg">{post.texto}</p>

            {post.imagen && <img src={post.imagen} alt="Publicación" className="w-full mt-3 rounded-lg" />}
            {post.video && <ReactPlayer url={post.video} controls={true} width="100%" height="auto" />}

            <div className="flex space-x-6 mt-4 text-gray-600">
              <div className="flex items-center space-x-2 cursor-pointer">
                <FaThumbsUp />
                <span>Me gusta</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <FaComment />
                <span>Comentar</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <FaShare />
                <span>Compartir</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No hay publicaciones aún.</p>
      )}

      {showOption && <Option ola={showOption} cerrar={() => setShowOption(false)} />}
    </div>
  );
}
