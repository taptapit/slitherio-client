module game {
	export class FoodFactory {

		private static UUID = 1;

		public constructor() {
		}

		public static Create(x, y, energy, color = 0x000000)
		{
			return new Food(FoodFactory.UUID++, x, y, energy, color);
		}

		public static RandomCreate()
		{
			let rradius = Math.random() * 0.9
			let rangle = Math.random() * Math.PI * 2
			let x = World.RADIUS + World.RADIUS * rradius * Math.cos(rangle)
			let y = World.RADIUS + World.RADIUS * rradius * Math.sin(rangle)
			let renergy = Math.random();
			return new Food(FoodFactory.UUID++, x, y, renergy, 0x000000);
		}
	}
}