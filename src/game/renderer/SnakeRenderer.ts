module game.renderer {
	export class SnakeRenderer extends egret.DisplayObjectContainer {
		
		private data : Snake;

		private subRenderers : egret.Sprite[];

		private subBlendRenderers : egret.Sprite[];

		private txtName : egret.TextField;

		public constructor(data : Snake) {
			super();
			this.data = data;
			this.touchEnabled = false;
			this.subRenderers = [];
			this.subBlendRenderers = [];

			this.txtName = new egret.TextField();
			this.txtName.textColor = this.data.color;
			this.txtName.text = this.data.name;
		}

		private prepareSubRenderer(data : SnakePoint, index : number)
		{
			if(this.subRenderers.length < index || !this.subRenderers[index])
			{
				let subRenderer : egret.Sprite = ObjectPool.get(egret.Sprite);
				subRenderer.graphics.beginFill(data.color);
				subRenderer.graphics.drawCircle(0, 0, Snake.BODY_SIZE);
				subRenderer.graphics.endFill();
				subRenderer.alpha = 1;
				subRenderer.blendMode = egret.BlendMode.NORMAL;
				this.subRenderers[index] = subRenderer;

				let subBlendRenderer : egret.Sprite = ObjectPool.get(egret.Sprite);
				subBlendRenderer.graphics.beginFill(data.color);
				subBlendRenderer.graphics.drawCircle(0, 0, Snake.BODY_SIZE);
				subBlendRenderer.graphics.endFill();
				subBlendRenderer.blendMode = egret.BlendMode.ADD;
				subBlendRenderer.alpha = 1;
				this.subBlendRenderers[index] = subBlendRenderer;
			}
		}

		private removeSubRenderer(index : number)
		{
			let subRenderer : egret.Sprite = this.subRenderers[index];
			this.subRenderers[index] = null;
			if(subRenderer)
			{
				ObjectPool.release(egret.Sprite, subRenderer);
				if(subRenderer.parent)
					subRenderer.parent.removeChild(subRenderer);
			}

			subRenderer = this.subBlendRenderers[index];
			this.subBlendRenderers[index] = null;
			if(subRenderer)
			{
				ObjectPool.release(egret.Sprite, subRenderer);
				if(subRenderer.parent)
					subRenderer.parent.removeChild(subRenderer);
			}
		}

		public render()
		{
			let snake : Snake = this.data;
			let snakePoint : SnakePoint = this.data.points[0];
			let subRenderer : egret.Sprite;
			let subBlendRenderer : egret.Sprite;
			let renderIndex = 0;

			if(snake.isInView)
			{
				if(!this.txtName.parent)
					GameLayerManager.getInstance().underUILayer.addChild(this.txtName);
				this.txtName.x = snakePoint.x;
				this.txtName.y = snakePoint.y;
			}else
			{
				if(this.txtName.parent)
					this.txtName.parent.removeChild(this.txtName);
			}

			for(var i = this.data.points.length - 1; i >= 0; i--)
			{
				snakePoint = this.data.points[i];
				
				if(snakePoint.isInView)
				{
					this.prepareSubRenderer(snakePoint, i);

					subRenderer = this.subRenderers[i];
					subRenderer.scaleX = snake.scale;
					subRenderer.scaleY = snake.scale;
					subRenderer.x = snakePoint.x;
					subRenderer.y = snakePoint.y;
					// subRenderer.rotation = TODO
					// subRenderer.alpha = TODO
					// subRenderer.filters = TODO

					if(!subRenderer.parent)
						this.addChildAt(subRenderer, renderIndex);
					else if (snake.hasViewStateChanged)
					// else
						subRenderer.parent.setChildIndex(subRenderer, renderIndex);
					renderIndex++;

					subBlendRenderer = this.subBlendRenderers[i];
					if(snake.velocity == Snake.VELOCITY_FAST)
					{
						let alphaRatio = Math.abs(-Time.frameCount + i) % 40;
						alphaRatio = alphaRatio > 20 ? 40 - alphaRatio : alphaRatio;
						subBlendRenderer.alpha = alphaRatio / 20 * 0.4;
						subBlendRenderer.scaleX = snake.scale * 1.1;
						subBlendRenderer.scaleY = snake.scale * 1.1;
						subBlendRenderer.x = snakePoint.x;
						subBlendRenderer.y = snakePoint.y;	
						if(!subBlendRenderer.parent)
							GameLayerManager.getInstance().snakeBlendLayer.addChild(subBlendRenderer);
					}else
					{
						if(subBlendRenderer.parent)
							subBlendRenderer.parent.removeChild(subBlendRenderer);
					}
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

			snake.hasViewStateChanged = undefined;
		}
	}
}