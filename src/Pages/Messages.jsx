import React from 'react';
import { Header } from '../Componentes/Header';

export const Messages = () => {
  const chats = [
    { id: 1, name: 'Dianna', lastMessage: 'Hola, ¿cómo estás?', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Carlos', lastMessage: 'Nos vemos mañana.', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Laura', lastMessage: 'Te envié el archivo.', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  const messages = [
    { id: 1, sender: 'me', text: '¡Hola! ¿Todo bien?' },
    { id: 2, sender: 'other', text: '¡Sí! ¿Y tú?' },
    { id: 3, sender: 'me', text: 'Todo perfecto, gracias.' },
  ];

  return (
    <>
      <Header />
      <div className="flex h-[90vh]">
        {/* Sidebar de chats */}
        <div className="w-1/4 border-r overflow-y-auto bg-white">
          <div className="p-4 border-b text-lg font-bold">Chats</div>
          {chats.map(chat => (
            <div key={chat.id} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <div className="font-semibold">{chat.name}</div>
                <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="p-4 border-b flex items-center">
            <img src={chats[0].avatar} alt={chats[0].name} className="w-10 h-10 rounded-full mr-3" />
            <div className="font-semibold">{chats[0].name}</div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg max-w-xs ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 border rounded-full outline-none"
            />
            <button className="ml-2 px-4 bg-blue-500 text-white rounded-full">Enviar</button>
          </div>
        </div>
      </div>
    </>
  );
};
