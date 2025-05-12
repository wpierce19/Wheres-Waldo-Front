//Implement pushing a users score to the back-end
//Allows user to enter a username
//The package sent to back-end will container (username, time, CLicks?)


const submitScore = async ({username, clicks, time}) => {
    const payload = { username, clicks, time };
    const TOKEN = import.meta.env.VITE_BEARER_TOKEN;
    try {
        const response = await fetch("ENTER_BACK_END_URL_HERE", {
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