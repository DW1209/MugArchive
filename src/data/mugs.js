export const MUG_DATA = [
  // ---- States ----
  { id: "CA", name: "California", category: "State" },
  { id: "CO", name: "Colorado", category: "State" },
  { id: "FL", name: "Florida", category: "State" },
  { id: "MT", name: "Montana", category: "State" },
  { id: "NM", name: "New Mexico", category: "State" },
  { id: "NV", name: "Nevada", category: "State" },
  { id: "OR", name: "Oregon", category: "State" },
  { id: "TX", name: "Texas", category: "State" },
  { id: "WA", name: "Washington", category: "State" },
  { id: "WY", name: "Wyoming", category: "State" },

  // ---- Cities ----
  { id: "austin", name: "Austin", category: "City", stateId: "TX", lat: 30.267153, lon: -97.743057 },
  { id: "denver", name: "Denver", category: "City", stateId: "CO", lat: 39.739236, lon: -104.990251 },
  { id: "las-vegas", name: "Las Vegas", category: "City", stateId: "NV", lat: 36.174969, lon: -115.137219 },
  { id: "los-angeles", name: "Los Angeles", category: "City", stateId: "CA", lat: 34.052235, lon: -118.243683 },
  { id: "monterey", name: "Monterey", category: "City", stateId: "CA", lat: 36.600238, lon: -121.894676 },
  { id: "orange-county", name: "Orange County", category: "City", stateId: "CA", lat: 33.717470, lon: -117.831142 },
  { id: "orlando", name: "Orlando", category: "City", stateId: "FL", lat: 28.538336, lon: -81.379234 },
  { id: "sacramento", name: "Sacramento", category: "City", stateId: "CA", lat: 38.581572, lon: -121.494400 },
  { id: "san-diego", name: "San Diego", category: "City", stateId: "CA", lat: 32.715736, lon: -117.161087 },
  { id: "san-francisco", name: "San Francisco", category: "City", stateId: "CA", lat: 37.774929, lon: -122.419418 },
  { id: "seattle", name: "Seattle", category: "City", stateId: "WA", lat: 47.606209, lon: -122.332069 },

  // ---- Specials ----
  { id: "disney-world-animal-kingdom", name: "Animal Kingdom", category: "Special", group: "Disney World", stateId: "FL", lat: 28.3553, lon: -81.5900 },
  { id: "disney-world-epcot", name: "EPCOT", category: "Special", group: "Disney World", stateId: "FL", lat: 28.3747, lon: -81.5494 },
  { id: "disney-world-hollywood-studios", name: "Hollywood Studios", category: "Special", group: "Disney World", stateId: "FL", lat: 28.3575, lon: -81.5587 },
  { id: "disney-world-magic-kingdom", name: "Magic Kingdom", category: "Special", group: "Disney World", stateId: "FL", lat: 28.4177, lon: -81.5812 },
  { id: "lake-tahoe", name: "Lake Tahoe", category: "Special", stateId: "CA", lat: 39.0968, lon: -120.0324 },
  { id: "universal-studios-hollywood", name: "Universal Studios Hollywood", category: "Special", stateId: "CA", lat: 34.138116, lon: -118.353378 },
];

export const CATEGORY_LABELS = [
  { key: "All", label: "All" },
  { key: "State", label: "States" },
  { key: "City", label: "Cities" },
  { key: "Special", label: "Special" },
];
