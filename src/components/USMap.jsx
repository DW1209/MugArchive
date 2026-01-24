import { useMemo, useState, useRef, useCallback } from "react";
import { US_STATES } from "../data/usStates";
import { projectLatLonToUsMapXY } from "../utils/projection";

export default function USMap({ items = [] }) {
  const wrapRef = useRef(null);
  const [tip, setTip] = useState(null);

  const showTip = useCallback((e, label) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rawX = e.clientX - rect.left + 12;
    const rawY = e.clientY - rect.top + 12;
    const TIP_W = 220;
    const TIP_H = 44;
    const x = Math.max(8, Math.min(rawX, rect.width - TIP_W - 8));
    const y = Math.max(8, Math.min(rawY, rect.height - TIP_H - 8));
    setTip({ x, y, label });
  }, []);

  const hideTip = useCallback(() => setTip(null), []);
  const ownedStateSet = useMemo(() => {
    return new Set(items.filter((m) => m.category === "State").map((m) => m.id));
  }, [items]);

  const markers = useMemo(() => {
    const groupMap = new Map(); // key: group name, value: array of items
    const singles = [];
    for (const m of items) {
      if (typeof m.lat !== "number" || typeof m.lon !== "number") continue;
      if (m.group) {
        const key = m.group;
        if (!groupMap.has(key)) groupMap.set(key, []);
        groupMap.get(key).push(m);
      } else {
        singles.push(m);
      }
    }

    // Build grouped markers (one per group)
    const groupedMarkers = Array.from(groupMap.entries()).map(([groupName, list]) => {
      // Representative coordinate: centroid (average lat/lon)
      const lat = list.reduce((sum, a) => sum + a.lat, 0) / list.length;
      const lon = list.reduce((sum, a) => sum + a.lon, 0) / list.length;
      const { x, y } = projectLatLonToUsMapXY(lat, lon);
      return { id: `group:${groupName}`, name: groupName, category: "Special", isGroup: true, count: list.length, x, y};
    });

    // Build single markers
    const singleMarkers = singles.map((m) => {
      const { x, y } = projectLatLonToUsMapXY(m.lat, m.lon);
      return { ...m, x, y, isGroup: false };
    });

    const priority = (m) => {
      if (m.category === "Special") return 0;
      if (m.category === "City") return 1;
      return 2;
    };

    return [...groupedMarkers, ...singleMarkers].sort((a, b) => priority(a) - priority(b));
  }, [items]);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden bg-white/50 rounded-xl border border-gray-100 p-3 sm:p-4 shadow-inner">
      {/* On small screens, allow horizontal scroll instead of shrinking too much */}
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <svg viewBox="0 0 1000 589" className="block w-full h-auto min-w-[760px] sm:min-w-0">
          {/* States */}
          <g>
            {US_STATES.map((s) => {
              const owned = ownedStateSet.has(s.id);
              return (
                <path
                  key={s.id}
                  d={s.d}
                  className={`map-state ${owned ? "collected" : ""}`}
                  onMouseEnter={(e) => showTip(e, s.n)}
                  onMouseMove={(e) => showTip(e, s.n)}
                  onMouseLeave={hideTip}
                />
              );
            })}
          </g>

          {/* Cities / Specials */}
          <g>
            {markers.map((m) => {
              const isSpecial = m.category === "Special";
              return (
                <g key={m.id} className="map-city-group">
                  <circle cx={m.x} cy={m.y} r={5} className={`map-city collected ${isSpecial ? "special" : ""}`} />
                  <text x={m.x} y={m.y - (m.isGroup ? 12 : 10)} className="map-city-label">
                    {m.isGroup ? `${m.name} (${m.count})` : m.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
        {tip && (
          <div 
          className="pointer-events-none absolute z-50 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 shadow-lg backdrop-blur" 
          style={{ left: tip.x, top: tip.y }}
          >
            <div className="font-semibold text-gray-900">{tip.label}</div>
          </div>
        )}
      </div>
    </div>
  );
}
