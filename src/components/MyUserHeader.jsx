import { Link } from "react-router-dom";

const MyUserHeader = () => {
  const pageInfo = {
    "pageMenuName": "operation",
    "pageSubMenuName": "report"
  }
  const currentMbrRole = "ROLE_ADMIN";
  const username = "username";

  return (
    <header className="header" id="header">
      <div className="header_left">
        <a className="menu-trigger mobile_btn" href="#">
          <span></span>
          <span></span>
          <span></span>
        </a>
        <div id="logo" title="메인 페이지로 이동">
          <Link to={currentMbrRole === 'ROLE_MECHANIC' ? '/vehicle/diagnosisRealtime' : '/'}>
            <span>광주 시내버스 관제</span>
          </Link>
        </div>
      </div>

      <nav className="top_menu">
        <ul>
          <li className={pageInfo.pageSubMenuName === 'report' ? 'on' : ''}>
            <Link to="/operation/driverList">운전습관 리포트</Link>
          </li>
          <li className={pageInfo.pageSubMenuName === 'aiReport' ? 'on' : ''}>
            <Link to="/operation/aiReportList">AI + 리포트</Link>
          </li>
          <li className={pageInfo.pageSubMenuName === 'drivingLog' ? 'on' : ''}>
            <Link to="/operation/drivingLogList">운행 일지</Link>
          </li>
          <li className={pageInfo.pageSubMenuName === 'status' ? 'on' : ''}>
            <Link to="/operation/routeOprHist">운행현황판</Link>
          </li>
        </ul>

      </nav>

      <div className="user">
        <a className="member_info" href="#">
          <i className="fa-solid fa-circle-user"></i>
          <em><span>{username}</span> 님</em>
          <i className="fas fa-angle-down"></i>
        </a>


        <div className="pop_util">
          <ul className="list_util">
            <li>
              <a href="/mbr/chkMbrPswdForm"><i className="fa-solid fa-user"></i>마이페이지</a>
            </li>
            {currentMbrRole === 'ROLE_ADMIN' && (
              <li>
                <Link to="/admin"><i className="fas fa-cog"></i>관리자 페이지</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};
export default MyUserHeader;