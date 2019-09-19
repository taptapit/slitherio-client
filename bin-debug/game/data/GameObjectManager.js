var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var data;
    (function (data) {
        var GameObjectManager = (function () {
            function GameObjectManager() {
                this.snakes = {};
                this.foods = {};
            }
            GameObjectManager.getInstance = function () {
                if (!this.instance) {
                    this.instance = new GameObjectManager();
                }
                return this.instance;
            };
            GameObjectManager.prototype.add = function (o) {
                if (o instanceof game.Snake) {
                    var snake = o;
                    this.snakes[snake.id] = snake;
                }
                else if (o instanceof game.Food) {
                    var food = o;
                    this.foods[food.id] = food;
                }
            };
            GameObjectManager.prototype.remove = function (o) {
                if (o instanceof game.Snake) {
                    var snake = o;
                    this.snakes[snake.id] = null;
                    delete this.snakes[snake.id];
                }
                else if (o instanceof game.Food) {
                    var food = o;
                    this.foods[food.id] = null;
                    delete this.foods[food.id];
                }
            };
            GameObjectManager.prototype.get = function (o) {
                if (o instanceof game.Snake) {
                    return this.snakes[o.id];
                }
                else if (o instanceof game.Food) {
                    return this.foods[o.id];
                }
                else if (typeof o == "number") {
                    if (this.snakes[o]) {
                        return this.snakes[o];
                    }
                    else if (this.foods[o]) {
                        return this.foods[o];
                    }
                    else
                        return null;
                }
            };
            GameObjectManager.UUID = 0;
            return GameObjectManager;
        }());
        data.GameObjectManager = GameObjectManager;
        __reflect(GameObjectManager.prototype, "game.data.GameObjectManager");
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GameObjectManager.js.map