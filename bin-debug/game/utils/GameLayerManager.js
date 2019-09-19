var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var utils;
    (function (utils) {
        var GameLayerManager = (function () {
            function GameLayerManager() {
            }
            GameLayerManager.getInstance = function () {
                if (!this.instance) {
                    this.instance = new GameLayerManager();
                }
                return this.instance;
            };
            return GameLayerManager;
        }());
        utils.GameLayerManager = GameLayerManager;
        __reflect(GameLayerManager.prototype, "game.utils.GameLayerManager");
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=GameLayerManager.js.map