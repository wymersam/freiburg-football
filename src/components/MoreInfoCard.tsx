import type { PitchInformation } from "../types";
import { t } from "i18next";

export default function MoreInfo({ info }: { info: PitchInformation }) {
  return (
    <div className="pitch-more-info">
      <p>
        <span>{t("oneHourSession")}:</span> {info.oneHourSessionPrice}
      </p>
      {info.twoHourSessionPrice && (
        <p>
          <span>{t("twoHourSession")}:</span> {info.twoHourSessionPrice}
        </p>
      )}
      {info.website && (
        <p>
          {t("website")}:{" "}
          <a href={info.website} rel="noopener noreferrer" target="_blank">
            {info.website}
          </a>
        </p>
      )}
    </div>
  );
}
