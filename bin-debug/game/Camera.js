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
            var player = game.Context.player && game.Context.player.renderer;
            var scene = game.Context.scene;
            if (player && scene) {
                var sceneOffsetX = player.x - this.stageWith * 0.5;
                var sceneOffsetY = player.y - this.stageHeight * 0.5;
                scene.x = -sceneOffsetX;
                scene.y = -sceneOffsetY;
                this.viewPortMinX = scene.x;
                this.viewPortMaxX = scene.x + this.stageWith;
                this.viewPortMinY = scene.y;
                this.viewPortMaxY = scene.y + this.stageHeight;
                this.viewPortCenterX = (this.viewPortMaxX - this.viewPortMinX) * 0.5;
                this.viewPortCenterY = (this.viewPortMaxY - this.viewPortMinY) * 0.5;
            }
        };
        Camera.isInViewPort = function (rect) {
            var rectCenterX = (rect.right - rect.left) * 0.5;
            var rectCenterY = (rect.bottom - rect.top) * 0.5;
            return Math.abs(this.viewPortCenterX - rectCenterX) <= this.stageWith * 0.5 + rect.width * 0.5 &&
                Math.abs(this.viewPortCenterY - rectCenterY) <= this.stageHeight * 0.5 + rect.height * 0.5;
        };
        Camera.Epsilon = 200;
        return Camera;
    }());
    game.Camera = Camera;
    __reflect(Camera.prototype, "game.Camera");
})(game || (game = {}));
//# sourceMappingURL=Camera.js.map