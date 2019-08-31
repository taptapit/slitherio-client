var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var data;
    (function (data) {
        var GameObjectManager = (function () {
            function GameObjectManager() {
            }
            GameObjectManager.getInstance = function () {
                if (!this.instance) {
                    this.instance = new GameObjectManager();
                }
                return this.instance;
            };
            return GameObjectManager;
        }());
        data.GameObjectManager = GameObjectManager;
        __reflect(GameObjectManager.prototype, "game.data.GameObjectManager");
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GameObjectManager.js.map