import { todayISO } from "./dates";

export const calcStreak = (habitData) => {
  if (!habitData) return 0;
  let streak = 0;
  const d = new Date(todayISO() + "T00:00:00");
  while (true) {
    const iso = d.toISOString().split("T")[0];
    if (habitData[iso]) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};

export const calcPct = (habitData, days) => {
  if (!habitData || !days || days.length === 0) return 0;
  const done = days.filter((d) => habitData[d.date]).length;
  return Math.round((done / days.length) * 100);
};

export const calcTotal = (habitData, days) => {
  if (!habitData || !days) return 0;
  return days.filter((d) => habitData[d.date]).length;
};
