import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

function App() {
  const [room, setRoom] = useState('');

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState([]);

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  const sendMessage = () => {
    socket.emit('send_message', { message, room });
    setMessage('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      const arr = [...messageReceived, data];
      console.log(arr);
      setMessageReceived(arr);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived?.map((data) => (
        <div>{data?.message}</div>
      ))}
    </div>
  );
}

export default App;

