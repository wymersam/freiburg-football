import { useState } from "react";
import type { CheckboxFiltersProps } from "../types";
import { useTranslation } from "react-i18next";
import ChevronIcon from "./ChevronIcon";
import CheckboxFilters from "./CheckboxFilters";

export default function CheckboxFiltersMobile({
  filters,
  onChange,
}: CheckboxFiltersProps) {
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
      >
        <span>{open ? t("hideFilters") : t("showFilters")}</span>
        <ChevronIcon open={open} />
      </div>
      <div
        className={`checkbox-filters${open ? " open" : ""}`}
        id="mobile-checkbox-filters"
      >
        {open && <CheckboxFilters filters={filters} onChange={onChange} />}
      </div>
    </div>
  );
}
