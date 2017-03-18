namespace engine {

    type MovieClipData = {

        name: string,
        frames: MovieClipFrameData[]
    }

    type MovieClipFrameData = {
        "image": string
    }



    export interface Drawable {

        update();
    }

    export abstract class DisplayObject implements Drawable {

        type = "DisplayObject";


        name: string;
        x = 0;
        globalX = 0;

        y = 0;
        globalY = 0;

        selfMatrix: engine.Matrix;

        globalMatrix: engine.Matrix;

        skewMatrix: engine.Matrix;

        width = 0;
        height = 0;
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
        constructor(_type:string) {
            this.type = _type;
            this.selfMatrix = new engine.Matrix();
            this.globalMatrix = new engine.Matrix();
            this.skewMatrix = new engine.Matrix();
            this.eventList = [];
        }
        setWidth(_width: number) {

            this.width = _width;

        }

        setHeight(_height: number) {

            this.height = _height;

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

        setTouchEnabled(_isEnalbe: boolean) {
            this.touchEnabled = _isEnalbe;
        }

        addEventListener(_type: number, _func: Function, _isCapture: boolean, _target: DisplayObject) {
            let event = new MyEvent(_type, _func, _isCapture, _target);
            this.eventList.push(event);

        }
        //模板方法模式
        update() {
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


            } else {

                this.globalAlpha = this.alpha;
                this.globalMatrix = selfMatrix;

       
            }
      

        }

    

        abstract hitTest(relativeX: number, relativeY: number);
    }

    export class TextField extends DisplayObject {
        text: string;
        textColor: string = "#000000";
        nextLine = 78
        font_family: string = "normal";
        size: number = 15;
        isbold: boolean = false;
        isitalic: boolean = false;
        font_Style: string;
        
        
        constructor(){
            super("TextField");
            
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

    export class Bitmap extends DisplayObject {
        src: string;

        bitmap_cache: HTMLImageElement;

        image: HTMLImageElement;

        private w;
        private h;

        
        constructor(){
            super("Bitmap");
            
        }
        
      

        hitTest(_relativeX: number, _relativeY: number) {
            if (this.touchEnabled) {
                var testRect = new engine.Rectangle(0, 0, this.width, this.height);
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


        constructor() {
            super("DisplayObjectContainer");
        }

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

        update( ) {
            if (this.visible) {
                super.update();
                for (let child of this.array) {

                    child.update();
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


    class MovieClip extends Bitmap {

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