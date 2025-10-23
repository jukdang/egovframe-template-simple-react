import { useEffect, useState } from 'react';
import CompanySelect from './CompanySelect.jsx';
import DateRangePicker from './DatePickerRange.jsx';
import LineChart from './LineChart.jsx';
import PieChart from './PieChart.jsx';


const UsageStats = () => {
  const GS_SERVER_URL = "http://localhost:8081";

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [dateType, setDateType] = useState('date');

  const [sec1Loading, setSec1Loading] = useState(false);
  const [sec2Loading, setSec2Loading] = useState(false);
  const [sec3Loading, setSec3Loading] = useState(false);

  // State for data
  const [loginManyData, setLoginManyData] = useState([]);
  const [loginRecentData, setLoginRecentData] = useState([]);
  const [menuUseData, setMenuUseData] = useState([]);

  const [connUserCnt, setConnUserCnt] = useState([]);
  const [ownrLoginlist, setOwnrLoginlist] = useState([]);

  // Initialize dates
  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    setStartDate(formatDate(sevenDaysAgo));
    setEndDate(formatDate(today));
    setSelectedCompany('all');

    // Initial data load
    searchStat(formatDate(sevenDaysAgo), formatDate(today), 'all');
  }, []);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR') + ' ' + date.toLocaleTimeString('ko-KR');
  };



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

  const searchStat = (start, end, company) => {
    getLoginStat(start, end, company);
    getTotalLoginStat(start, end, company);
    getMenuUseStat(start, end, company);
  };

  const getLoginStat = (start, end, company) => {

    setSec1Loading(true);
    customFetch({
      url: '/mngr/getLoginStat',
      method: 'POST',
      params: {
        ownrNm: company,
        startDt: start,
        endDt: end
      },
      onSuccess: (response) => {
        const { ownrLoginlist, loginManyRankStat, loginRecentStat } = response.data;
        //pieChart("chartDiv1", ownrLoginlist, 'ownrNm');
        setOwnrLoginlist(ownrLoginlist || []);
        setLoginManyData(loginManyRankStat || []);
        setLoginRecentData(loginRecentStat || []);
      },
      onError: (error) => console.error('에러:', error),
      onFinally: () => setSec1Loading(false)
    });
  };

  const getTotalLoginStat = (start, end, company) => {
    setSec2Loading(true);
    customFetch({
      url: '/mngr/getTotalLoginStat',
      method: 'POST',
      params: {
        ownrNm: company,
        startDt: start,
        endDt: end,
        dateType: dateType
      },
      onSuccess: (response) => {
        //makeLineChart('chartDiv2', response.data.connUserCnt, 'regDt');
        setConnUserCnt(response.data.connUserCnt || []);
      },
      onError: (error) => console.error('에러:', error),
      onFinally: () => setSec2Loading(false)
    });
  };

  const getMenuUseStat = (start, end, company) => {
    setSec3Loading(true);
    customFetch({
      url: '/mngr/getMenuUseStat',
      method: 'POST',
      params: {
        ownrNm: company,
        startDt: start,
        endDt: end
      },
      onSuccess: (response) => {
        const menuUseStat = response.data.menuUseStat || [];
        //pieChart("chartDiv3", menuUseStat, 'svcNm2');
        setMenuUseData(menuUseStat);
      },
      onError: (error) => console.error('에러:', error),
      onFinally: () => setSec3Loading(false)
    });
  };

  const handleSearch = () => {
    searchStat(startDate, endDate, selectedCompany);
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleDateTypeChange = (type) => {
    setDateType(type);
  };

  useEffect(() => {
    getTotalLoginStat(startDate, endDate, selectedCompany);
  }, [dateType]);

  const roleTextMap = {
    ROLE_ADMIN: '시스템 관리자',
    ROLE_MANAGER: '관리자',
    ROLE_MECHANIC: '정비사',
  };
  const loginStatData = activeTab === 0 ? loginManyData : loginRecentData;

  return (
    <div className="contents">
      <div className="wrapper">
        <div className="tit_wrap">
          <h1>사용량 통계</h1>
        </div>

        <div className="filter_section">
          <div className="wh_box filter_area">
            <div className="filter_wrap">
              <DateRangePicker
                startDate={startDate} endDate={endDate}
                setStartDate={setStartDate} setEndDate={setEndDate}
              />

              <div className="top_select">
                <label>운수회사</label>
                <CompanySelect
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                />
                <button
                  type="button"
                  className="btn mid blue"
                  onClick={handleSearch}
                  disabled={sec1Loading || sec2Loading || sec3Loading}
                >
                  검색
                </button>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="col01">
            <div className="wh_box" id="loginArea">
              <div className="stit_wrap type02">
                <h2>로그인 현황</h2>
              </div>
              <div className="lbox_cont cont_3to7">

                <PieChart id="chartDiv1" data={ownrLoginlist} xKey="ownrNm" loading={sec1Loading} />

                <div>

                  <ul className="tbl_tab">
                    {["접속 많은순", "최근 접속순"].map((tab, index) => (
                      <li key={index} className={activeTab === index ? 'on' : ''}>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleTabClick(index); }}>
                          {tab}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="tbl_box scrollBar">
                    <table className="tbl02 none_hover" style={{ minWidth: '100%' }}>
                      <thead>
                        <tr>
                          <th>소속</th>
                          <th>권한</th>
                          <th>아이디</th>
                          <th>접속건수</th>
                          <th className="w26p">최근 접속</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          loginStatData.length === 0 ? (
                            <tr>
                              <td colSpan={5}>조회 결과가 없습니다.</td>
                            </tr>
                          ) : (
                            loginStatData.map((item, index) => (
                              <tr key={index}>
                                <td>{item.ownrNm}</td>
                                <td>{roleTextMap[item.mbrRole]}</td>
                                <td>{item.mbrId}</td>
                                <td>{item.cnt}</td>
                                <td>{formatDateTime(item.regDt)}</td>
                              </tr>
                            ))
                          )
                        }

                      </tbody>
                    </table>
                  </div>


                </div>
              </div>
            </div>

            <div className="wh_box" id="totalLoginArea">
              <div className="stit_wrap type02">

                <h2>전체 접속현황</h2>
                <span className="ir_btn unit btn_date">
                  <input
                    type="radio"
                    id="unit01"
                    name="totalDatetype"
                    value="date"
                    checked={dateType === 'date'}
                    onChange={() => handleDateTypeChange('date')}
                  />
                  <label
                    className={dateType === 'date' ? 'on' : ''}
                    htmlFor="unit01"
                  >
                    일
                  </label>
                  <input
                    type="radio"
                    id="unit02"
                    name="totalDatetype"
                    value="month"
                    checked={dateType === 'month'}
                    onChange={() => handleDateTypeChange('month')}
                  />
                  <label
                    className={dateType === 'month' ? 'on' : ''}
                    htmlFor="unit02"
                  >
                    월
                  </label>
                </span>
              </div>
              {/* <div className="graph_area" id="chartDiv2" ref={chartRef2} style={{ width: '100%', height: '300px' }}></div> */}
              <LineChart id="chartDiv2" data={connUserCnt} loading={sec2Loading} xKey="regDt" />
            </div>

            <div className="wh_box" id="menuUseArea">
              <div className="stit_wrap type02">
                <h2>메뉴별 접속현황</h2>
              </div>
              <div className="lbox_cont cont_3to7">
                {/* <div className="graph_area" id="chartDiv3" ref={chartRef3}></div> */}
                <PieChart id="chartDiv3" data={menuUseData} loading={sec3Loading} xKey="svcNm2" />
                <div>
                  <div className="tbl_box scsrollBar">
                    <table className="tbl02 none_hover" style={{ minWidth: '100%' }}>
                      <thead>
                        <tr>
                          <th>메인 메뉴</th>
                          <th>세부 메뉴</th>
                          <th>접속건수</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menuUseData.length === 0 ? (
                          <tr>
                            <td colSpan={3}>조회 결과가 없습니다.</td>
                          </tr>
                        ) : (
                          menuUseData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.svcNm}</td>
                              <td>{item.svcNm2}</td>
                              <td>{item.건수}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UsageStats;