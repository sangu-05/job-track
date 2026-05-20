const statusList = [
  "전체",
  "지원 전",
  "지원 완료",
  "서류 합격",
  "면접 예정",
  "마감 임박",
  "최종 합격",
  "불합격",
];

function StatusFilter({ selectedStatus, setSelectedStatus }) {
  return (
    <div className="filter-wrap">
      {statusList.map((status) => (
        <button
          key={status}
          className={`filter-btn status-${status.replaceAll(" ", "-")} ${
  selectedStatus === status ? "active" : ""
}`}
          onClick={() => setSelectedStatus(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export default StatusFilter;