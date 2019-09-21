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

		public get(column : number, row : number, autoCreate : boolean = false)
		{
			let id = column * 10000 + row;
			let node : WorldNode = this.nodes[id];
			if(!node && autoCreate)
			{
				node = new WorldNode();
				node.x =  column * WorldNode.SIDE_LENGTH;
				node.y =  row * WorldNode.SIDE_LENGTH;
				node.row = row;
				node.column = column;
				node.id = id;
				this.nodes[id] = node;
			}
			return node;
		}

	}
}