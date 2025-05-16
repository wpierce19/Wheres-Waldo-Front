const game_timer = (token, onTick) => {
    const interval = setInterval(async () => {
        try {
            const res = await fetch("https://wheres-waldo-api-r34l.onrender.com/game/time", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            onTick(data.time);
        } catch (err) {
            console.error("Timer polling failed:", err);
        }
    }, 1000);

    return () => clearInterval(interval);
};

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const generateUUID = () =>
  crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxx-xxxx...';

export const getToken = async () => {
    let token = localStorage.getItem("jwt_token");
    if (!token) {
        const userId = generateUUID();
        localStorage.setItem("anon_user_id", userId);

        const response = await fetch("https://wheres-waldo-api-r34l.onrender.com/auth/token", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId}),
        });

        const data = await response.json();
        token = data.token;
        localStorage.setItem("jwt_token", token);
    }

    return token;
};


export  {game_timer, formatTime};