class Camera {
    constructor(player, options) {
        this.x = 0;
        this.y = 0;
        this.player = player;
        this.startX = player.x;
        this.startY = player.y;
        this.options = options;
    }

    update() {
        const { player, startX, startY, options } = this;
        this.x = player.x - startX;
        this.y = options.height - options.camera.height 
                        + player.y - startY;
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x + options.camera.width > options.width) {
            this.x = options.width - options.camera.width;
        }
    }
}