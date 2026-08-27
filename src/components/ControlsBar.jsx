import { useLayoutEffect, useRef, useState } from "react";
import { LayoutGrid, Map as MapIcon, Search } from "lucide-react";
import { CATEGORY_LABELS } from "../data/mugs";

const VIEW_KEYS = ["grid", "map"];
const CATEGORY_KEYS = CATEGORY_LABELS.map((c) => c.key);

// Measures every button's position up front (on mount/resize) so that switching
// the active key is a synchronous lookup at render time, not a follow-up effect —
// keeping the sliding highlight and the button's own color change in the same paint.
function useTabPositions(refsMap, keys) {
  const [positions, setPositions] = useState({});

  useLayoutEffect(() => {
    function measure() {
      const next = {};
      for (const key of keys) {
        const el = refsMap.current[key];
        if (el) next[key] = { left: el.offsetLeft, width: el.offsetWidth };
      }
      setPositions(next);
    }
    measure();
    // Re-measure once web fonts finish loading — the initial pass can run against
    // a fallback font (wider/narrower than "Plus Jakarta Sans"), leaving the
    // indicator sized for text that has since reflowed.
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [refsMap, keys]);

  return positions;
}

export default function ControlsBar({ viewMode, setViewMode, filterCategory, setFilterCategory, searchTerm, setSearchTerm }) {
  const tabRefs = useRef({});
  const tabPositions = useTabPositions(tabRefs, CATEGORY_KEYS);
  const tabIndicator = tabPositions[filterCategory] ?? { left: 0, width: 0 };

  const viewRefs = useRef({});
  const viewPositions = useTabPositions(viewRefs, VIEW_KEYS);
  const viewIndicator = viewPositions[viewMode] ?? { left: 0, width: 0 };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Tabs (filter) */}
        <div className="relative flex p-1 bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto w-full md:w-auto">
          <span
            className="absolute inset-y-1 rounded-md bg-[#00704A] transition-all duration-300 ease-out"
            style={{ left: tabIndicator.left, width: tabIndicator.width }}
          />
          {CATEGORY_LABELS.map((c) => (
            <button
              key={c.key}
              ref={(el) => (tabRefs.current[c.key] = el)}
              onClick={() => setFilterCategory(c.key)}
              className={`relative z-10 flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-center whitespace-nowrap transition-colors duration-300 ease-out ${
                filterCategory === c.key ? "text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* View Toggle (display mode, kept visually lighter than the filter) */}
          <div className="relative flex items-center gap-1 bg-gray-100 rounded-full p-1 shrink-0">
            <span
              className="absolute inset-y-1 rounded-full bg-white shadow-sm transition-all duration-300 ease-out"
              style={{ left: viewIndicator.left, width: viewIndicator.width }}
            />
            <button
              ref={(el) => (viewRefs.current.grid = el)}
              onClick={() => setViewMode("grid")}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ease-out ${
                viewMode === "grid" ? "text-[#00704A]" : "text-gray-500 hover:text-gray-700"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              ref={(el) => (viewRefs.current.map = el)}
              onClick={() => setViewMode("map")}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ease-out ${
                viewMode === "map" ? "text-[#00704A]" : "text-gray-500 hover:text-gray-700"
              }`}
              title="Map View"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 md:w-72">
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
    </div>
  );
}
