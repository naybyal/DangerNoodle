const Snake = {
    position: {x: 5, y: 5},
    velocity: {x: 0, y: -1},
    length: 3,
    score: 0,
    segments: [],
    draw(context) {
        this.segments.forEach((segment, i) => {
            if (i === 0)
                context.fillStyle = 'gold'
            else    context.fillStyle = 'black' 
            context.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        });
        context.fillText(this.score, 20, 20);
        context.textAlign = 'left';
        context.fillStyle = 'black'
    },
    update() {
        //  LOCOMOTION
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.segments.unshift({x: this.position.x, y: this.position.y});

        //  ADD/REMOVE SEGMENTS
        if (this.segments.length > this.length) {
            this.segments.pop();
        }

        //  check for COLLISION
        if (
            this.position.x < 0 ||
            this.position.x > COLUMNS - 1 ||
            this.position.y < 0 ||
            this.position.y > ROWS - 1
        )
            GAME.gameOver = true;

        // consume FOOD
        if (this.position.x === Food.x && this.position.y === Food.y) {
            Food.reset();
            this.length++;
            this.score+=10;
        }
    },
    moveUp() {
        this.velocity.x = 0;
        this.velocity.y = -1;
    },
    moveDown() {
        this.velocity.x = 0;
        this.velocity.y = 1;
    },
    moveRight() {
        this.velocity.x = 1;
        this.velocity.y = 0;
    },
    moveLeft() {
        this.velocity.x = -1;
        this.velocity.y = 0;
    }
}