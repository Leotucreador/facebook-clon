import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../Componentes/Header';

const Watch = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://magicloops.dev/api/loop/96252791-ce2a-4e79-9c06-db165b4a5ddc/run', {
          params: {
            input: '$YOUTUBE_API_KEY',
            key: 'leo123',
          },
        });
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error al obtener los videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <p>Cargando videos...</p>;
  }

  return (
    <>
    <Header />
    <div>
      <h2>Videos relacionados con React</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en solicitudes
            </a>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Watch;
