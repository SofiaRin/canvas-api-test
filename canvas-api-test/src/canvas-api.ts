interface Drawable {

    draw(_context: CanvasRenderingContext2D);
}

class DisplayObject implements Drawable {
    x = 0;
    y = 0;
    width: number
    height: number
    scaleX = 1;
    scaleY = 1;
    aplha = 1;
    draw(_context: CanvasRenderingContext2D) {

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
    font_Style:string;
    draw(_context: CanvasRenderingContext2D) {
        _context.globalAlpha = this.aplha;
        
        if (this.isitalic) {
           this.font_Style = "italic ";

        } else {
           this.font_Style = "normal ";
        }
        

        if (this.isbold) {
            _context.font = this.font_Style + "bold " + this.size + "px " + this.font_family;
        } else {
            _context.font = this.font_Style +  this.size + "px " + this.font_family;
        }
        _context.fillStyle = this.textColor;
        _context.fillText(this.text, this.x, this.y + 15);


    }


}

class BitMap extends DisplayObject {
    src: string;

    bitmap_cache: HTMLImageElement;


    draw(_context: CanvasRenderingContext2D) {
        if (this.bitmap_cache == null) {
            var image = new Image();
            image.src = this.src;

            image.onload = () => {
                _context.globalAlpha = this.aplha;
                _context.scale(this.scaleX, this.scaleY);
                _context.drawImage(image, this.x, this.y);
                this.bitmap_cache = image;
            }
        } else {
            _context.globalAlpha = this.aplha;
            //_context.scale(this.scaleX,this.scaleY);
            _context.drawImage(this.bitmap_cache, this.x, this.y);
        }

    }
}

class DisplayObjectContainer extends DisplayObject {
    array = new Array<Drawable>();

    addChild(_child: Drawable) {

        this.array.push(_child);
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
    draw(_context: CanvasRenderingContext2D) {

        for (var drawable of this.array) {

            drawable.draw(_context);
        }
    }
}