// src/App.js
import React from 'react';
import Chat from './Chat';
import {useState} from 'react'
import './index.css'

const App = () => {

  const [input, setInput] = useState('');
  const [username, setUsername] = useState('')

  return (
    <div>
      <h1>Real-time Chat App</h1>
      <h3> HI! {username}, send a message now</h3>
      {username === "" && 
      <div className="nameContainer">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="enter your username" 
        /> 
        <button onClick={() => {
          setUsername(input)
          setInput('')
        }}>ADD NAME</button>
      </div> }
      
      
      {username !== "" && <Chat username={username} />} 
    </div>
  );
};

export default App;
