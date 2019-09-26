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
                _this.subBlendRenderers = [];
                _this.txtName = new egret.TextField();
                _this.txtName.textColor = _this.data.color;
                _this.txtName.text = _this.data.name;
                return _this;
            }
            SnakeRenderer.prototype.prepareSubRenderer = function (data, index) {
                if (this.subRenderers.length < index || !this.subRenderers[index]) {
                    var subRenderer = ObjectPool.get(egret.Sprite);
                    subRenderer.graphics.beginFill(data.color);
                    subRenderer.graphics.drawCircle(0, 0, game.Snake.BODY_SIZE);
                    subRenderer.graphics.endFill();
                    subRenderer.alpha = 1;
                    subRenderer.blendMode = egret.BlendMode.NORMAL;
                    this.subRenderers[index] = subRenderer;
                    var subBlendRenderer = ObjectPool.get(egret.Sprite);
                    subBlendRenderer.graphics.beginFill(data.color);
                    subBlendRenderer.graphics.drawCircle(0, 0, game.Snake.BODY_SIZE);
                    subBlendRenderer.graphics.endFill();
                    subBlendRenderer.blendMode = egret.BlendMode.ADD;
                    subBlendRenderer.alpha = 1;
                    this.subBlendRenderers[index] = subBlendRenderer;
                }
            };
            SnakeRenderer.prototype.removeSubRenderer = function (index) {
                var subRenderer = this.subRenderers[index];
                this.subRenderers[index] = null;
                if (subRenderer) {
                    ObjectPool.release(egret.Sprite, subRenderer);
                    if (subRenderer.parent)
                        subRenderer.parent.removeChild(subRenderer);
                }
                subRenderer = this.subBlendRenderers[index];
                this.subBlendRenderers[index] = null;
                if (subRenderer) {
                    ObjectPool.release(egret.Sprite, subRenderer);
                    if (subRenderer.parent)
                        subRenderer.parent.removeChild(subRenderer);
                }
            };
            SnakeRenderer.prototype.render = function () {
                var snake = this.data;
                var snakePoint = this.data.points[0];
                var subRenderer;
                var subBlendRenderer;
                var renderIndex = 0;
                if (snake.isInView) {
                    if (!this.txtName.parent)
                        GameLayerManager.getInstance().underUILayer.addChild(this.txtName);
                    this.txtName.x = snakePoint.x;
                    this.txtName.y = snakePoint.y;
                }
                else {
                    if (this.txtName.parent)
                        this.txtName.parent.removeChild(this.txtName);
                }
                for (var i = this.data.points.length - 1; i >= 0; i--) {
                    snakePoint = this.data.points[i];
                    if (snakePoint.isInView) {
                        this.prepareSubRenderer(snakePoint, i);
                        subRenderer = this.subRenderers[i];
                        subRenderer.scaleX = snake.scale;
                        subRenderer.scaleY = snake.scale;
                        subRenderer.x = snakePoint.x;
                        subRenderer.y = snakePoint.y;
                        // subRenderer.rotation = TODO
                        // subRenderer.alpha = TODO
                        // subRenderer.filters = TODO
                        if (!subRenderer.parent)
                            this.addChildAt(subRenderer, renderIndex);
                        else if (snake.hasViewStateChanged)
                            // else
                            subRenderer.parent.setChildIndex(subRenderer, renderIndex);
                        renderIndex++;
                        subBlendRenderer = this.subBlendRenderers[i];
                        if (snake.velocity == game.Snake.VELOCITY_FAST) {
                            var alphaRatio = Math.abs(-game.Time.frameCount + i) % 40;
                            alphaRatio = alphaRatio > 20 ? 40 - alphaRatio : alphaRatio;
                            subBlendRenderer.alpha = alphaRatio / 20 * 0.4;
                            subBlendRenderer.scaleX = snake.scale * 1.1;
                            subBlendRenderer.scaleY = snake.scale * 1.1;
                            subBlendRenderer.x = snakePoint.x;
                            subBlendRenderer.y = snakePoint.y;
                            if (!subBlendRenderer.parent)
                                GameLayerManager.getInstance().snakeBlendLayer.addChild(subBlendRenderer);
                        }
                        else {
                            if (subBlendRenderer.parent)
                                subBlendRenderer.parent.removeChild(subBlendRenderer);
                        }
                    }
                    else {
                        this.removeSubRenderer(i);
                    }
                }
                //remove extra subRenderers
                for (var i = this.data.points.length; i < this.subRenderers.length; i++) {
                    this.removeSubRenderer(i);
                }
                snake.hasViewStateChanged = undefined;
            };
            return SnakeRenderer;
        }(egret.DisplayObjectContainer));
        renderer.SnakeRenderer = SnakeRenderer;
        __reflect(SnakeRenderer.prototype, "game.renderer.SnakeRenderer");
    })(renderer = game.renderer || (game.renderer = {}));
})(game || (game = {}));
//# sourceMappingURL=SnakeRenderer.js.map