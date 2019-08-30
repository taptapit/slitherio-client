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

		public snakes : {[index: number]: Snake};

		public foods : {[index: number]: Food};

		public constructor() {
		}
	}
}