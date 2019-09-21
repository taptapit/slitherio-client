var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ai;
    (function (ai) {
        var SnakeAICenter = (function () {
            function SnakeAICenter() {
            }
            SnakeAICenter.update = function () {
                var nodes = WorldNodeManager.getInstance().nodes;
                for (var key in nodes) {
                    var node = nodes[key];
                    for (var key_1 in node.snakes) {
                        var snake = node.snakes[key_1];
                        if (snake.ai) {
                            snake.ai.tick += game.Time.deltaTime;
                            if (snake.ai.moveable) {
                                for (var i = 0; i <= 9; i++) {
                                    var nearbyNode = WorldNodeManager.getInstance().get(node.column - 1 + i % 3, node.row - 1 + Math.floor(i / 3));
                                    if (nearbyNode) {
                                        for (var index in nearbyNode.foods) {
                                            var food = nearbyNode.foods[index];
                                            if (!snake.dead && !food.eaten) {
                                                snake.ai.eat(food);
                                                break;
                                            }
                                        }
                                        for (var index in nearbyNode.snakesPoints) {
                                            var point = nearbyNode.snakesPoints[index];
                                            if (snake.id == point.id)
                                                continue;
                                            if (!snake.dead) {
                                                var otherSnake = GameObjectManager.getInstance().get(point.id);
                                                if (otherSnake && !otherSnake.dead) {
                                                    snake.ai.dodgeSnake(point);
                                                    break;
                                                }
                                            }
                                        }
                                        for (var index in nearbyNode.snakes) {
                                            var otherSnake = nearbyNode.snakes[index];
                                            if (snake.id != otherSnake.id && !snake.dead && !otherSnake.dead) {
                                                snake.ai.kill(otherSnake);
                                                break;
                                            }
                                        }
                                    }
                                }
                                snake.ai.dodgeWall();
                            }
                        }
                    }
                }
            };
            return SnakeAICenter;
        }());
        ai.SnakeAICenter = SnakeAICenter;
        __reflect(SnakeAICenter.prototype, "game.ai.SnakeAICenter");
    })(ai = game.ai || (game.ai = {}));
})(game || (game = {}));
//# sourceMappingURL=SnakeAICenter.js.map