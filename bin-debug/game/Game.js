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
var game;
(function (game) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(container) {
            var _this = _super.call(this) || this;
            // this.addChild(egret.MainContext.instance.stage);
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
            var world = new game.World();
            world.touchEnabled = false;
            scene.addChild(world);
            var underUILayer = new egret.DisplayObjectContainer();
            underUILayer.touchEnabled = false;
            scene.addChild(underUILayer);
            var footLayer = new egret.DisplayObjectContainer();
            footLayer.touchEnabled = false;
            scene.addChild(footLayer);
            var snakeLayer = new egret.DisplayObjectContainer();
            snakeLayer.touchEnabled = false;
            scene.addChild(snakeLayer);
            var aboveUILayer = new egret.DisplayObjectContainer();
            aboveUILayer.touchEnabled = false;
            this.addChild(aboveUILayer);
            game.Context.scene = scene;
            game.Context.snakeLayer = snakeLayer;
            game.Camera.resize(egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
        };
        Game.prototype.start = function () {
            console.log("start");
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.player = game.SnakeFactory.RandomCreate();
            game.Context.player = this.player;
            GameObjectManager.getInstance().snakes.push(this.player);
            EventCenter.addListener(GameEvent.CREATE_FOOD, this.createFood, this);
        };
        Game.prototype.stop = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            EventCenter.removeListener(GameEvent.CREATE_FOOD, this.createFood);
        };
        Game.prototype.createFood = function (x, y, energy) {
            console.log("createFood x:" + x + ",y:" + y + ",energy:" + energy);
            game.FoodFactory.Create(x, y, game.Snake.ENERGY_PER_POINT);
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
            // FoodFactory.RandomCreate();
            this.updateMiniMap();
            this.updateOperation();
            if (this.player && !this.player.isDead) {
                this.player.eat(1);
            }
            var snakes = GameObjectManager.getInstance().snakes;
            var foods = GameObjectManager.getInstance().foods;
            for (var i = 0; i <= snakes.length - 1; i++) {
                snakes[i].update(this.deltaTime);
            }
            for (var i = 0; i <= foods.length - 1; i++) {
                foods[i].update(this.deltaTime);
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
                    console.log("updateTargetAngle targetAngle:" + this.player.targetAngle);
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
            for (var i = 0; i < snakes.length; i++) {
                snakes[i].render();
            }
            for (var i = 0; i < foods.length; i++) {
                foods[i].render();
            }
        };
        return Game;
    }(egret.DisplayObjectContainer));
    game.Game = Game;
    __reflect(Game.prototype, "game.Game");
})(game || (game = {}));
//# sourceMappingURL=Game.js.map