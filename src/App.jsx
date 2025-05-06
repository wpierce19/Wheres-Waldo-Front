import { Route, Routes, Link } from 'react-router-dom';
import Game from './components/Game';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
};

export default App;
