var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameLayerManager = game.utils.GameLayerManager;
var WorldNodeManager = game.data.WorldNodeManager;
var WorldNode = game.data.WorldNode;
var game;
(function (game) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(container) {
            var _this = _super.call(this) || this;
            container.addChild(_this);
            _this.setup();
            _this.start();
            return _this;
        }
        Game.prototype.send = function () {
        };
        Game.prototype.recieved = function () {
        };
        Game.prototype.setup = function () {
            game.Input.getInstance();
            var scene = new egret.DisplayObjectContainer();
            scene.touchEnabled = false;
            this.addChild(scene);
            GameLayerManager.getInstance().scene = scene;
            var world = new game.World();
            world.touchEnabled = false;
            scene.addChild(world);
            GameLayerManager.getInstance().world = world;
            var underUILayer = new egret.DisplayObjectContainer();
            underUILayer.touchEnabled = false;
            scene.addChild(underUILayer);
            GameLayerManager.getInstance().underUILayer = underUILayer;
            var foodLayer = new egret.DisplayObjectContainer();
            foodLayer.touchEnabled = false;
            scene.addChild(foodLayer);
            GameLayerManager.getInstance().foodLayer = foodLayer;
            var snakeLayer = new egret.DisplayObjectContainer();
            snakeLayer.touchEnabled = false;
            scene.addChild(snakeLayer);
            GameLayerManager.getInstance().snakeLayer = snakeLayer;
            var aboveUILayer = new egret.DisplayObjectContainer();
            aboveUILayer.touchEnabled = false;
            this.addChild(aboveUILayer);
            GameLayerManager.getInstance().aboveUILayer = aboveUILayer;
            game.Camera.resize(egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
        };
        Game.prototype.start = function () {
            var _this = this;
            console.log("start");
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            egret.lifecycle.onPause = function () {
                console.log("onPause");
                _this.lastTick = NaN;
                _this.currentTick = NaN;
                _this.removeEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
            };
            egret.lifecycle.onResume = function () {
                console.log("onResume");
                _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
            };
            this.player = game.SnakeFactory.RandomCreate();
            GameObjectManager.getInstance().player = this.player;
            GameObjectManager.getInstance().add(this.player);
            EventCenter.addListener(GameEvent.CREATE_FOOD, this.createFood, this);
        };
        Game.prototype.stop = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            EventCenter.removeListener(GameEvent.CREATE_FOOD, this.createFood);
            egret.lifecycle.onPause = null;
            egret.lifecycle.onResume = null;
        };
        Game.prototype.createFood = function (x, y, energy, color) {
            console.log("createFood x:" + x + ",y:" + y + ",energy:" + energy + ",color:" + color);
            game.FoodFactory.Create(x, y, energy, color);
        };
        Game.prototype.onEnterFrame = function (event) {
            if (isNaN(this.lastTick))
                this.lastTick = egret.getTimer() * 0.001;
            if (isNaN(this.currentTick))
                this.currentTick = egret.getTimer() * 0.001;
            this.currentTick = egret.getTimer() * 0.001;
            this.deltaTime = this.currentTick - this.lastTick;
            this.lastTick = this.currentTick;
            // console.log("onEnterFrame:" + this.deltaTime);
            this.update();
            this.render();
        };
        Game.prototype.update = function () {
            game.Camera.update();
            // this.updateWorldNode();
            // FoodFactory.RandomCreate();
            this.updateMiniMap();
            this.updateOperation();
            if (this.player && !this.player.isDead) {
                var food = game.FoodFactory.RandomCreate();
                food.energy = 1;
                this.player.eat(food);
            }
            var snakes = GameObjectManager.getInstance().snakes;
            for (var key in snakes) {
                snakes[key].update(this.deltaTime);
            }
            var foods = GameObjectManager.getInstance().foods;
            for (var key in foods) {
                foods[key].update(this.deltaTime);
            }
        };
        Game.prototype.updateWorldNode = function () {
            var nodes = WorldNodeManager.getInstance().nodes;
            var snakes = GameObjectManager.getInstance().snakes;
            var foods = GameObjectManager.getInstance().foods;
            for (var key in nodes) {
                nodes[key].Reset();
            }
            for (var index in snakes) {
                var snake = snakes[index];
                var node = WorldNodeManager.getInstance().get(Math.floor(snake.position.x / WorldNode.SIDE_LENGTH), Math.floor(snake.position.y / WorldNode.SIDE_LENGTH), true);
                node.snakes.push(snake);
                for (var index_1 in snake.points) {
                    var point = snake.points[index_1];
                    var node_1 = WorldNodeManager.getInstance().get(Math.floor(point.x / WorldNode.SIDE_LENGTH), Math.floor(point.y / WorldNode.SIDE_LENGTH), true);
                    node_1.snakesPoints.push(point);
                }
            }
            for (var index in foods) {
                var food = foods[index];
                var node = WorldNodeManager.getInstance().get(Math.floor(food.position.x / WorldNode.SIDE_LENGTH), Math.floor(food.position.y / WorldNode.SIDE_LENGTH), true);
                node.foods.push(food);
            }
            for (var index in nodes) {
                var node = nodes[index];
                for (var i = 0; i < node.snakes.length; i++) {
                    var snake = node.snakes[i];
                    if (!snake.isDead) {
                        if ((Math.pow(snake.position.x - game.World.RADIUS, 2) + Math.pow(snake.position.y - game.World.RADIUS, 2)) > Math.pow(game.World.RADIUS - snake.radius(), 2))
                            snake.isDead = true;
                    }
                    for (var i_1 = 0; i_1 <= 9; i_1++) {
                        var nearbyNode = WorldNodeManager.getInstance().get(node.column - 1 + i_1 % 3, node.row - 1 + Math.floor(i_1 / 3));
                        if (nearbyNode) {
                            for (var index_2 in nearbyNode.foods) {
                                var food = nearbyNode.foods[index_2];
                                if (!snake.isDead && !food.eaten && snake.hitTest(food)) {
                                    food.eaten = true;
                                    food.eatenBy = snake;
                                    food.eatenAlpha = 0;
                                    snake.eat(food);
                                }
                            }
                            for (var index_3 in nearbyNode.snakesPoints) {
                                var point = nearbyNode.snakesPoints[index_3];
                                if (snake.id == point.id)
                                    continue;
                                if (!snake.isDead && snake.hitTest(point)) {
                                    snake.dead();
                                }
                            }
                        }
                    }
                }
            }
        };
        Game.prototype.updateOperation = function () {
            if (this.player && !this.player.isDead) {
                this.lastDeltaX = this.deltaX;
                this.lastDeltaY = this.deltaY;
                this.deltaX = game.Input.getInstance().deltaX;
                this.deltaY = game.Input.getInstance().deltaY;
                if (this.deltaX != this.lastDeltaX || this.deltaY != this.lastDeltaY) {
                    this.player.targetAngle = Math.atan2(this.deltaY, this.deltaX);
                    // console.log("updateTargetAngle targetAngle:" + this.player.targetAngle);
                }
                this.player.isAccelerate = game.Input.getInstance().isDoubleClick;
                this.player.velocity = this.player.isAccelerate ? game.Snake.VELOCITY_FAST : game.Snake.VELOCITY_NORMAL;
            }
        };
        Game.prototype.updateMiniMap = function () {
            //TODO
        };
        Game.prototype.render = function () {
            var snakes = GameObjectManager.getInstance().snakes;
            var foods = GameObjectManager.getInstance().foods;
            for (var key in snakes) {
                snakes[key].render();
            }
            for (var key in foods) {
                foods[key].render();
            }
        };
        return Game;
    }(egret.DisplayObjectContainer));
    game.Game = Game;
    __reflect(Game.prototype, "game.Game");
})(game || (game = {}));
//# sourceMappingURL=Game.js.map