import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CheckboxFiltersMobile({
  filters,
  onChange,
}: {
  filters: { [key: string]: boolean };
  onChange: (key: string, value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div className="checkbox-filters-mobile">
      <div
        className="filter-toggle-chevron"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-checkbox-filters"
        tabIndex={0}
        role="button"
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
          userSelect: "none",
        }}
      >
        <span>{open ? t("hideFilters") : t("showFilters")}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
          aria-hidden="true"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="#1f2937"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={`checkbox-filters${open ? " open" : ""}`}
        id="mobile-checkbox-filters"
        style={{ transition: "max-height 0.3s ease" }}
      >
        {open &&
          Object.entries(filters).map(([key, value]) => (
            <label
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5em",
                marginBottom: "0.5em",
              }}
            >
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(key, e.target.checked)}
                name={key}
              />
              {t(key)}
            </label>
          ))}
      </div>
    </div>
  );
}
