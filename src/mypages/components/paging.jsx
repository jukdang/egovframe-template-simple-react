const Paging = ({ paginationInfo, fetchMethod }) => {
  const { currentPageNo, totalPageCount, firstPageNoOnPageList, lastPageNoOnPageList } = paginationInfo;

  // helper: 페이지 번호 클릭 핸들러
  const handleClick = (pageNo) => {
    if (pageNo < 1 || pageNo > totalPageCount) return;
    fetchMethod(pageNo);
  };

  // 페이지 번호 배열
  const pageNumbers = [];
  for (let i = firstPageNoOnPageList; i <= lastPageNoOnPageList; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div id="paging" className="paging">
        <div className="wr_page">
          <span className="num">
            {/* 처음 */}
            <a onClick={() => handleClick(1)} className={`first ${currentPageNo <= 1 ? "disable" : ""}`}>
              <i className="fa fa-angle-double-left"></i>
            </a>

            {/* 이전 */}
            <a
              onClick={() => handleClick(currentPageNo <= 10 ? 1 : firstPageNoOnPageList - 1)}
              className={`pre ${currentPageNo <= 10 ? "disable" : ""}`}>
              <i className="fa fa-angle-left"></i>
            </a>

            {/* 페이지 번호 */}
            {pageNumbers.map((pageNo) => (
              <a key={pageNo} className={`pageNoClass ${pageNo === currentPageNo ? "on" : ""}`} onClick={() => handleClick(pageNo)}>
                {pageNo}
              </a>
            ))}

            {/* 다음 */}
            <a
              onClick={() => handleClick(lastPageNoOnPageList >= totalPageCount ? totalPageCount : lastPageNoOnPageList + 1)}
              className={`next ${lastPageNoOnPageList >= totalPageCount ? "disable" : ""}`}>
              <i className="fa fa-angle-right"></i>
            </a>

            {/* 마지막 */}
            <a onClick={() => handleClick(totalPageCount)} className={`last ${currentPageNo >= totalPageCount ? "disable" : ""}`}>
              <i className="fa fa-angle-double-right"></i>
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Paging;
