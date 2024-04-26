window.addEventListener('keydown', (event) => {
    // console.log(event.key);
    
    if (event.key === 'ArrowUp') {
        Snake.moveUp();
    } else if (event.key === 'ArrowDown') {
        Snake.moveDown();
    } else if (event.key === 'ArrowLeft') {
        Snake.moveLeft();
    } else if (event.key === 'ArrowRight') {
        Snake.moveRight();
    }
    
});


window.addEventListener('load', () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    ctx.font = '30px monospace';
    ctx.textBaseline = 'top';

    canvas.addEventListener('click', () => {
        if (GAME.gameOver) {
            resetGame();
            GAME.loop = setInterval(animate, 250);
        }
    });
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Food.draw(ctx);
        Snake.draw(ctx);
        Snake.update();

        if (GAME.gameOver) {
            ctx.fillStyle = 'black';
            ctx.font = '60px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER!', GAME.width * 0.5, GAME.height*0.5);
            ctx.font = '12px monospace';
            ctx.fillText("Click here to restart the game.", GAME.width*0.5, GAME.height*0.4+60, GAME.width*0.95);
            clearInterval(GAME.loop);
        }
    }

    GAME.loop = setInterval(animate, 300);
})