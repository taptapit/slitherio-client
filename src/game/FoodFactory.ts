module game {
	export class FoodFactory {

		private static UUID = 1;

		public constructor() {
		}

		public static Create(x, y, energy, color = 0x000000)
		{
			let food : Food = new Food(FoodFactory.UUID++, x, y, energy, color)
			GameObjectManager.getInstance().foods.push(food);
			return food;
		}

		public static RandomCreate()
		{
			let rradius = Math.random() * 0.9
			let rangle = Math.random() * Math.PI * 2
			let x = World.RADIUS + World.RADIUS * rradius * Math.cos(rangle)
			let y = World.RADIUS + World.RADIUS * rradius * Math.sin(rangle)
			let renergy = Math.random();
			let food : Food =  new Food(FoodFactory.UUID++, x, y, renergy, 0x000000);
			GameObjectManager.getInstance().foods.push(food);
			return food;
		}
	}
}