import { useEffect, useState } from "react";

const BarMini = ({ pct, color, glow, height = 8 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 50);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: height / 2,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: "100%",
          borderRadius: height / 2,
          background: color,
          boxShadow: `0 0 10px ${glow}`,
          transition: "width 0.8s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />
    </div>
  );
};

export default BarMini;
