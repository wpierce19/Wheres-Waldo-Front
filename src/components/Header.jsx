import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="container">
                <ul>
                    <li>
                        //Add Logo for header here
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/scoreboard">Scoreboard</Link>
                    </li>
                    <li>
                        <Link to="/game">Play</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;