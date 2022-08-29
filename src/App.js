import {useState} from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';

const socket = io.connect("https://enigmatic-brook-31531.herokuapp.com/")

const App=()=>{
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)


  const joinRoom = ()=>{
    if(username!== "" && room !== ""){
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat ?(
        <div className='joinChatContainer'>
          <h2>Unete a a la conversacion: Hubmine</h2>
          <input 
            type="text" 
            placeholder="Tu nombre.." 
            onChange={(e)=>{
              setUsername(e.target.value)
          }} />
          <input 
            type="text"   
            placeholder="Room id" 
            onChange={(e)=>{
              setRoom(e.target.value)
          }} />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
        ):(
        <Chat socket= {socket} username={username} room = {room} />
      )}
    </div>
  );
}

export default App;
