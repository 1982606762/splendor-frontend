import React from "react";
import { canBuyCard } from "../../helper/GameBoardHelper";
import { Card } from "./Card";

// 包含卡牌行的组件
export function CardRow({ game, currentPlayer, cardLevel, handleBuyCard }) {
  return (
    <div className="card-row">
      <div className={`card-deck level${cardLevel}`}>Lv{cardLevel}</div>
      {game.game_state.cards.board[`level${cardLevel}`].map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => {
            if (canBuyCard(currentPlayer, card)) {
              handleBuyCard(card);
            }
          }}
          canBuy={canBuyCard(currentPlayer, card)}
        />
    ))}
  </div>
  );
}
