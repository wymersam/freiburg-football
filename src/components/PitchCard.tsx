import { t } from "i18next";
import type { Pitch } from "../types";
import Ratings from "./Ratings";
import { useState, useEffect } from "react";
import "../styles/pitch-card.css";
import MoreInfo from "./MoreInfoCard";
import ChevronIcon from "./ChevronIcon";

const TAGS = [
  { key: "restaurant", label: "restaurant", className: "tag-restaurant" },
  { key: "outdoor", label: "outdoor", className: "tag-outdoor" },
  { key: "indoor", label: "indoor", className: "tag-indoor" },
  { key: "parking", label: "parking", className: "tag-parking" },
  { key: "lights", label: "lights", className: "tag-lights" },
  { key: "turf", label: "turf", className: "tag-turf" },
];

export default function PitchCard({ pitch }: { pitch: Pitch }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function openMoreInfo(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    setOpen((prev) => !prev);
    setMoreInfoOpen((prev) => !prev);
  }

  return (
    <div className="pitch-card">
      <li className="pitch-item">
        <div className="pitch-description">
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
            <strong>{t("price")}:</strong> {pitch.price}
          </p>
          <div className="pitch-tags">
            {TAGS.map(
              (tag) =>
                pitch[tag.key as keyof Pitch] && (
                  <span key={tag.key} className={`pitch-tag ${tag.className}`}>
                    {t(tag.label)}
                  </span>
                )
            )}
          </div>
          <div
            className="filter-toggle-chevron"
            onClick={openMoreInfo}
            aria-expanded={open}
            aria-controls="more-info-section"
            tabIndex={0}
            role="button"
          >
            <span className="more-info">{t("moreInfo")}</span>
            <ChevronIcon open={open} />
          </div>
          {moreInfoOpen && pitch.moreInfo && <MoreInfo info={pitch.moreInfo} />}
        </div>
        {windowWidth > 720 && (
          <div className="pitch-image-container">
            <img
              src={pitch.imageUrl}
              alt={pitch.name}
              className="pitch-card-image"
            />
          </div>
        )}
      </li>
    </div>
  );
}
