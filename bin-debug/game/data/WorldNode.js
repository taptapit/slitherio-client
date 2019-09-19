var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var data;
    (function (data) {
        var WorldNode = (function () {
            function WorldNode() {
                this.snakes = [];
                this.snakesPoints = [];
                this.foods = [];
            }
            WorldNode.prototype.Reset = function () {
                if (this.snakes)
                    this.snakes.splice(0, this.snakes.length);
                if (this.snakesPoints)
                    this.snakesPoints.splice(0, this.snakesPoints.length);
                if (this.foods)
                    this.foods.splice(0, this.foods.length);
            };
            WorldNode.SIDE_LENGTH = game.Snake.BODY_SIZE * game.Snake.MAX_SCALE;
            return WorldNode;
        }());
        data.WorldNode = WorldNode;
        __reflect(WorldNode.prototype, "game.data.WorldNode");
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=WorldNode.js.map