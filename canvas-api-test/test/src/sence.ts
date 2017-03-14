class GameScene {


    private static scene: GameScene;
    //
    public static sceneGrid: Grid;
    public static sceneRoad;
    public static sceneMap: TileMap;



    public static canMovetoNext: boolean;
    public static player: Player;
    public static TILESIZE = 64;
    public static commandList: CommandList;


    public static replaceScene(scene: GameScene) {
        GameScene.scene = scene;
        this.commandList = new CommandList();
        GameScene.sceneGrid = new Grid(10, 10);
        GameScene.sceneRoad = new Array();
        GameScene.sceneMap = new TileMap(GameScene.sceneGrid);
    }

    public static setPlayer(_player: Player) {
        this.player = _player;
    }

    public static getCurrentScene(): GameScene {
        return GameScene.scene;
    }

    public static needMovetoNpc(_endPointX: number, _endPointY: number) {
        if (_endPointX / GameScene.TILESIZE != GameScene.player.x / GameScene.TILESIZE &&
            _endPointY / GameScene.TILESIZE != GameScene.player.y / GameScene.TILESIZE) {

            return true;
        } else {
            return false;
        }


    }
    public static sceneFindRoad(_endPointX: number, _endPointY: number) {
        GameScene.sceneGrid.setEndPoint(Math.floor(_endPointX / GameScene.TILESIZE),
            Math.floor(_endPointY / GameScene.TILESIZE));

        GameScene.sceneGrid.setStartPoint(Math.floor(GameScene.player.x / GameScene.TILESIZE),
            Math.floor(GameScene.player.y / GameScene.TILESIZE));

        GameScene.sceneRoad = GameScene.sceneMap.findPath();
        if (GameScene.sceneRoad == null) {

            console.log("error tap stay");
            return
        }


    }


    public moveTo(x: number, y: number, callback: Function) {
       
        console.log("开始移动")
        //isStartJudge = true;
        GameScene.player.move(new Vector2(x, y));
        //moveJudge();
        setTimeout(function () {

            setTimeout(() => {
                if (!GameScene.canMovetoNext) {
                    GameScene.canMovetoNext = true;
                }

            }, this, 3000);


            if (GameScene.canMovetoNext) {
                console.log("结束移动")
                callback();
            }
        }, this, 500)


    }



    public stopMove(callback: Function) {
        console.log("取消移动")
        callback();
    }

}
