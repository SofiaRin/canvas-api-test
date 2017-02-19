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

    width: number
    height: number
    scaleX = 1;
    globalscaleX = 1;

    scaleY = 1;
    globalscaleY = 1;

    alpha = 1;
    globalAlpha = 1;

    rotation: number = 0;

    parent: DisplayObjectContainer;
    constructor() {
        this.selfMatrix = new math.Matrix();
        this.globalMatrix = new math.Matrix();
    }

    draw(_context: CanvasRenderingContext2D) {
        ///context绘图前复位//封装的API不直接处理 a b c d tx ty 所以在update前，相当于将_context复位


        this.globalMatrix.updateFromDisplayObject(this.globalX, this.globalY, this.globalscaleX, this.globalscaleY, this.rotation)

        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.parent.globalMatrix, this.selfMatrix)
        } else {

            _context.globalAlpha = this.globalAlpha;
            //_context.rotate
        }
        
        _context.translate(this.globalMatrix.tx, this.globalMatrix.ty);
        _context.scale(this.globalMatrix.a, this.globalMatrix.d);
        this.render(_context);
        _context.translate(-this.globalMatrix.tx, -this.globalMatrix.ty);
        _context.scale(1, 1);
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
        //不在这里处理_context.globalAlpha = this.alpha;

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