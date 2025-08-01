import {Routes, Route} from 'react-router-dom';
import './App.css';
import LobbyScreen from './screens/Lobby.jsx';
import RoomPage from './screens/Room.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LobbyScreen />} />
        <Route path='/room/:roomId' element={<RoomPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
