module game.utils {
	export class ColorUtils {
		public constructor() {
		}

		public static COLORS = [
								0x272727,//黑白
								0x613030,//红白
								0x484891,//蓝白
								0x006030,//绿白
								0x6C3365,//紫白
								0x2F0000,//红白
								0x003E3E,//兰白
								0x796400,//黄白
								];

		public static random()
		{
			return ColorUtils.COLORS[Math.floor(Math.random() * ColorUtils.COLORS.length)];
		}

		public static lerp(color1 : number, color2 : number, value : number)
		{
			return ((utils.MathUtils.lerp(color1 >> 16, color2 >> 16, value) << 16) & 0xFF0000) + 
			((utils.MathUtils.lerp((color1 >> 8) & 0xFF, (color2 >> 8) & 0xFF , value) << 8) & 0x00FF00) + 
			utils.MathUtils.lerp(color1 & 0xFF, color2 & 0xFF , value);
		}
		
	}
}