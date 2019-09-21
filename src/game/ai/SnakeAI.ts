module game.ai {
	export class SnakeAI {

		private static ACTION_TIME_INTERVAL : number = 1;

		public snake : Snake;
		public level : number;
		public tick : number = 0;

		public constructor(snake:Snake, level : number = 1) {
			this.snake = snake;
			this.level = level;
		}

		public get moveable()
		{
			return this.tick > this.level * SnakeAI.ACTION_TIME_INTERVAL;
		}

		public eat(food:Food)
		{
			this.tick = 0;
			this.snake.targetAngle = Math.atan2(food.position.y - this.snake.position.y, food.position.x - this.snake.position.x);
		}

		public dodgeWall()
		{
			this.tick = 0;
			if(Math.pow(this.snake.position.x, 2) + Math.pow(this.snake.position.y, 2) > Math.pow(World.RADIUS - 500, 2))
			{
				this.snake.targetAngle = Math.atan2(this.snake.position.y, this.snake.position.x) + Math.PI;
			}
		}

		public dodgeSnake(point:SnakePoint)
		{
			this.tick = 0;
			this.snake.targetAngle = Math.atan2(point.y - this.snake.position.y, point.x - this.snake.position.x) + Math.PI;
		}

		public kill(target:Snake)
		{
			this.tick = 0;
			this.snake.targetAngle = Math.atan2(target.position.y - this.snake.position.y, target.position.x - this.snake.position.x);
			this.snake.isAccelerate = true;
			setTimeout(() => {
				if(this.snake && !this.snake.die) this.snake.isAccelerate = false;
			}, 500);
		}

	}
}