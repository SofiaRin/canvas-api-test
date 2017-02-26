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
    itemBg_1.y = itemButton_1.y = 200;

    
    var itemBg_2 = new BitMap();
    itemBg_2.src = "bg.gif";
    itemBg_2.name = "itemBg_2"
    itemRender.addChild(itemBg_2);
    var itemButton_2 = new BitMap();
    itemButton_2.src = "button.gif";
    itemButton_2.name = "itemButton_2"
    itemRender.addChild(itemButton_2);
    itemBg_2.y = itemButton_2.y = 400;
    
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


    window.onmousedown = (e) => {
        let x = e.offsetX -16;
        let y = e.offsetY -32;
        console.log(x, y);
        let type = "mousedown";
        let target = itemRender.hitTest(x, y);
        let result = target;
        if (result) {
            while (result.parent) {
                let currentTarget = result.parent;
                let e = { type, target, currentTarget };

                result = result.parent;
            }
        }
    }

    setInterval(() => {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        myStage.draw(context2D);
        itemRender.y--;
    }, 100)



};

