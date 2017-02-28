var TouchEventType;
(function (TouchEventType) {
    TouchEventType[TouchEventType["MOUSEDOWN"] = 0] = "MOUSEDOWN";
    TouchEventType[TouchEventType["MOUSEUP"] = 1] = "MOUSEUP";
    TouchEventType[TouchEventType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
    TouchEventType[TouchEventType["CLICK"] = 2] = "CLICK";
})(TouchEventType || (TouchEventType = {}));
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
var MyEvent = (function () {
    function MyEvent(_type, _func, _isCapture, _target) {
        this.isCapture = false;
        this.type = _type;
        this.func = _func;
        this.isCapture = _isCapture;
        this.target = _target;
    }
    return MyEvent;
}());
var TouchEventService = (function () {
    function TouchEventService() {
        // TouchEventService.count++;
        // if (TouchEventService.count > 1) {
        //     throw 'singleton!!';
        // }
    }
    TouchEventService.getInstance = function () {
        if (TouchEventService.touchEventService == null) {
            TouchEventService.touchEventService = new TouchEventService();
            TouchEventService.touchEventService.manageList = new Array();
            return TouchEventService.touchEventService;
        }
        else {
            return TouchEventService.touchEventService;
        }
    };
    return TouchEventService;
}());
//# sourceMappingURL=TouchEvent.js.map