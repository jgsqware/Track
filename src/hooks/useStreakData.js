import { useState, useEffect, useCallback } from "react";
import { getWeekDays } from "../utils/dates";

const STORAGE_KEY = "streak-tracker-v1";

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const save = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Merge today.json data (from sync script) into localStorage
const mergeToday = async (existing) => {
  try {
    const res = await fetch("/data/today.json");
    if (!res.ok) return existing;
    const todayData = await res.json();
    const merged = { ...existing };
    for (const [date, habits] of Object.entries(todayData)) {
      for (const [hid, val] of Object.entries(habits)) {
        if (!merged[hid]) merged[hid] = {};
        // Only overwrite if sync says completed
        if (val) merged[hid][date] = 1;
      }
    }
    return merged;
  } catch {
    return existing;
  }
};

// Demo data for first-time use
const DEMO_DATA = (() => {
  const days = getWeekDays(0);
  return {
    mq: Object.fromEntries(days.slice(0, 5).map((d) => [d.date, 1])),
    mh: Object.fromEntries(days.slice(0, 3).map((d) => [d.date, 1])),
    rp: Object.fromEntries(days.slice(0, 4).map((d) => [d.date, 1])),
  };
})();

export const useStreakData = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [data, setData] = useState(() => {
    const stored = load();
    if (Object.keys(stored).length === 0) {
      save(DEMO_DATA);
      return DEMO_DATA;
    }
    return stored;
  });

  useEffect(() => {
    mergeToday(data).then((merged) => {
      if (JSON.stringify(merged) !== JSON.stringify(data)) {
        setData(merged);
        save(merged);
      }
    });
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback(
    (habitId, dateISO) => {
      setData((prev) => {
        const habit = prev[habitId] || {};
        const next = {
          ...prev,
          [habitId]: { ...habit, [dateISO]: habit[dateISO] ? 0 : 1 },
        };
        save(next);
        return next;
      });
    },
    []
  );

  const currentWeek = getWeekDays(weekOffset);

  const setWeek = useCallback((offset) => {
    setWeekOffset(offset);
  }, []);

  return { data, toggle, setWeek, currentWeek, weekOffset };
};
