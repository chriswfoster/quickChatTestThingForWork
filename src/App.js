import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SocketClient from './socketClient';
import UserIdPrompt from './UserIdPrompt';

function App() {
  const [userId, setUserId] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {userId ? <p>Send a message:</p> : ''}
        {userId ? 
          <SocketClient userId={userId}/> :
          <UserIdPrompt userId={userId} setUserId={setUserId}/>
        }
      </header>
    </div>
  );
}

export default App;
