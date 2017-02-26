interface Drawable {

    render(_context: CanvasRenderingContext2D);
}

abstract class DisplayObject implements Drawable {
    name:string;
    x = 0;
    globalX = 0;

    y = 0;
    globalY = 0;

    selfMatrix: math.Matrix;

    globalMatrix: math.Matrix;

    skewMatrix: math.Matrix;

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
    constructor() {
        this.selfMatrix = new math.Matrix();
        this.globalMatrix = new math.Matrix();
        this.skewMatrix = new math.Matrix();
    }
    setSkewX(_skewX: number) {
        this.skewX = _skewX;

    }

    setSkewY(_skewY: number) {
        this.skewY = _skewY;
    }



    draw(_context: CanvasRenderingContext2D) {

        this.globalMatrix.updateFromDisplayObject(this.globalX, this.globalY,
            this.globalscaleX, this.globalscaleY, this.globalrotation);
        this.selfMatrix.updateFromDisplayObject(this.x, this.y,
            this.scaleX, this.scaleY, this.rotation);



        this.skewMatrix.updateSkewMatrix(this.skewX, this.skewY);


        var temp = new math.Matrix();
        temp = this.globalMatrix;

        this.globalMatrix = math.matrixAppendMatrix(temp, this.skewMatrix);

        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            //B的全局矩阵 = B的自己矩阵（相对矩阵） * 其父的全局矩阵
            this.globalMatrix = math.matrixAppendMatrix(this.selfMatrix, this.parent.globalMatrix);


        } else {

            _context.globalAlpha = this.globalAlpha;

        }
        _context.setTransform(this.globalMatrix.a, this.globalMatrix.b,
            this.globalMatrix.c, this.globalMatrix.d,
            this.globalMatrix.tx, this.globalMatrix.ty);



        this.render(_context);



    }
    //模板方法模式

    abstract render(_context: CanvasRenderingContext2D)

    abstract hitTest(relativeX: number, relativeY: number);


}

class TextField extends DisplayObject {
    text: string;
    textColor: string = "#FF00FF";

    font_family: string = "normal";
    size: number = 10;
    isbold: boolean = false;
    isitalic: boolean = false;
    font_Style: string;
    render(_context: CanvasRenderingContext2D) {


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
        _context.fillText(this.text, this.x, this.y + 15);


    }

    hitTest(_relativeX: number, _relativeY: number) {
        var testRect = new math.Rectangle(0,0,10 * this.text.length,20);
        var checkPoint = new math.Point(_relativeX,_relativeY);  
        if (testRect.isPointInRectangle(checkPoint)) {
            console.log(this.name);
            alert(true);
            return this;


        } else {

            alert(false);
            return null;
        }
    }


}

class BitMap extends DisplayObject {
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
        if (this.bitmap_cache == null) {
            var image = new Image();
            image.src = this.src;

            image.onload = () => {
                _context.drawImage(image, this.x, this.y);
                this.bitmap_cache = image;
                //console.log(this.bitmap_cache.width, this.bitmap_cache.height);
            }
        } else {

            _context.drawImage(this.bitmap_cache, this.x, this.y);
        }

    }

    hitTest(_relativeX: number, _relativeY: number) {
        var testRect = new math.Rectangle(0, 0, this.bitmap_cache.width, this.bitmap_cache.height);
        var checkPoint = new math.Point(_relativeX, _relativeY);

        if (testRect.isPointInRectangle(checkPoint)) {
            console.log("reaction " + this.name);
            alert(true);
            return this;


        } else {

            alert(false);
            console.log("no reaction " + this.name)
            return null;
        }





    }

}

class DisplayObjectContainer extends DisplayObject {
    array = new Array<DisplayObject>();

    addChild(_child: DisplayObject) {

        this.array.push(_child);
        _child.parent = this;
    }
    render(_context: CanvasRenderingContext2D) {

        for (let child of this.array) {

            child.draw(_context);
        }
    }

    hitTest(_relativeX: number, _relativeY: number) {


        for (var i = this.array.length - 1; i >= 0; i--) {
            let child = this.array[i];
            let tempPoint = new math.Point(_relativeX, _relativeY);
            //
            let invertMatrix = math.invertMatrix(child.globalMatrix);
            //没有计算过他的相对矩阵,计算一个矩阵的相对矩阵
            //inv this.array[i].selfMatrix
            let relativePoint = math.pointAppendMatrix(tempPoint, invertMatrix);

            console.log(relativePoint.x, relativePoint.y);
            //   _relativepoint * inv
            //  resule
            let result = child.hitTest(relativePoint.x, relativePoint.y);
            if (result) {

                return  result;
            }

        }
        return null

    }


}