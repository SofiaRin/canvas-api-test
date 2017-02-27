var TouchEventType;
(function (TouchEventType) {
    TouchEventType[TouchEventType["MOUSEDOWN"] = 0] = "MOUSEDOWN";
    TouchEventType[TouchEventType["MOUSEUP"] = 1] = "MOUSEUP";
    TouchEventType[TouchEventType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
    TouchEventType[TouchEventType["CLICK"] = 2] = "CLICK";
})(TouchEventType || (TouchEventType = {}));
var Touch_Event = (function () {
    function Touch_Event(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
    return Touch_Event;
}());
var TouchListener = (function () {
    function TouchListener(type, func, isCapture) {
        this.isCapture = false;
        this.type = type;
        this.func = func;
        this.isCapture = isCapture;
    }
    return TouchListener;
}());
var TouchEventService = (function () {
    function TouchEventService() {
        this.eventList = [];
        TouchEventService.count++;
        if (TouchEventService.count > 1) {
            throw 'singleton!!';
        }
    }
    TouchEventService.getInstance = function () {
        if (TouchEventService.instance == null) {
            TouchEventService.instance = new TouchEventService();
        }
        return TouchEventService.instance;
    };
    TouchEventService.count = 0;
    return TouchEventService;
}());
//# sourceMappingURL=touchEvent.js.map