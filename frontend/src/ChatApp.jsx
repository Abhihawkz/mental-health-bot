import React, { useState } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', text: userMessage },
    ]);

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const modelMessage = data.response;

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', text: modelMessage },
      ]);
      setUserMessage(""); 
    } catch (error) {
      console.error('Error communicating with the server:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Mental Health Assistant</h1>
        <div className="space-y-4 h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-300 text-black self-start'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-4">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask me anything..."
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
