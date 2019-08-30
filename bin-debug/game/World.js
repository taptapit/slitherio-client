var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var World = (function (_super) {
        __extends(World, _super);
        function World() {
            var _this = _super.call(this) || this;
            _this.EDGE_SEGMENT_WIDTH = 20;
            _this.EDGE_SEGMENT_HEIGHT = 10;
            _this.EDGE_SEGMENT_COLOR = 0x2D2D2D;
            _this.EDGE_SEGMENT_NUM = 60;
            _this.WORLD_RADIUS = 100;
            _this.DEG_TO_RAD = 2 * Math.PI / 360;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        World.prototype.onAddToStage = function () {
            for (var i = 0; i < this.EDGE_SEGMENT_NUM; i++) {
                var degree = i * 360 / this.EDGE_SEGMENT_NUM;
                var x = Math.cos(degree * DEG_TO_RAD) * this.WORLD_RADIUS;
                var y = Math.sin(degree * DEG_TO_RAD) * this.WORLD_RADIUS;
                var shp = new egret.Shape();
                shp.graphics.beginFill(this.EDGE_SEGMENT_COLOR, 1);
                shp.graphics.drawRect(-this.EDGE_SEGMENT_WIDTH * 0.5, -this.EDGE_SEGMENT_HEIGHT * 0.5, this.EDGE_SEGMENT_WIDTH, this.EDGE_SEGMENT_HEIGHT);
                shp.graphics.endFill();
                shp.x = x;
                shp.y = y;
                shp.rotation = degree + 90;
                this.addChild(shp);
            }
        };
        return World;
    }(egret.Sprite));
    game.World = World;
    __reflect(World.prototype, "game.World");
})(game || (game = {}));
//# sourceMappingURL=World.js.map