class ClientWorld {
    constructor(game, engine, levelCfg) {
        Object.assign(this, {
            game,
            engine,
            levelCfg,
            height: levelCfg.map.length,
            width: levelCfg.map[0].length,
        });
    }

    init() {
        const pr = 0;
        for (let cW = 0; cW < canvasW; cW += 48) {
            console.log('#### cW', cW);
            for (let cH = 0; cH < canvasH; cH += 48) {
                this.engine.renderSpriteFrame({
                    sprite: ['terrain', 'grass'],
                    frame: 0,
                    x: cW,
                    y: cH,
                    w: 48,
                    h: 48,
                });
            }
        }
    }
}

export default ClientWorld;
