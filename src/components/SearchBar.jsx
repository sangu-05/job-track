function SearchBar({ searchText, setSearchText }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="회사명, 직무, 기술스택 검색"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        autoFocus
      />
    </div>
  );
}

export default SearchBar;