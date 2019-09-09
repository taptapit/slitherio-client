var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectPool = game.utils.ObjectPool;
var GameObjectManager = game.data.GameObjectManager;
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
            this.velocityTurnAngle = Snake.speed2TurnAngle(this.velocity);
            this.points = points;
            this.skin = skin;
            this.energy = energy;
            this.length = Snake.energy2Length(energy);
            this.scale = Snake.length2Scale(this.length);
            this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
            this.boundingBox = egret.Rectangle.create();
            this.renderer = new game.renderer.SnakeRenderer(this);
            console.log("constructor angle:" + this.angle);
        }
        Snake.length2Scale = function (length) {
            length -= this.BORN_BODY_LENGTH;
            return Math.min(this.MAX_SCALE, this.BORN_SCALE + length / 100);
        };
        Snake.scale2TurnAngle = function (scale) {
            return 0.13 + 0.87 * Math.pow((this.BORN_SCALE + this.MAX_SCALE - scale) / this.MAX_SCALE, 2);
        };
        Snake.speed2TurnAngle = function (velocity) {
            return velocity * this.VELOCITY_TO_TURN_ANGLE;
        };
        Snake.energy2Length = function (energy) {
            return Math.floor(energy / Snake.ENERGY_PER_POINT);
        };
        Snake.prototype.dead = function () {
        };
        Snake.prototype.eat = function (energy) {
            this.energy += energy;
            this.length = Snake.energy2Length(energy);
            this.scale = Snake.length2Scale(this.length);
            this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
        };
        Snake.prototype.update = function (deltaTime) {
            // this.updateNameAlpha();
            // this.updateTargetAngle();
            // this.updateDying(deltaTime);
            // this.updateEnergy(deltaTime);
            // this.turn(deltaTime);
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
                    game.FoodFactory.Create(point.x, point.y, Snake.ENERGY_PER_POINT);
                }
            }
            else {
                this.isAccelerate = false;
            }
        };
        Snake.prototype.updateTargetAngle = function () {
            var deltaX = game.Input.getInstance().deltaX;
            var deltaY = game.Input.getInstance().deltaY;
            var lastDeltaX = game.Input.getInstance().lastDeltaX;
            var lastDeltaY = game.Input.getInstance().lastDeltaY;
            if (deltaX != lastDeltaX || deltaY != lastDeltaY) {
                this.targetAngle = Math.atan2(deltaY, deltaX);
            }
        };
        Snake.prototype.turn = function (deltaTime) {
            this.angle = ((this.angle + Math.PI) % (Math.PI * 2)) - Math.PI;
            console.log("turn angle:" + this.angle);
            this.targetAngle = ((this.targetAngle + Math.PI) % (Math.PI * 2)) - Math.PI;
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
            var movePoints = distance / deltaPoint;
            console.log("move time:" + deltaTime);
            console.log("move distance:" + distance);
            console.log("move movePoints:" + movePoints);
            console.log("this.angle:" + this.angle);
            console.log("111this.position:x:" + this.position.x + ",y:" + this.position.y);
            this.position.x = this.position.x + Math.cos(this.angle) * movePoints;
            this.position.y = this.position.y + Math.sin(this.angle) * movePoints;
            console.log("222this.position:x:" + this.position.x + ",y:" + this.position.y);
            console.log("this.points.length" + this.points.length);
            console.log("this.length" + this.length);
            if (this.points.length > this.length) {
                this.points.pop();
            }
            else {
                if (this.points.length < this.length) {
                    var point = ObjectPool.get(game.SnakePoint);
                    point.x = this.position.x;
                    point.y = this.position.y;
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
            var isVisible = game.Camera.isInViewPort(this.boundingBox);
            console.log("isVisible:" + isVisible);
            if (game.Camera.isInViewPort(this.boundingBox)) {
                if (this.renderer) {
                    if (!this.renderer.parent)
                        game.Context.snakeLayer.addChild(this.renderer);
                    this.renderer.render();
                }
            }
            else {
                if (this.renderer.parent)
                    game.Context.snakeLayer.removeChild(this.renderer);
            }
        };
        Snake.BODY_SIZE = 10;
        Snake.BORN_BODY_LENGTH = 6;
        Snake.BORN_SCALE = 1;
        Snake.MAX_SCALE = 5;
        Snake.VELOCITY_TO_TURN_ANGLE = 0.2;
        Snake.VELOCITY_NORMAL = 12;
        Snake.VELOCITY_FAST = 24;
        Snake.BODY_POINT_DELTA_SCALE = 6;
        Snake.ENERGY_PER_POINT = 20;
        Snake.ENERGY_SPEND_PER_SECOND = Snake.ENERGY_PER_POINT * 5;
        Snake.ENERGY_LIMIT_FOR_ACCELERATE = Snake.ENERGY_PER_POINT * 5;
        return Snake;
    }());
    game.Snake = Snake;
    __reflect(Snake.prototype, "game.Snake");
})(game || (game = {}));
//# sourceMappingURL=Snake.js.map