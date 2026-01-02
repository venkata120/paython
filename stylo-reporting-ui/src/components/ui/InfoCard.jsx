import "./InfoCard.css";

function InfoCard({ title, children }) {
  return (
    <div className="info-card">
      {title && (
        <div className="info-card-title">
          {title}
        </div>
      )}

      <div className="info-card-body">
        {children}
      </div>
    </div>
  );
}

export default InfoCard;
