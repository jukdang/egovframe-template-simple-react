import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../config.js';

const CompanySelect = ({ value, onChange, name = "ownrSelect", id = "ownrSelect" }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      // 실제 API 엔드포인트로 수정 필요
      const response = await fetch(`${SERVER_URL}/mngr/getCompanyList`);
      if (response.ok) {
        const data = await response.json();
        setCompanies(data.data || []);
      }
    } catch (error) {
      console.error('회사 목록 조회 에러:', error);
      // 임시 데이터
      setCompanies([
        { value: '대원버스', label: '대원버스' },
        { value: '대진운수', label: '대진운수' },
        { value: '대창운수', label: '대창운수' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      disabled={loading}
    >
      <option value="all">전체</option>
      {companies.map((company, index) => (
        <option key={index} value={company.value || company.ownrNm}>
          {company.label || company.ownrNm}
        </option>
      ))}
    </select>
  );
};

export default CompanySelect;