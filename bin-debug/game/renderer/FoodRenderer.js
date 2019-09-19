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
            function FoodRenderer(data) {
                var _this = _super.call(this) || this;
                _this.data = data;
                _this.touchEnabled = false;
                return _this;
            }
            FoodRenderer.prototype.render = function () {
                var food = this.data;
                if (!this.renderer) {
                    this.renderer = new egret.Sprite();
                    console.log("food.color" + food.color);
                    this.renderer.graphics.beginFill(food.color);
                    this.renderer.graphics.drawCircle(0, 0, game.Snake.BODY_SIZE);
                    this.renderer.graphics.endFill();
                    this.addChild(this.renderer);
                }
                console.log("food.scale:" + food.scale);
                this.renderer.scaleX = food.scale;
                this.renderer.scaleY = food.scale;
                this.renderer.x = food.position.x;
                this.renderer.y = food.position.y;
            };
            return FoodRenderer;
        }(egret.DisplayObjectContainer));
        renderer.FoodRenderer = FoodRenderer;
        __reflect(FoodRenderer.prototype, "game.renderer.FoodRenderer");
    })(renderer = game.renderer || (game.renderer = {}));
})(game || (game = {}));
//# sourceMappingURL=FoodRenderer.js.map