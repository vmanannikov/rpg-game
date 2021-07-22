import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';
import ClientWorld from './ClientWorld';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
    constructor(cfg) {
        Object.assign(this, {
            cfg,
            gameObjects,
            player: null,
        });

        this.engine = this.createEngine();
        this.map = this.createWorld();
        this.initEngine();
    }

    createWorld() {
        return new ClientWorld(this, this.engine, levelCfg);
    }

    setPlayer(player) {
        this.player = player;
    }

    createEngine() {
        return new ClientEngine(document.getElementById(this.cfg.tagId), this);
    }

    getWorld(){
        return this.map;
    }

    initEngine() {
        this.engine.loadsprites(sprites).then(() => {
            this.map.init();
            this.engine.on('render', (_, time) => {
                this.engine.camera.focusAtGameObject(this.player);
                this.map.render(time);
            });
            this.engine.start();
            this.initKeys();
        });
    }

    initKeys() {
        this.engine.input.onKey({
            ArrowLeft: (keydown) => keydown && this.movePlayerToDir('left'),
            ArrowRight: (keydown) => keydown && this.movePlayerToDir('right'),
            ArrowUp: (keydown) => keydown && this.movePlayerToDir('up'),
            ArrowDown: (keydown) => keydown && this.movePlayerToDir('down'),
        });
    }

    movePlayerToDir(dir) {
        const dirs = {
            left: [-1, 0],
            right: [1, 0],
            up: [0, -1],
            down: [0, 1],
        };

        const { player } = this;

        if(player){
            player.moveByCellCoord(dirs[dir][0], dirs[dir][1], (cell) => {
                return cell.findObjectsByType('grass').length;
            });
        }
    }


    static init(cfg) {
        if (!ClientGame.game) {
            ClientGame.game = new ClientGame(cfg);
            console.log('###: GAME INIT');
            console.log('####: ClientGame cfg', cfg);
        }
    }
}

export default ClientGame;
