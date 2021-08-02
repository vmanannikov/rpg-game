import PositionedObject from '../common/PositionedObject';
import ClientGameObject from './ClientGameObject';
import ClientPlayer from "./ClientPlayer";

class ClientCell extends PositionedObject {
    constructor(cfg) {
        super();
        const { cellWidth, cellHeight } = cfg.world;

        Object.assign(
            this,
            {
                cfg,
                objects: [],
                x: cellWidth * cfg.cellCol,
                y: cellWidth * cfg.cellRow,
                width: cellWidth,
                height: cellHeight,
                col: cfg.cellCol,
                row: cfg.cellRow,
                objectClasses: {
                    player: ClientPlayer
                }
            },
            cfg,
        );

        this.initGameObjects();
    }

    initGameObjects() {
        const { cellCfg, objectClasses } = this;

        this.objects = cellCfg.map((layer, layerId) =>
            layer.map(
                (objCfg) => {
                    let ObjectClass;

                    if(objCfg.class){
                        ObjectClass = objectClasses[objCfg.class];
                    } else {
                        ObjectClass = ClientGameObject;
                    }

                    return new ObjectClass({
                        cell: this,
                        objCfg,
                        layerId,
                    });
                }
            ),
        );
    }

    render(time) {
        const { objects } = this;

        objects.map((obj) => obj.render(time));
    }

    addGameObject(objToAdd) {
        this.objects.push(objToAdd);
    }

    removeGameObject(objToRemove) {
        this.objects = this.objects.filter((obj) => obj !== objToRemove);
    }

    findObjectsByType(type) {
        return this.objects.filter((obj) => obj.type === type);
    }
}

export default ClientCell;
