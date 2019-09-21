var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ai;
    (function (ai) {
        var SnakeAI = (function () {
            function SnakeAI(snake, level) {
                if (level === void 0) { level = 1; }
                this.tick = 0;
                this.snake = snake;
                this.level = level;
            }
            Object.defineProperty(SnakeAI.prototype, "moveable", {
                get: function () {
                    return this.tick > this.level * SnakeAI.ACTION_TIME_INTERVAL;
                },
                enumerable: true,
                configurable: true
            });
            SnakeAI.prototype.eat = function (food) {
                this.tick = 0;
                this.snake.targetAngle = Math.atan2(food.position.y - this.snake.position.y, food.position.x - this.snake.position.x);
            };
            SnakeAI.prototype.dodgeWall = function () {
                this.tick = 0;
                if (Math.pow(this.snake.position.x, 2) + Math.pow(this.snake.position.y, 2) > Math.pow(game.World.RADIUS - 500, 2)) {
                    this.snake.targetAngle = Math.atan2(this.snake.position.y, this.snake.position.x) + Math.PI;
                }
            };
            SnakeAI.prototype.dodgeSnake = function (point) {
                this.tick = 0;
                this.snake.targetAngle = Math.atan2(point.y - this.snake.position.y, point.x - this.snake.position.x) + Math.PI;
            };
            SnakeAI.prototype.kill = function (target) {
                var _this = this;
                this.tick = 0;
                this.snake.targetAngle = Math.atan2(target.position.y - this.snake.position.y, target.position.x - this.snake.position.x);
                this.snake.isAccelerate = true;
                setTimeout(function () {
                    if (_this.snake && !_this.snake.die)
                        _this.snake.isAccelerate = false;
                }, 500);
            };
            SnakeAI.ACTION_TIME_INTERVAL = 1;
            return SnakeAI;
        }());
        ai.SnakeAI = SnakeAI;
        __reflect(SnakeAI.prototype, "game.ai.SnakeAI");
    })(ai = game.ai || (game.ai = {}));
})(game || (game = {}));
//# sourceMappingURL=SnakeAI.js.map