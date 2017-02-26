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
window.onload = () => {
    var canvas = document.getElementById('test_canvas') as HTMLCanvasElement;
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

    
    window.onmousedown = (e) => {
        let x = e.offsetX - 16;
        let y = e.offsetY - 16;
        console.log(x, y);
        let type = "mousedown";
        let target = secondStage.hitTest(x, y);
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
        //secondStage.draw(context2D);
        myStage.draw(context2D);
    }, 100)



};

