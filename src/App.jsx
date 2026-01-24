import { useMemo, useState } from "react";
import { MUG_DATA } from "./data/mugs";

import Header from "./components/Header";
import ControlsBar from "./components/ControlsBar";
import USMap from "./components/USMap";
import MugGrid from "./components/MugGrid";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'map'
  const ownedIds = useMemo(() => MUG_DATA.map((m) => m.id), []);
  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("All");
  };

  const filteredMugs = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();
    return MUG_DATA.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(s);
      const matchesCategory = filterCategory === "All" || m.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory]);

  return (
    <div className="min-h-screen pb-20">
      <Header items={MUG_DATA} />
      <ControlsBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {viewMode === "map" ? (
          <div className="animate-fade-in">
            <USMap items={MUG_DATA} />
          </div>
        ) : (
          <MugGrid
            items={filteredMugs}
            collected={ownedIds}
            onClearFilters={clearFilters}
          />
        )}
      </main>
    </div>
  );
}
