var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SnakeFactory = (function () {
        function SnakeFactory() {
        }
        SnakeFactory.RandomCreate = function () {
            var snake = new game.Snake(GameObjectManager.UUID++, "None", egret.Point.create(0, 0), 0, game.Snake.VELOCITY_NORMAL, null, 0, 120);
            var points = [];
            var scale = game.Snake.length2Scale(game.Snake.BORN_BODY_LENGTH);
            snake.scale = scale;
            var angle = 2 * Math.PI * Math.random();
            for (var i = 0; i < game.Snake.BORN_BODY_LENGTH; i++) {
                var point = new game.SnakePoint();
                point.x = game.Snake.BODY_POINT_DELTA_SCALE * scale * Math.cos(angle) * i;
                point.y = game.Snake.BODY_POINT_DELTA_SCALE * scale * Math.sin(angle) * i;
                point.color = 0x00ffff;
                points.push(point);
            }
            snake.points = points;
            GameObjectManager.getInstance().add(snake);
            return snake;
        };
        return SnakeFactory;
    }());
    game.SnakeFactory = SnakeFactory;
    __reflect(SnakeFactory.prototype, "game.SnakeFactory");
})(game || (game = {}));
//# sourceMappingURL=SnakeFactory.js.map