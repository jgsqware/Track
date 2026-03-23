import { THEME, HABITS } from "../data/habits";
import CheckCell from "./CheckCell";

const Grid = ({ data, currentWeek, toggle }) => {
  const dayTotals = currentWeek.map((day) =>
    HABITS.filter((h) => data[h.id]?.[day.date]).length
  );

  const totalColor = (n) => {
    if (n === 3) return THEME.green;
    if (n === 2) return THEME.gold;
    if (n >= 1) return THEME.red;
    return THEME.textDim;
  };

  return (
    <div
      style={{
        background: THEME.bgCard,
        borderRadius: 14,
        padding: 16,
        border: `1px solid ${THEME.border}`,
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "6px 4px",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 120 }} />
            {currentWeek.map((day) => (
              <th
                key={day.date}
                style={{
                  color: THEME.gold,
                  fontSize: 13,
                  fontWeight: 600,
                  textAlign: "center",
                  padding: "4px 0 8px",
                }}
              >
                <div>{day.label}</div>
                <div style={{ fontSize: 11, color: THEME.textDim }}>
                  {day.sub}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HABITS.map((h, idx) => (
            <tr
              key={h.id}
              style={{
                background: idx % 2 === 0 ? THEME.bgRow1 : THEME.bgRow2,
                borderRadius: 8,
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  idx % 2 === 0 ? THEME.bgRow1 : THEME.bgRow2)
              }
            >
              <td
                style={{
                  padding: "8px 10px",
                  color: THEME.text,
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: "8px 0 0 8px",
                }}
              >
                <span style={{ marginRight: 6 }}>{h.icon}</span>
                {h.name}
              </td>
              {currentWeek.map((day) => (
                <td key={day.date} style={{ textAlign: "center", padding: 4 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCell
                      checked={!!data[h.id]?.[day.date]}
                      color={h.color}
                      glow={h.glow}
                      onToggle={() => toggle(h.id, day.date)}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
          {/* Totals row */}
          <tr>
            <td
              style={{
                padding: "8px 10px",
                color: THEME.textMid,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              TOTAL
            </td>
            {dayTotals.map((n, i) => (
              <td
                key={i}
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: totalColor(n),
                  padding: 4,
                }}
              >
                {n}/{HABITS.length}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
