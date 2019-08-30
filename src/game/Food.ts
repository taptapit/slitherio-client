module game {
	export class Food {
		public id : number;
		public x : number;
		public y : number;
		public color : number;
		public energy : number;
		public scale : number;
		public eaten : boolean;
		public eatenBy : Snake;

		public static energy2Scale(energy){
			return energy * 0.001;
		}

		public constructor(id, x, y, energy, color, eaten = false, eatenBy = null) {
			this.x = x;
			this.y = y;
			this.energy = energy;
			this.scale = Food.energy2Scale(energy);
			this.color = color;
			this.eaten = eaten;
			this.eatenBy = eatenBy;
		}
	}
}