var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SnakeFactory = (function () {
        function SnakeFactory() {
        }
        SnakeFactory.RandomCreate = function () {
            var randomRadius = Math.random() * 0.9;
            var randomAngle = Math.random() * Math.PI * 2;
            var snake = new game.Snake(++GameObjectManager.UUID, GameObjectManager.UUID, egret.Point.create(Math.random() * game.World.RADIUS * 0.9, Math.random() * game.World.RADIUS * 0.9), Math.random() * Math.PI * 2, game.Snake.VELOCITY_NORMAL, [], Math.floor(Math.random() * ColorUtils.COLORS.length), 1200);
            GameObjectManager.getInstance().add(snake);
            return snake;
        };
        return SnakeFactory;
    }());
    game.SnakeFactory = SnakeFactory;
    __reflect(SnakeFactory.prototype, "game.SnakeFactory");
})(game || (game = {}));
//# sourceMappingURL=SnakeFactory.js.map