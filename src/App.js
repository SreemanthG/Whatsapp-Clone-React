import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js'
import axios from './axios'

function App() {

  const [messages,setMessages]=useState([])
  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      setMessages(response.data)
    })
  }, [])
  useEffect(() => {
    var pusher = new Pusher('466cd20be118a3f986af', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
    <div className="app_body"> 
      {/* Sidebar */}
      <Sidebar />
      {/* Chat Component*/}
      <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
