const Snake = {
    position: {x: 5, y: 5},
    velocity: {x: 0, y: -1},
    length: 3,
    segments: [],
    draw(context) {
        this.segments.forEach(segment => {
            context.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        });
    },
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.segments.unshift({x: this.position.x, y: this.position.y});

        if (this.segments.length > this.length) {
            this.segments.pop();
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