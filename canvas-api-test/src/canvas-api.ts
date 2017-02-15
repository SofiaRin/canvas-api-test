interface Drawable {

    draw(_context: CanvasRenderingContext2D);
}

class DisplayObject implements Drawable {
    x = 0;
    y = 0;
    draw(_context: CanvasRenderingContext2D) {

    }
}

class TextField extends DisplayObject {
    text: string;

    draw(_context: CanvasRenderingContext2D) {

        _context.fillText(this.text, this.x, 10);

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
                _context.drawImage(image, this.x, this.y);
                this.bitmap_cache = image;
            }
        }else{
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