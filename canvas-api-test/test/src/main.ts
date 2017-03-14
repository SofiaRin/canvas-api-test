//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends engine.DisplayObjectContainer {



    private static TILESIZE = 64;
    private pointx: number;
    private pointy: number;
    private canvas
    private stage: engine.DisplayObjectContainer;
    private stageWidth = 640;
    private stageHeight = 1236;
    public stageX: number;
    public stageY: number;
    /**
     * 加载进度界面
     * Process interface loading
     */




    //private loadingView: LoadingUI;

    public constructor() {
        super();
        this.canvas = document.getElementById("app") as HTMLCanvasElement;

        this.stage = engine.run(canvas);

        // this.addEventListener(engine.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }


    private initTaskSystem(stageH: number, stageW: number) {
        var task02 = new Task("002", "Kill 4 pigs", "Tap button",
            "npc_1", "npc_1", TaskStatus.UNACCEPTABLE, new KillMonsterTaskCondition("B27"), 4, null)

        var task01 = new Task("001", "Welcome to the World of Warcraft", "Click the whiteMan",
            "npc_0", "npc_1", TaskStatus.ACCEPTABLE, new NPCTalkTaskCondition(), 1, task02);

        var monster_0 = new KillMonsterButton("B27", 0, stageH / 2);
        this.addChild(monster_0);
        monster_0.scaleX = 0.5;
        monster_0.scaleY = 0.5;
        monster_0.x = 0;
        monster_0.y = stageH / 2;

        TaskService.getInstance().addTask(task01);
        TaskService.getInstance().addTask(task02);
        var missionPanel = new TaskPanel();
        this.addChild(missionPanel);

        var npc_0 = new NPC("npc_0", stageW / 4, stageH / 2);
        this.addChild(npc_0);
        npc_0.scaleX = 0.5;
        npc_0.scaleY = 0.5;
        npc_0.x = stageW / 4;
        npc_0.y = stageH / 2;


        var npc_1 = new NPC("npc_1", stageW / 2.5, stageH / 4);
        this.addChild(npc_1);
        npc_1.scaleX = 0.5;
        npc_1.scaleY = 0.5;
        npc_1.x = stageW / 2.5;
        npc_1.y = stageH / 4;//在myMap 进行监听，如果点击位置位于NPC放置位置的周围，则在添加移动命令后，追加打开面板命令。

        TaskService.getInstance().addObserver(npc_0);
        TaskService.getInstance().addObserver(npc_1);
        TaskService.getInstance().addObserver(missionPanel);

        npc_0.initNpcTask(npc_0);
        npc_1.initNpcTask(npc_1);
        //missionPanel.initTaskPanel(missionPanel);


        //var updateTaskPanel = new engine.Timer(500, 0)
        //updateTaskPanel.start();

        setInterval(() => {
            missionPanel.initTaskPanel(missionPanel);
        }, 500)
        /*
        updateTaskPanel.addEventListener(engine.TimerEvent.TIMER, () => {
            missionPanel.initTaskPanel(missionPanel);
        }, this);
        */
    }

    private initUserPanel() {
        var user = new User();

        var skilledTechnician = new Technician(TechnicianQuality.SKILLED, 'Skilled - FireCtrl');

        var SKC34 = new Equipment(EquipmentType.CANNON, 'SKC34');

        var PrinzEugen = new Ship(ShipType.CA, 'PrinzEugen');



        user.ships.push(PrinzEugen);
        PrinzEugen.setInTeam(true);
        user.checkInTeam();

        PrinzEugen.equipments.push(SKC34);

        SKC34.technicians.push(skilledTechnician);

        console.log(user);
        console.log(user.calFightPower());
        var showPanel = new ShowPanel(this.stageWidth, this.stageHeight, PrinzEugen, SKC34, skilledTechnician);
        showPanel.x = 0;
        showPanel.y = 640;

        this.addChild(showPanel);
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {

        var myscene = new GameScene();
        GameScene.replaceScene(myscene);

        var myGrid = GameScene.sceneGrid;

        var myRoad = GameScene.sceneRoad;

        var myMap = GameScene.sceneMap;
        this.addChild(myMap);

        var player = new Player();
        this.addChild(player);
        player.x = 32;
        player.y = 32;
        GameScene.setPlayer(player);
        this.touchEnabled = true;

        //this.stage
        window.onmousedown = (onmousedown) => {
            this.stageX = onmousedown.offsetX - 16;
            this.stageY = onmousedown.offsetY - 16;

        }
        myMap.addEventListener(engine.TouchEventType.CLICK, () => {

            var disNpc_0 = Math.sqrt(Math.pow(this.stageX - 640 / 4, 2) + Math.pow(this.stageY - 1236 / 2, 2));
            var disNpc_1 = Math.sqrt(Math.pow(this.stageX - 640 / 2.5, 2) + Math.pow(this.stageY - 1236 / 4, 2));

            function getWalkCommand() {
                console.log("tap_px " + this.stageX + "," + this.stageY);
                myMap.grid.setEndPoint(Math.floor(this.stageX / Main.TILESIZE), Math.floor(this.stageY / Main.TILESIZE));
                myMap.grid.setStartPoint(Math.floor(player.x / Main.TILESIZE), Math.floor(player.y / Main.TILESIZE));
                myRoad = myMap.findPath();
                if (myRoad == null) {

                    console.log("error tap stay");
                    return
                }

                if (disNpc_0 <= 4) {

                    console.log("NPC_0 around")
                }

                if (disNpc_1 <= 4) {

                    console.log("NPC_1 around")

                }

                for (var i = 0; i < myRoad.length; i++) {

                    GameScene.commandList.addCommand(new WalkCommand(myRoad[i].x * Main.TILESIZE + Main.TILESIZE / 2,
                        myRoad[i].y * Main.TILESIZE + Main.TILESIZE / 2));
                }
                GameScene.commandList.execute();
            }


            if (GameScene.commandList.isFinishedFlag) {
                getWalkCommand();


            } else {
                GameScene.commandList.cancel();
                getWalkCommand();

            }


        }, false, this);

        this.initTaskSystem(this.stageWidth, this.stageHeight);
        this.initUserPanel();
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): engine.BitMap {
        var result = new engine.BitMap();
        //var texture: engine.Texture = RES.getRes(name);
        //  result.texture = texture;
        result.src = "assets/" + name;
        return result;
    }
}
var checkDownResult;
    var isMouseDown = false;
    window.onmousedown = (mouseDownEvent) => {
        isMouseDown = true;
        let hitTargetList = engine.TouchEventService.getInstance().manageList;
        hitTargetList.splice(0, hitTargetList.length);


        let downX = mouseDownEvent.offsetX - 16;
        let downY = mouseDownEvent.offsetY - 16;
        let downTarget = stage.hitTest(downX, downY);


        console.log(downX, downY);


        let type = "mousedown";

        let downResult = downTarget;
        if (downResult) {

            while (downResult.parent) {
                let currentTarget = downResult.parent;
                let e = { type, downTarget, currentTarget };

                downResult = downResult.parent;

                checkDownResult = downTarget;
            }

        }

    }


window.onmouseup = (mouseUpEvent) => {
        isMouseDown = false;
        let hitTargetList = engine.TouchEventService.getInstance().manageList;
        hitTargetList.splice(0, hitTargetList.length);

        let upX = mouseUpEvent.offsetX - 16;
        let upY = mouseUpEvent.offsetY - 16;
        let upTarget = stage.hitTest(upX, upY);


        console.log("up: " + upX, "up: " + upY);

        let type = "mouseup";
        for (let i = hitTargetList.length - 1; i >= 0; i--) {
            for (let event of hitTargetList[i].eventList) {
                if (event.type == engine.TouchEventType.CLICK &&
                    upTarget == checkDownResult) {
                    event.func(mouseUpEvent);
                }
            }
        }

        
        let upResult = upTarget;
        if (upResult) {

            if (checkDownResult == upResult) {//对比

                alert("one click");
                console.log("cilck");
            }
        }
        
    }


