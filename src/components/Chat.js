import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onChildAdded } from 'firebase/database';
import { firebaseConfig } from '../firebase/firebase';

// Utility function to format timestamp
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export default function Chat() {
  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  // State management
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  // Effect to listen for new messages
  useEffect(() => {
    const messagesRef = ref(database, 'messages');

    // Listen for new child messages
    const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
      const newMessage = {
        id: snapshot.key,
        ...snapshot.val(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [database]);

  // Handler for setting username
  const handleSetUsername = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setIsUsernameSet(true);
    }
  };

  // Handler for sending messages
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (inputMessage.trim() === '') return;

    const messagesRef = ref(database, 'messages');

    // Push new message to Firebase
    push(messagesRef, {
      text: inputMessage,
      username: username,
      timestamp: Date.now(),
    });

    // Clear input after sending
    setInputMessage('');
  };

  // Username input form
  if (!isUsernameSet) {
    return (
      <div className='username-setup'>
        <form onSubmit={handleSetUsername}>
          <input
            type='text'
            placeholder='Enter Your Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type='submit'>Set Username</button>
        </form>
      </div>
    );
  }

  return (
    <div className='chat'>
      <div className='chat-header'>
        <span>Logged in as: {username}</span>
      </div>
      <div className='chat-dis'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.username === username ? 'message-right' : 'message-left'
            }`}>
            <div className='message-content'>
              {message.username !== username && (
                <span className='message-username'>{message.username}: </span>
              )}
              <span className='message-text'>{message.text}</span>
              {message.username === username && (
                <span className='message-username-self'>
                  {message.username}
                </span>
              )}
            </div>
            <span className='message-time'>
              {formatTime(message.timestamp)}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className='chat-input'>
        <input
          type='text'
          placeholder='Enter Message'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type='submit'>↑</button>
      </form>

      <style jsx>{`
        .chat-dis {
          height: 500px;
          width: 90%;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          padding: 10px;
          border-radius: 20px;
          background-color: white;
        }
        .message {
          max-width: 70%;
          margin: 5px 0;
          padding: 10px;
          border-radius: 10px;
          clear: both;
        }
        .message-time {
          font-size: 0.7em;
          color: rgba(0, 0, 0, 0.5);
          align-self: flex-end;
        }
        .message-right .message-time {
          color: rgba(255, 255, 255, 0.7);
        }
        .message-left {
          background-color: #f1f0f0;
          align-self: flex-start;
          margin-right: auto;
        }
        .message-right {
          background-color: #007bff;
          color: white;
          align-self: flex-end;
          margin-left: auto;
          text-align: right;
        }
        .message-username {
          font-weight: bold;
          margin-right: 5px;
          color: #333;
        }
        .message-username-self {
          font-size: 0.8em;
          margin-left: 5px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
