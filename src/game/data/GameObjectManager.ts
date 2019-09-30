module game.data {
	export class GameObjectManager {

		private static instance : GameObjectManager;

		public static getInstance()
		{
			if(!this.instance)
			{
				this.instance = new GameObjectManager();
			}
			return this.instance;
		}

		public static UUID : number = 0;

		public history : Snake;

		public player : Snake;

		public ranks : Snake[] = [];

		public snakes : Object = {};

		public foods : Object = {};

		public constructor() {
		}

		private sortSnake(a:Snake, b:Snake)
		{
			if(a.energy > b.energy)return -1;
			else if(a.energy < b.energy)return 1;
			else return 0;
		}

		public update()
		{
			let snakes = GameObjectManager.getInstance().snakes;
			let foods = GameObjectManager.getInstance().foods;

			if(this.ranks) this.ranks.splice(0, this.ranks.length);

			for(let key in snakes)
			{
				let snake : Snake = snakes[key];
				this.history = !this.history || snake.energy > this.history.energy ? snake : this.history;
				this.ranks.push(snake);
				snake.update();
			}

			this.ranks.sort(this.sortSnake);

			for(let key in foods)
			{
				(foods[key] as Food).update();
			}
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
				ObjectPool.release(Snake, snake);
			}else if(o instanceof Food)
			{
				let food = o as Food;
				this.foods[food.id] = null;
				delete this.foods[food.id];
				ObjectPool.release(Food, food);
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