import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';
import ClientWorld from './ClientWorld';
import levelCfg from '../configs/world.json';

class ClientGame {
    constructor(cfg) {
        Object.assign(this, {
            cfg,
        });

        this.engine = this.createEngine();
        this.map = this.createWorld();
        this.initEngine();
    }

    createWorld() {
        return new ClientWorld(this, this.engine, levelCfg);
    }

    createEngine() {
        return new ClientEngine(document.getElementById(this.cfg.tagId));
    }

    initEngine() {
        const pr = 0;
        this.engine.loadsprites(sprites).then(() => {
            this.engine.on('render', (_, time) => {
                this.map.init();
            });
            this.engine.start();
        });
    }

    static init(cfg) {
        if (!ClientGame.game) {
            ClientGame.game = new ClientGame(cfg);
            console.log('###: GAME INIT');
        }
    }
}

export default ClientGame;
