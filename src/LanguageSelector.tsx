import React, { useState } from "react";
import i18n from "./i18n";

function LanguageSelector() {
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  return (
    <div className="language-select-container">
      <label>
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
  );
}

export default LanguageSelector;
