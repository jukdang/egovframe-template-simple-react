import { useState } from "react";
import { NavLink } from "react-router-dom";
import { css, styled } from "styled-components";


const AdminNav = styled.nav`
  position: fixed;
	height: 100%;
	width: 260px;
	margin-top: 77px;
	overflow: hidden;
	background: #fff;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, .08);
	transition: .1s;
	opacity: 1;
	z-index: 9999;
  transition: width 0.3s;

  ${props => props.hide && css`
    width: 0;
  `}

  a {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const NavToggle = styled.button`
  position: absolute;
	top: 50%;
	left: 260px;
	transform: translateY(-50%);
	color: #fff;
	background: #9ea3af;
	padding: 12px 6px;
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
	box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.1);
	z-index: 9999;
  transition: left 0.3s;

  i {
    font-size: 15px;
    transition: transform 0.3s;
    ${props => props.hide && css`
      transform: rotate(180deg);
    `}
  }

  ${props => props.hide && css`
    left: 0;
  `}
  `;


const MyNav = () => {
  const pageInfo = {
    "pageSubMenuName": "usage"
  }
  const currentMbrRole = "ROLE_ADMIN";
  const [hide, setHide] = useState(false);

  const adminMenu = {
    "ROLE_ADMIN": [
      [
        { name: "이용 통계", path: "/test/admin/usage" },
        { name: "변화량 통계", path: "/test/admin/usageStatsVariation" }
      ],
      [
        { name: "이용 통계", path: "/test/admin/usage" },
        { name: "변화량 통계", path: "/test/admin/usageStatsVariation" }
      ],
      [
        { name: "메뉴1-1", path: "/test/admin/1-1" },
        { name: "메뉴1-2", path: "/test/admin/1-2" }
      ],
      [
        { name: "메뉴2-1", path: "/test/admin/2-1" },
        { name: "메뉴2-2", path: "/test/admin/2-2" }
      ]
    ]
  }

  return (
    <>
      <AdminNav hide={hide}>
        <div id="gnb">
          <nav>
            {currentMbrRole === "ROLE_ADMIN" && (
              adminMenu[currentMbrRole].map((menuGroup, index) => (
                <ul key={index}>
                  {menuGroup.map((menuItem) => (
                    <NavLink to={menuItem.path} className={({ isActive }) => (isActive ? "cur" : "")}>
                      {menuItem.name}
                    </NavLink>
                  ))}
                </ul>
              ))
            )}

          </nav>
        </div>
      </AdminNav >
      <NavToggle title="닫기" hide={hide} onClick={() => setHide(!hide)}><i className="fas fa-caret-left"></i></NavToggle>

    </>
  );
};
export default MyNav;