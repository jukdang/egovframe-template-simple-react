import CompanySelect from "@/pages/stats/CompanySelect";
import { useEffect, useState } from "react";


const DriverList = () => {
  const GS_SERVER_URL = "http://localhost:8081";
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth()).padStart(2, '0'); // 월은 0~11
  const currentMonth = `${year}-${month}`;

  const [selectedCompany, setSelectedCompany] = useState('all');
  const [rptYm, setRptYm] = useState(currentMonth);

  const [driverList, setDriverList] = useState([]);
  const [avgScore, setAvgScore] = useState(0.0);
  const [countGood, setCountGood] = useState(0);
  const [countWarning, setCountWarning] = useState(0);
  const [countDanger, setCountDanger] = useState(0);
  const [loading, setLoading] = useState(false);

  const [optrMaskYn, setOptrMaskYn] = useState(true);

  const customFetch = async ({ url, method = 'GET', params = {}, onSuccess, onError, onFinally }) => {
    try {
      let requestUrl = `${GS_SERVER_URL}${url}`;
      let options = {
        method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: "include"
      };

      if (method === 'POST') {
        const formData = new URLSearchParams();
        Object.keys(params).forEach(key => {
          formData.append(key, params[key]);
        });
        options = {
          ...options,
          body: formData
        };
      } else {
        const searchParams = new URLSearchParams(params);
        requestUrl += `?${searchParams}`;
      }

      const response = await fetch(requestUrl, options);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        onSuccess(data);
      } else {
        onError(data);
      }
    } catch (error) {
      onError(error);
    } finally {
      onFinally();
    }
  };



  const getDriverList = () => {
    setLoading(true);
    customFetch({
      url: '/operation/getDriverList',
      method: 'POST',
      params: { ownrNm: selectedCompany, rptYm: rptYm.replace(/-/g, '') },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      onSuccess: (response) => {
        console.log('getDriverList 조회 성공:', response);
        const updateList = response.data.list;
        if (updateList.length > 0) {
          updateList.forEach(driver => {
            driver.oprScr = Number(driver.oprScr);
            if (driver.oprScr >= 90) {
              driver.badge = 'good';
            } else if (driver.oprScr >= 80) {
              driver.badge = 'warning';
            } else {
              driver.badge = 'danger';
            }
          });
        }
        setDriverList(updateList);
      },
      onError: (error) => console.error('에러 발생:', error),
      onFinally: () => setLoading(false)
    });
  };

  useEffect(() => {
    if (driverList.length > 0) {

      const totalScore = driverList.reduce((acc, driver) => acc + driver.oprScr, 0);
      setAvgScore((totalScore / driverList.length).toFixed(2));
      setCountGood(driverList.filter(driver => driver.badge === 'good').length);
      setCountWarning(driverList.filter(driver => driver.badge === 'warning').length);
      setCountDanger(driverList.filter(driver => driver.badge === 'danger').length);
    } else {
      setAvgScore(0.0);
      setCountGood(0);
      setCountWarning(0);
      setCountDanger(0);
    }
  }, [driverList]);

  useEffect(() => {
    getDriverList();
  }, []);

  const driverBadgeTextMap = {
    good: '양호',
    warning: '주의',
    danger: '위험'
  }

  return (
    <div className="contents">
      <div className="wrapper">
        <div className="filter_area wh_box">
          <div className="filter_box_wrap">
            <div className="filter_box">

              <div className="filter_box" style={{ display: 'flex' }}>
                <label>운수회사</label>
                <CompanySelect
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                />
              </div>
            </div>
            <div className="filter_box">
              <label>기간</label>
              <input id="rptYm" type="month" value={rptYm} onChange={(e) => setRptYm(e.target.value)} />
            </div>
          </div>
          <button className="btn lg black btn_search" onClick={getDriverList}>검색</button>
        </div>
        <p className="info_text"><i className="fa-solid fa-circle-info"></i>본 리포트는 전월 1일부터 말일까지의 운행 데이터를 기반으로, 매월 1일에 생성됩니다.</p>

        <div className="cont_section">
          <div className="tit">
            <h2>전체 현황</h2>
          </div>
          <div className="wh_box overall_status_wrap">
            <ul className="overall_status">
              <li>
                <strong><i className="fa-solid fa-chart-simple"></i>안전점수 평균</strong>
                <span><b id="avgScore">{avgScore}</b>점</span>
              </li>
              <li>
                <strong><i className="fa-regular fa-face-smile"></i>양호 운전원</strong>
                <span><b id="countGood">{countGood}</b>명</span>
              </li>
              <li>
                <strong><i className="fa-regular fa-face-meh"></i>주의 운전원</strong>
                <span><b id="countWarning">{countWarning}</b>명</span>
              </li>
              <li>
                <strong><i className="fa-regular fa-face-frown"></i>위험 운전원</strong>
                <span><b id="countDanger">{countDanger}</b>명</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="cont_section">
          <div className="tit">
            <h2>운전원별 현황</h2>
          </div>

          {driverList.length === 0 ? (
            <div className="cont_none_wrap">
              <div className="cont_none type02">
                <i className="fa-solid fa-file-circle-xmark"></i>
                <p>조회 결과가 없습니다.</p>
              </div>
            </div>
          ) : (
            <ul className="driver_status" id="driverList">
              {driverList.map((driver, index) => (
                <li key={index} className={`driver_card ${driver.badge}`}>
                  <p>
                    <span className={`badge ${driver.badge}`}>
                      {driverBadgeTextMap[driver.badge]}
                    </span>
                    {optrMaskYn ? driver.oprtrNm.charAt(0) + '*'.repeat(driver.oprtrNm.length - 1) : driver.oprtrNm}
                  </p>
                  <span className="driver_score"><b>{driver.oprScr}</b>점</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default DriverList;
