import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "FreiKick",
      appHeadline: "Freiburg’s Football Field Finder",
      sortBy: "Sort by:",
      filterByLocation: "Filter by location:",
      all: "All",
      rating: "Rating",
      location: "Location",
      maxPlayers: "Max Players",
      restaurant: "Restaurant",
      outdoor: "Outdoor",
      indoor: "Indoor",
      parking: "Parking",
      lights: "Lights",
      turf: "Turf",
    },
  },
  de: {
    translation: {
      title: "FreiKick",
      appHeadline: "Freiburgs Fußballplatz-Finder",
      sortBy: "Sortieren nach:",
      filterByLocation: "Filtern nach Stadtteil:",
      all: "Alle",
      rating: "Bewertung",
      location: "Stadtteil",
      maxPlayers: "Max. Spieler",
      restaurant: "Restaurant",
      outdoor: "Außen",
      indoor: "Innen",
      parking: "Parkplatz",
      lights: "Beleuchtung",
      turf: "Kunstrasen",
    },
  },
  es: {
    translation: {
      title: "FreiKick",
      appHeadline: "Buscador de campos de fútbol de Friburgo",
      sortBy: "Ordenar por:",
      filterByLocation: "Filtrar por barrio:",
      all: "Todos",
      rating: "Valoración",
      location: "Barrio",
      maxPlayers: "Máx. jugadores",
      restaurant: "Restaurante",
      outdoor: "Exterior",
      indoor: "Interior",
      parking: "Aparcamiento",
      lights: "Luces",
      turf: "Césped artificial",
    },
  },
  it: {
    translation: {
      title: "FreiKick",
      appHeadline: "Trova campi da calcio a Friburgo",
      sortBy: "Ordina per:",
      filterByLocation: "Filtra per quartiere:",
      all: "Tutti",
      rating: "Valutazione",
      location: "Quartiere",
      maxPlayers: "Max giocatori",
      restaurant: "Ristorante",
      outdoor: "Esterno",
      indoor: "Interno",
      parking: "Parcheggio",
      lights: "Luci",
      turf: "Erba sintetica",
    },
  },
  ar: {
    translation: {
      title: "فرايكك",
      appHeadline: "الباحث عن ملاعب كرة القدم في فرايبورغ",
      sortBy: "ترتيب حسب:",
      filterByLocation: "تصفية حسب الموقع:",
      all: "الكل",
      rating: "التقييم",
      location: "الموقع",
      maxPlayers: "أقصى عدد للاعبين",
      restaurant: "مطعم",
      outdoor: "خارجي",
      indoor: "داخلي",
      parking: "موقف سيارات",
      lights: "إضاءة",
      turf: "عشب صناعي",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
