module game {
	export class SnakeFactory {

		private static UUID = 1;

		public constructor() {
		}

		public static RandomCreate()
		{
			let snake = new Snake(SnakeFactory.UUID++, "None", new game.data.Vector2(0, 0), 0, Snake.VELOCITY_NORMAL);

			let body:data.Vector2[] = [];
			let scale = Snake.length2Scale(Snake.BORN_BODY_LENGTH);
			var angle = 2 * Math.PI * Math.random();
			for(var i = 0; i < Snake.BORN_BODY_LENGTH; i++)
			{
				var point = new game.data.Vector2();
				point.x = Snake.BODY_DELTA * scale * Math.cos(angle) * i;
				point.y = Snake.BODY_DELTA * scale * Math.sin(angle) * i;
				body.push(point)
			}

			snake.points = body;

			return snake;
		}

	}
}