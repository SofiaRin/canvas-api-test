namespace engine {

    type MovieClipData = {

        name: string,
        frames: MovieClipFrameData[]
    }

    type MovieClipFrameData = {
        "image": string
    }



    export interface Drawable {

        render(_context: CanvasRenderingContext2D);
    }

    export abstract class DisplayObject implements Drawable {
        name: string;
        x = 0;
        globalX = 0;

        y = 0;
        globalY = 0;

        selfMatrix: engine.Matrix;

        globalMatrix: engine.Matrix;

        skewMatrix: engine.Matrix;

        width: number
        height: number
        scaleX = 1;
        globalscaleX = 1;

        scaleY = 1;
        globalscaleY = 1;

        alpha = 1;
        globalAlpha = 1;

        globalrotation: number = 0;
        rotation = 0

        skewX = 0;
        skewY = 0;
        parent: DisplayObjectContainer;
        eventList: MyEvent[];// save for events
        /*  1.MouseMove
            2.MouseClick
            3.MouseClick
         */
        touchEnabled = false;
        visible = true;
        constructor() {
            this.selfMatrix = new engine.Matrix();
            this.globalMatrix = new engine.Matrix();
            this.skewMatrix = new engine.Matrix();
            this.eventList = [];
        }


        setOffSetY(_y: number) {
            this.y = _y;

        }
        setSkewX(_skewX: number) {
            this.skewX = _skewX;

        }

        setSkewY(_skewY: number) {
            this.skewY = _skewY;
        }

        setTouchEnabled(_isEnalbe:boolean){
            this.touchEnabled = _isEnalbe;
        }

        addEventListener(_type: number, _func: Function, _isCapture: boolean, _target: DisplayObject) {
            let event = new MyEvent(_type, _func, _isCapture, _target);
            this.eventList.push(event);

        }
        //模板方法模式
        draw(_context: CanvasRenderingContext2D) {
            var selfMatrix = new engine.Matrix();
            selfMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            this.selfMatrix = selfMatrix


            this.globalMatrix.updateFromDisplayObject(this.globalX, this.globalY,
                this.globalscaleX, this.globalscaleY, this.globalrotation);

            if (this.parent) {
                this.globalAlpha = this.parent.globalAlpha * this.alpha;
                //B的全局矩阵 = B的自己矩阵（相对矩阵） * 其父的全局矩阵

                var parentGlobalMatrix = this.parent.globalMatrix;
                var globalMatrix = engine.matrixAppendMatrix(this.selfMatrix, this.parent.globalMatrix);
                this.globalMatrix = globalMatrix;

                _context.setTransform(globalMatrix.a, globalMatrix.b,
                    globalMatrix.c, globalMatrix.d, globalMatrix.tx, globalMatrix.ty)

            } else {

                this.globalAlpha = this.alpha;
                this.globalMatrix = selfMatrix;

                _context.setTransform(selfMatrix.a, selfMatrix.b,
                    selfMatrix.c, selfMatrix.d,
                    selfMatrix.tx, selfMatrix.ty);
            }
            _context.globalAlpha = this.globalAlpha;
            this.render(_context);
        }

        abstract render(_context: CanvasRenderingContext2D)

        abstract hitTest(relativeX: number, relativeY: number);
    }

    export class TextField extends DisplayObject {
        text: string;
        textColor: string = "#FF00FF";

        font_family: string = "normal";
        size: number = 10;
        isbold: boolean = false;
        isitalic: boolean = false;
        font_Style: string;
        render(_context: CanvasRenderingContext2D) {
            if (this.visible) {
                if (this.isitalic) {
                    this.font_Style = "italic ";

                } else {
                    this.font_Style = "normal ";
                }


                if (this.isbold) {
                    _context.font = this.font_Style + "bold " + this.size + "px " + this.font_family;
                } else {
                    _context.font = this.font_Style + this.size + "px " + this.font_family;
                }
                _context.fillStyle = this.textColor;
                _context.fillText(this.text, 0, 0 + 15);
            }
        }

        hitTest(_relativeX: number, _relativeY: number) {
            if (this.touchEnabled) {
                var testRect = new engine.Rectangle(0, 0, 10 * this.text.length, 20);
                var checkPoint = new engine.Point(_relativeX, _relativeY);
                if (testRect.isPointInRectangle(checkPoint)) {

                    let manageList = TouchEventService.getInstance().manageList;
                    if (this.eventList.length != 0) {
                        manageList.push(this);

                    }

                    console.log(this.name);
                    console.log(true);
                    return this;


                } else {

                    alert(false);
                    return null;
                }
            }

        }
    }

    export class BitMap extends DisplayObject {
        src: string;

        bitmap_cache: HTMLImageElement;

        image: HTMLImageElement;
        /*
        constructor(){
            super();
            this.image
        }
        */
        render(_context: CanvasRenderingContext2D) {
            if (this.visible) {
                if (this.bitmap_cache == null) {
                    var image = new Image();
                    image.src = this.src;

                    image.onload = () => {
                        _context.drawImage(image, 0, 0);
                        this.bitmap_cache = image;
                        console.log(this.bitmap_cache.width, this.bitmap_cache.height);
                    }
                } else {

                    _context.drawImage(this.bitmap_cache, 0, 0);
                }
            }
        }

        hitTest(_relativeX: number, _relativeY: number) {
            if (this.touchEnabled) {
                var testRect = new engine.Rectangle(0, 0, this.bitmap_cache.width, this.bitmap_cache.height);
                var checkPoint = new engine.Point(_relativeX, _relativeY);

                if (testRect.isPointInRectangle(checkPoint)) {
                    console.log("reaction " + this.name);
                    //alert(true);

                    let manageList = TouchEventService.getInstance().manageList;
                    if (this.eventList.length != 0) {
                        manageList.push(this);

                    }

                    return this;


                } else {

                    //alert(false);
                    console.log("no reaction " + this.name)
                    return null;
                }
            }
        }
    }
    
    export class DisplayObjectContainer extends DisplayObject {
        array = new Array<DisplayObject>();

        addChild(_child: DisplayObject) {
            _child.parent = this;
            this.array.push(_child);

        }

        removeChild(_child: DisplayObject) {
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i] == _child) {
                    this.array.splice(i, 1);
                    break;
                }
            }
        }

        render(_context: CanvasRenderingContext2D) {
            if (this.visible) {
                for (let child of this.array) {

                    child.draw(_context);
                }
            }
        }

        hitTest(_relativeX: number, _relativeY: number) {
            let manageList = engine.TouchEventService.getInstance().manageList;


            if (this.eventList.length != 0) {
                manageList.push(this);
            }

            for (let i = this.array.length - 1; i >= 0; i--) {
                let child = this.array[i];
                let invertMatrix = engine.invertMatrix(child.selfMatrix);

                let tempPoint = new engine.Point(_relativeX, _relativeY);
                //

                //没有计算过他的相对矩阵,计算一个矩阵的相对矩阵
                //inv this.array[i].selfMatrix
                let relativePoint = engine.pointAppendMatrix(tempPoint, invertMatrix);

                console.log(relativePoint.x, relativePoint.y);
                //   _relativepoint * inv
                //  resule
                let result = child.hitTest(relativePoint.x, relativePoint.y);
                if (result) {

                    return result;
                }

            }
            return null

        }
    }


    class MovieClip extends BitMap {

        private advancedTime: number = 0;

        private static FRAME_TIME = 20;

        private static TOTAL_FRAME = 10;

        private currentFrameIndex: number;

        private data: MovieClipData;

        constructor(data: MovieClipData) {
            super();
            this.setMovieClipData(data);
            this.play();
        }

        ticker = (deltaTime) => {
            // this.removeChild();
            this.advancedTime += deltaTime;
            if (this.advancedTime >= MovieClip.FRAME_TIME * MovieClip.TOTAL_FRAME) {
                this.advancedTime -= MovieClip.FRAME_TIME * MovieClip.TOTAL_FRAME;
            }
            this.currentFrameIndex = Math.floor(this.advancedTime / MovieClip.FRAME_TIME);

            let data = this.data;

            let frameData = data.frames[this.currentFrameIndex];
            let url = frameData.image;
        }

        play() {
            Ticker.getInstance().register(this.ticker);
        }

        stop() {
            Ticker.getInstance().unregister(this.ticker)
        }

        setMovieClipData(data: MovieClipData) {
            this.data = data;
            this.currentFrameIndex = 0;
            // 创建 / 更新 

        }
    }
}