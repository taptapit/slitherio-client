var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var data;
    (function (data) {
        var Vector2 = (function () {
            function Vector2() {
            }
            return Vector2;
        }());
        data.Vector2 = Vector2;
        __reflect(Vector2.prototype, "game.data.Vector2");
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=Vector2.js.map