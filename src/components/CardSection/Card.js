import React from "react";

export function Card({ card, onClick, canBuy }) {
  return (
    <div
      className={`development-card ${card.color}`}
      onClick={onClick}
      style={{
        cursor: canBuy ? "pointer" : "not-allowed",
      }}
    >
      <div className="card-points">{card.points}</div>
      <div className={`card-gem ${card.color}`}></div>
      {renderCardCost(card.cost)}
    </div>
  );
}
function renderCardCost(cost) {
    if (!cost) return null;

    return (
      <div className="card-cost">
        {Object.entries(cost).map(([color, count]) => (
            console.log(color, count),
          <div
            key={color}
            className={`token-icon ${color}`}
            data-count={count}
          ></div>
        ))}
      </div>
    );
}
