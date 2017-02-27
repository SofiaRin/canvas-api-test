enum TouchEventType {
    MOUSEDOWN = 0,
    MOUSEUP = 1,
    MOUSEMOVE = 3,
    CLICK = 2,
}
/*
class MyEvent {
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
*/
class MyEvent {
    type: number;
    target:DisplayObject;
    func: Function;
    isCapture = false;

    constructor(_type: number, _func: Function, _isCapture: boolean,_target:DisplayObject) {
        this.type = _type;
        this.func = _func;
        this.isCapture = _isCapture;
        this.target = _target;
    }
}

class TouchEventService {


    private static instance;
    private static count = 0;
    private manageList: DisplayObject[];
    constructor() {
        TouchEventService.count++;
        if (TouchEventService.count > 1) {
            throw 'singleton!!';
        }
    }

    public static getInstance() {
        if (TouchEventService.instance == null) {
            TouchEventService.instance = new TouchEventService();
        }
        return TouchEventService.instance;
    }


}

