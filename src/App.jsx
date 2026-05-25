import { useRef, useState } from "react";

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

const locationList = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
  "재택",
];

const initialJobs = [
  {
    id: 1,
    company: "네이버",
    position: "프론트엔드 인턴",
    location: "성남",
    deadline: "2026-06-10",
    status: "지원 전",
    tech: ["React", "JavaScript", "CSS"],
    requirements: [
      "React 기반 UI 개발 경험",
      "HTML, CSS, JavaScript 기본 이해",
      "사용자 경험을 고려한 화면 구현 능력",
    ],
  },
  {
    id: 2,
    company: "카카오",
    position: "웹 프론트엔드 개발자",
    location: "판교",
    deadline: "2026-06-05",
    status: "지원 완료",
    tech: ["React", "TypeScript", "Git"],
    requirements: [
      "React 기반 컴포넌트 개발 경험",
      "TypeScript 기본 사용 경험",
      "Git을 활용한 버전 관리 경험",
      "서비스 화면 개선과 유지보수에 관심이 있는 분",
    ],
  },
  {
    id: 3,
    company: "토스",
    position: "Frontend Developer",
    location: "서울",
    deadline: "2026-05-30",
    status: "면접 예정",
    tech: ["React", "Next.js", "TypeScript"],
    requirements: [
      "React 또는 Next.js 기반 프로젝트 경험",
      "TypeScript를 활용한 개발 경험",
      "재사용 가능한 컴포넌트 설계에 대한 이해",
      "빠르게 변화하는 서비스 환경에 적응할 수 있는 분",
    ],
  },
  {
    id: 4,
    company: "당근",
    position: "프론트엔드 개발자",
    location: "서울",
    deadline: "2026-06-18",
    status: "지원 전",
    tech: ["JavaScript", "React", "HTML/CSS"],
    requirements: [
      "HTML, CSS, JavaScript를 활용한 화면 구현 능력",
      "React를 이용한 개인 또는 팀 프로젝트 경험",
      "반응형 웹 페이지 제작 경험",
      "사용자 피드백을 반영해 UI를 개선해본 경험",
    ],
  },
  {
    id: 5,
    company: "라인",
    position: "Junior Frontend Engineer",
    location: "서울",
    deadline: "2026-06-01",
    status: "서류 합격",
    tech: ["React", "Vue", "Git"],
    requirements: [
      "React 또는 Vue를 활용한 웹 개발 경험",
      "컴포넌트 기반 화면 구성에 대한 이해",
      "REST API 데이터 연동 경험",
      "팀원과 원활하게 소통하며 개발할 수 있는 분",
    ],
  },
  {
    id: 6,
    company: "우아한형제들",
    position: "프론트엔드 개발자",
    location: "서울",
    deadline: "2026-05-25",
    status: "마감 임박",
    tech: ["React", "JavaScript", "UI/UX"],
    requirements: [
      "React 기반 웹 서비스 개발 경험",
      "JavaScript 동작 원리에 대한 기본 이해",
      "UI/UX를 고려한 화면 구현 능력",
      "문제를 발견하고 개선하려는 태도를 가진 분",
    ],
  },
];

function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const addFormRef = useRef(null);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    deadline: "",
    status: "지원 전",
    tech: "",
    memo: "",
  });

  const scrollToAddForm = () => {
    addFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddJob = (e) => {
    e.preventDefault();

    if (
      formData.company.trim() === "" ||
      formData.position.trim() === "" ||
      formData.deadline.trim() === ""
    ) {
      alert("회사명, 직무, 마감일은 꼭 입력해주세요.");
      return;
    }

    const newJob = {
      id: Date.now(),
      company: formData.company,
      position: formData.position,
      location: formData.location,
      deadline: formData.deadline,
      status: formData.status,
      tech: formData.tech
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      requirements: formData.memo
        ? formData.memo
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item !== "")
        : ["추가 메모가 없습니다."],
    };

    setJobs([newJob, ...jobs]);

    setFormData({
      company: "",
      position: "",
      location: "",
      deadline: "",
      status: "지원 전",
      tech: "",
      memo: "",
    });
  };

  const handleChangeStatus = (jobId, newStatus) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, status: newStatus } : job
    );

    setJobs(updatedJobs);
  };

  const handleDeleteJob = (jobId) => {
    const isDelete = window.confirm("이 회사를 삭제하시겠습니까?");

    if (!isDelete) return;

    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    setJobs(updatedJobs);
  };

  const filteredJobs = jobs.filter((job) => {
    const search = searchText.trim().toLowerCase();

    const companyMatch = job.company.toLowerCase().includes(search);
    const positionMatch = job.position.toLowerCase().includes(search);
    const techMatch = job.tech.some((skill) =>
      skill.toLowerCase().includes(search)
    );

    const searchMatch =
      search === "" || companyMatch || positionMatch || techMatch;

    const statusMatch =
      selectedStatus === "전체" || job.status === selectedStatus;

    return searchMatch && statusMatch;
  });

  const appliedCount = jobs.filter((job) => job.status === "지원 완료").length;
  const interviewCount = jobs.filter((job) => job.status === "면접 예정").length;
  const urgentCount = jobs.filter((job) => job.status === "마감 임박").length;

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="header-label">취업 준비 대시보드</p>
          <h1>JobTrack</h1>
          <p className="header-desc">
            지원 회사, 마감일, 지원 상태를 한눈에 관리하세요.
          </p>
        </div>

        <button className="add-btn" onClick={scrollToAddForm}>
          + 회사 추가
        </button>
      </header>

      <section className="summary-section">
        <div className="summary-card">
          <p>전체 공고</p>
          <strong>{jobs.length}</strong>
          <span>관리 중인 회사</span>
        </div>

        <div className="summary-card">
          <p>지원 완료</p>
          <strong>{appliedCount}</strong>
          <span>제출 완료</span>
        </div>

        <div className="summary-card">
          <p>면접 예정</p>
          <strong>{interviewCount}</strong>
          <span>준비 필요</span>
        </div>

        <div className="summary-card">
          <p>마감 임박</p>
          <strong>{urgentCount}</strong>
          <span>우선 확인</span>
        </div>
      </section>

      <section className="control-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="회사명, 직무, 기술스택 검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />
        </div>

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
      </section>

      <section className="job-list">
        {filteredJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <div className="card-top">
              <span
                className={`status-badge ${job.status.replaceAll(" ", "-")}`}
              >
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
                className={`status-change-select ${job.status.replaceAll(
                  " ",
                  "-"
                )}`}
                value={job.status}
                onChange={(e) => handleChangeStatus(job.id, e.target.value)}
              >
                <option>지원 전</option>
                <option>지원 완료</option>
                <option>서류 합격</option>
                <option>면접 예정</option>
                <option>마감 임박</option>
                <option>최종 합격</option>
                <option>불합격</option>
              </select>

              <button
                className="delete-btn"
                onClick={() => handleDeleteJob(job.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </section>

      <div ref={addFormRef}>
        <form className="add-job-form" onSubmit={handleAddJob}>
          <div className="form-title-row">
            <div>
              <p>새 지원 회사</p>
              <h2>회사 추가하기</h2>
            </div>
          </div>

          <div className="form-grid">
            <input
              type="text"
              name="company"
              placeholder="회사명"
              value={formData.company}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="position"
              placeholder="직무"
              value={formData.position}
              onChange={handleInputChange}
            />

            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            >
              <option value="">지역 선택</option>
              {locationList.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option>지원 전</option>
              <option>지원 완료</option>
              <option>서류 합격</option>
              <option>면접 예정</option>
              <option>마감 임박</option>
              <option>최종 합격</option>
              <option>불합격</option>
            </select>

            <input
              type="text"
              name="tech"
              placeholder="기술스택 예: React, JavaScript, CSS"
              value={formData.tech}
              onChange={handleInputChange}
            />
          </div>

          <textarea
            name="memo"
            placeholder="메모를 입력하세요"
            value={formData.memo}
            onChange={handleInputChange}
          />

          <button className="submit-btn" type="submit">
            회사 추가
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;