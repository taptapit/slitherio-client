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
            ObjectPool.construct = function (cls) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return new (cls.bind.apply(cls, [void 0].concat(args)))();
            };
            ObjectPool.get = function (cls) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var pool = this.pools[cls];
                if (!pool)
                    pool = this.pools[cls] = [];
                if (pool.length > 0 && pool.length <= ObjectPool.MAX_POOL_NUM)
                    return pool.pop();
                else
                    return ObjectPool.construct.apply(ObjectPool, [cls].concat(args));
            };
            ObjectPool.release = function (cls, object) {
                var pool = this.pools[cls];
                if (pool.length < ObjectPool.MAX_POOL_NUM)
                    pool.push(object);
            };
            ObjectPool.pools = new Object();
            ObjectPool.MAX_POOL_NUM = 2000;
            return ObjectPool;
        }());
        utils.ObjectPool = ObjectPool;
        __reflect(ObjectPool.prototype, "game.utils.ObjectPool");
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=ObjectPool.js.map