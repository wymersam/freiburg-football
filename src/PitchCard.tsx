import { t } from "i18next";
import type { Pitch } from "./types";
import Ratings from "./Ratings";

export default function PitchCard({ pitch }: { pitch: Pitch }) {
  return (
    <li key={pitch.id} className="pitch-item">
      <h2>{pitch.name}</h2>
      <p>
        <strong>{t("location")}:</strong> {pitch.location}
      </p>
      <p>
        <strong>{t("rating")}:</strong> <Ratings value={pitch.rating} />
      </p>
      <p>
        <strong>{t("maxPlayers")}:</strong> {pitch.maxPlayers}
      </p>
      <p>
        <strong>{t("price")} :</strong> {pitch.price}
      </p>
      <div className="pitch-tags">
        {pitch.restaurant && (
          <span className="pitch-tag tag-restaurant">{t("restaurant")}</span>
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
        {pitch.turf && <span className="pitch-tag tag-turf">{t("turf")}</span>}
      </div>
    </li>
  );
}
