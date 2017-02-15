interface Drawable {
    
    draw(_context:CanvasRenderingContext2D);
}

class DisplayObject implements Drawable {
    x = 0;

    draw(_context:CanvasRenderingContext2D){

    }
}

class TextField extends DisplayObject{
    text:string;

    draw(_context:CanvasRenderingContext2D){

        _context.fillText(this.text,0,10);

    }


}

class BitMap extends DisplayObject{



}

class DisplayObjectContainer extends DisplayObject{
    array = new Array<Drawable>();

    addChild(_child:Drawable){

        this.array.push(_child);
    }

    draw(_context:CanvasRenderingContext2D){

        for(var drawable of this.array){

            drawable.draw(_context);
        }
    }
}