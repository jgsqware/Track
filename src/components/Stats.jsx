import { THEME, HABITS } from "../data/habits";
import { calcStreak, calcPct, calcTotal } from "../utils/streak";
import BarMini from "./BarMini";
import CheckCell from "./CheckCell";

const statusBadge = (streak) => {
  if (streak >= 5) return { label: "\uD83D\uDD25 En feu", bg: "rgba(239,68,68,0.15)", color: "#EF4444" };
  if (streak >= 3) return { label: "\uD83D\uDCAA Momentum", bg: "rgba(245,158,11,0.15)", color: "#F59E0B" };
  if (streak > 0)  return { label: "\uD83C\uDF31 D\u00e9marrage", bg: "rgba(16,185,129,0.15)", color: "#10B981" };
  return { label: "\uD83D\uDE34 Break", bg: "rgba(100,116,139,0.15)", color: "#64748B" };
};

const Stats = ({ data, currentWeek, toggle }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {HABITS.map((h) => {
        const streak = calcStreak(data[h.id]);
        const pct = calcPct(data[h.id], currentWeek);
        const total = calcTotal(data[h.id], currentWeek);
        const badge = statusBadge(streak);

        return (
          <div
            key={h.id}
            style={{
              background: THEME.bgCard,
              borderRadius: 14,
              padding: "20px 22px",
              border: `1px solid ${THEME.border}`,
              borderLeft: `3px solid ${h.color}`,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <div>
                <span style={{ fontSize: 20, marginRight: 8 }}>{h.icon}</span>
                <span
                  style={{ color: THEME.text, fontWeight: 700, fontSize: 16 }}
                >
                  {h.name}
                </span>
              </div>
              <span
                style={{
                  background: badge.bg,
                  color: badge.color,
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {badge.label}
              </span>
            </div>

            {/* KPI cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
                marginBottom: 14,
              }}
            >
              {[
                { label: "STREAK", value: `${streak}j`, color: h.color },
                { label: "COMPL\u00c9TION", value: `${pct}%`, color: THEME.green },
                { label: "TOTAL", value: `${total}/7`, color: THEME.gold },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 10,
                    padding: "10px 12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: THEME.textDim,
                      marginBottom: 4,
                    }}
                  >
                    {kpi.label}
                  </div>
                  <div
                    style={{ fontSize: 22, fontWeight: 800, color: kpi.color }}
                  >
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <BarMini pct={pct} color={h.color} glow={h.glow} height={6} />

            {/* Day dots with labels */}
            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: 12,
                justifyContent: "center",
              }}
            >
              {currentWeek.map((day) => (
                <div
                  key={day.date}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <CheckCell
                    checked={!!data[h.id]?.[day.date]}
                    color={h.color}
                    glow={h.glow}
                    onToggle={() => toggle(h.id, day.date)}
                  />
                  <span style={{ fontSize: 9, color: THEME.textDim }}>
                    {day.label}{day.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
