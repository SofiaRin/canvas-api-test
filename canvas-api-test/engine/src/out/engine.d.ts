declare namespace engine {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(_x: number, _y: number, _width: number, _height: number);
        isPointInRectangle(point: Point): boolean;
    }
    function pointAppendMatrix(point: Point, m: Matrix): Point;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m: Matrix): Matrix;
    function matrixAppendMatrix(m1: Matrix, m2: Matrix): Matrix;
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        toString(): string;
        updateFromDisplayObject(x: number, y: number, scaleX: number, scaleY: number, rotation: number): void;
        updateSkewMatrix(b: number, c: number): void;
    }
}
declare namespace engine {
    type Ticker_Listener_Type = (deltaTime: number) => void;
    class Ticker {
        private static instance;
        static getInstance(): Ticker;
        listeners: Ticker_Listener_Type[];
        register(listener: Ticker_Listener_Type): void;
        unregister(listener: Ticker_Listener_Type): void;
        notify(deltaTime: number): void;
    }
}
declare namespace engine {
    interface Drawable {
        render(_context: CanvasRenderingContext2D): any;
    }
    abstract class DisplayObject implements Drawable {
        name: string;
        x: number;
        globalX: number;
        y: number;
        globalY: number;
        selfMatrix: engine.Matrix;
        globalMatrix: engine.Matrix;
        skewMatrix: engine.Matrix;
        width: number;
        height: number;
        scaleX: number;
        globalscaleX: number;
        scaleY: number;
        globalscaleY: number;
        alpha: number;
        globalAlpha: number;
        globalrotation: number;
        rotation: number;
        skewX: number;
        skewY: number;
        parent: DisplayObjectContainer;
        eventList: MyEvent[];
        constructor();
        setOffSetY(_y: number): void;
        setSkewX(_skewX: number): void;
        setSkewY(_skewY: number): void;
        addEventListener(_type: number, _func: Function, _isCapture: boolean, _target: DisplayObject): void;
        draw(_context: CanvasRenderingContext2D): void;
        abstract render(_context: CanvasRenderingContext2D): any;
        abstract hitTest(relativeX: number, relativeY: number): any;
    }
    class TextField extends DisplayObject {
        text: string;
        textColor: string;
        font_family: string;
        size: number;
        isbold: boolean;
        isitalic: boolean;
        font_Style: string;
        render(_context: CanvasRenderingContext2D): void;
        hitTest(_relativeX: number, _relativeY: number): this;
    }
    class BitMap extends DisplayObject {
        src: string;
        bitmap_cache: HTMLImageElement;
        image: HTMLImageElement;
        render(_context: CanvasRenderingContext2D): void;
        hitTest(_relativeX: number, _relativeY: number): this;
    }
    class DisplayObjectContainer extends DisplayObject {
        array: DisplayObject[];
        addChild(_child: DisplayObject): void;
        render(_context: CanvasRenderingContext2D): void;
        hitTest(_relativeX: number, _relativeY: number): any;
    }
}
declare namespace engine {
    class MyEvent {
        type: number;
        target: DisplayObject;
        func: Function;
        isCapture: boolean;
        constructor(_type: number, _func: Function, _isCapture: boolean, _target: engine.DisplayObject);
    }
    class TouchEventService {
        manageList: DisplayObject[];
        static touchEventService: TouchEventService;
        constructor();
        static getInstance(): TouchEventService;
    }
}
declare namespace engine {
    let run: (canvas: HTMLCanvasElement) => DisplayObjectContainer;
}
