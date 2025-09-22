import { t } from "i18next";
import type { DropDownFiltersProps, SortKey } from "./types";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "rating", label: t("rating") },
  { value: "location", label: t("location") },
  { value: "maxPlayers", label: t("maxPlayers") },
  { value: "price", label: "Price" },
];

const locationOptions: { value: string; label: string }[] = [
  { value: "", label: t("all") },
  { value: "Wiehre", label: "Wiehre" },
  { value: "Sankt Georgen", label: "Sankt Georgen" },
  { value: "Vauban", label: "Vauban" },
  { value: "Mooswald", label: "Mooswald" },
  { value: "Umkirch", label: "Umkirch" },
];

export default function DropdownFilters({
  sortKey,
  setSortKey,
  filterLocation,
  setFilterLocation,
}: DropDownFiltersProps) {
  return (
    <div className="dropdown-filters">
      <label>
        {t("sortBy")}
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t("filterByLocation")}
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          {locationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
