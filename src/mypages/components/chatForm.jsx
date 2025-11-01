import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const ChatForm = ({ messages, roomName, roomId, userName, stompClientRef}) => {


  const [chatInput, setChatInput] = useState("");

  const sendMessage = () => {
    const client = stompClientRef.current;

    const message = {
      roomName,
      sender: userName,
      message: chatInput,
      type: "TALK",
    };
    client.send(`/app/chat.send/${roomId}`, {}, JSON.stringify(message));


    setChatInput("");
  };

  


  return (
    <StyledWrapper>
      <div className="card">
        <div className="chat-header">Chat</div>
        <div className="chat-window">
          <ul className="message-list">
            {messages.map((msg, i) => (
                <div key={i}><b>{msg.sender}</b>: {msg.message}</div>
              ))}
          </ul>
        </div>
        <div className="chat-input">
          <input type="text" className="message-input" placeholder="Type your message here"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}/>
          <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 260px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .chat-header {
    background-color: #333;
    color: #fff;
    padding: 10px;
    font-size: 18px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .chat-window {
    height: 220px;
    overflow-y: scroll;
  }

  .message-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ccc;
  }

  .message-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 5px;
    font-size: 14px;
  }

  .send-button {
    border: none;
    outline: none;
    background-color: #333;
    color: #fff;
    font-size: 14px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .send-button:hover {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }`;

export default ChatForm;
