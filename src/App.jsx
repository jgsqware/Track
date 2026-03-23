import { useState } from "react";
import { THEME, HABITS } from "./data/habits";
import { useStreakData } from "./hooks/useStreakData";
import { calcStreak } from "./utils/streak";
import { todayISO } from "./utils/dates";
import Dashboard from "./components/Dashboard";
import Grid from "./components/Grid";
import Stats from "./components/Stats";

const TABS = ["Dashboard", "Grille", "Stats"];

const App = () => {
  const { data, toggle, setWeek, currentWeek, weekOffset } = useStreakData();
  const [tab, setTab] = useState(0);

  const today = todayISO();
  const todayDone = HABITS.filter((h) => data[h.id]?.[today]).length;
  const weekLabel = weekOffset === 0
    ? "Semaine courante"
    : `Semaine ${weekOffset > 0 ? "+" : ""}${weekOffset}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: THEME.bgBase,
        color: THEME.text,
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "fixed",
          top: -120,
          left: -80,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -100,
          right: -60,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <header
        style={{
          padding: "20px 24px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            {"\uD83D\uDD25"} Streak Tracker
          </h1>
          <div style={{ color: THEME.textDim, fontSize: 13, marginTop: 4 }}>
            {weekLabel} &middot; {currentWeek[0].sub}\u2013{currentWeek[6].sub}
          </div>
        </div>
        <div
          style={{
            background: todayDone === HABITS.length
              ? "rgba(16,185,129,0.15)"
              : "rgba(255,255,255,0.06)",
            color: todayDone === HABITS.length ? THEME.green : THEME.textMid,
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Aujourd&apos;hui {todayDone}/{HABITS.length}
        </div>
      </header>

      {/* Streak pills */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "0 24px 14px",
          overflowX: "auto",
        }}
      >
        {HABITS.map((h) => {
          const streak = calcStreak(data[h.id]);
          return (
            <div
              key={h.id}
              style={{
                flex: 1,
                minWidth: 90,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 12,
                padding: "10px 14px",
                textAlign: "center",
                border: `1px solid ${THEME.border}`,
              }}
            >
              <div style={{ fontSize: 14 }}>{h.icon}</div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: h.color,
                  textShadow: `0 0 14px ${h.glow}`,
                  lineHeight: 1.1,
                }}
              >
                {streak}
              </div>
              <div style={{ fontSize: 10, color: THEME.textDim }}>jours</div>
            </div>
          );
        })}
      </div>

      {/* Week navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          padding: "0 24px 10px",
        }}
      >
        <button
          onClick={() => setWeek(weekOffset - 1)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "none",
            color: THEME.textMid,
            borderRadius: 8,
            padding: "4px 12px",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          \u25C0
        </button>
        <button
          onClick={() => setWeek(0)}
          style={{
            background: weekOffset === 0 ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)",
            border: "none",
            color: weekOffset === 0 ? THEME.green : THEME.textMid,
            borderRadius: 8,
            padding: "4px 12px",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Cette semaine
        </button>
        <button
          onClick={() => setWeek(weekOffset + 1)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "none",
            color: THEME.textMid,
            borderRadius: 8,
            padding: "4px 12px",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          \u25B6
        </button>
      </div>

      {/* Tab bar */}
      <nav
        style={{
          display: "flex",
          gap: 0,
          padding: "0 24px 16px",
        }}
      >
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              flex: 1,
              padding: "10px 0",
              background:
                tab === i ? "rgba(255,255,255,0.08)" : "transparent",
              border: "none",
              borderBottom:
                tab === i
                  ? `2px solid ${THEME.gold}`
                  : "2px solid transparent",
              color: tab === i ? THEME.text : THEME.textDim,
              fontSize: 14,
              fontWeight: tab === i ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {t}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main style={{ padding: "0 24px 80px" }}>
        {tab === 0 && (
          <Dashboard data={data} currentWeek={currentWeek} toggle={toggle} />
        )}
        {tab === 1 && (
          <Grid data={data} currentWeek={currentWeek} toggle={toggle} />
        )}
        {tab === 2 && (
          <Stats data={data} currentWeek={currentWeek} toggle={toggle} />
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px 24px",
          background: `linear-gradient(transparent, ${THEME.bgBase})`,
          textAlign: "center",
          color: THEME.textDim,
          fontSize: 11,
          pointerEvents: "none",
        }}
      >
        Streak Tracker &middot; Dark Mode
      </footer>
    </div>
  );
};

export default App;
