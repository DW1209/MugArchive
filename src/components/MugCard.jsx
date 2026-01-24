import { US_STATES } from "../data/usStates";

function getStateAbbr(mug) {
  if (mug.category !== "State") return "";
  return String(mug.id || "").toUpperCase();
}

function chipDotClass(category) {
  if (category === "State") return "bg-[var(--sb-green)]";
  if (category === "City") return "bg-[var(--latte-gold)]";
  return "bg-[var(--espresso)]";
}

export default function MugCard({ mug }) {
  const stateAbbr = getStateAbbr(mug);
  const STATE_NAME_BY_ID = Object.fromEntries(US_STATES.map((s) => [s.id, s.n]));
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative p-5">
        {/* top row */}
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-gray-200 bg-white/70">
            <span className={`w-2 h-2 rounded-full ${chipDotClass(mug.category)}`} />
            <span className="text-xs font-semibold tracking-wide text-gray-600">
              {mug.category === "State" ? "STATE" : mug.category === "City" ? "CITY" : "SPECIAL"}
            </span>
          </div>
          {mug.category === "State" && (
            <div className="text-sm font-semibold text-gray-400 tracking-wider">
              {stateAbbr}
            </div>
          )}
        </div>

        {/* main text */}
        <div className="mt-6">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 serif-font leading-snug line-clamp-2 min-h-[3.2rem]">
            {mug.name}
          </div>

          {/* subtle meta line */}
          <div className="mt-1 text-sm text-gray-500">
            {mug.category === "State"
              ? "United States"
              : mug.category === "City"
                ? STATE_NAME_BY_ID[mug.stateId] ?? "United States"
                : mug.group ?? STATE_NAME_BY_ID[mug.stateId] ?? "Special"}
          </div>
        </div>
      </div>
    </div>
  );
}
