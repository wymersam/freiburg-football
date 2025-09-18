import { useState } from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import "./i18n";

type Pitch = {
  id: number;
  name: string;
  location: string;
  rating: number;
  maxPlayers: number;
  restaurant?: boolean;
  outdoor?: boolean;
  indoor?: boolean;
  parking?: boolean;
  lights?: boolean;
  turf?: boolean;
};

const pitches: Pitch[] = [
  {
    id: 1,
    name: "Sportpark-Umkirch",
    location: "Umkirch",
    rating: 5.0,
    maxPlayers: 10,
    restaurant: true,
    outdoor: false,
    indoor: true,
    parking: true,
    lights: true,
    turf: false,
  },
  {
    id: 2,
    name: "ESV Freiburg",
    location: "Sankt Georgen",
    rating: 3.5,
    maxPlayers: 14,
    restaurant: true,
    outdoor: true,
    indoor: false,
    parking: true,
    lights: false,
    turf: false,
  },
  {
    id: 3,
    name: "Seepark",
    location: "Mooswald",
    rating: 2,
    maxPlayers: 14,
    restaurant: false,
    outdoor: true,
    indoor: false,
    parking: true,
    lights: false,
    turf: true,
  },
  {
    id: 4,
    name: "PSV Freiburg",
    location: "Sankt Georgen",
    rating: 5,
    maxPlayers: 14,
    restaurant: true,
    outdoor: true,
    indoor: false,
    parking: true,
    lights: true,
    turf: true,
  },
];

type SortKey = "rating" | "location" | "maxPlayers";

function App() {
  const { t, i18n } = useTranslation();
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [filterLocation, setFilterLocation] = useState("");
  const [filters, setFilters] = useState({
    restaurant: false,
    outdoor: false,
    indoor: false,
    parking: false,
    lights: false,
    turf: false,
  });
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  };

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
      <div className="language-select-container">
        <label>
          Language:
          <select
            value={language}
            onChange={handleLanguageChange}
            className="language-select"
          >
            <option value="en">🇬🇧</option>
            <option value="de">🇩🇪</option>
            <option value="es">🇪🇸</option>
            <option value="it">🇮🇹</option>
            <option value="ar">🇸🇦</option>
          </select>
        </label>
      </div>
      <div
        className="logo-container"
        style={{ marginBottom: "1.5rem", textAlign: "center" }}
      >
        <img src="/logo.png" alt="Football Freiburg Logo" className="logo" />
        <h1 className="app-title">{t("appHeadline")}</h1>
      </div>

      <div className="controls">
        <label>
          {t("sortBy")}
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
          >
            <option value="rating">{t("rating")}</option>
            <option value="location">{t("location")}</option>
            <option value="maxPlayers">{t("maxPlayers")}</option>
          </select>
        </label>
        <label>
          {t("filterByLocation")}
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="">{t("all")}</option>
            <option value="Wiehre">Wiehre</option>
            <option value="Sankt Georgen">Sankt Georgen</option>
            <option value="Vauban">Vauban</option>
            <option value="Mooswald">Mooswald</option>
            <option value="Umkirch">Umkirch</option>
          </select>
        </label>
        <div className="checkbox-filters">
          <label>
            <input
              type="checkbox"
              name="restaurant"
              checked={filters.restaurant}
              onChange={handleFilterChange}
            />{" "}
            {t("restaurant")}
          </label>
          <label>
            <input
              type="checkbox"
              name="outdoor"
              checked={filters.outdoor}
              onChange={handleFilterChange}
            />{" "}
            {t("outdoor")}
          </label>
          <label>
            <input
              type="checkbox"
              name="indoor"
              checked={filters.indoor}
              onChange={handleFilterChange}
            />{" "}
            {t("indoor")}
          </label>
          <label>
            <input
              type="checkbox"
              name="parking"
              checked={filters.parking}
              onChange={handleFilterChange}
            />{" "}
            {t("parking")}
          </label>
          <label>
            <input
              type="checkbox"
              name="lights"
              checked={filters.lights}
              onChange={handleFilterChange}
            />{" "}
            {t("lights")}
          </label>
          <label>
            <input
              type="checkbox"
              name="turf"
              checked={filters.turf}
              onChange={handleFilterChange}
            />{" "}
            {t("turf")}
          </label>
        </div>
      </div>
      <ul className="pitch-list">
        {sortedPitches.map((pitch) => (
          <li key={pitch.id} className="pitch-item">
            <h2>{pitch.name}</h2>
            <p>
              <strong>{t("location")}:</strong> {pitch.location}
            </p>
            <p>
              <strong>{t("rating")}:</strong> {pitch.rating}
            </p>
            <p>
              <strong>{t("maxPlayers")}:</strong> {pitch.maxPlayers}
            </p>
            <div className="pitch-tags">
              {pitch.restaurant && (
                <span className="pitch-tag tag-restaurant">
                  {t("restaurant")}
                </span>
              )}
              {pitch.outdoor && (
                <span className="pitch-tag tag-outdoor">{t("outdoor")}</span>
              )}
              {pitch.indoor && (
                <span className="pitch-tag tag-indoor">{t("indoor")}</span>
              )}
              {pitch.parking && (
                <span className="pitch-tag tag-parking">{t("parking")}</span>
              )}
              {pitch.lights && (
                <span className="pitch-tag tag-lights">{t("lights")}</span>
              )}
              {pitch.turf && (
                <span className="pitch-tag tag-turf">{t("turf")}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
