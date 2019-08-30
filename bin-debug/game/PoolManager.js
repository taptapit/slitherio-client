var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var PoolManager = (function () {
        function PoolManager() {
        }
        return PoolManager;
    }());
    game.PoolManager = PoolManager;
    __reflect(PoolManager.prototype, "game.PoolManager");
})(game || (game = {}));
//# sourceMappingURL=PoolManager.js.map