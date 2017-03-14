/*
window.onload = () => {
    var canvas = document.getElementById('test_canvas') as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    // context2D.fillStyle = "#0000FF";
    context2D.strokeStyle = "#FF0000";


    var myStage = new DisplayObjectContainer;
    var itemRender = new DisplayObjectContainer;


    itemRender.addEventListener(TouchEventType.MOUSEMOVE, () => {
        let moveDistance = init_TouchPointY - end_TouchPointY;
        itemRender.y += moveDistance;

    }, true, this);
    /*换图测试
    var img1 = new BitMap();
    img1.src = "S_Watcher.png";
    img1.name = "1"
    itemRender.addChild(img1);
    img1.addEventListener(TouchEventType.CLICK, () => {
        alert("first Click");

    }, false, this);


    var img2 = new BitMap();
    img2.src = "S_Watcher.png"
    img2.name = "2";
    itemRender.addChild(img2);
    img2.setOffSetY(200);
    img2.addEventListener(TouchEventType.CLICK, () => {
        alert("second Click");

    }, false, this);
    
    
    var itemBg_0 = new BitMap();
    itemBg_0.src = "bg.gif";
    itemBg_0.name = "itemBg_0"
    itemRender.addChild(itemBg_0);
    var itemButton_0 = new BitMap();
    itemButton_0.src = "button.gif";
    itemButton_0.name = "itemButton_0"
    itemRender.addChild(itemButton_0);

    itemButton_0.addEventListener(TouchEventType.CLICK, () => {
        alert("first Click");


    }, false, this);

    var itemBg_1 = new BitMap();
    itemBg_1.src = "bg.gif";
    itemBg_1.name = "itemBg_1"
    itemRender.addChild(itemBg_1);
    var itemButton_1 = new BitMap();
    itemButton_1.src = "button.gif";
    itemButton_1.name = "itemButton_1"
    itemRender.addChild(itemButton_1);
    itemBg_1.y = itemButton_1.y = 200;

    itemButton_1.addEventListener(TouchEventType.CLICK, () => {
        alert("second Click");


    }, false, this);
    
    myStage.addChild(itemRender);

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



    var init_TouchPointX, init_TouchPointY, end_TouchPointX, end_TouchPointY;
    var checkDownResult;
    var isMouseDown = false;
    //var moveDistance;

    window.onmousedown = (mouseDownEvent) => {
        isMouseDown = true;
        let hitTargetList = TouchEventService.getInstance().manageList;
        hitTargetList.splice(0, hitTargetList.length);


        let downX = init_TouchPointX = mouseDownEvent.offsetX - 16;
        let downY = init_TouchPointY = mouseDownEvent.offsetY - 16;
        let downTarget = myStage.hitTest(downX, downY);


        console.log(downX, downY);


        let type = "mousedown";

        let downResult = downTarget;
        if (downResult) {
            /*
            while (downResult.parent) {
                let currentTarget = downResult.parent;
                let e = { type, downTarget, currentTarget };
 
                downResult = downResult.parent;
                
            checkDownResult = downTarget;
        }

    }


    window.onmouseup = (mouseUpEvent) => {
        isMouseDown = false;
        let hitTargetList = TouchEventService.getInstance().manageList;
        hitTargetList.splice(0, hitTargetList.length);

        let upX = mouseUpEvent.offsetX - 16;
        let upY = mouseUpEvent.offsetY - 16;
        let upTarget = myStage.hitTest(upX, upY);


        console.log("up: " + upX, "up: " + upY);

        let type = "mouseup";
        for (let i = hitTargetList.length - 1; i >= 0; i--) {
            for (let event of hitTargetList[i].eventList) {
                if (event.type == TouchEventType.CLICK &&
                    upTarget == checkDownResult) {
                    event.func(mouseUpEvent);
                }
            }
        }

        /*
        let upResult = upTarget;
        if (upResult) {

            if (checkDownResult == upResult) {//对比

                alert("one click");
                console.log("cilck");
            }
        }
        
    }




    window.onmousemove = (mouseMoveEvent) => {

        let hitTargetList = TouchEventService.getInstance().manageList;
        end_TouchPointX = init_TouchPointX;
        end_TouchPointY = init_TouchPointY;


        let moveX = init_TouchPointX = mouseMoveEvent.offsetX - 16;
        let moveY = init_TouchPointY = mouseMoveEvent.offsetY - 16;
        //console.log(moveX, moveY);



        if (isMouseDown) {
            for (let i = 0; i < hitTargetList.length; i++) {
                for (let e of hitTargetList[i].eventList) {
                    if (e.type == TouchEventType.MOUSEMOVE &&
                        e.isCapture==true) {
                        e.func(mouseMoveEvent);
                    }
                }
            }
            for (let i = hitTargetList.length - 1; i >= 0; i--) {
                for (let event of hitTargetList[i].eventList) {
                    if (event.type == TouchEventType.MOUSEMOVE &&
                        event.isCapture == false) {
                        event.func(mouseMoveEvent);
                    }
                }
            }
        }
    }






    setInterval(() => {
        context2D.save();
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        myStage.draw(context2D);
        context2D.restore();
    }, 100)



};
*/
