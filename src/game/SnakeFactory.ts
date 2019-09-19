module game {
	export class SnakeFactory {

		public constructor() {
		}

		public static RandomCreate()
		{
			let snake = new Snake(GameObjectManager.UUID++, "None", egret.Point.create(0, 0), 0, Snake.VELOCITY_NORMAL, null, 0, 120);
			
			let points:SnakePoint[] = [];
			let scale = Snake.length2Scale(Snake.BORN_BODY_LENGTH);
			snake.scale = scale;
			
			var angle = 2 * Math.PI * Math.random();
			for(var i = 0; i < Snake.BORN_BODY_LENGTH; i++)
			{
				var point = new SnakePoint();
				point.x = Snake.BODY_POINT_DELTA_SCALE * scale * Math.cos(angle) * i;
				point.y = Snake.BODY_POINT_DELTA_SCALE * scale * Math.sin(angle) * i;
				point.color = 0x00ffff;
				points.push(point)
			}

			snake.points = points;

			GameObjectManager.getInstance().add(snake);

			return snake;
		}

	}
}