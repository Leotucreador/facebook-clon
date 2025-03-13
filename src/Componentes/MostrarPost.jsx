import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import ReactPlayer from "react-player";
import { Comment } from "../actions/Comment";
import { Reacts } from "../actions/Reacts";
import { Share } from "../actions/Share";
import { supabase } from "../Lib/Supabase";
import { Option } from "../popup/Option";
import { History } from "../edit/History";

export function MostrarPost() {
  const [posts, setPosts] = useState([]);
  const [opciones, setopciones] = useState(false);
  const [imagen, setimagen] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("No se encuentran publicaciones disponibles", error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();

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
      <History/>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="bg-[#252728] text-amber-50 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-800"></div>
              <div className="flex justify-between flex-1">
                <div className="flex flex-col">
                  <h3 className="font-semibold">{post.usuario}</h3>
                  <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center text-white space-x-2 text-2xl gap-2">
                  <button className="text-2xl" onClick={() => setopciones(true)}>
                    <BsThreeDots />
                  </button>
                  <button>
                    <IoClose />
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-4 text-lg">{post.texto}</p>

            {post.imagen && (
              <div className="w-full flex justify-center items-center mt-3">
                <img
                  src={post.imagen}
                  alt="Publicación"
                  className="w-full h-auto max-h-[500px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px] xl:max-h-[550px] object-contain rounded-lg cursor-pointer"
                  onClick={() => setimagen(post.imagen)} 
                />
              </div>
            )}

            {post.video && (
              <div className="mt-3">
                <ReactPlayer url={post.video} controls={true} width="100%" height="auto" />
              </div>
            )}

            <div className="flex justify-around items-center gap-1.5 mt-3">
              <Reacts postsid={post.id} />
              <Comment postsid={post.id} />
              <Share postId={post.id} usuario={post.usuario} texto={post.texto} imagen={post.imagen} video={post.video} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No hay publicaciones disponibles</p>
      )}
      {opciones && <Option ola={opciones} cerrar={() => setopciones(false)} />}

      {imagen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50" onClick={() => setimagen(null)}>
          <img src={imagen} alt="Imagen ampliada" className="max-w-full max-h-full rounded-lg" />
          <button className="absolute top-5 right-5 text-white text-3xl" onClick={() => setimagen(null)}>
            <IoClose />
          </button>
        </div>
      )}
    </div>
  );
}
