var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Food = (function () {
        function Food(id, x, y, energy, color) {
            this.position = new egret.Point(x, y);
            this.energy = energy;
            this.scale = Food.energy2Scale(energy);
            this.color = color;
            this.eaten = false;
            this.eatenBy = null;
            this.eatenAlpha = 0;
            this.renderer = new game.renderer.FoodRenderer(this);
        }
        Food.energy2Scale = function (energy) {
            return energy * 0.01;
        };
        Food.prototype.update = function (deltaTime) {
        };
        Food.prototype.render = function () {
            if (game.Camera.isInViewPort(this.position)) {
                if (this.renderer) {
                    if (!this.renderer.parent)
                        GameLayerManager.getInstance().foodLayer.addChild(this.renderer);
                    this.renderer.render();
                }
            }
            else {
                if (this.renderer.parent)
                    GameLayerManager.getInstance().foodLayer.removeChild(this.renderer);
            }
        };
        return Food;
    }());
    game.Food = Food;
    __reflect(Food.prototype, "game.Food");
})(game || (game = {}));
//# sourceMappingURL=Food.js.map