import React, { useState, useCallback, useEffect } from 'react';
// import { useSocket } from '../context/SocketProvider';
import { useSocket } from '../context/SocketProvider';
import ReactPlayer from 'react-player';

// import { useSocket } from 'C:\Users\GAGAN\Documents\contrarian\delta\delta_hackathon\client\src\context\SocketProvider.jsx';

const RoomPage = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();

    const handleCallingUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMyStream(stream); 
    }, []); 

    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`The email ${email} joined`);
        setRemoteSocketId(id);
    })

    useEffect(() => {
        socket.on('user.joined', handleUserJoined);

        return () => {
            socket.off('user.joined', handleUserJoined)
        };
    }, [socket, handleUserJoined]);

    return (
        <div>
            <h1>RoomPage</h1>
            <h4>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>
            {
                remoteSocketId && <button onClick={handleCallingUser}>Call</button>
            }
            {
                myStream && <ReactPlayer url={myStream}/>
            }
        </div>
    )
}

export default RoomPage;