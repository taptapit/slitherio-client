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
        var MapRenderer = (function (_super) {
            __extends(MapRenderer, _super);
            function MapRenderer() {
                var _this = _super.call(this) || this;
                _this.marks = [];
                _this.graphics.beginFill(0x303238, 1);
                _this.graphics.drawCircle(MapRenderer.RADIUS, MapRenderer.RADIUS, MapRenderer.RADIUS);
                _this.graphics.endFill();
                _this.graphics.beginFill(0x50535B);
                _this.graphics.moveTo(MapRenderer.RADIUS, MapRenderer.RADIUS);
                _this.graphics.lineTo(MapRenderer.RADIUS, MapRenderer.RADIUS * 2);
                _this.graphics.drawArc(MapRenderer.RADIUS, MapRenderer.RADIUS, MapRenderer.RADIUS, 270 * Math.PI / 180, 0, false);
                _this.graphics.lineTo(MapRenderer.RADIUS, MapRenderer.RADIUS);
                _this.graphics.endFill();
                _this.graphics.beginFill(0x50535B);
                _this.graphics.moveTo(MapRenderer.RADIUS, MapRenderer.RADIUS);
                _this.graphics.lineTo(MapRenderer.RADIUS, -MapRenderer.RADIUS * 2);
                _this.graphics.drawArc(MapRenderer.RADIUS, MapRenderer.RADIUS, MapRenderer.RADIUS, 90 * Math.PI / 180, Math.PI, false);
                _this.graphics.lineTo(MapRenderer.RADIUS, MapRenderer.RADIUS);
                _this.graphics.endFill();
                return _this;
                // var renderTexture:egret.RenderTexture = new egret.RenderTexture();
                // renderTexture.drawToTexture(shape);
                // let base64 = renderTexture.toDataURL("image/png");
                // renderTexture.saveToFile("image/png", "a/down.png", new egret.Rectangle(0, 0, MapRenderer.RADIUS*2, MapRenderer.RADIUS*2));
                // let bp : egret.Bitmap = new egret.Bitmap(RES.getRes("map_png"));
                // this.addChild(bp);
            }
            MapRenderer.prototype.render = function () {
                var player = GameObjectManager.getInstance().player;
                var snakes = GameObjectManager.getInstance().snakes;
                var count = 0;
                for (var key in snakes) {
                    var snake = snakes[key];
                    var mark = this.marks[count];
                    if (!mark) {
                        mark = this.marks[count] = new egret.Shape();
                        mark.graphics.beginFill(0xFFFFFF, 1);
                        mark.graphics.drawCircle(0, 0, 3);
                        mark.graphics.endFill();
                    }
                    if (!mark.parent)
                        this.addChild(mark);
                    if (player && snake.id == player.id) {
                        mark.scaleX = mark.scaleY = 1;
                        mark.alpha = 0.8;
                    }
                    else {
                        mark.scaleX = mark.scaleY = 0.2;
                        mark.alpha = 0.7;
                    }
                    mark.x = MapRenderer.RADIUS + snake.position.x * MapRenderer.SCALE;
                    mark.y = MapRenderer.RADIUS + snake.position.y * MapRenderer.SCALE;
                    count++;
                }
                for (var i = this.marks.length - 1; i >= count; i--) {
                    var mark = this.marks[i];
                    if (mark.parent)
                        mark.parent.removeChild(mark);
                }
            };
            MapRenderer.RADIUS = 80;
            MapRenderer.SCALE = MapRenderer.RADIUS / renderer.WorldRenderer.RADIUS;
            return MapRenderer;
        }(egret.Sprite));
        renderer.MapRenderer = MapRenderer;
        __reflect(MapRenderer.prototype, "game.renderer.MapRenderer");
    })(renderer = game.renderer || (game.renderer = {}));
})(game || (game = {}));
//# sourceMappingURL=MapRenderer.js.map