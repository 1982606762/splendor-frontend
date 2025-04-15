// src/data/mockData.js
export const mockGame = {
    id: "game-123",
    name: "游戏室",
    status: "playing", // 'waiting', 'playing', 'finished'
    host: {
      id: "user-1",
      username: "张三"
    },
    current_player: {
      id: "user-2",
      username: "李四"
    },
    players: [
      {
        id: "player-1",
        user: {
          id: "user-1",
          username: "张三"
        },
        score: 3,
        order: 0,
        is_current: false,
        player_state: {
          tokens: {white: 1, blue: 2, green: 1, red: 0, black: 3, gold: 0},
          cards: [
            {id: "card-1", color: "white", points: 1},
            {id: "card-2", color: "blue", points: 2}
          ],
          reserved_cards: []
        }
      },
      {
        id: "player-2",
        user: {
          id: "user-2",
          username: "李四"
        },
        score: 5,
        order: 1,
        is_current: true,
        player_state: {
          tokens: {white: 2, blue: 1, green: 2, red: 2, black: 0, gold: 1},
          cards: [
            {id: "card-3", color: "green", points: 1},
            {id: "card-4", color: "red", points: 2},
            {id: "card-5", color: "black", points: 2}
          ],
          reserved_cards: [
            {id: "card-6", color: "white", points: 3, cost: {blue: 3, green: 3, red: 3}}
          ]
        }
      }
    ],
    game_state: {
      tokens: {white: 4, blue: 4, green: 4, red: 5, black: 4, gold: 4},
      nobles: [
        {id: "noble-1", points: 3, requirement: {white: 4, blue: 4}},
        {id: "noble-2", points: 3, requirement: {red: 4, green: 4}},
        {id: "noble-3", points: 3, requirement: {black: 4, white: 4}}
      ],
      cards: {
        board: {
          level1: [
            {id: "board-card-1", color: "white", points: 0, cost: {blue: 2, red: 1}},
            {id: "board-card-2", color: "blue", points: 0, cost: {white: 2, black: 2}},
            {id: "board-card-3", color: "green", points: 1, cost: {blue: 4}},
            {id: "board-card-4", color: "red", points: 0, cost: {black: 3}}
          ],
          level2: [
            {id: "board-card-5", color: "white", points: 2, cost: {red: 5}},
            {id: "board-card-6", color: "blue", points: 1, cost: {green: 3, red: 2, black: 2}},
            {id: "board-card-7", color: "green", points: 2, cost: {blue: 5, black: 3}},
            {id: "board-card-8", color: "red", points: 2, cost: {white: 1, green: 4, blue: 2}}
          ],
          level3: [
            {id: "board-card-9", color: "white", points: 4, cost: {black: 7}},
            {id: "board-card-10", color: "blue", points: 5, cost: {white: 7, blue: 3}},
            {id: "board-card-11", color: "green", points: 4, cost: {blue: 7}},
            {id: "board-card-12", color: "red", points: 3, cost: {blue: 5, white: 3, green: 3, black: 3}}
          ]
        }
      }
    }
  };