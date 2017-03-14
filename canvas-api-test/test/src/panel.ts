class ShowPanel extends engine.DisplayObjectContainer {

    private role: engine.BitMap;
    private equipment_1: engine.BitMap;
    private equipment_2: engine.BitMap;
    private equipment_3: engine.BitMap;
    private equipment_4: engine.BitMap;

    private equipmentInfo: engine.TextField;
    private allInfo: engine.TextField;
    
    public static all: engine.TextField = new engine.TextField();
    public static detailed: engine.TextField = new engine.TextField();

    constructor(_width: number, _height: number, owner: Ship, _equip: Equipment, _techni: Technician) {


        super();
        this.width = _width;
        this.height = _height;

        this.role = this.createBitmapByName("S_Prinz Eugen.jpg");
        this.role.setWidth(261);
        this.role.setHeight(380);

        this.addChild(this.role);
        //
        this.equipment_1 = this.createBitmapByName("S_SKC34.png");
        this.equipment_1.setWidth(190);
        this.addChild(this.equipment_1);
        this.equipment_1.x = this.role.width;
        //console.log("++++" + this.role.width);

        this.equipment_2 = this.createBitmapByName("S_Setuper.png");
        this.equipment_2.setWidth(190);
        this.addChild(this.equipment_2);
        this.equipment_2.x = this.width - this.equipment_2.width;
        /*
              this.equipment_3 = this.createBitmapByName("S_Watcher.png");
              this.addChild(this.equipment_3);
              this.equipment_3.x = this.role.width;
              this.equipment_3.y = this.equipment_1.height;
              //
              this.equipment_4 = this.createBitmapByName("S_Setuper.png");
              this.addChild(this.equipment_4);
              this.equipment_4.x = this.width - this.equipment_2.width;
              this.equipment_4.y = this.equipment_1.height;
      */
        this.onClickEquipment_1(this.equipment_1, _equip);
        this.onClickEquipment_2(this.equipment_2, _techni);
        // this.onClickEquipment_3(this.equipment_3);
        // this.onClickEquipment_4(this.equipment_4);

        this.allInfo = new engine.TextField();
        //this.allInfo.nextLine = 40;
        this.allInfo.y = this.role.height;
        this.addChild(this.allInfo);
        this.allInfo.text = ("All----------------------|");

        this.equipmentInfo = new engine.TextField();
        this.equipmentInfo.x = this.role.width;
        this.equipmentInfo.y = this.role.height;
        //this.equipmentInfo.nextLine = 40;
        this.addChild(this.equipmentInfo);
        this.equipmentInfo.text = ("Equiment------------------------|");

        this.updateAllInfo(owner)
    }

    private posConfirm(_isAll, _container: engine.DisplayObjectContainer) {
        if (_isAll) {

            _container.y = this.role.height + this.equipmentInfo.height;
        } else {
            _container.x = this.role.width;
            _container.y = this.role.height + this.equipmentInfo.height;
        }

    }

    private updateAllInfo(owner: Ship) {

        var container = owner.disPlayDetail();
        this.addChild(container);
        this.posConfirm(true, container);
    }

    public updateEquimentInfo(_equipmentNum: number, Equipment: any) {
        switch (_equipmentNum) {
            case 1:
                var container = Equipment.disPlayDetail();
                this.addChild(container);
                this.posConfirm(false, container);
                break;
            case 2:
                var container = Equipment.disPlayDetail();
                this.addChild(container);
                this.posConfirm(false, container);
                break;
            //case 3:
            //case 4:
        }
    }

    private onClickEquipment_1(Bitmap: engine.BitMap, _equip: Equipment) {

        Bitmap.touchEnabled = true;

        Bitmap.addEventListener(engine.TouchEventType.CLICK, () => {
            
            this.updateEquimentInfo(1, _equip)
            console.log("Tap Equipment_1");
        },false, this);


    }
    private onClickEquipment_2(Bitmap: engine.BitMap, _techni: Technician) {

        Bitmap.touchEnabled = true;

        Bitmap.addEventListener(engine.TouchEventType.CLICK, () => {

            this.updateEquimentInfo(2, _techni)
            console.log("Tap Equipment_2");
        },false, this);
    }
    /*
    private onClickEquipment_3(Bitmap: engine.Bitmap) {

        Bitmap.touchEnabled = true;

        Bitmap.addEventListener(engine.TouchEvent.TOUCH_TAP, () => {


            console.log("Tap Equipment_3");
        }, this);


    }
    private onClickEquipment_4(Bitmap: engine.Bitmap) {

        Bitmap.touchEnabled = true;

        Bitmap.addEventListener(engine.TouchEvent.TOUCH_TAP, () => {


            console.log("Tap Equipment_4");
        }, this);


    }
    */
    private createBitmapByName(name: string): engine.BitMap {
        var result = new engine.BitMap();
        //var texture: engine.Texture = RES.getRes(name);
      //  result.texture = texture;
      result.src = "assets/" + name;
        return result;
    }

}