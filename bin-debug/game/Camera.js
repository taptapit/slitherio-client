var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Camera = (function () {
        function Camera() {
        }
        Camera.resize = function (stageWith, stageHeight) {
            this.stageWith = stageWith;
            this.stageHeight = stageHeight;
        };
        Camera.update = function () {
            var player = GameObjectManager.getInstance().player;
            var scene = GameLayerManager.getInstance().scene;
            if (player && scene) {
                var sceneOffsetX = player.position.x - this.stageWith * 0.5;
                var sceneOffsetY = player.position.y - this.stageHeight * 0.5;
                scene.x = -sceneOffsetX;
                scene.y = -sceneOffsetY;
                // console.log("stageWith:" + this.stageWith + ",stageHeight:" + this.stageHeight);
                // console.log("player.x:" + player.position.x + ",player.y:" + player.position.y);
                // console.log("scene.x:" + scene.x + ",scene.y:" + scene.y);
                this.viewPortMinX = sceneOffsetX;
                this.viewPortMaxX = sceneOffsetX + this.stageWith;
                this.viewPortMinY = sceneOffsetY;
                this.viewPortMaxY = sceneOffsetY + this.stageHeight;
                this.viewPortRect = this.viewPortRect ? this.viewPortRect : new egret.Rectangle();
                this.viewPortRect.setTo(this.viewPortMinX, this.viewPortMinY, this.stageWith, this.stageHeight);
                this.viewPortCenterX = (this.viewPortMaxX - this.viewPortMinX) * 0.5;
                this.viewPortCenterY = (this.viewPortMaxY - this.viewPortMinY) * 0.5;
            }
        };
        Camera.isInViewPort = function (rect) {
            if (rect instanceof egret.Rectangle) {
                var rectCenterX = (rect.right - rect.left) * 0.5;
                var rectCenterY = (rect.bottom - rect.top) * 0.5;
                return Math.abs(this.viewPortCenterX - rectCenterX) <= this.stageWith * 0.5 + rect.width * 0.5 &&
                    Math.abs(this.viewPortCenterY - rectCenterY) <= this.stageHeight * 0.5 + rect.height * 0.5;
            }
            else {
                return this.viewPortRect.containsPoint(rect);
            }
        };
        Camera.Epsilon = 200;
        return Camera;
    }());
    game.Camera = Camera;
    __reflect(Camera.prototype, "game.Camera");
})(game || (game = {}));
//# sourceMappingURL=Camera.js.map