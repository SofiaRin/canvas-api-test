interface Drawable {

    render(_context: CanvasRenderingContext2D);
}

class DisplayObject implements Drawable {
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

    rotation: number = 0;


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
            this.globalscaleX, this.globalscaleY, this.rotation);

        this.skewMatrix.updateSkewMatrix(this.skewX, this.skewY);

      
        var temp = new math.Matrix();
        temp = this.globalMatrix;

        this.globalMatrix = math.matrixAppendMatrix(temp, this.skewMatrix);

        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.parent.globalMatrix, this.selfMatrix);


        } else {

            _context.globalAlpha = this.globalAlpha;
           
        }
        _context.setTransform(this.globalMatrix.a, this.globalMatrix.b,
            this.globalMatrix.c, this.globalMatrix.d,
            this.globalMatrix.tx, this.globalMatrix.ty);

       

        this.render(_context);
     


    }
    //模板方法模式

    render(_context: CanvasRenderingContext2D) {

    }
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


}

class BitMap extends DisplayObject {
    src: string;

    bitmap_cache: HTMLImageElement;


    render(_context: CanvasRenderingContext2D) {
        if (this.bitmap_cache == null) {
            var image = new Image();
            image.src = this.src;

            image.onload = () => {
                _context.drawImage(image, this.x, this.y);
                this.bitmap_cache = image;
            }
        } else {

            _context.drawImage(this.bitmap_cache, this.x, this.y);
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

        for (let drawable of this.array) {

            drawable.draw(_context);
        }
    }
}