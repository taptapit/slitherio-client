module game {
	export class FoodFactory {

		public constructor() {
		}

		public static Create(x, y, energy, color = 0x000000)
		{
			// let food : Food = new Food(++GameObjectManager.UUID, x, y, energy, color);
			let food : Food = ObjectPool.get(Food);
			food.set(++GameObjectManager.UUID, x, y, energy, color);
			GameObjectManager.getInstance().add(food);
			return food;
		}

		public static RandomCreate()
		{
			let randomRadius = Math.random() * 0.9;
			let randomAngle = Math.random() * Math.PI * 2;
			let x = WorldRenderer.RADIUS * randomRadius * MathUtils.cos(randomAngle);
			let y = WorldRenderer.RADIUS * randomRadius * MathUtils.sin(randomAngle);
			let renergy = Math.random() * Snake.ENERGY_PER_POINT * 0.5;
			let food : Food = ObjectPool.get(Food);
			food.set(++GameObjectManager.UUID, x, y, renergy, ColorUtils.random());
			// let food : Food =  new Food(++GameObjectManager.UUID, x, y, renergy, ColorUtils.random());
			GameObjectManager.getInstance().add(food);
			return food;
		}
	}
}