import React from "react";
import { CardRow } from "./CardRow.js";

export function CardSection({ game, currentPlayer, handleBuyCard }) {
  return (
    <div className="cards-section">
      <h3>开发卡</h3>

      {/* 第三级卡牌 */}
      <CardRow
        game={game}
        currentPlayer={currentPlayer}
        handleBuyCard={handleBuyCard}
        cardLevel={3}
      />

      {/* 第二级卡牌 */}
      <CardRow
        game={game}
        currentPlayer={currentPlayer}
        handleBuyCard={handleBuyCard}
        cardLevel={2}
      />

      {/* 第一级卡牌 */}
      <CardRow
        game={game}
        currentPlayer={currentPlayer}
        handleBuyCard={handleBuyCard}
        cardLevel={1}
      />
    </div>
  );
}