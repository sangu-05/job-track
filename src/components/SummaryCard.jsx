function SummaryCard({ title, count, description }) {
  return (
    <div className="summary-card">
      <p>{title}</p>
      <strong>{count}</strong>
      <span>{description}</span>
    </div>
  );
}

export default SummaryCard;