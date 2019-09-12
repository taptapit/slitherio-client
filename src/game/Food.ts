module game {
	export class Food {
		public id : number;
		public x : number;
		public y : number;
		public position : egret.Point;
		public color : number;
		public energy : number;
		public scale : number;
		public eaten : boolean;
		public eatenBy : Snake;
		public renderer : renderer.FoodRenderer;

		public static energy2Scale(energy){
			return energy * 0.01;
		}

		public constructor(id, x, y, energy, color, eaten = false, eatenBy = null) {
			this.x = x;
			this.y = y;
			this.position = new egret.Point(x, y);
			this.energy = energy;
			this.scale = Food.energy2Scale(energy);
			this.color = color;
			this.eaten = eaten;
			this.eatenBy = eatenBy;
			this.renderer = new renderer.FoodRenderer(this);
		}

		public update(deltaTime)
		{

		}

		public render()
		{
			let isInView = Camera.isInViewPort(this.position);
			console.log("food is in view:" + isInView);

			if(Camera.isInViewPort(this.position))
			{
				if(this.renderer)
				{
					if(!this.renderer.parent) Context.snakeLayer.addChild(this.renderer);
					
					this.renderer.render();
				}
			}else
			{
				if(this.renderer.parent) Context.snakeLayer.removeChild(this.renderer);
			}
		}

	}
}