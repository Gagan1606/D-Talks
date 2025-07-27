// import React, { useState, useCallback, useEffect } from 'react';
// // import { useSocket } from './context/SocketProvider.jsx';
// import { useSocket } from '../context/SocketProvider';

// import {useNavigate} from 'react-router-dom';
// const LobbyScreen = () => {

//     const [email, setEmail] = useState('');
//     const [room, setRoom] = useState('');

//     const socket = useSocket();
//     const navigate = useNavigate();

//     const handleSubmitForm = useCallback((e) => {
//         e.preventDefault();
//         socket.emit('room:join', {email, room});
//         console.log({ email, room });
//     }, []);

//     const handleRoomJoin = useCallback((data)=>{
//         const {email, room} = data;
//         navigate(`/room/${room}`);
//     }, [navigate]);

//     useEffect(()=>{
//         socket.on('room:join', data => {
//             console.log(`data from backend : ${data}`);
//         });
//     }, [socket]);

//     return <div>
//         <h1>Lobby</h1>
//         <form>
//             <label htmlFor='email'>Email Id</label>
//             <input id='email' value={email} onChange={e => setEmail(e.target.value)}></input>
//             <br></br>
//             <label htmlFor='room'>Room</label>
//             <input id='room' value={room} onChange={e => setRoom(e.target.value)}></input>
//             <br></br>
//             <button>Join</button>
//         </form>
//     </div>
// };


// export default LobbyScreen;


import React, { useState, useCallback, useEffect } from 'react';
import { useSocket } from '../context/SocketProvider';
import { useNavigate } from 'react-router-dom';

const LobbyScreen = () => {
    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');
    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        if (socket) {
            socket.emit('room:join', { email, room });
            console.log({ email, room });
        }
    }, [email, room, socket]);

    const handleRoomJoin = useCallback((data) => {
        const { email, room } = data;
        navigate(`/room/${room}`);
    }, [navigate]);

    useEffect(() => {
        if (!socket) return;

        socket.on('room:join', handleRoomJoin);

        return () => {
            socket.off('room:join', handleRoomJoin);
        };
    }, [socket, handleRoomJoin]);

    return (
        <div>
            <h1>Lobby</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor='email'>Email Id</label>
                <input id='email' value={email} onChange={e => setEmail(e.target.value)} />
                <br />
                <label htmlFor='room'>Room</label>
                <input id='room' value={room} onChange={e => setRoom(e.target.value)} />
                <br />
                <button type="submit">Join</button>
            </form>
        </div>
    );
};

export default LobbyScreen;
