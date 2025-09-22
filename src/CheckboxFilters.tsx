import type { CheckboxFiltersProps } from "./types";

export default function CheckboxFilters({
  filters,
  onChange,
}: CheckboxFiltersProps) {
  return (
    <div className="checkbox-filters">
      {Object.entries(filters).map(([key, checked]) => (
        <label key={key}>
          <input
            type="checkbox"
            name={key}
            checked={checked}
            onChange={onChange}
          />
          {key}
        </label>
      ))}
    </div>
  );
}
