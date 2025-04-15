import React, { useState } from "react";
import { mockGame } from "../data/mockData";
import "../styles/GameBoard.css";
import { canBuyCard, renderCardCost } from "../helper/GameBoardHelper";
import { CardSection } from "./CardSection/CardSection.js";
function GameBoard() {
  const [game, setGame] = useState(mockGame);
  const [selectedTokens, setSelectedTokens] = useState({
    white: 0,
    blue: 0,
    green: 0,
    red: 0,
    black: 0,
    gold: 0,
  });
  console.log("GameBoard", game);
  // 当前玩家
  const currentPlayer = game.players.find((player) => player.is_current);

  // 处理选择代币的操作
  const handleTokenSelect = (color) => {
    if (selectedTokens[color] < 2 && game.game_state.tokens[color] > 0) {
      // 检查是否已经选择了3种代币
      const totalSelected = Object.values(selectedTokens).reduce(
        (a, b) => a + b,
        0
      );
      if (totalSelected < 3 || selectedTokens[color] > 0) {
        setSelectedTokens({
          ...selectedTokens,
          [color]: selectedTokens[color] + 1,
        });
      }
    }
  };

  // 处理取消选择代币的操作
  const handleTokenUnselect = (color) => {
    if (selectedTokens[color] > 0) {
      setSelectedTokens({
        ...selectedTokens,
        [color]: selectedTokens[color] - 1,
      });
    }
  };

  // 处理拿取代币的操作
  const handleTakeTokens = () => {
    // 验证拿取代币的规则
    const totalSelected = Object.values(selectedTokens).reduce(
      (a, b) => a + b,
      0
    );

    if (totalSelected === 0) return;

    // 模拟拿取代币的操作
    const newGame = { ...game };

    // 更新游戏代币状态
    Object.keys(selectedTokens).forEach((color) => {
      if (selectedTokens[color] > 0) {
        newGame.game_state.tokens[color] -= selectedTokens[color];

        // 更新当前玩家的代币
        const playerIndex = newGame.players.findIndex((p) => p.is_current);
        newGame.players[playerIndex].player_state.tokens[color] +=
          selectedTokens[color];
      }
    });

    console.log("setting game", newGame);
    setGame(newGame);
    setSelectedTokens({
      white: 0,
      blue: 0,
      green: 0,
      red: 0,
      black: 0,
      gold: 0,
    });

    // 实际游戏中这里会切换到下一个玩家
  };



  // 处理购买卡牌的操作
  const handleBuyCard = (card, level, index) => {
    if (
      !canBuyCard(
        card,
        currentPlayer.player_state.tokens,
        currentPlayer.player_state.cards
      )
    ) {
      alert("您没有足够的代币购买这张卡牌！");
      return;
    }

    const newGame = { ...game };
    const playerIndex = newGame.players.findIndex((p) => p.is_current);

    // 计算玩家的宝石生产能力
    const playerGems = {};
    currentPlayer.player_state.cards.forEach((card) => {
      if (!playerGems[card.color]) playerGems[card.color] = 0;
      playerGems[card.color]++;
    });

    // 为每种颜色计算需要支付的代币
    const tokensToSpend = {};
    for (const [color, count] of Object.entries(card.cost)) {
      const tokensRequired = count - (playerGems[color] || 0);
      if (tokensRequired > 0) {
        // 先用普通代币
        const availableTokens = currentPlayer.player_state.tokens[color] || 0;
        if (availableTokens >= tokensRequired) {
          tokensToSpend[color] = tokensRequired;
        } else {
          // 用普通代币 + 黄金代币
          tokensToSpend[color] = availableTokens;
          const goldRequired = tokensRequired - availableTokens;
          if (!tokensToSpend.gold) tokensToSpend.gold = 0;
          tokensToSpend.gold += goldRequired;
        }
      }
    }

    // 更新玩家的代币
    for (const [color, count] of Object.entries(tokensToSpend)) {
      newGame.players[playerIndex].player_state.tokens[color] -= count;
      newGame.game_state.tokens[color] += count;
    }

    // 添加卡牌到玩家的卡组
    newGame.players[playerIndex].player_state.cards.push(card);

    // 更新玩家的分数
    newGame.players[playerIndex].score += card.points || 0;

    // 从游戏板上移除卡牌
    newGame.game_state.cards.board[`level${level}`].splice(index, 1);

    // 实际游戏中会从牌库抽一张新卡牌放到游戏板上
    // 在模拟数据中我们暂时不实现这部分

    setGame(newGame);

    // 实际游戏中这里还需要检查是否有贵族可以拜访
    // 以及是否游戏结束
  };
  return (
    <div className="game-board">
      <h2>游戏: {game.name}</h2>

      <div className="game-status">
        <p>当前玩家: {currentPlayer?.user.username}</p>
        <p>状态: {game.status === "playing" ? "进行中" : "等待中"}</p>
      </div>

      <div className="game-container">
        {/* 贵族区域 */}
        <div className="nobles-section">
          <h3>贵族</h3>
          <div className="nobles-container">
            {game.game_state.nobles.map((noble) => (
              <div key={noble.id} className="noble-card">
                <div className="noble-points">{noble.points}</div>
                <div className="noble-requirements">
                  {Object.entries(noble.requirement).map(([color, count]) => (
                    <div
                      key={color}
                      className={`token-icon ${color}`}
                      data-count={count}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 开发卡区域 */}
        <CardSection
          game={game}
          currentPlayer={currentPlayer}
          handleBuyCard={handleBuyCard}
        />

        {/* 代币区域 */}
        <div className="tokens-section">
          <h3>代币</h3>
          <div className="tokens-container">
            {Object.entries(game.game_state.tokens).map(([color, count]) => (
              <div
                key={color}
                className={`token ${color}`}
                onClick={() => handleTokenSelect(color)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleTokenUnselect(color);
                }}
                data-count={count}
                data-selected={selectedTokens[color]}
              >
                <span className="token-count">{count}</span>
                {selectedTokens[color] > 0 && (
                  <span className="selected-count">
                    已选: {selectedTokens[color]}
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            className="take-tokens-btn"
            onClick={handleTakeTokens}
            disabled={
              Object.values(selectedTokens).reduce((a, b) => a + b, 0) === 0
            }
          >
            拿取代币
          </button>
        </div>

        {/* 玩家区域 */}
        <div className="players-section">
          <h3>玩家</h3>
          <div className="players-container">
            {game.players.map((player) => (
              <div
                key={player.id}
                className={`player-board ${
                  player.is_current ? "current-player" : ""
                }`}
              >
                <h4>
                  {player.user.username} {player.is_current && "(当前玩家)"}
                </h4>
                <div className="player-score">分数: {player.score}</div>

                <div className="player-tokens">
                  {Object.entries(player.player_state.tokens).map(
                    ([color, count]) =>
                      count > 0 && (
                        <div
                          key={color}
                          className={`token-icon ${color}`}
                          data-count={count}
                        ></div>
                      )
                  )}
                </div>

                <div className="player-cards">
                  <h5>拥有的卡牌:</h5>
                  <div className="owned-cards">
                    {player.player_state.cards.map((card) => (
                      <div key={card.id} className={`card-icon ${card.color}`}>
                        {card.points > 0 && (
                          <span className="card-points">{card.points}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {player.player_state.reserved_cards.length > 0 && (
                  <div className="reserved-cards">
                    <h5>预留的卡牌:</h5>
                    {player.player_state.reserved_cards.map((card) => (
                      <div
                        key={card.id}
                        className={`development-card ${card.color}`}
                      >
                        <div className="card-points">{card.points}</div>
                        <div className={`card-gem ${card.color}`}></div>
                        {renderCardCost(card.cost)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
