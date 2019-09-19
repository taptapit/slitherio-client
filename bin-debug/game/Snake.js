var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectPool = game.utils.ObjectPool;
var GameObjectManager = game.data.GameObjectManager;
var EventCenter = game.event.EventCenter;
var GameEvent = game.event.GameEvent;
var game;
(function (game) {
    var Snake = (function () {
        function Snake(id, name, position, angle, velocity, points, skin, energy) {
            if (points === void 0) { points = null; }
            if (skin === void 0) { skin = 0; }
            if (energy === void 0) { energy = 0; }
            this.id = id;
            this.name = name;
            this.position = position;
            this.angle = angle;
            this.targetAngle = angle;
            this.velocity = velocity;
            this.velocityTurnAngle = Snake.velocity2TurnAngle(this.velocity);
            this.points = points;
            this.skin = skin;
            this.energy = energy;
            this.length = Snake.energy2Length(energy);
            this.scale = Snake.length2Scale(this.length);
            this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
            this.boundingBox = egret.Rectangle.create();
            this.renderer = new game.renderer.SnakeRenderer(this);
        }
        Snake.length2Scale = function (length) {
            length -= this.BORN_BODY_LENGTH;
            return Math.min(this.MAX_SCALE, this.BORN_SCALE + length / 100);
        };
        Snake.scale2TurnAngle = function (scale) {
            return 0.13 + 0.87 * Math.pow((this.BORN_SCALE + this.MAX_SCALE - scale) / this.MAX_SCALE, 2);
        };
        Snake.velocity2TurnAngle = function (velocity) {
            return velocity * this.VELOCITY_TO_TURN_ANGLE;
        };
        Snake.energy2Length = function (energy) {
            return Math.floor(energy / Snake.ENERGY_PER_POINT);
        };
        Snake.prototype.radius = function () {
            return Snake.BODY_SIZE * this.scale * 0.5;
        };
        Snake.prototype.hitTest = function (target) {
            if (target instanceof game.SnakePoint) {
                var point = target;
                var otherSnake = GameObjectManager.getInstance().get(point.id);
                return otherSnake &&
                    !otherSnake.isDead &&
                    Math.pow(this.position.x - point.x, 2) + Math.pow(this.position.y - point.y, 2) < Math.pow(this.radius() + otherSnake.radius(), 2);
            }
            else if (target instanceof game.Food) {
                var food = target;
                return Math.pow(this.position.x - food.position.x, 2) + Math.pow(this.position.y - food.position.y, 2) < Math.pow(this.radius() + food.scale + Snake.FOOD_DETECT_DISTANCE, 2);
            }
            else {
                console.error("snake hitTest on unkown type target" + target);
            }
        };
        Snake.prototype.dead = function () {
            this.isDead = true;
            while (this.points.length > 0) {
                var point = this.points.pop();
                EventCenter.dispatch(GameEvent.CREATE_FOOD, point.x, point.y, Snake.ENERGY_PER_POINT, point.color);
            }
        };
        Snake.prototype.eat = function (food) {
            GameObjectManager.getInstance().remove(food);
            this.energy += food.energy;
            this.length = Snake.energy2Length(this.energy);
            this.scale = Snake.length2Scale(this.length);
            this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
        };
        Snake.prototype.update = function (deltaTime) {
            this.updateNameAlpha();
            this.updateDying(deltaTime);
            this.updateEnergy(deltaTime);
            this.turn(deltaTime);
            this.move(deltaTime);
        };
        Snake.prototype.updateNameAlpha = function () {
            //TODO
        };
        Snake.prototype.updateDying = function (deltaTime) {
            if (this.isDead) {
                this.dyingAlpha += deltaTime * 0.02;
                if (this.dyingAlpha >= 1) {
                    delete GameObjectManager.getInstance().snakes[this.id];
                }
            }
        };
        Snake.prototype.updateEnergy = function (deltaTime) {
            if (!this.isAccelerate)
                return;
            var canAccelerate = this.energy - deltaTime * Snake.ENERGY_SPEND_PER_SECOND > Snake.ENERGY_LIMIT_FOR_ACCELERATE;
            if (canAccelerate) {
                this.isAccelerate = true;
                this.energy -= deltaTime * Snake.ENERGY_SPEND_PER_SECOND;
                this.length = Snake.energy2Length(this.energy);
                this.scale = Snake.length2Scale(this.length);
                this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
                while (this.points.length > this.length) {
                    var point = this.points.pop();
                    EventCenter.dispatch(GameEvent.CREATE_FOOD, point.x, point.y, Snake.ENERGY_PER_POINT, point.color);
                }
            }
            else {
                this.isAccelerate = false;
            }
        };
        Snake.prototype.clamp = function (value, min, max) {
            return value < min ? value += (max - min) : (value > max ? value -= (max - min) : value);
        };
        Snake.prototype.turn = function (deltaTime) {
            this.angle = this.clamp(((this.angle + Math.PI) % (Math.PI * 2)), -Math.PI, Math.PI) - Math.PI;
            // console.log("turn angle:" + this.angle);
            this.targetAngle = this.clamp(((this.targetAngle + Math.PI) % (Math.PI * 2)), -Math.PI, Math.PI) - Math.PI;
            // console.log("turn targetAngle:" + this.targetAngle);
            var deltaAngle = deltaTime * this.scaleTurnAngle * this.velocityTurnAngle;
            deltaAngle = Math.min(deltaAngle, Math.abs(this.targetAngle - this.angle));
            // console.log("turn deltaTime:" + deltaTime);
            // console.log("turn velocityTurnAngle:" + this.velocityTurnAngle);
            // console.log("turn scaleTurnAngle:" + this.scaleTurnAngle);
            // console.log("turn deltaAngle:" + deltaAngle);
            if (Math.abs(this.angle - this.targetAngle) > Math.PI) {
                if (this.targetAngle > this.angle)
                    this.angle -= deltaAngle;
                else
                    this.angle += deltaAngle;
            }
            else {
                if (this.targetAngle > this.angle)
                    this.angle += deltaAngle;
                else
                    this.angle -= deltaAngle;
            }
        };
        Snake.prototype.move = function (deltaTime) {
            var distance = this.velocity * deltaTime;
            var deltaPoint = this.scale * Snake.BODY_POINT_DELTA_SCALE;
            var movePoints = distance / deltaPoint;
            // console.log("scale:" + this.scale);
            // console.log("move time:" + deltaTime);
            // console.log("move distance:" + distance);
            // console.log("move movePoints:" + movePoints);
            // console.log("this.angle:" + this.angle);
            // console.log("111this.position:x:" + this.position.x + ",y:" + this.position.y);
            this.position.x = this.position.x + Math.cos(this.angle) * distance;
            this.position.y = this.position.y + Math.sin(this.angle) * distance;
            // console.log("222this.position:x:" + this.position.x + ",y:" + this.position.y);
            // console.log("this.points.length" + this.points.length);
            // console.log("this.length" + this.length);
            if (this.points.length > this.length) {
                this.points.pop();
            }
            else {
                if (this.points.length < this.length) {
                    var point = ObjectPool.get(game.SnakePoint);
                    point.x = this.position.x;
                    point.y = this.position.y;
                    point.color = 0x00ffff;
                    this.points.unshift(point);
                }
                else {
                    for (var i = this.points.length - 1; i > 0; i--) {
                        var p = this.points[i];
                        var q = this.points[i - 1];
                        p.x = p.x + (q.x - p.x) * movePoints;
                        p.y = p.y + (q.y - p.y) * movePoints;
                    }
                    this.points[0].x = this.position.x;
                    this.points[0].y = this.position.y;
                }
            }
        };
        Snake.prototype.updateBoundingBox = function () {
            var minX;
            var minY;
            var maxX;
            var maxY;
            var point;
            var radius = this.scale;
            for (var i = 0; i <= this.points.length; i++) {
                point = this.points[i];
                minX = isNaN(minX) ? point.x : Math.min(minX, point.x);
                minY = isNaN(minY) ? point.y : Math.min(minY, point.y);
                maxX = isNaN(maxX) ? point.x : Math.max(minX, point.x);
                maxY = isNaN(maxY) ? point.y : Math.max(minY, point.y);
            }
            this.boundingBox.setTo(minX - radius, minY - radius, maxX - minX, maxY - minY);
        };
        Snake.prototype.render = function () {
            if (game.Camera.isInViewPort(this.boundingBox)) {
                if (this.renderer) {
                    if (!this.renderer.parent)
                        GameLayerManager.getInstance().snakeLayer.addChild(this.renderer);
                    this.renderer.render();
                }
            }
            else {
                if (this.renderer.parent)
                    GameLayerManager.getInstance().snakeLayer.removeChild(this.renderer);
            }
        };
        Snake.BODY_SIZE = 30;
        Snake.BORN_BODY_LENGTH = 6;
        Snake.BORN_SCALE = 1;
        Snake.MAX_SCALE = 5;
        Snake.VELOCITY_TO_TURN_ANGLE = 0.1;
        Snake.VELOCITY_NORMAL = 100;
        Snake.VELOCITY_FAST = Snake.VELOCITY_NORMAL * 2;
        Snake.BODY_POINT_DELTA_SCALE = 10;
        Snake.ENERGY_PER_POINT = 20;
        Snake.ENERGY_SPEND_PER_SECOND = Snake.ENERGY_PER_POINT * 5;
        Snake.ENERGY_LIMIT_FOR_ACCELERATE = Snake.ENERGY_PER_POINT * 5;
        Snake.FOOD_DETECT_DISTANCE = 50;
        return Snake;
    }());
    game.Snake = Snake;
    __reflect(Snake.prototype, "game.Snake");
})(game || (game = {}));
//# sourceMappingURL=Snake.js.map