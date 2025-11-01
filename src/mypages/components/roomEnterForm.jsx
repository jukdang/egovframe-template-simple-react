import React from 'react';
import styled from 'styled-components';


const RoomEnterForm = ({ roomName, userName, setUserName, setRoomName, createChat }) => {

      return (
    <StyledWrapper>
      <div className="card">
        <span className="card__title">방 입장하기</span>
        <p className="card__content">방 이름과 닉네임을 입력하고 방에 입장해보세요.</p>
        <div className="card__form">
          <input placeholder="Your Name" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input placeholder="Room Name" type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          <button className="submit-btn" onClick={createChat}>방 입장하기</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 240px;
    height: 254px;
    padding: 0 15px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    background: #fff;
    border-radius: 20px;
  }

  .card > * {
    margin: 0;
  }

  .card__title {
    font-size: 23px;
    font-weight: 900;
    color: #333;
  }

  .card__content {
    font-size: 13px;
    line-height: 18px;
    color: #333;
  }

  .card__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card__form input {
    margin-top: 10px;
    outline: 0;
    background: rgb(255, 255, 255);
    box-shadow: transparent 0px 0px 0px 1px inset;
    padding: 0.6em;
    border-radius: 14px;
    border: 1px solid #333;
    color: black;
  }

  .card__form button {
    border: 0;
    background: #111;
    color: #fff;
    padding: 0.68em;
    border-radius: 14px;
    font-weight: bold;
  }

  .submit-btn:hover {
    opacity: 0.8;
  }`;


export default RoomEnterForm;