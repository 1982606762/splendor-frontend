import './App.css';
import React from 'react';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <h1>Splendor game</h1>
      </header>

      <main>
        <GameBoard />
      </main>
    </div>
  );
}

export default App;
