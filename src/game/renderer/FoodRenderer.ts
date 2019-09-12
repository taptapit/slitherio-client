module game.renderer {
	export class FoodRenderer extends egret.DisplayObjectContainer {
		
		private data : Food;

		private renderer : egret.Sprite;

		public constructor(data : Food) {
			super();
			this.data = data;
			this.touchEnabled = false;
		}

		public render()
		{
			let food : Food = this.data;
			if(!this.renderer)
			{
				this.renderer = new egret.Sprite();
				this.renderer.graphics.beginFill(0x000000);
				this.renderer.graphics.drawCircle(0, 0, Snake.BODY_SIZE);
				this.renderer.graphics.endFill();
				this.addChild(this.renderer);
			}
			console.log("food.scale:" + food.scale);
			this.renderer.scaleX = food.scale;
			this.renderer.scaleY = food.scale;
			this.renderer.x = food.x;
			this.renderer.y = food.y;
		}
	}
}