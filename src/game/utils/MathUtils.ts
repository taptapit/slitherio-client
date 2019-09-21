module game.utils {
	export class MathUtils {
		public constructor() {
		}

		public static clamp(value : number, start : number, end : number)
		{
			return Math.max(start, Math.min(end, value));
		}

		public static lerp(start : number, end : number, value : number)
		{
			return start + (end - start) * value;
		}
	}
}