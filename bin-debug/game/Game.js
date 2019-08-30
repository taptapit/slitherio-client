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
        function Game() {
            var _this = _super.call(this) || this;
            game.Input.getInstance();
            var world = new game.World();
            _this.addChild(world);
            return _this;
        }
        Game.prototype.Send = function () {
        };
        Game.prototype.Recieved = function () {
        };
        Game.prototype.Render = function () {
        };
        return Game;
    }(egret.DisplayObjectContainer));
    game.Game = Game;
    __reflect(Game.prototype, "game.Game");
})(game || (game = {}));
//# sourceMappingURL=Game.js.map