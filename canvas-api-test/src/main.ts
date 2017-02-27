window.onload = () => {
    var canvas = document.getElementById('test_canvas') as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    // context2D.fillStyle = "#0000FF";
    context2D.strokeStyle = "#FF0000";


    var myStage = new DisplayObjectContainer;
    var itemRender = new DisplayObjectContainer;

    var itemBg_0 = new BitMap();
    itemBg_0.src = "bg.gif";
    itemBg_0.name = "itemBg_0"
    itemRender.addChild(itemBg_0);
    var itemButton_0 = new BitMap();
    itemButton_0.src = "button.gif";
    itemButton_0.name = "itemButton_0"
    itemRender.addChild(itemButton_0);


    var itemBg_1 = new BitMap();
    itemBg_1.src = "bg.gif";
    itemBg_1.name = "itemBg_1"
    itemRender.addChild(itemBg_1);
    var itemButton_1 = new BitMap();
    itemButton_1.src = "button.gif";
    itemButton_1.name = "itemButton_1"
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
    var checkDownResult;
    var isMouseDown = false;
    var moveDistance;

    window.onmousedown = (mouseDownEvent) => {
        isMouseDown = true;
        let downX = mouseDownEvent.offsetX - 16;
        let downY = init_TouchPointY = mouseDownEvent.offsetY - 16;
        console.log(downX, downY);


        let type = "mousedown";
        let downTarget = itemRender.hitTest(downX, downY);
        let downResult = downTarget;
        if (downResult) {
            /*
            while (downResult.parent) {
                let currentTarget = downResult.parent;
                let e = { type, downTarget, currentTarget };
 
                downResult = downResult.parent;
                */
            checkDownResult = downTarget;
        }

    }


    window.onmouseup = (mouseUpEvent) => {

        let upX = mouseUpEvent.offsetX - 16;
        let upY = mouseUpEvent.offsetY - 16;
        console.log("up: " + upX, "up: " + upY);
        let type = "mouseup";
        let upTarget = itemRender.hitTest(upX, upY);
        let upResult = upTarget;
        if (upResult) {

            if (checkDownResult == upResult) {//对比

                alert("one click");
                console.log("cilck");
            }
        }

    }


    window.onmousemove = (mouseMoveEvent) => {
        let moveX = mouseMoveEvent.offsetX - 16;
        let moveY = mouseMoveEvent.offsetY - 16;
        console.log(moveX, moveY);

        if (moveDistance != 0) {

            itemRender.y = moveDistance
        }
    }






    setInterval(() => {
        context2D.save();
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        myStage.draw(context2D);
        itemRender.y--;
        context2D.restore();
    }, 100)



};

