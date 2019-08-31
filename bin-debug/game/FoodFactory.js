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
            return new game.Food(FoodFactory.UUID++, x, y, energy, color);
        };
        FoodFactory.RandomCreate = function () {
            var rradius = Math.random() * 0.9;
            var rangle = Math.random() * Math.PI * 2;
            var x = game.World.RADIUS + game.World.RADIUS * rradius * Math.cos(rangle);
            var y = game.World.RADIUS + game.World.RADIUS * rradius * Math.sin(rangle);
            var renergy = Math.random();
            return new game.Food(FoodFactory.UUID++, x, y, renergy, 0x000000);
        };
        FoodFactory.UUID = 1;
        return FoodFactory;
    }());
    game.FoodFactory = FoodFactory;
    __reflect(FoodFactory.prototype, "game.FoodFactory");
})(game || (game = {}));
//# sourceMappingURL=FoodFactory.js.map