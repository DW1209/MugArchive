import { Coffee } from "lucide-react";
import MugCard from "./MugCard";

export default function MugGrid({ items, onClearFilters }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <Coffee className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 serif-font">No mugs found</h3>
        <p className="text-gray-500 mt-2">Try different keywords or clear the filters.</p>
        <button
          onClick={onClearFilters}
          className="mt-6 px-4 py-2 text-sm font-medium text-[#00704A] bg-[#00704A]/10 rounded-full hover:bg-[#00704A]/20 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((mug) => (
        <MugCard key={mug.id} mug={mug} />
      ))}
    </div>
  );
}
