class SenceService {

    private observerList: SenceObserver[] = [];

    private static instance;
    private static count = 0;



    constructor() {
        SenceService.count++;
        if (SenceService.count > 1) {
            throw 'singleton!!';
        }
    }



    public static getInstance() {
        if (SenceService.instance == null) {
            SenceService.instance = new SenceService();
        }
        return SenceService.instance;
    }

    public addObserver(_observer: SenceObserver): void {

        this.observerList.push(_observer);

    }



    private notify(_monsterId: string): void {

        for (var i = 0; i < this.observerList.length; i++) {

            this.observerList[i].onChange(_monsterId);
        }
    }

}


class KillMonsterButton extends engine.DisplayObjectContainer implements Observer {

    private monsterId: string;
    private button: engine.BitMap;
    private monsterMapPosX: number;
    private monsterMapPosY: number;

    constructor(_monsterId: string, _monsterMapPosX: number, _monsterMapPosY) {

        super();

        this.monsterId = _monsterId;

        this.button = this.createBitmapByName("Kill.png");
        this.addChild(this.button);
        this.onButtonClick(_monsterId);

        this.monsterMapPosX = _monsterMapPosX;
        this.monsterMapPosY = _monsterMapPosY;
    }

    onChange() {


    }
    //-----------------
    onButtonClick(_monsterId: string) {
        this.touchEnabled = true;

        this.addEventListener(engine.TouchEventType.CLICK, () => {

            console.log("Monster Kill Tap");



            if (GameScene.commandList.isFinishedFlag) {
                this.getWalkCommand();


            } else {
                GameScene.commandList.cancel();
                this.getWalkCommand();

            }
        },false, this);

    }

    private getWalkCommand() {
        GameScene.sceneFindRoad(this.monsterMapPosX, this.monsterMapPosY);

        for (var i = 0; i < GameScene.sceneRoad.length; i++) {

            GameScene.commandList.addCommand(new WalkCommand(
                GameScene.sceneRoad[i].x * GameScene.TILESIZE + GameScene.TILESIZE / 2,
                GameScene.sceneRoad[i].y * GameScene.TILESIZE + GameScene.TILESIZE / 2));
        }

        GameScene.commandList.addCommand(new FightCommand(this.monsterId));
        GameScene.commandList.execute();

    }

    private createBitmapByName(name: string): engine.BitMap {
        var result = new engine.BitMap();
        //var texture: engine.Texture = RES.getRes(name);
      //  result.texture = texture;
      result.src = "assets/" + name;
        return result;
    }

}

