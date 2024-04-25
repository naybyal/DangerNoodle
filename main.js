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

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Snake.draw(ctx);
        Snake.update();
    }

    setInterval(animate, 500);
})