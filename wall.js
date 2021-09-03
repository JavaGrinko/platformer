class Wall {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.height = options.height;
        this.width = options.width;
        this.color = options.color;
        this.danger = options.danger;
        this.gameover = options.gameover;
        this.background = options.background;
        this.foreground = options.foreground;
        this.ring = options.ring;
        this.checkpoint = options.checkpoint;
        this.portal = options.portal;
        if (options.image) {
            this.image = new Image();
            this.image.src = options.image;
        }
    }
    render(canvas) {
        const { x, y, height, width, image } = this;
        if (image) {
            canvas.drawImage(image, x, y, height, width);
        } else {
            canvas.fillRect(x, y, width, height);
        }
    }
}