var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var event;
    (function (event) {
        var GameEvent = (function () {
            function GameEvent() {
            }
            GameEvent.CREATE_FOOD = "CREATE_FOOD";
            return GameEvent;
        }());
        event.GameEvent = GameEvent;
        __reflect(GameEvent.prototype, "game.event.GameEvent");
    })(event = game.event || (game.event = {}));
})(game || (game = {}));
//# sourceMappingURL=GameEvent.js.map