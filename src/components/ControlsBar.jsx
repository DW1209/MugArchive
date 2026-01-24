import { LayoutGrid, Map as MapIcon, Search } from "lucide-react";
import { CATEGORY_LABELS } from "../data/mugs";

export default function ControlsBar({ viewMode, setViewMode, filterCategory, setFilterCategory, searchTerm, setSearchTerm }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          {/* View Toggle */}
          <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                viewMode === "grid" ? "bg-[#00704A] text-white" : "text-gray-500 hover:bg-gray-50"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm font-medium">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                viewMode === "map" ? "bg-[#00704A] text-white" : "text-gray-500 hover:bg-gray-50"
              }`}
              title="Map View"
            >
              <MapIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Map</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex p-1 bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
            {CATEGORY_LABELS.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilterCategory(c.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  filterCategory === c.key
                    ? "bg-[#00704A] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00704A] focus:border-[#00704A] sm:text-sm transition-shadow shadow-sm"
            placeholder="Search mugs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
