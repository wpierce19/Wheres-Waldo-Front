//Will just display the home splash screen
//Handle the Play & Scoreboard buttons


import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black overflow-hidden">
      <div className="relative w-full max-w-[1920px] aspect-[1920/768]">
        {/* Background */}
        <img
          src="/landing_page.png"
          alt="Landing"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* SCORES Button */}
        <Link
          to="/scoreboard"
          className="absolute rounded-full"
          style={{
            top: "72%",     // Relative to image height
            left: "38%",  // Relative to image width
            width: "10%",
            height: "10%",
          }}
          aria-label="Go to scoreboard"
        />

        {/* PLAY Button */}
        <Link
          to="/game"
          className="absolute rounded-full"
          style={{
            top: "72%",
            left: "52%",
            width: "10%",
            height: "10%",
          }}
          aria-label="Start game"
        />
      </div>
    </div>
  );
};

export default Home;