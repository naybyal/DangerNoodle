const Snake = {
    position: {x: 5, y: 5},
    velocity: {x: 0, y: -1},
    length: 3,
    score: 0,
    segments: [],
    image: document.getElementById('snake_zilla'),
    spriteWidth: 200,
    spriteHeight: 200,
    draw(context) {
        this.segments.forEach((segment, i) => {
            if (i === 0)
                context.fillStyle = 'gold'
            else    context.fillStyle = 'black' 
            context.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

            this.setSpriteFrame(i);

            context.drawImage(this.image, segment.frameX*this.spriteWidth, segment.frameY*this.spriteHeight, this.spriteWidth, this.spriteHeight, segment.x*CELL_SIZE, segment.y*CELL_SIZE, CELL_SIZE, CELL_SIZE)
        });
        context.fillText("Points:"+this.score, 20, 20);
        context.textAlign = 'left';
        context.fillStyle = 'black'
    },
    update() {
        //  LOCOMOTION
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.segments.unshift({x: this.position.x, y: this.position.y});

        //  ADD/REMOVE SEGMENTS
        this.segments.unshift({
            x: this.position.x,
            y: this.position.y,
            frameX: 0,
            frameY: 0
        })
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

        //  consume TAIL
        this.segments.forEach((segment, i) => {
            if (i > 0 && (segment.x === this.position.x && segment.y === this.position.y)) {
                this.segments.length = i+1;
                this.score -= 5;
                this.length = this.segments.length;
            }
        });
    },
    reset() {
        this.score = 0;
        this.length = 4;
        this.segments = [];
        this.position = {
            x: 0,
            y: Math.floor(ROWS/2)
        };
        this.velocity = {
            x: 1,
            y: 0
        }
    },
    moveUp() {
        if (this.velocity.y === 0) {
            this.velocity.x = 0;
            this.velocity.y = -1;
        }
    },
    moveDown() {
        if (this.velocity.y === 0) {
            this.velocity.x = 0;
            this.velocity.y = 1;
        }
    },
    moveRight() {
        if (this.velocity.x === 0) {
            this.velocity.x = 1;
            this.velocity.y = 0;
        }
    }, 
    moveLeft() {
        if (this.velocity.x === 0) {
            this.velocity.x = -1;
            this.velocity.y = 0;
        }
    },
    setSpriteFrame(index) {
        const segment = this.segments[index];
        const nextSegment = this.segments[index + 1] || 0;
        const prevSegment = this.segments[index - 1] || 0;
        if (index === 0) {
            //  head
            if (segment.y < nextSegment.y) {
                //  up
                segment.frameX = 1;
                segment.frameY = 2;
            } else if (segment.y  > nextSegment.y) {
                //  down
                segment.frameX = 0;
                segment.frameY = 4;
            } else if (segment.x < nextSegment.x) {
                //  left
                segment.frameX = 0;
                segment.frameY = 0;
            } else if (segment.x > nextSegment.x) {
                //  right
                segment.frameX = 2;
                segment.frameY = 1;
            }
        } else if (index === this.segments.length - 1) {
            if (prevSegment.y < segment.y) {
                //  up
                segment.frameX = 1;
                segment.frameY = 4;
            } else if (prevSegment.y > segment.y) {
                segment.frameX = 0;
                segment.frameY = 2;
            } else if (prevSegment.x < segment.x) {
                segment.frameX = 2;
                segment.frameY = 0;
            } else if (prevSegment.x > segment.x) {
                segment.frameX = 0;
                segment.frameY = 1;
            }
        } else {
            // body
            if (nextSegment.x < segment.x && prevSegment.x > segment.x) {
                //  horizontal right
                segment.frameX = 1;
                segment.frameY = 1;
            } else if (nextSegment.x > segment.x && prevSegment.x < segment.x) { 
                //  horizontal left
                segment.frameX = 1;
                segment.frameY = 0;
            } else if (nextSegment.x > segment.x && prevSegment.x < segment.x) { 
                //  vertical up
                segment.frameX = 1;
                segment.frameY = 3;
            } else if (nextSegment.x < segment.x && prevSegment.x > segment.x) { 
                //  horizontal down
                segment.frameX = 0;
                segment.frameY = 3;
            } else if (prevSegment.x < segment.x && nextSegment.y > segment.y) { 
                //  up left
                segment.frameX = 4;
                segment.frameY = 0;
            } else if (prevSegment.y > segment.y && nextSegment.x > segment.x) { 
                //  left down
                segment.frameX = 3;
                segment.frameY = 0;
            } else if (prevSegment.x > segment.x && nextSegment.y < segment.y) { 
                //  left down
                segment.frameX = 3;
                segment.frameY = 1;
            } else if (prevSegment.y < segment.y && nextSegment.x < segment.x) { 
                //  up right
                segment.frameX = 4;
                segment.frameY = 1;
            } else if (nextSegment.x < segment.x && prevSegment.y > segment.y) { 
                //  bend clockwise
                segment.frameX = 3;
                segment.frameY = 2;
            } else if (nextSegment.x < segment.x && prevSegment.y > segment.y) { 
                //  left down
                segment.frameX = 3;
                segment.frameY = 3;
            } else if (nextSegment.y < segment.y && prevSegment.x > segment.x) {
                // up right
                segment.frameX = 2;
                segment.frameY = 2;
            } else {
                segment.frameX = 6;
                segment.frameY = 0;
            }
            segment.frameX = 6;
            segment.frameY = 0;
        }
    }
}