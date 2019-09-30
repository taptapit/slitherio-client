module game.utils {
	export class MathUtils {

		public static readonly PI = 3.1415927;
		public static readonly PI2 = MathUtils.PI * 2;
		public static readonly RadDeg = 180 / MathUtils.PI;
		public static readonly DegRad = MathUtils.PI / 180;

		static readonly SIN_BITS = 14; // 16KB. Adjust for accuracy.
		static readonly SIN_MASK = ~(-1 << MathUtils.SIN_BITS);
		static readonly SIN_COUNT = MathUtils.SIN_MASK + 1;
		static readonly RadFull = MathUtils.PI * 2;
		static readonly DegFull = 360;
		static readonly RadToIndex = MathUtils.SIN_COUNT / MathUtils.RadFull;
		static readonly DegToIndex = MathUtils.SIN_COUNT / MathUtils.DegFull;
		private static $sin : number[] = [];

		public static init() {
			for (let i = 0; i < MathUtils.SIN_COUNT; i++)
				MathUtils.$sin[i] = Math.sin((i + 0.5) / MathUtils.SIN_COUNT * MathUtils.RadFull);
			for (let i = 0; i < 360; i += 90)
				MathUtils.$sin[Math.floor((i * MathUtils.DegToIndex) & MathUtils.SIN_MASK)] = Math.sin(i * MathUtils.DegRad);
		}

		/// <summary>Returns the sine in radians from a lookup table.</summary>
		public static sin (radians) {
			return this.$sin[Math.floor(radians * this.RadToIndex) & this.SIN_MASK];
		}

		/// <summary>Returns the cosine in radians from a lookup table.</summary>
		public static cos (radians) {
			return this.$sin[Math.floor((radians + this.PI / 2) * this.RadToIndex) & this.SIN_MASK];
		}
			
		/// <summary>Returns the sine in radians from a lookup table.</summary>
		public static sinDeg (degrees) {
			return this.$sin[Math.floor(degrees * this.DegToIndex) & this.SIN_MASK];
		}
			
		/// <summary>Returns the cosine in radians from a lookup table.</summary>
		public static cosDeg (degrees) {
			return this.$sin[Math.floor((degrees + 90) * this.DegToIndex) & this.SIN_MASK];
		}

		/// <summary>Returns atan2 in radians, faster but less accurate than Math.Atan2. Average error of 0.00231 radians (0.1323
		/// degrees), largest error of 0.00488 radians (0.2796 degrees).</summary>
		public static atan2 (y, x) {
			if (x == 0) {
				if (y > 0) return this.PI / 2;
				if (y == 0) return 0;
				return -this.PI / 2;
			}
			let atan, z = y / x;
			if (Math.abs(z) < 1) {
				atan = z / (1 + 0.28 * z * z);
				if (x < 0) return atan + (y < 0 ? -this.PI : this.PI);
				return atan;
			}
			atan = this.PI / 2 - z / (z * z + 0.28);
			return y < 0 ? atan - this.PI : atan;
		}

		public static clamp(value : number, min : number, max : number)
		{
			if(value < min) return min;
			if(value > max) return max;
			return value;
		}

		public static lerp(start : number, end : number, value : number)
		{
			return start + (end - start) * value;
		}
	}
	
	MathUtils.init();
}