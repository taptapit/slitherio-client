module game {
	export class SnakeFactory {

		public constructor() {
		}

		public static RandomCreate()
		{
			let randomRadius = Math.random() * 0.9;
			let randomAngle = Math.random() * Math.PI * 2;
			let snake = new Snake(++GameObjectManager.UUID,
						GameObjectManager.UUID, 
			egret.Point.create(Math.random() * World.RADIUS * 0.9, Math.random() * World.RADIUS * 0.9), 
			Math.random() * Math.PI * 2, Snake.VELOCITY_NORMAL, [], Math.floor(Math.random() * ColorUtils.COLORS.length), 1200);
			GameObjectManager.getInstance().add(snake);
			return snake;
		}

	}
}