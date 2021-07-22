import PositionedObject from '../common/PositionedObject';
import ClientCell from './ClientCell';

class ClientWorld extends PositionedObject {
    constructor(game, engine, levelCfg) {
        super();

        const worldHeight = levelCfg.map.length;
        const worldWidth = levelCfg.map[0].length;
        const cellSize = engine.canvas.height / levelCfg.camera.height;
        console.log('#### worldHeight', worldHeight);
        console.log('#### worldWidth', worldWidth);
        console.log('#### cellSize', cellSize);

        Object.assign(this, {
            game,
            engine,
            levelCfg,
            height: worldHeight * cellSize,
            width: worldWidth * cellSize,
            worldHeight,
            worldWidth,
            cellWidth: cellSize,
            cellHeight: cellSize,
            map: [],
        });
    }

    init() {
        const {
            levelCfg, map, worldWidth, worldHeight,
        } = this;
        console.log('#### Client World this init', this);

        for (let row = 0; row < worldHeight; row++) {
            for (let col = 0; col < worldWidth; col++) {
                if (!map[row]) {
                    map[row] = [];
                }

                console.log('#### map init', map);

                map[row][col] = new ClientCell({
                    world: this,
                    cellCol: col,
                    cellRow: row,
                    cellCfg: levelCfg.map[row][col],
                });
                console.log('#### cellCfg', map[row][col]);
            }
        }
    }

    render(time) {
        const { map, worldWidth, worldHeight } = this;

        for (let row = 0; row < worldHeight; row++) {
            for (let col = 0; col < worldWidth; col++) {
                console.log('#### map row', row);
                console.log('#### map col', col);
                map[row][col].render(time);
            }
        }
    }

    cellAt(col, row) {
        return this.map[row] && this.map[row][col];
    }
}

export default ClientWorld;
