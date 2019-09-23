var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var data;
    (function (data) {
        var WorldNode = (function () {
            function WorldNode() {
                this.snakes = [];
                this.snakesPoints = [];
                this.foods = [];
            }
            WorldNode.prototype.update = function () {
                var rect = egret.Rectangle.create();
                rect.setTo(this.x, this.y, WorldNode.SIDE_LENGTH, WorldNode.SIDE_LENGTH);
                this.isInView = game.Camera.isInViewPort(rect);
                egret.Rectangle.release(rect);
                for (var key in this.snakesPoints) {
                    var point = this.snakesPoints[key];
                    point.isIsView = this.isInView;
                }
                for (var key in this.foods) {
                    var food = this.foods[key];
                    food.isInView = this.isInView;
                }
            };
            WorldNode.prototype.reset = function () {
                if (this.snakes)
                    this.snakes.splice(0, this.snakes.length);
                if (this.snakesPoints)
                    this.snakesPoints.splice(0, this.snakesPoints.length);
                if (this.foods)
                    this.foods.splice(0, this.foods.length);
                if (this.gizimos && this.gizimos.parent)
                    this.gizimos.parent.removeChild(this.gizimos);
                data.WorldNodeManager.getInstance().nodes[this.id] = null;
                delete data.WorldNodeManager.getInstance().nodes[this.id];
            };
            WorldNode.prototype.drawGizimos = function () {
                if (!this.gizimos) {
                    this.gizimos = new egret.Sprite();
                    this.gizimos.x = this.x;
                    this.gizimos.y = this.y;
                    this.gizimos.graphics.beginFill(0x8B795E);
                    this.gizimos.graphics.drawRect(0, 0, WorldNode.SIDE_LENGTH, WorldNode.SIDE_LENGTH);
                    this.gizimos.graphics.endFill();
                    this.gizimos.graphics.beginFill(0x8B6969);
                    this.gizimos.graphics.drawRect(0, 0, WorldNode.SIDE_LENGTH - 4, WorldNode.SIDE_LENGTH - 4);
                    this.gizimos.graphics.endFill();
                }
                if (this.isInView) {
                    if (!this.gizimos.parent)
                        GameLayerManager.getInstance().scene.addChildAt(this.gizimos, 0);
                }
                else {
                    if (this.gizimos && this.gizimos.parent)
                        this.gizimos.parent.removeChild(this.gizimos);
                }
            };
            WorldNode.SIDE_LENGTH = game.Snake.BODY_SIZE * 2 * game.Snake.MAX_SCALE;
            return WorldNode;
        }());
        data.WorldNode = WorldNode;
        __reflect(WorldNode.prototype, "game.data.WorldNode");
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=WorldNode.js.map