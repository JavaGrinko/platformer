class Player {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.velocity = options.velocity;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.sprite = options.sprite;
        this.jumpTime = 500;
        this.lastJumpTime;
        this.keyboard = new THREEx.KeyboardState();
        this.g = 3;
        this.jumpF = this.g * 2;
    }

    forward() {
        this.x += this.velocity;
        if (this.checkCollision()) {
            this.x -= this.velocity;
        }
    }

    backward() {
        this.x -= this.velocity;
        if (this.checkCollision()) {
            this.x += this.velocity;
        }
    }

    up() {
        this.y -= this.jumpF;
        if (this.checkCollision()) {
            this.y += this.jumpF;
        }
    }

    down() {
        this.y += this.g;
        if (this.checkCollision()) {
            this.y -= this.g;
        }
    }

    controls() {
        const { keyboard } = this;
        if (keyboard.pressed("d")) {
            this.forward();
        }
        if (keyboard.pressed("a")) {
            this.backward();
        }
        if (keyboard.pressed("space")) {
            if (this.lastJumpTime) return;
            this.lastJumpTime = new Date();
        }
    }

    jump() {
        if (this.lastJumpTime) {
            const currentTime = new Date();
            if (currentTime - this.lastJumpTime < this.jumpTime) {
                this.up();
            }
        } 
    }

    collision(wall) {
        const { x, y, width, height } = this;
        const minX = x;
        const maxX = x + width;
        const minY = y;
        const maxY = y + height;
        if (this.isPointInWall(minX, minY, wall) ||
            this.isPointInWall(maxX, minY, wall) ||
            this.isPointInWall(maxX, maxY, wall) ||
            this.isPointInWall(minX, maxY, wall)) {
            return true;
        }
        return false;   
    }

    isPointInWall(x, y, wall) {
        const wallMinX = wall.x;
        const wallMaxX = wall.x + wall.width;
        const wallMinY = wall.y;
        const wallMaxY = wall.y + wall.height;
        if (x > wallMinX && x < wallMaxX 
            && y > wallMinY && y < wallMaxY) {
                return true;
        }
        return false;
    }

    render(canvas) {
        const { color, x, y, width, height } = this;
        if (this.sprite) {
            let { frameX, frameY, width: frameWidth, height: frameHeight, image } 
                                                = this.sprite.getFrame("WALK_RIGHT");
            canvas.drawImage(image, frameX, frameY, frameWidth, 
                frameHeight, x, y, width, height);
        } else {
            canvas.fillStyle = color;
            canvas.fillRect(x, y, width, height);
        }
        this.controls();
        this.jump();
        this.down();
    }
}