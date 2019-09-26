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
            _this.edges = [];
            _this.grids = [];
            _this.onAddToStage();
            return _this;
        }
        World.prototype.onAddToStage = function () {
            for (var i = 0; i < World.EDGE_SEGMENT_NUM; i++) {
                var degree = i * 360 / World.EDGE_SEGMENT_NUM;
                var x = Math.cos(degree * World.DEG_TO_RAD) * World.RADIUS;
                var y = Math.sin(degree * World.DEG_TO_RAD) * World.RADIUS;
                var shape = new egret.Shape();
                shape.graphics.beginFill(World.EDGE_SEGMENT_COLOR, 1);
                shape.graphics.drawRect(-World.EDGE_SEGMENT_WIDTH * 0.5, -World.EDGE_SEGMENT_HEIGHT * 0.5, World.EDGE_SEGMENT_WIDTH, World.EDGE_SEGMENT_HEIGHT);
                shape.graphics.endFill();
                shape.x = x;
                shape.y = y;
                shape.rotation = degree + 90;
                this.edges.push(shape);
            }
        };
        World.prototype.render = function () {
            for (var key in this.edges) {
                var edge = this.edges[key];
                var rect_1 = egret.Rectangle.create();
                rect_1.setTo(this.x, this.y, World.EDGE_SEGMENT_WIDTH, World.EDGE_SEGMENT_WIDTH);
                var isInView = game.Camera.isInViewPort(rect_1);
                egret.Rectangle.release(rect_1);
                if (isInView && !this.contains(edge))
                    this.addChild(edge);
                else if (!isInView && this.contains(edge))
                    this.removeChild(edge);
            }
            var texture = RES.getRes("background_jpg");
            World.GRID_WIDTH = World.GRID_WIDTH ? World.GRID_WIDTH : texture.textureWidth;
            World.GRID_HEIGHT = World.GRID_HEIGHT ? World.GRID_HEIGHT : texture.textureHeight;
            var rect = game.Camera.viewPortRect;
            var count = 0;
            for (var i = rect.left; i < rect.right + World.GRID_WIDTH; i += World.GRID_WIDTH) {
                for (var j = rect.top; j < rect.bottom + World.GRID_HEIGHT; j += World.GRID_HEIGHT) {
                    if (!this.grids[count])
                        this.grids[count] = new egret.Bitmap(texture);
                    var grid = this.grids[count];
                    grid.x = Math.floor(i / World.GRID_WIDTH) * World.GRID_WIDTH;
                    grid.y = Math.floor(j / World.GRID_HEIGHT) * World.GRID_HEIGHT;
                    if (!grid.parent)
                        this.addChild(grid);
                    count++;
                }
            }
        };
        World.EDGE_SEGMENT_WIDTH = 2000;
        World.EDGE_SEGMENT_HEIGHT = 1000;
        World.EDGE_SEGMENT_COLOR = 0x2D2D2D;
        World.EDGE_SEGMENT_NUM = 120;
        World.RADIUS = 10000;
        World.DEG_TO_RAD = 2 * Math.PI / 360;
        return World;
    }(egret.Sprite));
    game.World = World;
    __reflect(World.prototype, "game.World");
})(game || (game = {}));
//# sourceMappingURL=World.js.map