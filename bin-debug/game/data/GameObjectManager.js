var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var data;
    (function (data) {
        var GameObjectManager = (function () {
            function GameObjectManager() {
                this.ranks = [];
                this.snakes = {};
                this.foods = {};
            }
            GameObjectManager.getInstance = function () {
                if (!this.instance) {
                    this.instance = new GameObjectManager();
                }
                return this.instance;
            };
            GameObjectManager.prototype.sortSnake = function (a, b) {
                if (a.energy > b.energy)
                    return -1;
                else if (a.energy < b.energy)
                    return 1;
                else
                    return 0;
            };
            GameObjectManager.prototype.update = function () {
                var snakes = GameObjectManager.getInstance().snakes;
                var foods = GameObjectManager.getInstance().foods;
                if (this.ranks)
                    this.ranks.splice(0, this.ranks.length);
                for (var key in snakes) {
                    var snake = snakes[key];
                    this.history = !this.history || snake.energy > this.history.energy ? snake : this.history;
                    this.ranks.push(snake);
                    snake.update();
                }
                this.ranks.sort(this.sortSnake);
                for (var key in foods) {
                    foods[key].update();
                }
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