module game.renderer {
	export class SnakeRenderer extends egret.DisplayObjectContainer {
		
		private data : Snake;

		private subRenderers : egret.Sprite[];

		public constructor(data : Snake) {
			super();
			this.data = data;
			this.touchEnabled = false;
			this.subRenderers = [];
		}

		private createSubRenderer(data : SnakePoint)
		{
			let subRenderer : egret.Sprite = ObjectPool.get(egret.Sprite);
			subRenderer.graphics.beginFill(data.color);
			subRenderer.graphics.drawCircle(0, 0, Snake.BODY_SIZE);
			subRenderer.graphics.endFill();
			this.subRenderers.push(subRenderer);
			return subRenderer;
		}

		private removeSubRenderer(index)
		{
			let subRenderer : egret.Sprite = this.subRenderers[index];
			this.subRenderers[index] = null;
			// let subRenderer : egret.Sprite = this.subRenderers.splice(index, 1)[0];
			if(subRenderer)
			{
				ObjectPool.release(egret.Sprite, subRenderer);
				this.removeChild(subRenderer);
			}
		}

		public render()
		{
			let snake : Snake = this.data;
			let snakePoint : SnakePoint;
			let subRenderer : egret.Sprite;
			//update subRenderers
			let pointLength = this.data.points.length;
			for(var i = 0; i < pointLength; i++)
			{
				snakePoint = this.data.points[i];
				
				if(snakePoint.isIsView)
				{
					subRenderer = (this.subRenderers.length > i && this.subRenderers[i]) ? this.subRenderers[i] : this.createSubRenderer(snakePoint);
					subRenderer.scaleX = snake.scale;
					subRenderer.scaleY = snake.scale;
					subRenderer.x = snakePoint.x;
					subRenderer.y = snakePoint.y;
					
					if(!subRenderer.parent)
						this.addChildAt(subRenderer, pointLength - i - 1);
					// subRenderer.rotation = TODO
					// subRenderer.alpha = TODO
					// subRenderer.filters = TODO
				}else
				{
					this.removeSubRenderer(i);
				}
			}
			//remove extra subRenderers
			for(var i = this.data.points.length; i < this.subRenderers.length; i++)
			{
				this.removeSubRenderer(i);
			}
		}
	}
}