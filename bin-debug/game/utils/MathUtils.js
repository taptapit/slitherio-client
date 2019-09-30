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
            MathUtils.init = function () {
                for (var i = 0; i < MathUtils.SIN_COUNT; i++)
                    MathUtils.$sin[i] = Math.sin((i + 0.5) / MathUtils.SIN_COUNT * MathUtils.RadFull);
                for (var i = 0; i < 360; i += 90)
                    MathUtils.$sin[Math.floor((i * MathUtils.DegToIndex) & MathUtils.SIN_MASK)] = Math.sin(i * MathUtils.DegRad);
            };
            /// <summary>Returns the sine in radians from a lookup table.</summary>
            MathUtils.sin = function (radians) {
                return this.$sin[Math.floor(radians * this.RadToIndex) & this.SIN_MASK];
            };
            /// <summary>Returns the cosine in radians from a lookup table.</summary>
            MathUtils.cos = function (radians) {
                return this.$sin[Math.floor((radians + this.PI / 2) * this.RadToIndex) & this.SIN_MASK];
            };
            /// <summary>Returns the sine in radians from a lookup table.</summary>
            MathUtils.sinDeg = function (degrees) {
                return this.$sin[Math.floor(degrees * this.DegToIndex) & this.SIN_MASK];
            };
            /// <summary>Returns the cosine in radians from a lookup table.</summary>
            MathUtils.cosDeg = function (degrees) {
                return this.$sin[Math.floor((degrees + 90) * this.DegToIndex) & this.SIN_MASK];
            };
            /// <summary>Returns atan2 in radians, faster but less accurate than Math.Atan2. Average error of 0.00231 radians (0.1323
            /// degrees), largest error of 0.00488 radians (0.2796 degrees).</summary>
            MathUtils.atan2 = function (y, x) {
                if (x == 0) {
                    if (y > 0)
                        return this.PI / 2;
                    if (y == 0)
                        return 0;
                    return -this.PI / 2;
                }
                var atan, z = y / x;
                if (Math.abs(z) < 1) {
                    atan = z / (1 + 0.28 * z * z);
                    if (x < 0)
                        return atan + (y < 0 ? -this.PI : this.PI);
                    return atan;
                }
                atan = this.PI / 2 - z / (z * z + 0.28);
                return y < 0 ? atan - this.PI : atan;
            };
            MathUtils.clamp = function (value, min, max) {
                if (value < min)
                    return min;
                if (value > max)
                    return max;
                return value;
            };
            MathUtils.lerp = function (start, end, value) {
                return start + (end - start) * value;
            };
            MathUtils.PI = 3.1415927;
            MathUtils.PI2 = MathUtils.PI * 2;
            MathUtils.RadDeg = 180 / MathUtils.PI;
            MathUtils.DegRad = MathUtils.PI / 180;
            MathUtils.SIN_BITS = 14; // 16KB. Adjust for accuracy.
            MathUtils.SIN_MASK = ~(-1 << MathUtils.SIN_BITS);
            MathUtils.SIN_COUNT = MathUtils.SIN_MASK + 1;
            MathUtils.RadFull = MathUtils.PI * 2;
            MathUtils.DegFull = 360;
            MathUtils.RadToIndex = MathUtils.SIN_COUNT / MathUtils.RadFull;
            MathUtils.DegToIndex = MathUtils.SIN_COUNT / MathUtils.DegFull;
            MathUtils.$sin = [];
            return MathUtils;
        }());
        utils.MathUtils = MathUtils;
        __reflect(MathUtils.prototype, "game.utils.MathUtils");
        MathUtils.init();
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=MathUtils.js.map