module game {
	export class FoodFactory {

		public constructor() {
		}

		public static Create(x, y, energy, color = 0x000000)
		{
			let food : Food = new Food(GameObjectManager.UUID++, x, y, energy, color);
			GameObjectManager.getInstance().add(food);
			return food;
		}

		public static RandomCreate()
		{
			let rradius = Math.random() * 0.9;
			let rangle = Math.random() * Math.PI * 2;
			let x = World.RADIUS + World.RADIUS * rradius * Math.cos(rangle);
			let y = World.RADIUS + World.RADIUS * rradius * Math.sin(rangle);
			let renergy = Math.random() * Snake.ENERGY_PER_POINT * 5;
			let food : Food =  new Food(GameObjectManager.UUID++, x, y, renergy, 0x000000);
			GameObjectManager.getInstance().add(food);
			return food;
		}
	}
}