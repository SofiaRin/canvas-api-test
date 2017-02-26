/*
class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}
*/
//B的全局矩阵 = B的自己矩阵（相对矩阵） * 其父的全局矩阵
window.onload = function () {
    var canvas = document.getElementById('test_canvas');
    var context2D = canvas.getContext("2d");
    // context2D.fillStyle = "#0000FF";
    context2D.strokeStyle = "#FF0000";
    var myStage = new DisplayObjectContainer;
    var secondStage = new DisplayObjectContainer;
    /*
    API test with secondStage
    */
    secondStage.globalAlpha = 1;
    secondStage.scaleX = 0.5;
    secondStage.scaleY = 0.5;
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
    myStage.addChild(secondStage);
    window.onmousedown = function (e) {
        var x = e.offsetX - 16;
        var y = e.offsetY - 16;
        console.log(x, y);
        var type = "mousedown";
        var target = secondStage.hitTest(x, y);
        var result = target;
        if (result) {
            while (result.parent) {
                var currentTarget = result.parent;
                var e_1 = { type: type, target: target, currentTarget: currentTarget };
                result = result.parent;
            }
        }
    };
    setInterval(function () {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        //secondStage.draw(context2D);
        myStage.draw(context2D);
    }, 100);
};
//# sourceMappingURL=main.js.map