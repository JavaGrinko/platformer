class Sprite {
    constructor(image, config) {
        this.sprite = new Image();
        this.sprite.src = image;
        this.config = config;
        this.lastChangeFrameTime = new Date();
        this.timeChangeFrame = 50; // мс
        this.frameState = {};
    }

    getFrame(type) {
        const typeConfig = this.config[type];
        const { x, y, width, height, count } = typeConfig;
        const { frameState } = this;
        let currentFrame = frameState[type] ? frameState[type] : 0;
        let frameX = x + width * currentFrame;
        let frameY = y;
        if (new Date() - this.lastChangeFrameTime > this.timeChangeFrame) {
            frameState[type] = currentFrame + 1;
            if (frameState[type] >= count) {
                frameState[type] = 0;
            }
            this.lastChangeFrameTime = new Date();
        }
        return { frameX, frameY, width, height, image: this.sprite };
    }
}