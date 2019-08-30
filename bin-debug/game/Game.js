var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Game = (function () {
        function Game() {
        }
        Game.prototype.Send = function () {
        };
        Game.prototype.Recieved = function () {
        };
        Game.prototype.Render = function () {
        };
        return Game;
    }());
    game.Game = Game;
    __reflect(Game.prototype, "game.Game");
})(game || (game = {}));
//# sourceMappingURL=Game.js.map