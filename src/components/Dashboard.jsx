import { THEME, HABITS } from "../data/habits";
import { calcStreak, calcPct, calcTotal } from "../utils/streak";
import BarMini from "./BarMini";

const Dashboard = ({ data, currentWeek, toggle }) => {
  const totalPossible = HABITS.length * 7;
  const totalDone = HABITS.reduce(
    (sum, h) => sum + calcTotal(data[h.id], currentWeek),
    0
  );
  const overallPct = Math.round((totalDone / totalPossible) * 100);

  // Daily bar chart data
  const dailyScores = currentWeek.map((day) => {
    const done = HABITS.filter((h) => data[h.id]?.[day.date]).length;
    return { ...day, done };
  });

  const barColor = (done) => {
    if (done === 3) return THEME.green;
    if (done === 2) return THEME.gold;
    if (done === 1) return "#EC4899";
    return "rgba(255,255,255,0.04)";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div
          style={{
            background: THEME.bgCard,
            borderRadius: 14,
            padding: "18px 20px",
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div style={{ color: THEME.textDim, fontSize: 12, marginBottom: 6 }}>
            TOTAL SEMAINE
          </div>
          <div style={{ color: THEME.text, fontSize: 32, fontWeight: 700 }}>
            {totalDone}
            <span style={{ fontSize: 16, color: THEME.textDim }}>
              /{totalPossible}
            </span>
          </div>
        </div>
        <div
          style={{
            background: THEME.bgCard,
            borderRadius: 14,
            padding: "18px 20px",
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div style={{ color: THEME.textDim, fontSize: 12, marginBottom: 6 }}>
            COMPL\u00c9TION
          </div>
          <div
            style={{
              color: overallPct >= 80 ? THEME.green : THEME.gold,
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            {overallPct}%
          </div>
        </div>
      </div>

      {/* Habit cards */}
      {HABITS.map((h) => {
        const streak = calcStreak(data[h.id]);
        const pct = calcPct(data[h.id], currentWeek);
        return (
          <div
            key={h.id}
            style={{
              background: THEME.bgCard,
              borderRadius: 14,
              padding: "18px 20px",
              border: `1px solid ${THEME.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <div>
                <span style={{ fontSize: 18, marginRight: 8 }}>{h.icon}</span>
                <span style={{ color: THEME.text, fontWeight: 600 }}>
                  {h.name}
                </span>
                <div style={{ color: THEME.textDim, fontSize: 12, marginTop: 2 }}>
                  {h.list}
                </div>
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: h.color,
                  textShadow: `0 0 16px ${h.glow}`,
                }}
              >
                {streak}
                <span style={{ fontSize: 12, color: THEME.textDim }}> j</span>
              </div>
            </div>
            <BarMini pct={pct} color={h.color} glow={h.glow} />
            {/* Day dots */}
            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              {currentWeek.map((day) => (
                <div
                  key={day.date}
                  onClick={() => toggle(h.id, day.date)}
                  style={{
                    width: 28,
                    height: 10,
                    borderRadius: 4,
                    background: data[h.id]?.[day.date]
                      ? h.color
                      : "rgba(255,255,255,0.06)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Daily bar chart */}
      <div
        style={{
          background: THEME.bgCard,
          borderRadius: 14,
          padding: "18px 20px",
          border: `1px solid ${THEME.border}`,
        }}
      >
        <div
          style={{
            color: THEME.textDim,
            fontSize: 12,
            marginBottom: 14,
          }}
        >
          SCORE QUOTIDIEN
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
            height: 80,
          }}
        >
          {dailyScores.map((d) => (
            <div
              key={d.date}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${Math.max((d.done / 3) * 60, 4)}px`,
                  borderRadius: 4,
                  background: barColor(d.done),
                  transition: "height 0.5s ease",
                }}
              />
              <span style={{ fontSize: 10, color: THEME.textDim }}>
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
