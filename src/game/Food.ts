module game {
	export class Food {
		public id : number;
		public position : egret.Point;
		public color : number;
		public energy : number;
		public scale : number;
		public eaten : boolean;
		public eatenBy : Snake;
		public eatenAlpha : number;
		public isInView : boolean;
		public renderer : renderer.FoodRenderer;

		public static energy2Scale(energy){
			return energy * 0.01;
		}

		public radius()
		{
			return Snake.BODY_SIZE * this.scale * 0.5;
		}

		public constructor(id, x, y, energy, color) {
			this.id = id;
			this.position = new egret.Point(x, y);
			this.energy = energy;
			this.scale = Food.energy2Scale(energy);
			this.color = color;
			this.eaten = false;
			this.eatenBy = null;
			this.eatenAlpha = 0;
			this.renderer = new renderer.FoodRenderer(this);
		}

		public dispose()
		{
			if(this.renderer) this.renderer.dispose();
			GameObjectManager.getInstance().remove(this);
		}

		public eatBy(snake:Snake)
		{
			this.eaten = true;
			this.eatenBy = snake;
			this.eatenAlpha = 0;
			this.dispose();
		}

		public update()
		{

		}

		public render()
		{
			if(this.isInView)
			{
				if(this.renderer)
				{
					if(!this.renderer.parent) GameLayerManager.getInstance().foodLayer.addChild(this.renderer);
					this.renderer.render();
				}
			}else
			{
				if(this.renderer.parent) GameLayerManager.getInstance().foodLayer.removeChild(this.renderer);
			}
		}

	}
}