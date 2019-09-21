var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var utils;
    (function (utils) {
        var ColorUtils = (function () {
            function ColorUtils() {
            }
            ColorUtils.random = function () {
                return ColorUtils.COLORS[Math.floor(Math.random() * ColorUtils.COLORS.length)];
            };
            ColorUtils.lerp = function (color1, color2, value) {
                return ((utils.MathUtils.lerp(color1 >> 16, color2 >> 16, value) << 16) & 0xFF0000) +
                    ((utils.MathUtils.lerp((color1 >> 8) & 0xFF, (color2 >> 8) & 0xFF, value) << 8) & 0x00FF00) +
                    utils.MathUtils.lerp(color1 & 0xFF, color2 & 0xFF, value);
            };
            ColorUtils.COLORS = [
                0x272727,
                0x613030,
                0x484891,
                0x006030,
                0x6C3365,
                0x2F0000,
                0x003E3E,
                0x796400,
            ];
            return ColorUtils;
        }());
        utils.ColorUtils = ColorUtils;
        __reflect(ColorUtils.prototype, "game.utils.ColorUtils");
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=ColorUtils.js.map