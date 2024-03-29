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

		public constructor() {
		}

		public set(id, x, y, energy, color) {
			this.id = id;
			this.position = this.position || egret.Point.create(x,y);
			this.position.setTo(x, y);
			this.energy = energy;
			this.scale = Food.energy2Scale(energy);
			this.color = color;
			this.eaten = false;
			this.eatenBy = null;
			this.eatenAlpha = 0;
		}

		public dispose()
		{
			if(this.renderer)
			{
				this.renderer.dispose();	
				this.renderer = null;
			}

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
				if(!this.renderer)
				{
					this.renderer = ObjectPool.get(FoodRenderer);
					this.renderer.set(this);
				}
				this.renderer.render();
			}else
			{
				if(this.renderer)
				{
					this.renderer.dispose();	
					this.renderer = null;
				}
			}
		}

		

	}
}