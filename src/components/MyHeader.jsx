import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UtilList = styled.ul`
  opacity: 0;
  max-height: 0;
  transition: opacity 0.3s ease, max-height 0.3s ease;

  &.show {
    opacity: 1;
    max-height: 200px; /* 충분히 큰 값으로 설정 */
  }
`;

const MyHeader = () => {
  const username = "username";

  const [utilOpen, setUtilOpen] = useState(false);

  return (
    <header className="admin header" id="header">
      <div id="logo" title="HOME">
        <Link to={"/"}>
          <span>관리자 페이지</span>
        </Link>
      </div>
      <div className="util">

        <div className="user">
          <button className="member_info" type="button" onClick={() => setUtilOpen(!utilOpen)}>
            <i className="fa-solid fa-circle-user"></i>
            <span>{username}</span>
            <i className="fas fa-angle-down"></i>
          </button>
          <div>
            <UtilList className={`list_util ${utilOpen ? "show" : ""}`}>
              <li>
                <Link to={"/"}>일반페이지</Link>
              </li>
              <li>
                <Link to={"/mbr/chkMbrPswdForm"}>회원정보</Link>
              </li>
              <li>
                <Link to="#" className="logout" onClick={() => false}>
                  <em>로그아웃</em>
                </Link>
              </li>
            </UtilList>
          </div>
        </div>
        <div id="btn_bar">
          <div className="ico_bar" title="menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MyHeader;