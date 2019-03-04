import "./ContentToggle.css";

import React from "react";

export default function ContentToggle({
  summary,
  onToggle,
  isOpen,
  children
}) {
  function handleClick() {
    if (onToggle) {
      onToggle(!isOpen);
    }
  }

  let summaryClassName = "content-toggle-summary";

  if (isOpen) {
    summaryClassName += " content-toggle-summary-open";
  }

  return (
    <div className="content-toggle">
      <button onClick={handleClick} className={summaryClassName}>
        {summary}
      </button>
      {isOpen && (
        <div className="content-toggle-details">{children}</div>
      )}
    </div>
  );
}
