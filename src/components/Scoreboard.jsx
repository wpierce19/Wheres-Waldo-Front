//Will to an API call to GET the scores that are in the database and then render the scores
//Will be pretty simple
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "./utils";

const Scoreboard = () => {


        const [scores, setScores] = useState([]);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchScores = async () => {
                const TOKEN = await getToken();
                try {
                    const response = await fetch(`https://wheres-waldo-api-r34l.onrender.com/scoreboard`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error. Status ${response.status}`);
                    }
                    const data = await response.json();
                    setScores(data);
                } catch (err) {
                    console.error("Error fetching data: ", err);
                    setError(err.message);
                }
            };

            fetchScores();
        }, []);

        if (error) return <section className="text-red-500 p-4">{error}</section>
        //Doesn't render rn because there is an error ^^^^ should work once back-end is set up
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center bg-black overflow-hidden gap-6">
                <h1 className="text-4xl font-bold text-white">Scoreboard:</h1>
                <div
                    className="relative w-full max-w-[600px] aspect-[600/900] overflow-y-auto"
                    style={{
                        backgroundColor: "#4B153B",
                        borderWidth: "1px",
                        borderColor: "white",
                    }}
                >
                    {
                        scores ? (
                            scores.length > 0 ? (
                                scores.map((player, index) => (
                                    <div 
                                        key={index} 
                                        className="flex flex-col justify-between py-2 border-b border-white last:border-b-0 text-white pl-2"
                                    >
                                        <span>{player.name}</span>
                                        <span>{player.time}</span>
                                        <span>{player.clicks}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col justify-center align-middle text-4x1 font-bold text-white text-center">
                                    It's empty in here! Try your skills in the game and post a new score!
                                    <br />
                                    <Link 
                                        to={"/game"} 
                                          className="mt-4 inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
                                        >
                                            Play!
                                        </Link> 
                                </div>
                            )
                        ) : (
                            <div aria-busy="true" className="flex justify-center align-middle text-4x1 font-bold pt-80 text-white">Loading...</div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Scoreboard;