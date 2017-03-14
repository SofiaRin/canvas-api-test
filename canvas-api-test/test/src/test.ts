var canvas = document.getElementById("app") as HTMLCanvasElement;

var stage = engine.run(canvas);
var bitmap = createBitmapByName("S_Setuper.png");


stage.addChild(bitmap);
let speed = 10;

engine.Ticker.getInstance().register((deltaTime) => {
    console.log("aaa")
    bitmap.x += 1;
});


function createBitmapByName(name: string): engine.BitMap {
        var result = new engine.BitMap();
        //var texture: engine.Texture = RES.getRes(name);
      //  result.texture = texture;
      result.src = "assets/" + name;
        return result;
    }