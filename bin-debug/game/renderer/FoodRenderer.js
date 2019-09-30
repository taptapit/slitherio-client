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
        var FoodRenderer = (function (_super) {
            __extends(FoodRenderer, _super);
            function FoodRenderer() {
                return _super.call(this) || this;
            }
            FoodRenderer.prototype.set = function (data) {
                this.data = data;
                this.renderer = this.renderer || new egret.Sprite();
                this.renderer.graphics.beginFill(this.data.color);
                this.renderer.graphics.drawCircle(0, 0, game.Snake.BODY_SIZE);
                this.renderer.graphics.endFill();
                this.addChild(this.renderer);
                var texture = RES.getRes("blink_png");
                this.blendRenderer = this.blendRenderer || new egret.Bitmap(texture);
                this.blendRenderer.blendMode = egret.BlendMode.ADD;
                GameLayerManager.getInstance().foodBlendLayer.addChild(this.blendRenderer);
                if (!this.parent)
                    GameLayerManager.getInstance().foodLayer.addChild(this);
            };
            FoodRenderer.prototype.dispose = function () {
                if (this.parent)
                    this.parent.removeChild(this);
                if (this.renderer) {
                    if (this.renderer.parent)
                        this.renderer.parent.removeChild(this.renderer);
                }
                if (this.blendRenderer) {
                    if (this.blendRenderer.parent)
                        this.blendRenderer.parent.removeChild(this.blendRenderer);
                }
                ObjectPool.release(FoodRenderer, this);
            };
            FoodRenderer.prototype.render = function () {
                var food = this.data;
                this.renderer.scaleX = food.scale;
                this.renderer.scaleY = food.scale;
                this.renderer.x = food.position.x;
                this.renderer.y = food.position.y;
                this.blendRenderer.alpha = MathUtils.cos(game.Time.frameCount * 0.1);
                this.blendRenderer.scaleX = food.scale;
                this.blendRenderer.scaleY = food.scale;
                this.blendRenderer.x = food.position.x - this.blendRenderer.width * 0.5 * this.blendRenderer.scaleX;
                this.blendRenderer.y = food.position.y - this.blendRenderer.height * 0.5 * this.blendRenderer.scaleY;
            };
            return FoodRenderer;
        }(egret.DisplayObjectContainer));
        renderer.FoodRenderer = FoodRenderer;
        __reflect(FoodRenderer.prototype, "game.renderer.FoodRenderer");
    })(renderer = game.renderer || (game.renderer = {}));
})(game || (game = {}));
//# sourceMappingURL=FoodRenderer.js.map