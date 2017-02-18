var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.alpha = 1;
        this.globalAlpha = 1;
    }
    DisplayObject.prototype.draw = function (_context) {
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
        }
        else {
            _context.globalAlpha = this.globalAlpha;
        }
        this.render(_context);
    };
    //模板方法模式
    DisplayObject.prototype.render = function (_context) {
    };
    return DisplayObject;
}());
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        _super.apply(this, arguments);
    }
    return Shape;
}(DisplayObject));
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
        //不在这里处理_context.globalAlpha = this.alpha;
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
        _context.fillText(this.text, this.x, this.y + 15);
    };
    return TextField;
}(DisplayObject));
var BitMap = (function (_super) {
    __extends(BitMap, _super);
    function BitMap() {
        _super.apply(this, arguments);
    }
    BitMap.prototype.render = function (_context) {
        var _this = this;
        if (this.bitmap_cache == null) {
            var image = new Image();
            image.src = this.src;
            image.onload = function () {
                //不在这里处理_context.globalAlpha = this.alpha;
                //不在这里处理_context.scale(this.scaleX, this.scaleY);
                _context.drawImage(image, _this.x, _this.y);
                _this.bitmap_cache = image;
            };
        }
        else {
            //不在这里处理_context.globalAlpha = this.alpha;//绝对Alpha = 相对alpha * 其父绝对alpha
            //_context.scale(this.scaleX,this.scaleY);
            _context.drawImage(this.bitmap_cache, this.x, this.y);
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
        this.array.push(_child);
        _child.parent = this;
    };
    /*
        createBitmapByName(_src: string) {
            var image = new Image();
            image.src = _src;
            image.onload = () => {
    
                return image;
            }
        }
    */
    DisplayObjectContainer.prototype.render = function (_context) {
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(_context);
        }
    };
    return DisplayObjectContainer;
}(DisplayObject));
//# sourceMappingURL=canvas-api.js.map