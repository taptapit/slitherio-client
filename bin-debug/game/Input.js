var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Input = (function () {
        function Input() {
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }
        Input.getInstance = function () {
            if (!this.instance) {
                this.instance = new Input();
            }
            return this.instance;
        };
        Input.prototype.onTouchBegin = function (e) {
            this.isTouching = true;
            this.lastTouchX = e.stageX;
            this.lastTouchY = e.stageY;
            console.log("onTouchBegin");
        };
        Input.prototype.onTouchMove = function (e) {
            this.deltaX = e.stageX - this.lastTouchX;
            this.deltaY = e.stageY - this.lastTouchY;
            this.lastTouchX = e.stageX;
            this.lastTouchY = e.stageY;
            console.log("onTouchMove:x:" + this.deltaX + ",y:" + this.deltaY);
        };
        Input.prototype.onTouchEnd = function (e) {
            console.log("onTouchEnd");
        };
        return Input;
    }());
    game.Input = Input;
    __reflect(Input.prototype, "game.Input");
})(game || (game = {}));
//# sourceMappingURL=Input.js.map