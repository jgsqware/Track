export const getWeekDays = (weekOffset = 0) => {
  const labels = ["L", "M", "M", "J", "V", "S", "D"];
  const now = new Date();
  const day = now.getDay();
  // Monday = 0 offset from start of week
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset + weekOffset * 7);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const iso = d.toISOString().split("T")[0];
    return { label: labels[i], sub: String(d.getDate()), date: iso };
  });
};

export const formatDate = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
};

export const todayISO = () => new Date().toISOString().split("T")[0];
