var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameNetManager = (function () {
        function GameNetManager() {
        }
        return GameNetManager;
    }());
    game.GameNetManager = GameNetManager;
    __reflect(GameNetManager.prototype, "game.GameNetManager");
})(game || (game = {}));
//# sourceMappingURL=GameNetManager.js.map