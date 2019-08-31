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
        var SnakeRenderer = (function (_super) {
            __extends(SnakeRenderer, _super);
            function SnakeRenderer(data) {
                var _this = _super.call(this) || this;
                _this.data = data;
                _this.touchEnabled = false;
                return _this;
            }
            SnakeRenderer.prototype.createSubRenderer = function () {
                var subRenderer = new egret.Sprite();
                this.subRenderers.push(subRenderer);
                this.addChild(subRenderer);
                return subRenderer;
            };
            SnakeRenderer.prototype.removeSubRenderer = function (index) {
                this.subRenderers.splice(index, 1);
            };
            SnakeRenderer.prototype.render = function () {
                var snake;
                var snakePoint;
                var subRenderer;
                //update subRenderers
                for (var i = 0; i <= this.data.points.length; i++) {
                    snakePoint = this.data.points[i];
                    subRenderer = this.subRenderers.length > i ? this.subRenderers[i] : this.createSubRenderer();
                    subRenderer.scaleX = snake.scale;
                    subRenderer.scaleY = snake.scale;
                    subRenderer.x = snakePoint.x;
                    subRenderer.y = snakePoint.y;
                    // subRenderer.rotation = TODO
                    // subRenderer.alpha = TODO
                    // subRenderer.filters = TODO
                }
                //remove extra subRenderers
                for (var i = this.data.points.length; i <= this.subRenderers.length; i++) {
                    this.removeSubRenderer(i);
                }
            };
            return SnakeRenderer;
        }(egret.DisplayObjectContainer));
        renderer.SnakeRenderer = SnakeRenderer;
        __reflect(SnakeRenderer.prototype, "game.renderer.SnakeRenderer");
    })(renderer = game.renderer || (game.renderer = {}));
})(game || (game = {}));
//# sourceMappingURL=SnakeRenderer.js.map