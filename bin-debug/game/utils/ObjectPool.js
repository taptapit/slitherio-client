var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var utils;
    (function (utils) {
        var ObjectPool = (function () {
            function ObjectPool() {
            }
            ObjectPool._construct = function (cls) {
                return new cls();
            };
            ObjectPool.get = function (cls) {
                return ObjectPool._construct(cls);
            };
            ObjectPool.release = function (object) {
            };
            return ObjectPool;
        }());
        utils.ObjectPool = ObjectPool;
        __reflect(ObjectPool.prototype, "game.utils.ObjectPool");
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=ObjectPool.js.map