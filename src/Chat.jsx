// src/Chat.js
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig.js';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import './index.css'; // Import the CSS file

const Chat = ({username}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input) {
      await addDoc(collection(db, 'messages'), {
        text: input,
        timestamp: new Date(),
        userId: username 
      });
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message-bubble ${message?.userId === username ? 'mine' : 'theirs'}`}
          >
            <p>{message?.userId }</p>
             <p>{message?.text} </p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message" 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
