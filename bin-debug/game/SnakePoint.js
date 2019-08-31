var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SnakePoint = (function () {
        function SnakePoint() {
        }
        return SnakePoint;
    }());
    game.SnakePoint = SnakePoint;
    __reflect(SnakePoint.prototype, "game.SnakePoint");
})(game || (game = {}));
//# sourceMappingURL=SnakePoint.js.map