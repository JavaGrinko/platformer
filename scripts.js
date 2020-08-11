window.onload = function () {
    console.log("Страница загружена");
    function loadMap() {
        let blocks = [];
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                if (map[y][x] === 1) {
                    blocks.push(new Wall({
                        x: x * 60,
                        y: y * 60,
                        width: 60,
                        height: 60,
                        color: '#000000'
                    }));
                }
            }
        }
        return blocks;
    }

    const options = {
        width: 4800,
        height: 1320,
        camera: {
            width: 640,
            height: 480
        }
    }
    const canvas = document.createElement('canvas');
    canvas.id = "game";
    canvas.width = options.camera.width;
    canvas.height = options.camera.height;
    document.body.appendChild(canvas);
    const game = canvas.getContext('2d');

    const playerSprite = new Sprite("images/player.png", {
        STAY: {
            x: 10,
            y: 35,
            width: 46,
            height: 45,
            count: 8
        },
        WALK_RIGHT: {
            x: 10,
            y: 80,
            width: 46,
            height: 45,
            count: 9
        }
    });
    const player = new Player({
        width: 50,
        height: 50,
        sprite: playerSprite,
        velocity: 10
    });
    const playerPadding = 130;

    player.y = options.height - player.height - playerPadding;
    player.x = 50;

    const camera = new Camera(player, options);

    let walls = [];
    walls.push(...loadMap());

    walls.push(new Wall({
        x: 0,
        y: options.height - playerPadding,
        width: options.width,
        height: playerPadding,
        color: '#00ff00'
    }), new Wall({
        x: -15,
        y: 0,
        width: 15,
        height: options.height,
        color: '#000000'
    }), new Wall({
        x: options.width,
        y: 0,
        width: 15,
        height: options.height,
        color: '#000000'
    }), new Wall({
        x: -15,
        y: -15,
        width: options.width,
        height: 15,
        color: '#000000'
    }));

    player.checkCollision = () => {
        for (let wall of walls) {
            if (player.collision(wall)) {
                player.lastJumpTime = null;
                return true;
            }
        }
        return false;
    }

    const backgoundImage = new Image();
    backgoundImage.src = "images/map.png";

    render();
    function render() {
        const { width, height } = options;
        requestAnimationFrame(render);
        game.save();
        game.translate(-camera.x, -camera.y);
        game.drawImage(backgoundImage, 0, 0, width, height);
        player.render(game);
        for (let wall of walls) {
            wall.render(game);
        }
        camera.update();
        game.restore();
    }
}