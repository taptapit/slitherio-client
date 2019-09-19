var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var data;
    (function (data) {
        var WorldNodeManager = (function () {
            function WorldNodeManager() {
                this.nodes = new Object();
            }
            WorldNodeManager.getInstance = function () {
                if (!this.instance) {
                    this.instance = new WorldNodeManager();
                }
                return this.instance;
            };
            WorldNodeManager.prototype.get = function (row, column, autoCreate) {
                if (autoCreate === void 0) { autoCreate = false; }
                var key = row * 10000 + column;
                var node = this.nodes[key];
                if (!node && autoCreate) {
                    node = new data.WorldNode();
                    node.row = row;
                    node.column = column;
                    this.nodes[key] = node;
                }
                return node;
            };
            return WorldNodeManager;
        }());
        data.WorldNodeManager = WorldNodeManager;
        __reflect(WorldNodeManager.prototype, "game.data.WorldNodeManager");
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=WorldNodeManager.js.map