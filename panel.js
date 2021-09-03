class Panel {
    constructor() {
        this.image = new Image();
        this.image.src = "images/levels.png";
        this.imageRing = new Image();
        this.imageRing.src = "images/ring2.jpeg";
        this.x = 10;
        this.y = 10;
        this.width = 26;
        this.height = 19;
        this.ringSize = 20;
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
        this.renderRings(canvas);
    }

    renderRings(canvas) {
        const { x, y, imageRing, ringSize, player } = this;
        let ringX = x + 60;
        let ringY = y;
        let textX = ringX + ringSize + 10;
        let textY = ringY + 16;
        canvas.drawImage(imageRing, ringX, ringY, ringSize, ringSize);
        canvas.font = 'bold 24px serif';
        canvas.fillStyle = "#000000";
        canvas.fillText(player.rings, textX + 1, textY + 1);
        canvas.fillStyle = "#FF5E13";
        canvas.fillText(player.rings, textX, textY);
    }
}