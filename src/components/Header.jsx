import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full text-white py-3"
            style={{backgroundColor: "#4B153B"}}
    >
      <nav className="flex justify-center gap-8 text-lg font-semibold">
        <Link to="/">Home</Link>
        <Link to="/scoreboard">Scoreboard</Link>
        <Link to="/game">Play</Link>
      </nav>
    </header>
  );
};

export default Header;