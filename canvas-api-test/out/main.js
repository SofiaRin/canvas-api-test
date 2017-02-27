window.onload = function () {
    var canvas = document.getElementById('test_canvas');
    var context2D = canvas.getContext("2d");
    // context2D.fillStyle = "#0000FF";
    context2D.strokeStyle = "#FF0000";
    var myStage = new DisplayObjectContainer;
    var itemRender = new DisplayObjectContainer;
    var itemBg_0 = new BitMap();
    itemBg_0.src = "bg.gif";
    itemBg_0.name = "itemBg_0";
    itemRender.addChild(itemBg_0);
    var itemButton_0 = new BitMap();
    itemButton_0.src = "button.gif";
    itemButton_0.name = "itemButton_0";
    itemRender.addChild(itemButton_0);
    var itemBg_1 = new BitMap();
    itemBg_1.src = "bg.gif";
    itemBg_1.name = "itemBg_1";
    itemRender.addChild(itemBg_1);
    var itemButton_1 = new BitMap();
    itemButton_1.src = "button.gif";
    itemButton_1.name = "itemButton_1";
    itemRender.addChild(itemButton_1);
    itemBg_1.y = itemButton_1.y = 100;
    /*
    API test with secondStage
    */
    /*
    var img = new BitMap();
    img.src = "S_Watcher.png";
    secondStage.addChild(img);


    var tf1 = new TextField();
    tf1.text = "Hello";
    tf1.font_family = "Arial";
    tf1.textColor = "#0000FF";
    tf1.isitalic = true;
    tf1.size = 17;
    secondStage.addChild(tf1);


    var tf2 = new TextField();
    tf2.text = "                World";
    tf2.font_family = "Microsoft YaHei";
    tf2.isbold = true;
    tf2.size = 15;
    secondStage.addChild(tf2);
*/
    myStage.addChild(itemRender);
    var init_TouchPointY;
    var rdown;
    var moveDistance;
    window.onmouseup = function (mouseUpEvent) {
        var upX = mouseUpEvent.offsetX - 16;
        var upY = mouseUpEvent.offsetY - 16;
        console.log("up: " + upX, "up: " + upY);
        var type = "mouseup";
        var upTarget = itemRender.hitTest(upX, upY);
        var upResult = upTarget;
        if (upResult) {
            if (rdown == upResult) {
                alert("one click");
                console.log("cilck");
            }
        }
    };
    /*
    window.onmouseup = (up) => {
        var upEvent = new TouchEvents(down.offsetX, down.offsetY, TouchEvents.MOUSEUP)
        var upChain = stage.hitTest(upEvent);
        stage.dispatchEvent("capture", upChain, upEvent);
        stage.dispatchEvent("bubble", upChain, upEvent);
        //比较鼠标是否点击同一物体
        try {
            if (downChain[downChain.length - 1].id == upChain[upChain.length - 1].id) {
                //鼠标点击
                var clickEvent = new TouchEvents(up.offsetX, up.offsetY, TouchEvents.CLICK)
                var clickChain = stage.hitTest(clickEvent);
                stage.dispatchEvent("capture", clickChain, clickEvent);
                stage.dispatchEvent("bubble", clickChain, clickEvent);
            }
        } catch (e) { }
    }
    */
    itemRender.addEventListener(TouchEventType.MOUSEDOWN, function () {
        window.onmousedown = function (mouseDownEvent) {
            var downX = mouseDownEvent.offsetX - 16;
            var downY = init_TouchPointY = mouseDownEvent.offsetY - 16;
            console.log(downX, downY);
            var type = "mousedown";
            var downTarget = itemRender.hitTest(downX, downY);
            var downResult = downTarget;
            if (downResult) {
                /*
                while (downResult.parent) {
                    let currentTarget = downResult.parent;
                    let e = { type, downTarget, currentTarget };
    
                    downResult = downResult.parent;
                    */
                rdown = downTarget;
            }
        };
    }, false);
    itemRender.addEventListener(TouchEventType.MOUSEMOVE, function () {
        window.onmousemove = function (mouseMoveEvent) {
            var moveX = mouseMoveEvent.offsetX - 16;
            var moveY = mouseMoveEvent.offsetY - 16;
            console.log(moveX, moveY);
            if (moveDistance != 0) {
                itemRender.y = moveDistance;
            }
        };
    }, true);
    itemButton_0.addEventListener(TouchEventType.CLICK, function () {
        alert("itemButton_0");
    }, false);
    itemButton_1.addEventListener(TouchEventType.CLICK, function () {
        alert("itemButton_1");
    }, false);
    setInterval(function () {
        context2D.save();
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        myStage.draw(context2D);
        itemRender.y--;
        context2D.restore();
    }, 100);
};
//# sourceMappingURL=main.js.map