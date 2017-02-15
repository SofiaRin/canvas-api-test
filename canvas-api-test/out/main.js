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
window.onload = function () {
    var canvas = document.getElementById('test_canvas');
    var context2D = canvas.getContext("2d");
    context2D.fillStyle = "#0000FF";
    context2D.strokeStyle = "#FF0000";
    var myStage = new DisplayObjectContainer;
    var img = new BitMap();
    img.src = "S_Watcher.png";
    myStage.addChild(img);
    var tf1 = new TextField();
    tf1.text = "Hello";
    myStage.addChild(tf1);
    var tf2 = new TextField();
    tf2.text = "             World";
    myStage.addChild(tf2);
    setInterval(function () {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        myStage.draw(context2D);
    }, 100);
};
//# sourceMappingURL=main.js.map