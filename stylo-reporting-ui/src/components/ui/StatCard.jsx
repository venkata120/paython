import "./StatCard.css";

function StatCard({ title, value, subText, trend }) {
  return (
    <div className={`stat-card ${trend}`}>
      <div className="stat-card-header">
        <span className="stat-title">{title}</span>
      </div>

      <div className="stat-value">{value}</div>

      {subText && (
        <div className="stat-subtext">
          {trend === "up" && <span className="trend up">▲</span>}
          {trend === "down" && <span className="trend down">▼</span>}
          {subText}
        </div>
      )}
    </div>
  );
}

export default StatCard;
