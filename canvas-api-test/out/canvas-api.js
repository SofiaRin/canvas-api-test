var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        this.selfMatrix = new math.Matrix();
        this.globalMatrix = new math.Matrix();
        this.skewMatrix = new math.Matrix();
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
        var event = new MyEvent(_type, _func, _isCapture, _target);
        this.eventList.push(event);
    };
    DisplayObject.prototype.draw = function (_context) {
        var selfMatrix = new math.Matrix();
        selfMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        this.selfMatrix = selfMatrix;
        this.globalMatrix.updateFromDisplayObject(this.globalX, this.globalY, this.globalscaleX, this.globalscaleY, this.globalrotation);
        /*
        this.skewMatrix.updateSkewMatrix(this.skewX, this.skewY);
        var temp = new math.Matrix();
        temp = this.globalMatrix;
        this.globalMatrix = math.matrixAppendMatrix(temp, this.skewMatrix);
        */
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            //B的全局矩阵 = B的自己矩阵（相对矩阵） * 其父的全局矩阵
            var parentGlobalMatrix = this.parent.globalMatrix;
            var globalMatrix = math.matrixAppendMatrix(this.selfMatrix, this.parent.globalMatrix);
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
        var testRect = new math.Rectangle(0, 0, 10 * this.text.length, 20);
        var checkPoint = new math.Point(_relativeX, _relativeY);
        if (testRect.isPointInRectangle(checkPoint)) {
            var manageList = TouchEventService.getInstance().manageList;
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
        var testRect = new math.Rectangle(0, 0, this.bitmap_cache.width, this.bitmap_cache.height);
        var checkPoint = new math.Point(_relativeX, _relativeY);
        if (testRect.isPointInRectangle(checkPoint)) {
            console.log("reaction " + this.name);
            //alert(true);
            var manageList = TouchEventService.getInstance().manageList;
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
        var manageList = TouchEventService.getInstance().manageList;
        if (this.eventList.length != 0) {
            manageList.push(this);
        }
        for (var i = this.array.length - 1; i >= 0; i--) {
            var child = this.array[i];
            var invertMatrix = math.invertMatrix(child.selfMatrix);
            var tempPoint = new math.Point(_relativeX, _relativeY);
            //
            //没有计算过他的相对矩阵,计算一个矩阵的相对矩阵
            //inv this.array[i].selfMatrix
            var relativePoint = math.pointAppendMatrix(tempPoint, invertMatrix);
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
//# sourceMappingURL=canvas-api.js.map