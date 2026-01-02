import "./SectionHeader.css";

function SectionHeader({ title, subTitle, rightText }) {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-title">{title}</h2>
        {subTitle && <p className="section-subtitle">{subTitle}</p>}
      </div>

      {rightText && (
        <span className="section-right">{rightText}</span>
      )}
    </div>
  );
}

export default SectionHeader;
