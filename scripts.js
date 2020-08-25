window.onload = function () {
    console.log("Страница загружена");
    const buttonRetry = document.getElementById("retry");
    buttonRetry.onclick = () => location.reload();
    function loadMap() {
        let blocks = [];
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                switch (map[y][x]) {
                    case 1: blocks.push(new Wall({
                        x: x * 60,
                        y: y * 60,
                        width: 60,
                        height: 60,
                        image: 'images/grass.jpg'
                    }));
                        break;
                    case 2: blocks.push(new Wall({
                        x: x * 60,
                        y: y * 60,
                        width: 60,
                        height: 60,
                        image: 'images/lava.gif',
                        danger: true
                    }));
                        break;
                    case 3: blocks.push(new Wall({
                        x: x * 60,
                        y: y * 60,
                        width: 60,
                        height: 60,
                        image: 'images/decor1.png',
                        background: true
                    }));
                        break;
                    case 4: blocks.push(new Wall({
                        x: x * 60,
                        y: y * 60,
                        width: 60,
                        height: 60,
                        image: 'images/ring.png',
                        ring: true
                    }));
                        break;
                    case 99: blocks.push(new Wall({
                        x: x * 60,
                        y: y * 60,
                        width: 60,
                        height: 60,
                        image: 'images/trophy.png',
                        gameover: true
                    }));
                        break;
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
            y: 30,
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
        },
        WALK_LEFT: {
            x: 10,
            y: 250,
            width: 45,
            height: 45,
            count: 9
        },
        JUMP: {
            x: 10,
            y: 190,
            width: 39,
            height: 45,
            count: 10
        }
    });
    const player = new Player({
        width: 50,
        height: 50,
        sprite: playerSprite,
        velocity: 10
    });
    const playerPadding = 130;

    const startY = options.height - player.height - playerPadding;
    const startX = 50;

    player.y = startY;
    player.x = startX;

    const camera = new Camera(player, options);

    let walls = [];
    walls.push(...loadMap());

    walls.push(new Wall({
        x: 0,
        y: options.height,
        width: options.width,
        height: 15,
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
                if (wall.danger) {
                    player.kill();
                    player.x = startX;
                    player.y = startY;
                } else if (wall.gameover) {
                    player.gameover();
                } else if (wall.background) {
                    continue;
                } else if (wall.ring) {
                    walls = walls.filter(w => w != wall);
                    player.takeRing();
                    continue;
                }
                player.lastJumpTime = null;
                return true;
            }
        }
        return false;
    }

    const backgroundImage = new Image();
    backgroundImage.src = "images/background.jpg";
    const panel = new Panel();
    panel.player = player;
    render();
    function render() {
        const { width, height } = options;
        if (player.isGameRunning) requestAnimationFrame(render);
        game.save();
        game.translate(-camera.x, -camera.y);
        game.drawImage(backgroundImage, 0, 0, width, height);
        for (let wall of walls) {
            wall.render(game);
        }
        player.render(game);
        camera.update();
        game.restore();
        panel.render(game);
    }
}