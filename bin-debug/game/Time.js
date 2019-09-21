var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Time = (function () {
        function Time() {
        }
        return Time;
    }());
    game.Time = Time;
    __reflect(Time.prototype, "game.Time");
})(game || (game = {}));
//# sourceMappingURL=Time.js.map