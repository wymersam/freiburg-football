export type Pitch = {
  id: number;
  name: string;
  location: string;
  rating: number;
  maxPlayers: number;
  price: string;
  imageUrl: string;
  infoUrl: string;
  restaurant?: boolean;
  outdoor?: boolean;
  indoor?: boolean;
  parking?: boolean;
  lights?: boolean;
  turf?: boolean;
  moreInfo?: PitchInformation;
};

export type PitchInformation = {
  oneHourSessionPrice?: string;
  twoHourSessionPrice?: string;
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
