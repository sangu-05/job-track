import { useState } from "react";

function AddJobForm({ onAddJob }) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    deadline: "",
    status: "지원 전",
    tech: "",
    memo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
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
      tech: formData.tech.split(",").map((item) => item.trim()),
      memo: formData.memo,
    };

    onAddJob(newJob);

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

  return (
    <form className="add-job-form" onSubmit={handleSubmit}>
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
          onChange={handleChange}
        />

        <input
          type="text"
          name="position"
          placeholder="직무"
          value={formData.position}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="지역"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />

        <select name="status" value={formData.status} onChange={handleChange}>
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
          onChange={handleChange}
        />
      </div>

      <textarea
        name="memo"
        placeholder="메모를 입력하세요"
        value={formData.memo}
        onChange={handleChange}
      />

      <button className="submit-btn" type="submit">
        회사 추가
      </button>
    </form>
  );
}

export default AddJobForm;