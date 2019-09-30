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
    var renderer;
    (function (renderer) {
        var WorldRenderer = (function (_super) {
            __extends(WorldRenderer, _super);
            function WorldRenderer() {
                var _this = _super.call(this) || this;
                _this.edges = [];
                _this.grids = [];
                _this.onAddToStage();
                return _this;
            }
            WorldRenderer.prototype.onAddToStage = function () {
                for (var i = 0; i < WorldRenderer.EDGE_SEGMENT_NUM; i++) {
                    var degree = i * 360 / WorldRenderer.EDGE_SEGMENT_NUM;
                    var x = MathUtils.cos(degree * MathUtils.DegRad) * WorldRenderer.RADIUS;
                    var y = MathUtils.sin(degree * MathUtils.DegRad) * WorldRenderer.RADIUS;
                    var shape = new egret.Shape();
                    shape.graphics.beginFill(WorldRenderer.EDGE_SEGMENT_COLOR, 1);
                    shape.graphics.drawRect(-WorldRenderer.EDGE_SEGMENT_WIDTH * 0.5, -WorldRenderer.EDGE_SEGMENT_HEIGHT * 0.5, WorldRenderer.EDGE_SEGMENT_WIDTH, WorldRenderer.EDGE_SEGMENT_HEIGHT);
                    shape.graphics.endFill();
                    shape.x = x;
                    shape.y = y;
                    shape.rotation = degree + 90;
                    this.edges.push(shape);
                }
            };
            WorldRenderer.prototype.render = function () {
                this.renderEdges();
                this.renderGrids();
            };
            WorldRenderer.prototype.renderEdges = function () {
                for (var key in this.edges) {
                    var edge = this.edges[key];
                    var rect = egret.Rectangle.create();
                    rect.setTo(edge.x, edge.y, WorldRenderer.EDGE_SEGMENT_WIDTH, WorldRenderer.EDGE_SEGMENT_WIDTH);
                    var isInView = game.Camera.isInViewPort(rect);
                    egret.Rectangle.release(rect);
                    if (isInView && !edge.parent)
                        this.addChild(edge);
                    else if (!isInView && edge.parent)
                        this.removeChild(edge);
                }
            };
            WorldRenderer.prototype.renderGrids = function () {
                var texture = RES.getRes("background_jpg");
                WorldRenderer.GRID_WIDTH = WorldRenderer.GRID_WIDTH ? WorldRenderer.GRID_WIDTH : texture.textureWidth;
                WorldRenderer.GRID_HEIGHT = WorldRenderer.GRID_HEIGHT ? WorldRenderer.GRID_HEIGHT : texture.textureHeight;
                var rect = game.Camera.viewPortRect;
                var count = 0;
                for (var i = rect.left; i < rect.right + WorldRenderer.GRID_WIDTH; i += WorldRenderer.GRID_WIDTH) {
                    for (var j = rect.top; j < rect.bottom + WorldRenderer.GRID_HEIGHT; j += WorldRenderer.GRID_HEIGHT) {
                        if (!this.grids[count])
                            this.grids[count] = new egret.Bitmap(texture);
                        var grid = this.grids[count];
                        grid.x = Math.floor(i / WorldRenderer.GRID_WIDTH) * WorldRenderer.GRID_WIDTH;
                        grid.y = Math.floor(j / WorldRenderer.GRID_HEIGHT) * WorldRenderer.GRID_HEIGHT;
                        if (!grid.parent)
                            this.addChildAt(grid, 0);
                        count++;
                    }
                }
            };
            WorldRenderer.EDGE_SEGMENT_WIDTH = 200 * 4;
            WorldRenderer.EDGE_SEGMENT_HEIGHT = 100 * 4;
            WorldRenderer.EDGE_SEGMENT_COLOR = 0x2D2D2D;
            WorldRenderer.EDGE_SEGMENT_NUM = 120;
            WorldRenderer.RADIUS = 1000 * 4;
            return WorldRenderer;
        }(egret.Sprite));
        renderer.WorldRenderer = WorldRenderer;
        __reflect(WorldRenderer.prototype, "game.renderer.WorldRenderer");
    })(renderer = game.renderer || (game.renderer = {}));
})(game || (game = {}));
//# sourceMappingURL=WorldRenderer.js.map