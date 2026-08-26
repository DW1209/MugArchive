import { useMemo, useState } from "react";
import { useMugs } from "./hooks/useMugs";

import Header from "./components/Header";
import ControlsBar from "./components/ControlsBar";
import USMap from "./components/USMap";
import MugGrid from "./components/MugGrid";

export default function App() {
  const { mugs } = useMugs();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'map'
  const ownedIds = useMemo(() => mugs.map((m) => m.id), [mugs]);
  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("All");
  };

  const filteredMugs = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();
    return mugs.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(s);
      const matchesCategory = filterCategory === "All" || m.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [mugs, searchTerm, filterCategory]);

  return (
    <div className="min-h-screen pb-20">
      <Header items={mugs} />
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
            <USMap items={mugs} />
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
