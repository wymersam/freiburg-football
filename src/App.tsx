import { useState, useEffect } from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import "./i18n";
import LanguageSelector from "./LanguageSelector";
import CheckboxFilters from "./CheckboxFilters";
import type { Filters, Pitch, SortKey } from "./types";
import { pitches } from "./pitches";
import PitchCard from "./PitchCard";
import DropdownFilters from "./DropdownFilters";
import Footer from "./Footer";
import CheckboxFiltersMobile from "./CheckboxFiltersMobile";

function App() {
  const { t } = useTranslation();
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [filterLocation, setFilterLocation] = useState("");
  const [filters, setFilters] = useState<Filters>({
    restaurant: false,
    outdoor: false,
    indoor: false,
    parking: false,
    lights: false,
    turf: false,
  });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const sortedPitches = [...pitches]
    .filter((p) => {
      // Location filter
      if (filterLocation && p.location !== filterLocation) return false;
      // Checkbox filters
      for (const key in filters) {
        if (filters[key as keyof typeof filters] && !p[key as keyof Pitch]) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortKey === "location") {
        return a.location.localeCompare(b.location);
      }
      return b[sortKey] > a[sortKey] ? 1 : -1;
    });

  return (
    <div className="container">
      <header className="header-container">
        <img src="/logo.png" alt="Football Freiburg Logo" className="logo" />
        <h1 className="app-title">{t("appHeadline")}</h1>
        <LanguageSelector />
      </header>

      <main className="app-main">
        <div className="filters-container">
          <DropdownFilters
            sortKey={sortKey}
            setSortKey={setSortKey}
            filterLocation={filterLocation}
            setFilterLocation={setFilterLocation}
          />
          {windowWidth < 720 ? (
            <CheckboxFiltersMobile
              filters={filters}
              onChange={(key: string, value: boolean) => {
                setFilters((prev) => ({ ...prev, [key]: value }));
              }}
            />
          ) : (
            <CheckboxFilters filters={filters} onChange={handleFilterChange} />
          )}
        </div>
        <ul className="pitch-list">
          {sortedPitches.map((pitch) => (
            <PitchCard key={pitch.id} pitch={pitch} />
          ))}
        </ul>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
