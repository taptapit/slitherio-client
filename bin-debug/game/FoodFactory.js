var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var FoodFactory = (function () {
        function FoodFactory() {
        }
        FoodFactory.Create = function (x, y, energy, color) {
            if (color === void 0) { color = 0x000000; }
            // let food : Food = new Food(++GameObjectManager.UUID, x, y, energy, color);
            var food = ObjectPool.get(game.Food);
            food.set(++GameObjectManager.UUID, x, y, energy, color);
            GameObjectManager.getInstance().add(food);
            return food;
        };
        FoodFactory.RandomCreate = function () {
            var randomRadius = Math.random() * 0.9;
            var randomAngle = Math.random() * Math.PI * 2;
            var x = WorldRenderer.RADIUS * randomRadius * MathUtils.cos(randomAngle);
            var y = WorldRenderer.RADIUS * randomRadius * MathUtils.sin(randomAngle);
            var renergy = Math.random() * game.Snake.ENERGY_PER_POINT * 0.5;
            var food = ObjectPool.get(game.Food);
            food.set(++GameObjectManager.UUID, x, y, renergy, ColorUtils.random());
            // let food : Food =  new Food(++GameObjectManager.UUID, x, y, renergy, ColorUtils.random());
            GameObjectManager.getInstance().add(food);
            return food;
        };
        return FoodFactory;
    }());
    game.FoodFactory = FoodFactory;
    __reflect(FoodFactory.prototype, "game.FoodFactory");
})(game || (game = {}));
//# sourceMappingURL=FoodFactory.js.map