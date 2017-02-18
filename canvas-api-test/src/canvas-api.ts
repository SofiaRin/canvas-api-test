interface Drawable {

    render(_context: CanvasRenderingContext2D);
}

class DisplayObject implements Drawable {
    x = 0;
    y = 0;
    width: number
    height: number
    scaleX = 1;
    scaleY = 1;
    alpha = 1;
    globalAlpha = 1;

    parent: DisplayObjectContainer;

    draw(_context: CanvasRenderingContext2D) {
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
        } else {
            _context.globalAlpha = this.globalAlpha;
        }
        this.render(_context);
    }
    //模板方法模式

    render(_context: CanvasRenderingContext2D) {

    }
}
class Shape extends DisplayObject {


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
                //不在这里处理_context.globalAlpha = this.alpha;
                //不在这里处理_context.scale(this.scaleX, this.scaleY);
                _context.drawImage(image, this.x, this.y);
                this.bitmap_cache = image;
            }
        } else {
            //不在这里处理_context.globalAlpha = this.alpha;//绝对Alpha = 相对alpha * 其父绝对alpha
            //_context.scale(this.scaleX,this.scaleY);
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
    /*
        createBitmapByName(_src: string) {
            var image = new Image();
            image.src = _src;
            image.onload = () => {
    
                return image;
            }
        }
    */
    render(_context: CanvasRenderingContext2D) {

        for (let drawable of this.array) {

            drawable.draw(_context);
        }
    }
}