module game {
	export class SnakeFactory {

		public constructor() {
		}

		public static RandomCreate()
		{
			let randomRadius = Math.random() * 0.9;
			let randomAngle = Math.random() * MathUtils.PI * 2;
			let x = WorldRenderer.RADIUS * randomRadius * MathUtils.cos(randomAngle);
			let y = WorldRenderer.RADIUS * randomRadius * MathUtils.sin(randomAngle);
			// let snake = new Snake(++GameObjectManager.UUID, GameObjectManager.UUID, egret.Point.create(x, y), randomAngle, Snake.VELOCITY_NORMAL, [], ColorUtils.random(), 1200);
			let snake : Snake = ObjectPool.get(Snake);
			snake.set(++GameObjectManager.UUID, GameObjectManager.UUID, egret.Point.create(x, y), randomAngle, Snake.VELOCITY_NORMAL, [], ColorUtils.random(), 1200);
			GameObjectManager.getInstance().add(snake);
			return snake;
		}

	}
}