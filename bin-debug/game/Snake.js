var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Snake = (function () {
        function Snake(body, size, speed) {
            this.body = body;
            this.size = size;
            this.speed = speed;
        }
        Snake.prototype.Dead = function () {
        };
        Snake.prototype.SetSpeed = function () {
        };
        return Snake;
    }());
    game.Snake = Snake;
    __reflect(Snake.prototype, "game.Snake");
})(game || (game = {}));
//# sourceMappingURL=Snake.js.map