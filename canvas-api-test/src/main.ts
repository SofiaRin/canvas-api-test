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
window.onload = () => {
    var canvas = document.getElementById('test_canvas') as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    context2D.fillStyle="#0000FF";
    context2D.strokeStyle = "#FF0000"

    //var image = document.getElementById('test_image') as HTMLImageElement;
    //var image = document.createElement("test_image") as HTMLImageElement;
    var image = new Image();
    image.src = "S_Watcher.png";

    image.onload = () =>{

        let x = 0;

        setInterval(()=>{
            context2D.clearRect(0,0,canvas.width,canvas.height);
            context2D.drawImage(image,0,0);
        },100)
    }
   
    /*
    context.moveTo(10, 10);
    context.lineTo(150, 50);
    context.lineTo(10, 50);
    context.fill();
    context.stroke();
    */
    //context.fillText("Hello world",0,10);
   // context2D.drawImage(image,0,0);
};

