import { useState } from "react";
import "./App.css";

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
    name: "Dreisam Stadion",
    location: "Waldkircher Str.",
    rating: 4.8,
    maxPlayers: 22,
    restaurant: true,
    outdoor: true,
    indoor: false,
    parking: true,
    lights: true,
    turf: true,
  },
  {
    id: 2,
    name: "Seepark Pitch",
    location: "Gerhart-Hauptmann-Str.",
    rating: 4.2,
    maxPlayers: 14,
    restaurant: false,
    outdoor: true,
    indoor: false,
    parking: true,
    lights: false,
    turf: false,
  },
  {
    id: 3,
    name: "Vauban Soccer Court",
    location: "Vaubanallee",
    rating: 4.5,
    maxPlayers: 10,
    restaurant: false,
    outdoor: true,
    indoor: false,
    parking: false,
    lights: true,
    turf: true,
  },
  {
    id: 4,
    name: "Stühlinger Park",
    location: "Wentzingerstr.",
    rating: 4.0,
    maxPlayers: 12,
    restaurant: true,
    outdoor: false,
    indoor: true,
    parking: true,
    lights: true,
    turf: false,
  },
];

type SortKey = "rating" | "location" | "maxPlayers";

function App() {
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
      <h1>Freiburg Football Pitches</h1>
      <div className="controls">
        <label>
          Sort by:
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
          >
            <option value="rating">Rating</option>
            <option value="location">Location</option>
            <option value="maxPlayers">Max Players</option>
          </select>
        </label>
        <label>
          Filter by location:
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="">All</option>
            <option value="Wiehre">Wiehre</option>
            <option value="Sankt Georgen">Sankt Georgen</option>
            <option value="Vauban">Vauban</option>
            <option value="Mooswald">Mooswald</option>
            <option value="Umkirch">Umkirch</option>
          </select>
        </label>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <label>
            <input
              type="checkbox"
              name="restaurant"
              checked={filters.restaurant}
              onChange={handleFilterChange}
            />{" "}
            Restaurant
          </label>
          <label>
            <input
              type="checkbox"
              name="outdoor"
              checked={filters.outdoor}
              onChange={handleFilterChange}
            />{" "}
            Outdoor
          </label>
          <label>
            <input
              type="checkbox"
              name="indoor"
              checked={filters.indoor}
              onChange={handleFilterChange}
            />{" "}
            Indoor
          </label>
          <label>
            <input
              type="checkbox"
              name="parking"
              checked={filters.parking}
              onChange={handleFilterChange}
            />{" "}
            Parking
          </label>
          <label>
            <input
              type="checkbox"
              name="lights"
              checked={filters.lights}
              onChange={handleFilterChange}
            />{" "}
            Lights
          </label>
          <label>
            <input
              type="checkbox"
              name="turf"
              checked={filters.turf}
              onChange={handleFilterChange}
            />{" "}
            Turf
          </label>
        </div>
      </div>
      <ul className="pitch-list">
        {sortedPitches.map((pitch) => (
          <li key={pitch.id} className="pitch-item">
            <h2>{pitch.name}</h2>
            <p>
              <strong>Location:</strong> {pitch.location}
            </p>
            <p>
              <strong>Rating:</strong> {pitch.rating}
            </p>
            <p>
              <strong>Max Players:</strong> {pitch.maxPlayers}
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "0.5rem",
              }}
            >
              {pitch.restaurant && (
                <span className="pitch-tag tag-restaurant">Restaurant</span>
              )}
              {pitch.outdoor && (
                <span className="pitch-tag tag-outdoor">Outdoor</span>
              )}
              {pitch.indoor && (
                <span className="pitch-tag tag-indoor">Indoor</span>
              )}
              {pitch.parking && (
                <span className="pitch-tag tag-parking">Parking</span>
              )}
              {pitch.lights && (
                <span className="pitch-tag tag-lights">Lights</span>
              )}
              {pitch.turf && <span className="pitch-tag tag-turf">Turf</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
