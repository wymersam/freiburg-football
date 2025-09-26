export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface Pitch {
  id: number;
  name: string;
  location: string;
  rating: number;
  baseRating?: number;
  maxPlayers: number;
  price: string;
  restaurant: boolean;
  outdoor: boolean;
  indoor: boolean;
  parking: boolean;
  lights: boolean;
  turf: boolean;
  imageUrl: string;
  moreInfo: {
    oneHourSessionPrice: string;
    twoHourSessionPrice?: string;
    website: string;
  };
  reviews: Review[];
}

export type PitchInformation = {
  oneHourSessionPrice?: string;
  twoHourSessionPrice?: string;
  website: string;
};

export type Filters = {
  restaurant: boolean;
  outdoor: boolean;
  indoor: boolean;
  parking: boolean;
  lights: boolean;
  turf: boolean;
};

export type SortKey = "rating" | "location" | "maxPlayers" | "price";

export type CheckboxFiltersProps = {
  filters: Filters;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export type DropDownFiltersProps = {
  sortKey: SortKey;
  setSortKey: React.Dispatch<React.SetStateAction<SortKey>>;
  filterLocation: string;
  setFilterLocation: React.Dispatch<React.SetStateAction<string>>;
};

export interface PitchTag {
  key: string;
  label: string;
  className: string;
}
