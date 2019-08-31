var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Context = (function () {
        function Context() {
        }
        return Context;
    }());
    game.Context = Context;
    __reflect(Context.prototype, "game.Context");
})(game || (game = {}));
//# sourceMappingURL=Context.js.map