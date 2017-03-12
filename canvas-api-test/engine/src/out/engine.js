var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    engine.Point = Point;
    var Rectangle = (function () {
        function Rectangle(_x, _y, _width, _height) {
            this.x = 0;
            this.y = 0;
            this.width = 1;
            this.height = 1;
            this.x = _x;
            this.y = _y;
            this.width = _width;
            this.height = _height;
        }
        Rectangle.prototype.isPointInRectangle = function (point) {
            var rect = this;
            if (point.x < rect.width + rect.x &&
                point.y < rect.height + rect.y &&
                point.x > rect.x &&
                point.y > rect.y) {
                return true;
            }
        };
        return Rectangle;
    }());
    engine.Rectangle = Rectangle;
    function pointAppendMatrix(point, m) {
        var x = m.a * point.x + m.c * point.y + m.tx;
        var y = m.b * point.x + m.d * point.y + m.ty;
        return new Point(x, y);
    }
    engine.pointAppendMatrix = pointAppendMatrix;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m) {
        var a = m.a;
        var b = m.b;
        var c = m.c;
        var d = m.d;
        var tx = m.tx;
        var ty = m.ty;
        var determinant = a * d - b * c;
        var result = new Matrix(1, 0, 0, 1, 0, 0);
        if (determinant == 0) {
            throw new Error("no invert");
        }
        determinant = 1 / determinant;
        var k = result.a = d * determinant;
        b = result.b = -b * determinant;
        c = result.c = -c * determinant;
        d = result.d = a * determinant;
        result.tx = -(k * tx + c * ty);
        result.ty = -(b * tx + d * ty);
        return result;
    }
    engine.invertMatrix = invertMatrix;
    function matrixAppendMatrix(m1, m2) {
        var result = new Matrix();
        result.a = m1.a * m2.a + m1.b * m2.c;
        result.b = m1.a * m2.b + m1.b * m2.d;
        result.c = m2.a * m1.c + m2.c * m1.d;
        result.d = m2.b * m1.c + m1.d * m2.d;
        result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
        result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
        return result;
    }
    engine.matrixAppendMatrix = matrixAppendMatrix;
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = Math.PI / 180;
    var Matrix = (function () {
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        Matrix.prototype.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        };
        Matrix.prototype.updateFromDisplayObject = function (x, y, scaleX, scaleY, rotation) {
            this.tx = x;
            this.ty = y;
            var skewX, skewY;
            skewX = skewY = rotation / 180 * Math.PI;
            var u = Math.cos(skewX);
            var v = Math.sin(skewX);
            this.a = Math.cos(skewY) * scaleX;
            this.b = Math.sin(skewY) * scaleX;
            this.c = -v * scaleY;
            this.d = u * scaleY;
        };
        Matrix.prototype.updateSkewMatrix = function (b, c) {
            this.b = b;
            this.c = c;
        };
        return Matrix;
    }());
    engine.Matrix = Matrix;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Ticker = (function () {
        function Ticker() {
            this.listeners = [];
        }
        Ticker.getInstance = function () {
            if (!Ticker.instance) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        };
        Ticker.prototype.register = function (listener) {
            this.listeners.push(listener);
        };
        Ticker.prototype.unregister = function (listener) {
        };
        Ticker.prototype.notify = function (deltaTime) {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(deltaTime);
            }
        };
        return Ticker;
    }());
    engine.Ticker = Ticker;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var DisplayObject = (function () {
        /*  1.MouseMove
            2.MouseClick
            3.MouseClick
         */
        function DisplayObject() {
            this.x = 0;
            this.globalX = 0;
            this.y = 0;
            this.globalY = 0;
            this.scaleX = 1;
            this.globalscaleX = 1;
            this.scaleY = 1;
            this.globalscaleY = 1;
            this.alpha = 1;
            this.globalAlpha = 1;
            this.globalrotation = 0;
            this.rotation = 0;
            this.skewX = 0;
            this.skewY = 0;
            this.selfMatrix = new engine.Matrix();
            this.globalMatrix = new engine.Matrix();
            this.skewMatrix = new engine.Matrix();
            this.eventList = [];
        }
        DisplayObject.prototype.setOffSetY = function (_y) {
            this.y = _y;
        };
        DisplayObject.prototype.setSkewX = function (_skewX) {
            this.skewX = _skewX;
        };
        DisplayObject.prototype.setSkewY = function (_skewY) {
            this.skewY = _skewY;
        };
        DisplayObject.prototype.addEventListener = function (_type, _func, _isCapture, _target) {
            var event = new engine.MyEvent(_type, _func, _isCapture, _target);
            this.eventList.push(event);
        };
        //模板方法模式
        DisplayObject.prototype.draw = function (_context) {
            var selfMatrix = new engine.Matrix();
            selfMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            this.selfMatrix = selfMatrix;
            this.globalMatrix.updateFromDisplayObject(this.globalX, this.globalY, this.globalscaleX, this.globalscaleY, this.globalrotation);
            if (this.parent) {
                this.globalAlpha = this.parent.globalAlpha * this.alpha;
                //B的全局矩阵 = B的自己矩阵（相对矩阵） * 其父的全局矩阵
                var parentGlobalMatrix = this.parent.globalMatrix;
                var globalMatrix = engine.matrixAppendMatrix(this.selfMatrix, this.parent.globalMatrix);
                this.globalMatrix = globalMatrix;
                _context.setTransform(globalMatrix.a, globalMatrix.b, globalMatrix.c, globalMatrix.d, globalMatrix.tx, globalMatrix.ty);
            }
            else {
                this.globalAlpha = this.alpha;
                this.globalMatrix = selfMatrix;
                _context.setTransform(selfMatrix.a, selfMatrix.b, selfMatrix.c, selfMatrix.d, selfMatrix.tx, selfMatrix.ty);
            }
            _context.globalAlpha = this.globalAlpha;
            this.render(_context);
        };
        return DisplayObject;
    }());
    engine.DisplayObject = DisplayObject;
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            _super.apply(this, arguments);
            this.textColor = "#FF00FF";
            this.font_family = "normal";
            this.size = 10;
            this.isbold = false;
            this.isitalic = false;
        }
        TextField.prototype.render = function (_context) {
            if (this.isitalic) {
                this.font_Style = "italic ";
            }
            else {
                this.font_Style = "normal ";
            }
            if (this.isbold) {
                _context.font = this.font_Style + "bold " + this.size + "px " + this.font_family;
            }
            else {
                _context.font = this.font_Style + this.size + "px " + this.font_family;
            }
            _context.fillStyle = this.textColor;
            _context.fillText(this.text, 0, 0 + 15);
        };
        TextField.prototype.hitTest = function (_relativeX, _relativeY) {
            var testRect = new engine.Rectangle(0, 0, 10 * this.text.length, 20);
            var checkPoint = new engine.Point(_relativeX, _relativeY);
            if (testRect.isPointInRectangle(checkPoint)) {
                var manageList = engine.TouchEventService.getInstance().manageList;
                if (this.eventList.length != 0) {
                    manageList.push(this);
                }
                console.log(this.name);
                console.log(true);
                return this;
            }
            else {
                alert(false);
                return null;
            }
        };
        return TextField;
    }(DisplayObject));
    engine.TextField = TextField;
    var BitMap = (function (_super) {
        __extends(BitMap, _super);
        function BitMap() {
            _super.apply(this, arguments);
        }
        /*
        constructor(){
            super();
            this.image
        }
        */
        BitMap.prototype.render = function (_context) {
            var _this = this;
            if (this.bitmap_cache == null) {
                var image = new Image();
                image.src = this.src;
                image.onload = function () {
                    _context.drawImage(image, 0, 0);
                    _this.bitmap_cache = image;
                    console.log(_this.bitmap_cache.width, _this.bitmap_cache.height);
                };
            }
            else {
                _context.drawImage(this.bitmap_cache, 0, 0);
            }
        };
        BitMap.prototype.hitTest = function (_relativeX, _relativeY) {
            var testRect = new engine.Rectangle(0, 0, this.bitmap_cache.width, this.bitmap_cache.height);
            var checkPoint = new engine.Point(_relativeX, _relativeY);
            if (testRect.isPointInRectangle(checkPoint)) {
                console.log("reaction " + this.name);
                //alert(true);
                var manageList = engine.TouchEventService.getInstance().manageList;
                if (this.eventList.length != 0) {
                    manageList.push(this);
                }
                return this;
            }
            else {
                //alert(false);
                console.log("no reaction " + this.name);
                return null;
            }
        };
        return BitMap;
    }(DisplayObject));
    engine.BitMap = BitMap;
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            _super.apply(this, arguments);
            this.array = new Array();
        }
        DisplayObjectContainer.prototype.addChild = function (_child) {
            _child.parent = this;
            this.array.push(_child);
        };
        DisplayObjectContainer.prototype.render = function (_context) {
            for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
                var child = _a[_i];
                child.draw(_context);
            }
        };
        DisplayObjectContainer.prototype.hitTest = function (_relativeX, _relativeY) {
            var manageList = engine.TouchEventService.getInstance().manageList;
            if (this.eventList.length != 0) {
                manageList.push(this);
            }
            for (var i = this.array.length - 1; i >= 0; i--) {
                var child = this.array[i];
                var invertMatrix_1 = engine.invertMatrix(child.selfMatrix);
                var tempPoint = new engine.Point(_relativeX, _relativeY);
                //
                //没有计算过他的相对矩阵,计算一个矩阵的相对矩阵
                //inv this.array[i].selfMatrix
                var relativePoint = engine.pointAppendMatrix(tempPoint, invertMatrix_1);
                console.log(relativePoint.x, relativePoint.y);
                //   _relativepoint * inv
                //  resule
                var result = child.hitTest(relativePoint.x, relativePoint.y);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        return DisplayObjectContainer;
    }(DisplayObject));
    engine.DisplayObjectContainer = DisplayObjectContainer;
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(data) {
            var _this = this;
            _super.call(this);
            this.advancedTime = 0;
            this.ticker = function (deltaTime) {
                // this.removeChild();
                _this.advancedTime += deltaTime;
                if (_this.advancedTime >= MovieClip.FRAME_TIME * MovieClip.TOTAL_FRAME) {
                    _this.advancedTime -= MovieClip.FRAME_TIME * MovieClip.TOTAL_FRAME;
                }
                _this.currentFrameIndex = Math.floor(_this.advancedTime / MovieClip.FRAME_TIME);
                var data = _this.data;
                var frameData = data.frames[_this.currentFrameIndex];
                var url = frameData.image;
            };
            this.setMovieClipData(data);
            this.play();
        }
        MovieClip.prototype.play = function () {
            engine.Ticker.getInstance().register(this.ticker);
        };
        MovieClip.prototype.stop = function () {
            engine.Ticker.getInstance().unregister(this.ticker);
        };
        MovieClip.prototype.setMovieClipData = function (data) {
            this.data = data;
            this.currentFrameIndex = 0;
            // 创建 / 更新 
        };
        MovieClip.FRAME_TIME = 20;
        MovieClip.TOTAL_FRAME = 10;
        return MovieClip;
    }(BitMap));
})(engine || (engine = {}));
var engine;
(function (engine) {
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
    engine.MyEvent = MyEvent;
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
    engine.TouchEventService = TouchEventService;
})(engine || (engine = {}));
var engine;
(function (engine) {
    engine.run = function (canvas) {
        var stage = new engine.DisplayObjectContainer();
        var context2D = canvas.getContext("2d");
        var lastNow = Date.now();
        var frameHandler = function () {
            var now = Date.now();
            var deltaTime = now - lastNow;
            engine.Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, 400, 400);
            context2D.save();
            stage.draw(context2D);
            context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        };
        window.requestAnimationFrame(frameHandler);
        window.onmousedown = function () {
            // stage.hitTest(100, 100);
        };
        return stage;
    };
})(engine || (engine = {}));
