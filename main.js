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
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Food.draw(ctx);
        Snake.draw(ctx);
        Snake.update();

        if (GAME.gameOver) {
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.font = '60px monospace';
            ctx.fillText('GAME OVER!', GAME.width * 0.5, GAME.height*0.5);
            clearInterval(GAME.loop);
        }
    }

    GAME.loop = setInterval(animate, 500);
})