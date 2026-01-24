export default function Header({ items = [] }) {
  const total = items.length;
  const counts = items.reduce(
    (acc, m) => {
      if (m.category === "State") acc.state += 1;
      else if (m.category === "City") acc.city += 1;
      else if (m.category === "Special") acc.special += 1;
      return acc;
    },
    { state: 0, city: 0, special: 0 }
  );

  const breakdown = `${counts.state} States · ${counts.city} Cities · ${counts.special} Special`;
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-cream)]/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold tracking-widest text-[var(--sb-green)] uppercase mb-1">
              Starbucks Collection
            </h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 serif-font">
              Discovery Series Ornaments
            </h1>
          </div>

          {/* Mobile: left aligned; Desktop: right aligned */}
          <div className="md:text-right">
            <div className="flex items-baseline gap-2 md:justify-end">
              <span className="text-2xl sm:text-3xl font-bold serif-font text-gray-900">
                {total}
              </span>
              <span className="text-gray-500 font-medium">
                items in collection
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500">{breakdown}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
