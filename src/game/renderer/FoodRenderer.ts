module game.renderer {
	export class FoodRenderer extends egret.DisplayObjectContainer {
		
		private data : Food;

		private renderer : egret.Sprite;

		private blendRenderer : egret.Bitmap;

		public constructor() {
			super();
		}

		public set(data : Food)
		{
			this.data = data;

			this.renderer = this.renderer || new egret.Sprite();
			this.renderer.graphics.beginFill(this.data.color);
			this.renderer.graphics.drawCircle(0, 0, Snake.BODY_SIZE);
			this.renderer.graphics.endFill();
			this.addChild(this.renderer);

			let texture : egret.Texture = RES.getRes("blink_png");
			this.blendRenderer = this.blendRenderer || new egret.Bitmap(texture);
			this.blendRenderer.blendMode = egret.BlendMode.ADD;
			GameLayerManager.getInstance().foodBlendLayer.addChild(this.blendRenderer);

			if(!this.parent) GameLayerManager.getInstance().foodLayer.addChild(this);
		}

		public dispose()
		{	
			if(this.parent) this.parent.removeChild(this);
			
			if(this.renderer)
			{
				if(this.renderer.parent)
					this.renderer.parent.removeChild(this.renderer);
			}	
			if(this.blendRenderer)
			{
				if(this.blendRenderer.parent)
					this.blendRenderer.parent.removeChild(this.blendRenderer);
			}

			ObjectPool.release(FoodRenderer, this);
		}

		public render()
		{
			let food : Food = this.data;

			this.renderer.scaleX = food.scale;
			this.renderer.scaleY = food.scale;
			this.renderer.x = food.position.x;
			this.renderer.y = food.position.y;

			this.blendRenderer.alpha = MathUtils.cos(Time.frameCount * 0.1);
			this.blendRenderer.scaleX = food.scale;
			this.blendRenderer.scaleY = food.scale;
			this.blendRenderer.x = food.position.x - this.blendRenderer.width * 0.5 * this.blendRenderer.scaleX;
			this.blendRenderer.y = food.position.y - this.blendRenderer.height * 0.5 * this.blendRenderer.scaleY;
		}
	}
}