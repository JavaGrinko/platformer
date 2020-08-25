class Panel {
    constructor() {
        this.image = new Image();
        this.image.src = "images/levels.png"
        this.x = 10;
        this.y = 10;
        this.width = 26;
        this.height = 19;
    }

    render(canvas) {
        const { image, x, y, width, height, player } = this;
        canvas.drawImage(image, x, y, width, height);
        const { lives } = player;
        let textX = x + width + 2;
        let textY = y + height - 3;
        canvas.font = 'bold 24px serif';
        canvas.fillStyle = "#000000";
        canvas.fillText(lives, textX + 1, textY + 1);
        canvas.fillStyle = "#FF5E13";
        canvas.fillText(lives, textX, textY);
    }
}