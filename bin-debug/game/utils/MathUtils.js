var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var utils;
    (function (utils) {
        var MathUtils = (function () {
            function MathUtils() {
            }
            MathUtils.clamp = function (value, start, end) {
                return Math.max(start, Math.min(end, value));
            };
            MathUtils.lerp = function (start, end, value) {
                return start + (end - start) * value;
            };
            return MathUtils;
        }());
        utils.MathUtils = MathUtils;
        __reflect(MathUtils.prototype, "game.utils.MathUtils");
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=MathUtils.js.map