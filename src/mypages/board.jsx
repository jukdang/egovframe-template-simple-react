import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Paging from "./components/paging";
import Header from "./layout/header";

const Board = ({ ctgry = "all" }) => {
  const categoryMap = {
    ntc: "공지사항",
    sample: "샘플",
    all: "게시물",
  };

  const [totalRecordCount, setTotalRecordCount] = useState(0);
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [boardList, setBoardList] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    currentPageNo: 1,
    recordCountPerPage: 10,
    totalRecordCount: 0,
  });

  const getBoardList = async (page = 1) => {
    const res = await fetch(`/api/bbs/bbsList?ctgry=${ctgry}&page=${page}&searchType=${searchType}&searchKeyword=${searchKeyword}`);
    const body = await res.json();
    setBoardList(body.data.list);
    setPaginationInfo(body.data.paginationInfo);
    setTotalRecordCount(body.data.paginationInfo.totalRecordCount);
  };

  useEffect(() => {
    getBoardList();
  }, []);

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        {/* container : S */}
        <div id="container" className="scrollBar">
          {/* 메인 컨텐츠 */}
          <div className="contents board">
            <div className="wrapper">
              <div className="tit_wrap">
                <h1>{categoryMap[ctgry]}</h1>
              </div>
              <section className="board notice">
                {/* 검색 폼과 페이징을 위한 폼 */}
                <div id="listForm" name="listForm">
                  <div className="stit_wrap tit_search">
                    <div className="board_search">
                      <select name="searchType" className="" id="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option value="all">전체</option>
                        <option value="ttl">제목</option>
                        <option value="cn">내용</option>
                      </select>
                      <div className="set_search">
                        <input
                          type="text"
                          name="searchKeyword"
                          id="searchKeyword"
                          placeholder="검색어를 입력하세요."
                          value={searchKeyword}
                          onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button
                          className="btn mid mcolor"
                          onClick={() => {
                            getBoardList();
                          }}>
                          검색
                        </button>
                      </div>
                    </div>
                    <em>
                      총<b id="totalRecordCount">{totalRecordCount}</b>건
                    </em>
                  </div>
                </div>

                <div className="wh_box">
                  <div className="tbl_box scrollBar">
                    <table className="tbl02">
                      <caption>카테고리ID, 카테고리명, 사용여부, Description, 등록자 표시하는 테이블</caption>
                      <thead>
                        <tr>
                          <th className="w8p">No</th>
                          <th className="w10p">카테고리</th>
                          <th className="w40p">제목</th>
                          <th className="w8p">첨부파일</th>
                          {/* <th className="w8p">팝업공지</th> */}
                          <th className="w10p">등록자</th>
                          <th className="w10p">등록일</th>
                          <th>조회수</th>
                        </tr>
                      </thead>
                      {/* 게시글 목록 반복 출력 (EgovMap 사용) */}
                      <tbody id="bbsList">
                        {boardList.length > 0 ? (
                          boardList.map((board, index) => (
                            <tr key={board.sn}>
                              {/* 번호 */}
                              <td>
                                {board.imptYn === "Y" ? (
                                  <span>
                                    <i className="fa-solid fa-bullhorn"></i>
                                  </span>
                                ) : (
                                  <span>
                                    {paginationInfo.totalRecordCount -
                                      ((paginationInfo.currentPageNo - 1) * paginationInfo.recordCountPerPage + index)}
                                  </span>
                                )}
                              </td>
                              {/* 카테고리 */}
                              <td>{categoryMap[board.ctgry]}</td>
                              {/* 제목 */}
                              <td>{escapeHtml(board.title)}</td>
                              {/* 첨부파일 */}
                              <td>
                                {board.fileCount > 0 ? (
                                  <span className="file-icon">
                                    <i className="fa-regular fa-file"></i>
                                  </span>
                                ) : (
                                  ""
                                )}
                              </td>
                              {/* 등록자 */}
                              <td>{board.regId}</td>
                              {/* 등록일 */}
                              <td>{dayjs(board.regDt).format("YYYY-MM-DD")}</td>
                              {/* 조회수 */}
                              <td>{board.inqCnt}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" align="center">
                              등록된 게시물이 없습니다.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* Paging */}
                  <Paging paginationInfo={paginationInfo} fetchMethod={getBoardList} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
