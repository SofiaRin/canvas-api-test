var canvas = document.getElementById("app") as HTMLCanvasElement;

var stage = engine.run(canvas);
var bitmap = new engine.BitMap();

bitmap.src = "S_Watcher.png";
stage.addChild(bitmap);
let speed = 10;

engine.Ticker.getInstance().register((deltaTime) => {
    console.log("aaa")
    bitmap.x += 1;
});