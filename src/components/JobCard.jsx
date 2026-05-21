function JobCard({ job, onChangeStatus, onDeleteJob }) {
  return (
    <div className="job-card">
      <div className="card-top">
        <span className={`status-badge ${job.status.replaceAll(" ", "-")}`}>
          {job.status}
        </span>

        <span className="deadline">마감일 {job.deadline}</span>
      </div>

      <h3>{job.company}</h3>
      <p className="position">{job.position}</p>
      <p className="location">{job.location}</p>

      <div className="tech-list">
        {job.tech.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <ul className="requirement-list">
    {job.requirements.map((item, index) => (
        <li key={index}>{item}</li>
    ))}
    </ul>

      <div className="card-actions">
        <select
          className={`status-change-select ${job.status.replaceAll(" ", "-")}`}
          value={job.status}
          onChange={(e) => onChangeStatus(job.id, e.target.value)}
        >
          <option>지원 전</option>
          <option>지원 완료</option>
          <option>서류 합격</option>
          <option>면접 예정</option>
          <option>마감 임박</option>
          <option>최종 합격</option>
          <option>불합격</option>
        </select>

        <button className="delete-btn" onClick={() => onDeleteJob(job.id)}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default JobCard;