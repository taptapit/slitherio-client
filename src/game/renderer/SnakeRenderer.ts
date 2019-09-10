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

		private createSubRenderer()
		{
			let subRenderer : egret.Sprite = new egret.Sprite();
			subRenderer.graphics.beginFill(0x000000);
			subRenderer.graphics.drawCircle(0, 0, Snake.BODY_SIZE);
			subRenderer.graphics.endFill();
			this.subRenderers.push(subRenderer);
			this.addChild(subRenderer);
			return subRenderer;
		}

		private removeSubRenderer(index)
		{
			let subRenderer : egret.Sprite = this.subRenderers.splice(index, 1)[0];
			this.removeChild(subRenderer);
		}

		public render()
		{
			let snake : Snake = this.data;
			let snakePoint : SnakePoint;
			let subRenderer : egret.Sprite;
			//update subRenderers
			for(var i = 0; i < this.data.points.length; i++)
			{
				snakePoint = this.data.points[i];
				console.log("snakePoint:" + snakePoint);
				subRenderer = this.subRenderers.length > i ? this.subRenderers[i] : this.createSubRenderer();
				subRenderer.scaleX = snake.scale;
				subRenderer.scaleY = snake.scale;
				subRenderer.x = snakePoint.x;
				subRenderer.y = snakePoint.y;
				// subRenderer.rotation = TODO
				// subRenderer.alpha = TODO
				// subRenderer.filters = TODO
			}
			//remove extra subRenderers
			for(var i = this.data.points.length; i < this.subRenderers.length; i++)
			{
				this.removeSubRenderer(i);
			}
		}
	}
}