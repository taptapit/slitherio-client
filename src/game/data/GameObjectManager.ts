module game.data {
	export class GameObjectManager {

		public static UUID : number = 0;

		private static instance : GameObjectManager;

		public static getInstance()
		{
			if(!this.instance)
			{
				this.instance = new GameObjectManager();
			}
			return this.instance;
		}

		public player : Snake;

		public snakes : Object = {};

		public foods : Object = {};

		public constructor() {
		}

		public add(o : Snake | Food)
		{
			if(o instanceof Snake)
			{
				let snake = o as Snake;
				this.snakes[snake.id] = snake;
			}else if(o instanceof Food)
			{
				let food = o as Food;
				this.foods[food.id] = food;
			}
		}

		public remove(o : Snake | Food)
		{
			if(o instanceof Snake)
			{
				let snake = o as Snake;
				this.snakes[snake.id] = null;
				delete this.snakes[snake.id];
			}else if(o instanceof Food)
			{
				let food = o as Food;
				this.foods[food.id] = null;
				delete this.foods[food.id];
			}
		}

		public get(o : Snake | Food | number) : any
		{
			if(o instanceof Snake)
			{
				return this.snakes[(o as Snake).id];
			}else if(o instanceof Food)
			{
				return this.foods[(o as Food).id];
			}else if(typeof o == "number")
			{
				if(this.snakes[o])
				{
					return this.snakes[o];
				}else if(this.foods[o])
				{
					return this.foods[o];
				}
				else return null;
			}
		}

	}
}