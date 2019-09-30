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
            var randomAngle = Math.random() * MathUtils.PI * 2;
            var x = WorldRenderer.RADIUS * randomRadius * MathUtils.cos(randomAngle);
            var y = WorldRenderer.RADIUS * randomRadius * MathUtils.sin(randomAngle);
            // let snake = new Snake(++GameObjectManager.UUID, GameObjectManager.UUID, egret.Point.create(x, y), randomAngle, Snake.VELOCITY_NORMAL, [], ColorUtils.random(), 1200);
            var snake = ObjectPool.get(game.Snake);
            snake.set(++GameObjectManager.UUID, GameObjectManager.UUID, egret.Point.create(x, y), randomAngle, game.Snake.VELOCITY_NORMAL, [], ColorUtils.random(), 1200);
            GameObjectManager.getInstance().add(snake);
            return snake;
        };
        return SnakeFactory;
    }());
    game.SnakeFactory = SnakeFactory;
    __reflect(SnakeFactory.prototype, "game.SnakeFactory");
})(game || (game = {}));
//# sourceMappingURL=SnakeFactory.js.map