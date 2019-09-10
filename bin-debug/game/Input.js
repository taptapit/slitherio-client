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
        Input.prototype.IsDoubleClick = function () {
            var curClickTime = egret.getTimer();
            var value = !isNaN(this.lastClickTime) && (curClickTime - this.lastClickTime) < Input.DOUBLE_CLICK_INTERVAL;
            this.lastClickTime = curClickTime;
            return value;
        };
        Input.prototype.onTouchBegin = function (e) {
            this.isDoubleClick = this.IsDoubleClick();
            this.isTouching = true;
            this.lastTouchX = e.stageX;
            this.lastTouchY = e.stageY;
            // console.log("onTouchBegin isDoubleClick:" + this.isDoubleClick);
        };
        Input.prototype.onTouchMove = function (e) {
            var nowTime = egret.getTimer();
            this.touchMoveTime = isNaN(this.touchMoveTime) ? nowTime : this.touchMoveTime;
            if (nowTime - this.touchMoveTime > Input.TOUCH_MOVE_INTERVAL) {
                this.touchMoveTime = nowTime;
                this.deltaX = e.stageX - this.lastTouchX;
                this.deltaY = e.stageY - this.lastTouchY;
                this.lastTouchX = e.stageX;
                this.lastTouchY = e.stageY;
                // console.log("onTouchMove:x:" + this.deltaX + ",y:" + this.deltaY);
            }
        };
        Input.prototype.onTouchEnd = function (e) {
            this.isTouching = false;
            this.isDoubleClick = false;
            // console.log("onTouchEnd");
        };
        Input.TOUCH_MOVE_INTERVAL = 50;
        Input.DOUBLE_CLICK_INTERVAL = 400;
        return Input;
    }());
    game.Input = Input;
    __reflect(Input.prototype, "game.Input");
})(game || (game = {}));
//# sourceMappingURL=Input.js.map