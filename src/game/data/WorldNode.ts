module game.data {
	export class WorldNode {

		public static SIDE_LENGTH = Snake.BODY_SIZE * Snake.MAX_SCALE;

		public column : number;

		public row : number;

		public snakes : Snake[] = [];

		public snakesPoints : SnakePoint[] = [];

		public foods : Food[] = [];
		

		public constructor() {
		}

		public Reset()
		{
			if(this.snakes) this.snakes.splice(0, this.snakes.length);
			if(this.snakesPoints) this.snakesPoints.splice(0, this.snakesPoints.length);
			if(this.foods) this.foods.splice(0, this.foods.length);
		}

	}
}