var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectPool = game.utils.ObjectPool;
var GameObjectManager = game.data.GameObjectManager;
var EventCenter = game.event.EventCenter;
var GameEvent = game.event.GameEvent;
var ColorUtils = game.utils.ColorUtils;
var game;
(function (game) {
    var Snake = (function () {
        function Snake() {
        }
        Object.defineProperty(Snake.prototype, "hasViewStateChanged", {
            get: function () {
                if (this.$hasViewStateChanged == undefined) {
                    for (var i = 0; i < this.points.length; i++) {
                        if (this.points[i].hasViewStateChanged)
                            this.$hasViewStateChanged = true;
                    }
                    if (this.$hasViewStateChanged == undefined)
                        this.$hasViewStateChanged = false;
                }
                return this.$hasViewStateChanged;
            },
            set: function (value) { this.$hasViewStateChanged = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Snake.prototype, "isInView", {
            get: function () {
                if (this.$isInView == undefined) {
                    for (var i = 0; i < this.points.length; i++) {
                        if (this.points[i].isInView)
                            this.$isInView = true;
                    }
                    if (this.$isInView == undefined)
                        this.$isInView = false;
                }
                return this.$isInView;
            },
            enumerable: true,
            configurable: true
        });
        Snake.skinColor = function (color, index) {
            var startColor = color;
            var endColor = ColorUtils.lerp(startColor, 0xC4C4C4, 0.7);
            var delta = 0x080808;
            var progress = index * delta / Math.abs(endColor - startColor);
            var direction = Math.floor(progress) % 2 == 0;
            progress = progress - Math.floor(progress);
            return direction ? ColorUtils.lerp(startColor, endColor, progress) : ColorUtils.lerp(endColor, startColor, progress);
        };
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
            return Snake.BODY_SIZE * this.scale;
        };
        Snake.prototype.set = function (id, name, position, angle, velocity, points, color, energy) {
            this.id = id;
            this.name = name;
            this.position = position;
            this.angle = angle;
            this.targetAngle = angle;
            this.velocity = velocity;
            this.velocityTurnAngle = Snake.velocity2TurnAngle(this.velocity);
            this.points = points;
            this.color = color;
            this.energy = energy;
            this.length = Snake.energy2Length(energy);
            this.scale = Snake.length2Scale(this.length);
            this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
            this.dead = false;
        };
        Snake.prototype.dispose = function () {
            ObjectPool.release(SnakeAI, this.ai);
            this.ai = null;
            if (this.renderer) {
                this.renderer.dispose();
                this.renderer = null;
            }
            GameObjectManager.getInstance().remove(this);
        };
        Snake.prototype.hitTest = function (target) {
            if (target instanceof game.SnakePoint) {
                var point = target;
                var otherSnake = GameObjectManager.getInstance().get(point.id);
                return otherSnake &&
                    !otherSnake.dead &&
                    Math.pow(this.position.x - point.x, 2) + Math.pow(this.position.y - point.y, 2) < Math.pow(this.radius() + otherSnake.radius(), 2);
            }
            else if (target instanceof game.Food) {
                var food = target;
                return Math.pow(this.position.x - food.position.x, 2) + Math.pow(this.position.y - food.position.y, 2) < Math.pow(this.radius() + food.radius() + Snake.FOOD_DETECT_DISTANCE, 2);
            }
            else {
                console.error("snake hitTest on unkown type target" + target);
            }
        };
        Snake.prototype.die = function () {
            this.dead = true;
            this.dispose();
            while (this.points.length > 0) {
                var point = this.points.pop();
                ObjectPool.release(game.SnakePoint, point);
                EventCenter.dispatch(GameEvent.CREATE_FOOD, point.x, point.y, Snake.ENERGY_PER_POINT * 0.5, point.color);
            }
        };
        Snake.prototype.eat = function (food) {
            food.eatBy(this);
            this.energy += food.energy;
            this.length = Snake.energy2Length(this.energy);
            this.scale = Snake.length2Scale(this.length);
            this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
        };
        Snake.prototype.update = function () {
            this.$isInView = undefined;
            var deltaTime = game.Time.deltaTime;
            this.updateDying(deltaTime);
            this.updateEnergy(deltaTime);
            this.turn(deltaTime);
            this.move(deltaTime);
        };
        Snake.prototype.updateDying = function (deltaTime) {
            if (this.dead) {
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
                    ObjectPool.release(game.SnakePoint, point);
                    EventCenter.dispatch(GameEvent.CREATE_FOOD, point.x, point.y, Snake.ENERGY_PER_POINT * 0.5, point.color);
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
            this.targetAngle = this.clamp(((this.targetAngle + Math.PI) % (Math.PI * 2)), -Math.PI, Math.PI) - Math.PI;
            var deltaAngle = deltaTime * this.scaleTurnAngle * this.velocityTurnAngle;
            deltaAngle = Math.min(deltaAngle, Math.abs(this.targetAngle - this.angle));
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
            var moveRatio = Math.min(1, distance / deltaPoint);
            this.position.x = this.position.x + MathUtils.cos(this.angle) * distance;
            this.position.y = this.position.y + MathUtils.sin(this.angle) * distance;
            if (this.points.length > this.length) {
                ObjectPool.release(game.SnakePoint, this.points.pop());
            }
            else {
                if (this.points.length < this.length) {
                    var point = ObjectPool.get(game.SnakePoint);
                    var tailPoint = this.points[this.points.length - 1];
                    point.id = this.id;
                    point.x = tailPoint ? tailPoint.x : 0;
                    point.y = tailPoint ? tailPoint.y : 0;
                    point.index = this.points.length;
                    point.color = Snake.skinColor(this.color, this.points.length);
                    this.points.push(point);
                }
                for (var i = this.points.length - 1; i > 0; i--) {
                    var p = this.points[i];
                    var q = this.points[i - 1];
                    p.x = p.x + (q.x - p.x) * moveRatio;
                    p.y = p.y + (q.y - p.y) * moveRatio;
                }
                this.points[0].x = this.position.x;
                this.points[0].y = this.position.y;
            }
        };
        Snake.prototype.render = function () {
            if (this.isInView) {
                if (!this.renderer) {
                    this.renderer = ObjectPool.get(SnakeRenderer);
                    this.renderer.set(this);
                }
                this.renderer.render();
            }
            else {
                if (this.renderer) {
                    this.renderer.dispose();
                    this.renderer = null;
                }
            }
        };
        Snake.BODY_SIZE = 100;
        Snake.BORN_BODY_LENGTH = 6;
        Snake.BORN_SCALE = 0.2;
        Snake.MAX_SCALE = 1;
        Snake.VELOCITY_TO_TURN_ANGLE = 0.1;
        Snake.VELOCITY_NORMAL = 200;
        Snake.VELOCITY_FAST = Snake.VELOCITY_NORMAL * 2;
        Snake.BODY_POINT_DELTA_SCALE = 50;
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