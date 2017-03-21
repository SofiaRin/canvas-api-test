namespace engine {
    export let run = (canvas: HTMLCanvasElement) => {

        var stage = new DisplayObjectContainer();
        let context2D = canvas.getContext("2d");



        let lastNow = Date.now();
        let renderer = new CanvasRenderer(stage, context2D);
        
        let frameHandler = () => {
            let now = Date.now();
            let deltaTime = now - lastNow;
            Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, 400, 400);
            context2D.save();

            stage.update();
            renderer.render();

            context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        }

        window.requestAnimationFrame(frameHandler);
        let hitResult: DisplayObject;
        let currentX: number;
        let currentY: number;
        let lastX: number;
        let lastY: number;
        let isMouseDown = false;

        window.onmousedown = (e) => {
            isMouseDown = true;
            let manageList = TouchEventService.getInstance().manageList;
            manageList.splice(0, manageList.length);
            hitResult = stage.hitTest(e.offsetX, e.offsetY);
            currentX = e.offsetX;
            currentY = e.offsetY;
        }

        window.onmousemove = (e) => {
            let manageList = TouchEventService.getInstance().manageList;
            lastX = currentX;
            lastY = currentY;
            currentX = e.offsetX;
            currentY = e.offsetY;
            if (isMouseDown) {
                for (let i = 0; i < manageList.length; i++) {
                    for (let x of manageList[i].eventList) {
                        if (x.type == TouchEventType.MOUSEMOVE &&
                            x.isCapture == true) {
                            x.func(e);
                        }
                    }
                }
                for (let i = manageList.length - 1; i >= 0; i--) {
                    for (let x of manageList[i].eventList) {
                        if (x.type == TouchEventType.MOUSEMOVE &&
                            x.isCapture == false) {
                            x.func(e);
                        }
                    }
                }
            }
        }
        window.onmouseup = (e) => {
            isMouseDown = false;
            let manageList = TouchEventService.getInstance().manageList;
            manageList.splice(0, manageList.length);
            let newHitRusult = stage.hitTest(e.offsetX, e.offsetY);
            for (let i = 0; i < manageList.length; i++) {
                for (let x of manageList[i].eventList) {
                    if (x.type == TouchEventType.CLICK &&
                        newHitRusult == hitResult &&
                        x.isCapture == true) {
                        x.func(e);
                    }
                }
            }
            for (let i = manageList.length - 1; i >= 0; i--) {
                for (let x of manageList[i].eventList) {
                    if (x.type == TouchEventType.CLICK &&
                        newHitRusult == hitResult &&
                        x.isCapture == false) {
                        x.func(e, );
                    }
                }
            }
        }

        return stage;

    }

    class CanvasRenderer {

        constructor(private stage: DisplayObjectContainer, private context2D: CanvasRenderingContext2D) {

        }

        render() {
            let stage = this.stage;
            let context2D = this.context2D;
            this.renderContainer(stage);
        }

        renderContainer(container: DisplayObjectContainer) {
            for (let child of container.array) {
                let context2D = this.context2D;
                context2D.globalAlpha = child.globalAlpha;
                let m = child.globalMatrix;
                context2D.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);

                if (child.type == "Bitmap") {
                    this.renderBitmap(child as BitMap);
                }
                else if (child.type == "TextField") {
                    this.renderTextField(child as TextField);
                }
                else if (child.type == "DisplayObjectContainer") {
                    this.renderContainer(child as DisplayObjectContainer);
                }
            }
        }

        renderBitmap(bitmap: BitMap) {
           // this.context2D.drawImage(bitmap.image, 0, 0);
            
      
            if (bitmap.visible) {
                if (bitmap.bitmap_cache == null) {
                    var image = new Image();
                    image.src = bitmap.src;


                    image.onload = () => {
                        this.context2D.drawImage(image, 0, 0);
                        bitmap.bitmap_cache = image;
                        console.log(bitmap.bitmap_cache.width, bitmap.bitmap_cache.height);
                        bitmap.width = image.width;
                        bitmap.height = image.height;

                    }
                } else {

                    this.context2D.drawImage(bitmap.bitmap_cache, 0, 0);
                }

            }

        }
        
        

        renderTextField(textField: TextField) {

            function draw_long_text(longtext, cxt, begin_width, begin_height) {
                var linelenght = 20;
                var text = "";
                var count = 0;
                var begin_width = begin_width;
                var begin_height = begin_height;
                var stringLenght = longtext.length;
                var newtext = longtext.split("");
                var context = cxt;
                context.textAlign = 'left';

                for (var i = 0; i <= stringLenght; i++) {

                    if (count == textField.nextLine) {
                        context.fillText(text, begin_width, begin_height);
                        begin_height = begin_height + 25;
                        text = "";
                        count = 0;
                    }
                    if (i == stringLenght) {
                        context.fillText(text, begin_width, begin_height);
                    }
                    var text = text + newtext[0];
                    count++;
                    newtext.shift();
                }
            }

            if (textField.visible) {
                if (textField.isitalic) {
                    textField.font_Style = "italic ";

                } else {
                    textField.font_Style = "normal ";
                }


                if (textField.isbold) {
                    this.context2D.font = textField.font_Style + "bold " + textField.size + "px " + textField.font_family;
                } else {
                    this.context2D.font = textField.font_Style + textField.size + "px " + textField.font_family;
                }
                this.context2D.fillStyle = textField.textColor;
                // this.context2D.fillText(this.text, 0, 0 + 15,550);
                draw_long_text(textField.text, this.context2D, 0, 30);
            }
        }
    }
}

