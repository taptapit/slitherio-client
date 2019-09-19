module game.data {
	export class WorldNodeManager {

		private static instance : WorldNodeManager;

		public static getInstance()
		{
			if(!this.instance)
			{
				this.instance = new WorldNodeManager();
			}
			return this.instance;
		}

		public nodes : Object = new Object();

		public constructor() {
		}

		public get(row : number, column : number, autoCreate : boolean = false)
		{
			let key = row * 10000 + column;
			let node : WorldNode = this.nodes[key];
			if(!node && autoCreate)
			{
				node = new WorldNode();
				node.row = row;
				node.column = column;
				this.nodes[key] = node;
			}
			return node;
		}

	}
}