import { useRef, useState } from "react";
import jobsData from "./data/jobs";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import SearchBar from "./components/SearchBar";
import StatusFilter from "./components/StatusFilter";
import JobCard from "./components/JobCard";
import AddJobForm from "./components/AddJobForm";

function App() {
  const [jobs, setJobs] = useState(jobsData);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const addFormRef = useRef(null);

  const scrollToAddForm = () => {
  addFormRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

   const handleAddJob = (newJob) => {
    setJobs([newJob, ...jobs]);
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
      <Header onAddClick={scrollToAddForm} />

      <section className="summary-section">
        <SummaryCard
          title="전체 공고"
          count={jobs.length}
          description="관리 중인 회사"
        />
        <SummaryCard
          title="지원 완료"
          count={appliedCount}
          description="제출 완료"
        />
        <SummaryCard
          title="면접 예정"
          count={interviewCount}
          description="준비 필요"
        />
        <SummaryCard
          title="마감 임박"
          count={urgentCount}
          description="우선 확인"
        />
      </section>

      <section className="control-section">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <StatusFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </section>

      

      <section className="job-list">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onChangeStatus={handleChangeStatus}
            onDeleteJob={handleDeleteJob}
          />
        ))}
      </section>

        <div ref={addFormRef}>
          <AddJobForm onAddJob={handleAddJob} />
        </div>

    </div>
  );
}

export default App;