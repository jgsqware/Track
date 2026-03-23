import { useState } from "react";

const CheckCell = ({ checked, color, glow, onToggle }) => {
  const [pop, setPop] = useState(false);

  const handleClick = () => {
    setPop(true);
    onToggle();
    setTimeout(() => setPop(false), 300);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        background: checked ? color : "rgba(255,255,255,0.05)",
        boxShadow: checked ? `0 0 12px ${glow}` : "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        transform: pop ? "scale(1.35)" : "scale(1)",
        userSelect: "none",
      }}
    >
      {checked && (
        <span style={{ fontSize: 16, color: "#fff", fontWeight: 700 }}>✓</span>
      )}
    </div>
  );
};

export default CheckCell;
