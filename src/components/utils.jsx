const game_timer = (onTick) => {
    let timer = 0;
    const interval = setInterval(() => {
        timer++;
        onTick(timer);

    }, 1000);
    return () => clearInterval(interval);
};

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};


export  {game_timer, formatTime};