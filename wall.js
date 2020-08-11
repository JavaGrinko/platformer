class Wall {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.height = options.height;
        this.width = options.width;
        this.color = options.color;
    }
    render(canvas) {
        const { x, y, height, width, color } = this;
        canvas.fillStyle = color;
        canvas.fillRect(x, y, width, height);
    }
}