import React from "react";
import ChevronIcon from "./ChevronIcon";

interface ToggleProps {
  title: string;
  open: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  ariaControls?: string;
}

function Toggle({ title, open, onClick, ariaControls }: ToggleProps) {
  return (
    <div
      className={`filter-toggle-chevron ${open ? "open" : ""}`}
      onClick={onClick}
      aria-expanded={open}
      aria-controls={ariaControls}
      tabIndex={0}
      role="button"
    >
      <span className="more-info">{title}</span>
      <ChevronIcon open={open} />
    </div>
  );
}

export default Toggle;
