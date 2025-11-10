import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import BackBtn from "./components/back.jsx";
import ChatForm from "./components/chatForm";
import HowToEnterSelect from "./components/howToEnterSelect";
import RoomCreateForm from "./components/roomCreateForm";
import RoomEnterForm from "./components/roomEnterForm";
import Header from "./layout/header.jsx";



const Chat = () => {

  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const stompClientRef = useRef(null);


  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);``
  const [connect, setConnect] = useState(false);

  const [howToEnter, setHowToEnter] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {

    if (!connect || stompClientRef.current) return;

    const socket = new SockJS("http://172.30.1.30:8080/ws");
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

  const EnterChat = () => {
    fetch(`/api/chat/room/join?name=${roomName}`, {
      method: "GET",
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((data) => {
      setRoomId(data.roomId);
      setConnect(true);
    })
      .catch(() => {
      toast.error("입장할 수 없습니다."); 
    });

  }

  

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      {!start &&
        <>
          <div className="form-container flex flex-col gap-10 justify-center items-center">
            {!howToEnter &&
              <HowToEnterSelect userName={userName} setUserName={setUserName} setHowToEnter={setHowToEnter} />
            }
            {howToEnter == "CREATE" &&
              <RoomCreateForm roomName={roomName} userName={userName} setRoomName={setRoomName} createChat={createChat} backClick={() => setHowToEnter(false)} />
            }
            {howToEnter == "JOIN" &&
              <RoomEnterForm roomName={roomName} userName={userName} setRoomName={setRoomName} createChat={EnterChat} backClick={() => setHowToEnter(false)} />
            }
            
          </div>
        </>
      }

      {start &&
          <>
          <div className="flex flex-col">
            <div className="relative">
              <h2>방 제목: {roomName}</h2>
              <h2>닉네임: {userName}</h2>
              <div className="absolute top-0 right-0">
                <BackBtn onClick={() => setStart(false)} />
            </div>
            </div>
            <div>
              <ChatForm messages={messages} roomName={roomName} roomId={roomId} userName={userName} stompClientRef={stompClientRef} />
            </div>
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
        
        </div>
    </>
  );
};


export default Chat;