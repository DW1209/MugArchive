# MugArchive
A modern, interactive React web app for tracking and exploring your Starbucks Discovery Series Ornaments collection. This project visualizes your collection on an interactive US map, lets you browse by category, and displays beautiful mug cards.

## Website
- https://dw1209.github.io/MugArchive/

## Features
- **Interactive US Map**
  - Hover a state to highlight it and show the state name
  - Visual markers for cities and special locations
  - See your entire collection plotted geographically
- **Collection Dashboard**
  - Shows total item count and category breakdown
  - Live stats: States, Cities, and Special items
- **Smart Filtering**
  - Search by mug name
  - Filter by category: All / States / Cities / Special
  - Quick clear filters option
- **Dual View Modes**
  - **Grid View**: Browse beautiful cards with details
  - **Map View**: Visualize your collection geographically
- **Beautiful Mug Cards**
  - Category badges with color coding
  - State abbreviations for state mugs
  - Location context (state or group)
  - Clean, modern design with hover effects
- **Responsive UI**
  - Desktop: Full-featured interface with optimized layout
  - Mobile/tablet: Touch-friendly interactions
  - Smooth transitions and animations

## Tech Stack
- Vite: `^7.2.4`
- React: `^19.2.0`
- React DOM: `^19.2.0`
- Tailwind CSS: `^4.1.18`
- Icons: `lucide-react ^0.563.0`
- ESLint (flat config) with React Hooks + React Refresh plugins

## Project Structure
```
├── public/
│   └── mug.png                     # Tab icon
├── src/
│   ├── components/
│   │   ├── ControlsBar.jsx         # Search and filter controls
│   │   ├── Header.jsx              # Application header with stats
│   │   ├── MugCard.jsx             # Individual mug card component
│   │   ├── MugGrid.jsx             # Grid layout for mug cards
│   │   └── USMap.jsx               # Interactive US map
│   ├── data/
│   │   ├── mugs.js                 # Starbucks mugs dataset
│   │   └── usStates.js             # US states data
│   ├── utils/
│   │   └── projection.js           # Coordinate projection (lat/lon to map)
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Root application component
│   └── index.css                   # Global styles
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
└── eslint.config.js                # ESLint configuration
```

## Getting Started
### Prerequisites
- Node.js: `20.19+`
- npm package manager

### Installation
1. Clone the repository:
```bash
git clone https://github.com/DW1209/MugArchive.git
cd MugArchive
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`

## Available Scripts
- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Key Features
### Interactive Map
The application features an interactive SVG map of the United States. Users can:
- Hover over states to see state names
- View city and special location markers plotted by coordinates
- Toggle between grid and map views seamlessly
- Visualize the geographic distribution of their collection

### Category System
Three main categories organize the collection:
- **States**: State-themed mugs with abbreviation badges
- **Cities**: City-specific mugs with geographic coordinates
- **Special**: Special edition mugs (Disney World parks, Universal Studios, etc.)

### Smart Search & Filtering
The controls bar provides:
- Real-time search across all mug names
- Category filtering with live count updates
- One-click filter clearing
- View mode toggle (grid/map)

### Responsive Layout
The interface adapts to different screen sizes:
- Desktop: Full-featured interface with optimal spacing
- Tablet: Touch-optimized controls and cards
- Mobile: Compact layout with smooth animations
- Smooth view transitions with fade animations

## Data Customization
Users can edit the mugs dataset in [src/data/mugs.js](src/data/mugs.js) to update their collection:
- Add new mugs to track
- Update categories and names
- Set coordinates for city/special locations
- Organize by groups (e.g., Disney World collection)

## Data Structure
Each mug in [src/data/mugs.js](src/data/mugs.js) is stored with the following information:
- **id**: Unique identifier (slug or state code)
- **name**: Mug name/location
- **category**: "State", "City", or "Special"
- **stateId**: (Optional) Associated state code for cities/special items
- **lat/lon**: (Optional) Geographic coordinates for map plotting
- **group**: (Optional) Collection group name (e.g., "Disney World")

### Example Data Entries
```javascript
// State Mug
{ 
  id: "CA", 
  name: "California", 
  category: "State"
}

// City Mug
{ 
  id: "san-francisco", 
  name: "San Francisco", 
  category: "City", 
  stateId: "CA", 
  lat: 37.774929, 
  lon: -122.419418 
}

// Special Mug
{ 
  id: "disney-world-magic-kingdom", 
  name: "Magic Kingdom", 
  category: "Special", 
  group: "Disney World", 
  stateId: "FL", 
  lat: 28.4177, 
  lon: -81.5812 
}
```

## Browser Support
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements
Potential features for future versions:
- Photo uploads for each mug
- Purchase date and location tracking
- Collection value estimation
- Import/export collection data
- Dark mode support
- Share collection link with friends

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Data Attribution
- Base SVG map is sourced from [amCharts SVG Maps](https://www.amcharts.com/svg-maps/)
- Starbucks Discovery Series is a trademark of Starbucks Corporation
