enum TouchEventType {
     MOUSEDOWN = 0,
     MOUSEUP = 1,
     CLICK = 2,
}

class TouchEvents {
    x: number;
    y: number;
    type: number;
    target
    currentTarget
    constructor(x: number, y: number, type: number) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

}

class TouchListener {
    type: number;
    func: Function;
    isCapture = false;

    constructor(type: number, func: Function, isCapture?: boolean) {
        this.type = type;
        this.func = func;
        this.isCapture = isCapture || false;

    }
}

