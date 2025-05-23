//Implement pushing a users score to the back-end
//Allows user to enter a username
//The package sent to back-end will container (username, time, CLicks?)
import { getToken } from "./utils";

const submitScore = async ({username, clicks, time}) => {
    const payload = { username, clicks, time };
    const TOKEN = await getToken();
    try {
        const response = await fetch("https://wheres-waldo-api-r34l.onrender.com/scoreboard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(payload),
        });

        if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Score submitted:", data);
        return data;
    } catch (err) {
        console.error("❌ Error submitting score:", err);
        throw err; // let the caller handle the error
    }
};


export default submitScore;