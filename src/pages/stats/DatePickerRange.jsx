


const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  // 오늘 날짜 포맷
  const formatDate = (date) => date.toISOString().split("T")[0];

  return (
    <div className="top_date">
      <label>기간</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <em>~</em>
      <input
        type="date"
        value={endDate}
        max={formatDate(new Date())}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );
};

export default DateRangePicker;