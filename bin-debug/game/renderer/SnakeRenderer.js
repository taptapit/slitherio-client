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
                _this.subRenderers = [];
                return _this;
            }
            SnakeRenderer.prototype.createSubRenderer = function (data) {
                var subRenderer = ObjectPool.get(egret.Sprite);
                subRenderer.graphics.beginFill(data.color);
                subRenderer.graphics.drawCircle(0, 0, game.Snake.BODY_SIZE);
                subRenderer.graphics.endFill();
                this.subRenderers.push(subRenderer);
                return subRenderer;
            };
            SnakeRenderer.prototype.removeSubRenderer = function (index) {
                var subRenderer = this.subRenderers[index];
                this.subRenderers[index] = null;
                // let subRenderer : egret.Sprite = this.subRenderers.splice(index, 1)[0];
                if (subRenderer) {
                    ObjectPool.release(egret.Sprite, subRenderer);
                    this.removeChild(subRenderer);
                }
            };
            SnakeRenderer.prototype.render = function () {
                var snake = this.data;
                var snakePoint;
                var subRenderer;
                //update subRenderers
                var pointLength = this.data.points.length;
                for (var i = 0; i < pointLength; i++) {
                    snakePoint = this.data.points[i];
                    if (snakePoint.isIsView) {
                        subRenderer = (this.subRenderers.length > i && this.subRenderers[i]) ? this.subRenderers[i] : this.createSubRenderer(snakePoint);
                        subRenderer.scaleX = snake.scale;
                        subRenderer.scaleY = snake.scale;
                        subRenderer.x = snakePoint.x;
                        subRenderer.y = snakePoint.y;
                        if (!subRenderer.parent)
                            this.addChildAt(subRenderer, pointLength - i - 1);
                        // subRenderer.rotation = TODO
                        // subRenderer.alpha = TODO
                        // subRenderer.filters = TODO
                    }
                    else {
                        this.removeSubRenderer(i);
                    }
                }
                //remove extra subRenderers
                for (var i = this.data.points.length; i < this.subRenderers.length; i++) {
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