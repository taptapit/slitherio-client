var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Snake = (function () {
        function Snake(id, name, position, angle, velocity, body, skin) {
            this.id = id;
            this.name = name;
            this.position = position;
            this.angle = angle;
            this.velocity = velocity;
            this.body = body;
            this.skin = skin;
            this.scale = Snake.length2Scale(this.body.length);
            this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
            this.velocityTurnAngle = Snake.speed2TurnAngle(this.velocity);
        }
        Snake.length2Scale = function (length) {
            length -= this.BORN_LENGTH;
            return Math.min(this.MAX_SCALE, this.BORN_SCALE + length / 100);
        };
        Snake.scale2TurnAngle = function (scale) {
            return 0.13 + 0.87 * Math.pow((this.BORN_SCALE + this.MAX_SCALE - scale) / this.MAX_SCALE, 2);
        };
        Snake.speed2TurnAngle = function (velocity) {
            return velocity * this.VELOCITY_TO_TURN_ANGLE;
        };
        Snake.prototype.Dead = function () {
        };
        Snake.prototype.Move = function () {
        };
        Snake.BORN_LENGTH = 6;
        Snake.BORN_SCALE = 1;
        Snake.MAX_SCALE = 5;
        Snake.VELOCITY_TO_TURN_ANGLE = 0.2;
        return Snake;
    }());
    game.Snake = Snake;
    __reflect(Snake.prototype, "game.Snake");
})(game || (game = {}));
//# sourceMappingURL=Snake.js.map