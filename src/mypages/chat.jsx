import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import styled from 'styled-components';
import ChatForm from "./components/chatForm";
import RoomEnterForm from "./components/roomEnterForm";
import RoomCreateForm from "./components/roomCreateForm";



const Chat = () => {

  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const stompClientRef = useRef(null);


  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [connect, setConnect] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {

    if (!connect || stompClientRef.current) return;

    const socket = new SockJS("http://localhost:8081/ws");
    const stompClient = over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/room/${roomId}`,
        (msg) => {
          const body = JSON.parse(msg.body);
          setMessages((prev) => [...prev, body]);
        },
        (error) => {
          console.error("STOMP error:", error);
        });

    });
    stompClientRef.current = stompClient;

    setStart(true);

    return () => {
      if (stompClientRef.current) stompClientRef.current.disconnect();
    };
  }, [connect]);



  const createChat = () => {
    fetch(`/api/chat/room/create?name=${roomName}`, {
      method: "POST",

    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((data) => {
      setRoomId(data.roomId);
      setConnect(true);
    });

  };

  

  return (
    <>
      {!start &&
        <>
          <div className="form-container flex flex-col gap-10 justify-center items-center">
            <RoomCreateForm roomName={roomName} userName={userName} setUserName={setUserName} setRoomName={setRoomName} createChat={createChat} />
            <RoomEnterForm roomName={roomName} userName={userName} setUserName={setUserName} setRoomName={setRoomName} createChat={createChat} />
          </div>
        </>
      }

      {start &&
        <>
          <div>
            <h2>Chat Room: {roomName} (ID: {roomId})</h2>
            <h2>userName: {userName}</h2>
          </div>
          <div>
            <ChatForm messages={messages} roomName={roomName} roomId={roomId} userName={userName} stompClientRef={stompClientRef} />
          </div>
          {/* <div>
            <div className="chat-box">
              {messages.map((msg, i) => (
                <div key={i}><b>{msg.sender}</b>: {msg.message}</div>
              ))}
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div> */}
        </>
      }
    </>
  );
};




const StyledBtnWrapper = styled.div`
  .button {
    position: relative;
    overflow: hidden;
    height: 3rem;
    padding: 0 2rem;
    border-radius: 1.5rem;
    background: #3d3a4e;
    background-size: 400%;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  .button:hover::before {
    transform: scaleX(1);
  }

  .button-content {
    position: relative;
    z-index: 1;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    width: 100%;
    height: inherit;
    border-radius: inherit;
    background: linear-gradient(
      82.3deg,
      rgba(150, 93, 233, 1) 10.8%,
      rgba(99, 88, 238, 1) 94.3%
    );
    transition: all 0.475s;
  }`;

export default Chat;