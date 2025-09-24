import type { CheckboxFiltersProps } from "../types";
import { useTranslation } from "react-i18next";
import "../styles/filters.css";

export default function CheckboxFilters({
  filters,
  onChange,
}: CheckboxFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="checkbox-filters">
      {Object.entries(filters).map(([key, value]) => (
        <label key={key}>
          <input
            type="checkbox"
            checked={value}
            onChange={onChange}
            name={key}
          />
          {t(key)}
        </label>
      ))}
    </div>
  );
}
