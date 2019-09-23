module game.data {
	export class WorldNode {

		public static SIDE_LENGTH = Snake.BODY_SIZE * 2 * Snake.MAX_SCALE;

		public id : number;

		public x : number;

		public y : number;

		public column : number;

		public row : number;

		public isInView :boolean;

		public snakes : Snake[] = [];

		public snakesPoints : SnakePoint[] = [];

		public foods : Food[] = [];

		private gizimos : egret.Sprite;
		

		public constructor() {
		}

		public update()
		{
			let rect = egret.Rectangle.create();
			rect.setTo(this.x, this.y, WorldNode.SIDE_LENGTH, WorldNode.SIDE_LENGTH);
			this.isInView = Camera.isInViewPort(rect);
			egret.Rectangle.release(rect);
			
			for(let key in this.snakesPoints)
			{
				let point = this.snakesPoints[key];
				point.isIsView = this.isInView;
			}
			for(let key in this.foods)
			{
				let food = this.foods[key];
				food.isInView = this.isInView;
			}
		}

		public reset()
		{
			if(this.snakes) this.snakes.splice(0, this.snakes.length);
			if(this.snakesPoints) this.snakesPoints.splice(0, this.snakesPoints.length);
			if(this.foods) this.foods.splice(0, this.foods.length);

			if(this.gizimos && this.gizimos.parent) this.gizimos.parent.removeChild(this.gizimos);

			WorldNodeManager.getInstance().nodes[this.id] = null;
			delete WorldNodeManager.getInstance().nodes[this.id];
		}

		public drawGizimos()
		{
			if(!this.gizimos)
			{
				this.gizimos = new egret.Sprite();
				this.gizimos.x = this.x;
				this.gizimos.y = this.y;
				this.gizimos.graphics.beginFill(0x8B795E);
				this.gizimos.graphics.drawRect(0, 0, WorldNode.SIDE_LENGTH, WorldNode.SIDE_LENGTH);
				this.gizimos.graphics.endFill();
				this.gizimos.graphics.beginFill(0x8B6969);
				this.gizimos.graphics.drawRect(0, 0, WorldNode.SIDE_LENGTH - 4, WorldNode.SIDE_LENGTH - 4);
				this.gizimos.graphics.endFill();
			}
			if(this.isInView)
			{
				if(!this.gizimos.parent) GameLayerManager.getInstance().scene.addChildAt(this.gizimos, 0);
			}else
			{
				if(this.gizimos && this.gizimos.parent) this.gizimos.parent.removeChild(this.gizimos);
			}
			
		}

	}
}