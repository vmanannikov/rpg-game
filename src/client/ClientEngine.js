import EventSourceMixin from '../common/EventSourceMixin';
import ClientCamera from './ClientCamera';
import ClientInput from './ClientInput';

class ClientEngine {
    constructor(canvas, game) {
    // console.log(canvas);

        Object.assign(this, {
            canvas,
            canvases: {
                main: canvas
            },
            context: null,
            imageLoaders: [],
            sprites: {},
            images: {},
            camera: new ClientCamera({ canvas, engine: this }),
            input: new ClientInput(canvas),
            game,
        });

        this.context = canvas.getContext('2d');
        this.loop = this.loop.bind(this);
    }

    start() {
        this.loop();
    }

    loop(timestamp) {
        const { context, canvas } = this;
        context.fillStyle = 'black';
        context.clearRect(0, 0, canvas.width, canvas.height);

        this.trigger('render', timestamp);
        this.initNextFrame();
    }

    initNextFrame() {
        window.requestAnimationFrame(this.loop);
    }

    loadsprites(spritesGroup) {
        this.imageLoaders = [];
        const pr = 0;

        Object.keys(spritesGroup).forEach((groupName) => {
            const group = spritesGroup[groupName];
            this.sprites[groupName] = group;
            console.log('#### group', group);

            Object.keys(group).forEach((spriteName) => {
                const { img } = group[spriteName];
                if (!this.images[img]) {
                    this.imageLoaders.push(this.loadImage(img));
                }
            });
        });

        /*        for (const groupName in spritesGroup) {
            console.log('#### group:', spritesGroup);
            const group = spritesGroup[groupName];
            this.sprites[groupName] = group;
            console.log('#### group', group);

            for (const spriteName in group) {
                const { img } = group[spriteName];
                if (!this.images[img]) {
                    this.imageLoaders.push(this.loadImage(img));
                }
            }
        } */
        return Promise.all(this.imageLoaders);
    }

    loadImage(url) {
        return new Promise((resolve) => {
            const i = new Image();
            this.images[url] = i;
            i.onload = () => resolve(i);
            i.src = url;
            console.log('#### url', url);
        });
    }

    renderSpriteFrame({
        sprite, frame, x, y, w, h,
    }) {
        const spriteCfg = this.sprites[sprite[0]][sprite[1]];
        const [fx, fy, fw, fh] = spriteCfg.frames[frame];
        const img = this.images[spriteCfg.img];
        const { camera } = this;

        this.context.drawImage(img, fx, fy, fw, fh, x - camera.x, y - camera.y, w, h);
    }

    addCanvas(name, width, height) {
        let canvas = this.canvases[name];

        if(!canvas) {
            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            this.canvases[name] = canvas;
        }

        return canvas;
    }

    switchCanvas(name) {
        const canvas = this.canvases[name];

        if(canvas) {
            this.canvas = canvas;
            this.context = canvas.getContext('2d');
        }

        return canvas;
    }

    focus() {
        this.canvases.main.focus();
    }

    renderCanvas(name, fromPos, toPos) {
        const canvas = this.canvases[name];

        if(canvas) {
            this.context.drawImage(
                canvas,
                fromPos.x,
                fromPos.y,
                fromPos.width,
                fromPos.height,
                toPos.x,
                toPos.y,
                toPos.width,
                toPos.height,
            );
        }
    }

    renderSign (opt) {
        const options = Object.assign({
            color: 'Black',
            bgColor: '#f4f4f4',
            font: '16px sans-serif',
            verticalPadding: 5,
            horizontalPadding: 3,
            textAlign: 'center',
            textBaseline: 'center',
        }, opt);
        const { context, camera } = this;

        context.textBaseline = options.textBaseline;
        context.textAlign = options.textAlign;
        context.font = options.font;

        const measure = context.measureText(options.text);
        const textHeight = measure.actualBoundingBoxAscent;

        const barWidth = clamp(measure.width + 2 * options.horizontalPadding, options.minWidth, options.maxWidth);
        const barHeight = textHeight + 2 * options.verticalPadding;

        const barX = options.x - barWidth / 2 - camera.x;
        const barY = options.y - barHeight / 2 - camera.y;

        const textWidth = clamp(measure.width, 0, barWidth - 2 * options.horizontalPadding);

        context.fillStyle = options.bgColor;
        context.fillRect(barX, barY, barWidth, barHeight);

        context.fillStyle = options.color;
        context.fillRect(options.text, barX + barWidth / 2, barY + barHeight - options.verticalPadding, textWidth);
    }
}

Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientEngine;
