import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
// const ENDPOINT = 'http://127.0.0.1:80'
const ENDPOINT = 'Websockettest-env.eba-si2mveqx.us-east-2.elasticbeanstalk.com'

let socket;
 
const SocketClient = (props) => {
    const [associateId, setAssociateId] = useState(0);
    const [inputText, setInputText] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        let asctId = 161;
        // let asctId = Math.floor(Math.random() * 3) + 1;
        console.log("my id is : ", props.userId)
        setAssociateId(props.userId);
        socket = socketIOClient(ENDPOINT, {
            transportOptions: {
                polling: {
                  extraHeaders: {
                    'x-clientbook-user-id': props.userId
                  }
                }
              }
            
        });
        socket.emit('msgToServer', 'EYYYY')
        socket.on("FromAPI", data => {
            console.log("from api dat: ", data)
        })
        socket.on(`userJoined`, data => {
            console.log('user joined room? ', data)
        })
        socket.on(`reply`, data => {
            console.log('Reply from server ', data)
        })
        socket.on(`chatMessages`, data => {
            console.log("Message received on chatMessages", data);
            if(Array.isArray(data)) {
                setChatMessages([...data])
            }
        })
        return () => socket.disconnect();
    }, [])

    const sendHello = () => {
        socket.emit("hello", "nothing");
    }

    const sendMessage = () => {
        socket.emit("sendMessage", inputText)
    }

    return (
        <div>
            <input value={inputText} onChange={e => setInputText(e.target.value)}/>
            <button 
                onClick={() => {
                    sendMessage();
                    setInputText("");
                }}
            >
                SEND MESSAGE
            </button>

            <div>
                {chatMessages.map((msg, i) => {
                    return <span style={{display: 'block'}} key={i}>{msg.associateId}: {msg.message}</span>
                })}
            </div>
        </div>
    )
}
export default SocketClient