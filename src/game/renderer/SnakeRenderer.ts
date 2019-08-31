module game.renderer {
	export class SnakeRenderer extends egret.DisplayObjectContainer {
		
		private data : Snake;

		private subRenderers : egret.Sprite[];

		public constructor(data : Snake) {
			super();
			this.data = data;
			this.touchEnabled = false;
		}

		private createSubRenderer()
		{
			let subRenderer : egret.Sprite = new egret.Sprite();
			this.subRenderers.push(subRenderer);
			this.addChild(subRenderer);
			return subRenderer;
		}

		private removeSubRenderer(index)
		{
			this.subRenderers.splice(index, 1);
		}

		public render()
		{
			let snake : Snake;
			let snakePoint : SnakePoint;
			let subRenderer : egret.Sprite;
			//update subRenderers
			for(var i = 0; i <= this.data.points.length; i++)
			{
				snakePoint = this.data.points[i];
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
			for(var i = this.data.points.length; i <= this.subRenderers.length; i++)
			{
				this.removeSubRenderer(i);
			}
		}
	}
}