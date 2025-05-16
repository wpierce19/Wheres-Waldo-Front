//Will need to add function that shows a real-time timer that will be located on back-end
//Add all game utilities here
//If code gets to messy maybe create seperate files to handle each aspect of the game 
//and just use this file to render to the user
import { useEffect, useRef,useState } from "react";
import {game_timer, formatTime, getToken} from "./utils";
import submitScore from "./CreateScore";


const Game = () => {
  const boardRef = useRef(null);
  const [clickBox, setClickBox] = useState(null);
  const [foundObjects, setFoundObjects] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const timerCleanupRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [objectNames, setObjectNames] = useState([]);


    //Game timer(will eventually be hosted on back-end)
    useEffect(() => {
      const initTimer = async () => {
        try {
          const token = await getToken();

          await fetch("https://wheres-waldo-api-r34l.onrender.com/game/start", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const cleanup = game_timer(token,setSeconds);
          timerCleanupRef.current = cleanup;
        } catch (err) {
          console.error("Timer start failed:", err);
        }
      };

      initTimer();
      return () => timerCleanupRef.current?.();
    }, []);

    //retrieving object coords from backend
    useEffect(() => {
      const fetchObjectNames = async () => {
        try {
          const token = await getToken();
          const response = await fetch("https://wheres-waldo-api-r34l.onrender.com/objects", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) throw new Error("Failed to fetch object coordinates");

          const data = await response.json();
          setObjectNames(data);
        } catch (err) {
          console.error("Error fetching object coordinates:", err);
        }
      };

      fetchObjectNames();
    }, []);

    useEffect(() => {
      if (
        objectNames.length > 0 && // ensure objectNames has loaded
        foundObjects.length === objectNames.length
      ) {
        const stopTimer = async () => {
          timerCleanupRef.current?.();

          try {
            const token = await getToken();
            const response = await fetch("https://wheres-waldo-api-r34l.onrender.com/game/stop", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await response.json();
            console.log("Backend timer stopped. Final Time: ", data.finalTime);
            setSeconds(data.finalTime);
          } catch (err) {
            console.error("Error stopping time:", err);
          }

          setGameOver(true);
        };

        stopTimer();
      }
    }, [foundObjects, objectNames]);
  
  const processClick = async (e) => {
    setClickCount((prev) => prev + 1);
    const rect = boardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Show temporary click box
    setClickBox({ x, y });
    setTimeout(() => setClickBox(null), 1000);

    // Check if click hits any object
    try {
      const token = await getToken();
      const response = await fetch("https://wheres-waldo-api-r34l.onrender.com/verify-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({x,y}),
      });

      const data = await response.json();
      const {name} = data;

      if (name && !foundObjects.includes(name)){
        setFoundObjects((prev) => {
          const updated = [...prev, name];
          console.log("Found object from backend: ", name);
          return updated;
        });
      }
    }catch (err) {
      console.error("Error verifying click with backend:", err);
    }
  };
  const handleSubmit = async () => {
    try {
        await submitScore({
            username,
            clicks: clickCount,
            time: seconds,
        });
        alert("✅ Score submitted!")
    } catch (err) {
        console.error("❌ Submit error:", err)
        alert("Error submitting score.")
    }
  }

  return (
    <>
    <div className="w-full h-screen flex justify-center items-center bg-black overflow-hidden">
      <div
        ref={boardRef}
        onClick={processClick}
        className="relative w-full max-w-[1920px] aspect-[1920/1100]"
      >
        {/* Background image */}
        <img
          src="/Game_board_complete.png"
          alt="Game Board"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Object hitboxes and checkmarks */}
        {objectNames.map((obj) => (
          <div key={obj.name}>
            {/* Checkmark if found (appears at saved checkmark position) */}
            {foundObjects.includes(obj.name) && obj.checkmark && (
            <div
                className="absolute pointer-events-none"
                style={{
                left: `${obj.checkmark.x * 100}%`,
                top: `${obj.checkmark.y * 100}%`,
                width: `${obj.checkmark.width * 100}%`,
                height: `${obj.checkmark.height * 100}%`,
                transform: "translate(-50%, -50%)",
                }}
            >
                <img
                src="/checkmark.png"
                alt="Checkmark"
                className="w-full h-full object-contain"
                />
            </div>
            )}
          </div>
        ))}

        {/* Temporary click indicator */}
        {clickBox && (
          <div
            className="absolute border-2 border-yellow-400 pointer-events-none"
            style={{
              left: `${clickBox.x * 100}%`,
              top: `${clickBox.y * 100}%`,
              width: `30px`,
              height: `30px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {/*Timer & Click counter div*/}
        <div
            className="absolute pointer-events-none flex flex-col items-center justify-center"
            style={{
                left: `${(1098 / 1920) * 100}%`,
                top: `${(848 / 1100) * 100}%`,
                width: `${((1348 - 1098) / 1920) * 100}%`,
                height: `${((990 - 848) / 1100) * 100}%`,
            }}
            >
            <div className="text-white w-full h-full flex flex-col items-center justify-center text-[1.5vw] leading-tight text-center">
                <p>Time: {formatTime(seconds)}</p>
                <p>Clicks: {clickCount}</p>
            </div>
        </div>
        
      </div>
    </div>
    {gameOver && (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"> 
        <div className="bg-white p-6 rounded-lg w-80 text-center shadow-lg">
          <h2 className="text-xl font-bold mb-4">🎉 Game Over</h2>
          <p className="mb-2 text-gray-700">Enter your username:</p>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1 mb-4"
            placeholder="Username"
          />
          <p className="mb-1 text-gray-800 font-medium">
            🔢 Clicks: {clickCount}
          </p>
          <p className="mb-4 text-gray-800 font-medium">
            ⏱️ Time: {formatTime(seconds)}
          </p>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={!username.trim()}
          >
            Submit Score
          </button>
        </div>
      </div>
    )}
    </>
  );
};

export default Game;
