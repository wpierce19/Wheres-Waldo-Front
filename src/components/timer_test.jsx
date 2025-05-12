//Here i will make a timer that will resemble how the game.jsx will use it from the back-end

const game_timer = (onTick) => {
    let timer = 0;
    const interval = setInterval(() => {
        timer++;
        onTick(timer);

    }, 1000);
    return () => clearInterval(interval);
}


export default game_timer;