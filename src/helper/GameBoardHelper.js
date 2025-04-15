import React from "react";

// 检查玩家是否能购买卡牌
export const canBuyCard = (card, playerTokens, playerCards) => {
  if (!card || !card.cost) return false;

  // 计算玩家的宝石生产能力
  const playerGems = {};
  playerCards.forEach((card) => {
    if (!playerGems[card.color]) playerGems[card.color] = 0;
    playerGems[card.color]++;
  });

  // 检查每种颜色的代币是否足够
  for (const [color, count] of Object.entries(card.cost)) {
    const tokensRequired = count - (playerGems[color] || 0);
    if (tokensRequired > 0) {
      // 检查普通代币 + 黄金代币是否足够
      const availableTokens = playerTokens[color] || 0;
      if (availableTokens < tokensRequired) {
        // 检查黄金代币是否可以补足差距
        const goldRequired = tokensRequired - availableTokens;
        if ((playerTokens.gold || 0) < goldRequired) {
          return false;
        }
      }
    }
  }

  return true;
};


// 获取卡牌花费的显示
export const renderCardCost = (cost) => {
    if (!cost) return null;

    return (
      <div className="card-cost">
        {Object.entries(cost).map(([color, count]) => (
          <div
            key={color}
            className={`token-icon ${color}`}
            data-count={count}
          ></div>
        ))}
      </div>
    );
  };