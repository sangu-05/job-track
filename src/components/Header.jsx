function Header({ onAddClick }) {
  return (
    <header className="header">
      <div>
        <p className="header-label">취업 준비 대시보드</p>
        <h1>JobTrack</h1>
        <p className="header-desc">
          지원 회사, 마감일, 지원 상태를 한눈에 관리하세요.
        </p>
      </div>

      <button className="add-btn" onClick={onAddClick}>+ 회사 추가</button>
    </header>
  );
}

export default Header;