module game {
	export class World extends egret.Sprite {
		
		public static EDGE_SEGMENT_WIDTH = 2000;
		public static EDGE_SEGMENT_HEIGHT = 1000;
		public static EDGE_SEGMENT_COLOR = 0x2D2D2D;
		public static EDGE_SEGMENT_NUM = 120;
		public static RADIUS = 10000;
		public static DEG_TO_RAD = 2 * Math.PI / 360;

		public static GRID_WIDTH;
		public static GRID_HEIGHT;

		public edges : egret.Shape[] = [];

		public grids : egret.Bitmap[] = [];

		public constructor() {
			super();
			this.onAddToStage();
		}

		private onAddToStage()
		{
			for (let i = 0; i < World.EDGE_SEGMENT_NUM; i ++) {
				let degree = i * 360 / World.EDGE_SEGMENT_NUM;
				let x = Math.cos(degree * World.DEG_TO_RAD) * World.RADIUS;
				let y = Math.sin(degree * World.DEG_TO_RAD) * World.RADIUS;
				
				let shape:egret.Shape = new egret.Shape();
				shape.graphics.beginFill(World.EDGE_SEGMENT_COLOR, 1);
				shape.graphics.drawRect(-World.EDGE_SEGMENT_WIDTH*0.5, -World.EDGE_SEGMENT_HEIGHT*0.5, World.EDGE_SEGMENT_WIDTH, World.EDGE_SEGMENT_HEIGHT);
				shape.graphics.endFill();
				shape.x = x;
				shape.y = y;
				shape.rotation = degree + 90;
				this.edges.push(shape);
			}
		}

		public render()
		{
			for(let key in this.edges)
			{
				let edge = this.edges[key];

				let rect = egret.Rectangle.create();
				rect.setTo(this.x, this.y, World.EDGE_SEGMENT_WIDTH, World.EDGE_SEGMENT_WIDTH);
				let isInView = Camera.isInViewPort(rect);
				egret.Rectangle.release(rect);

				if(isInView && !this.contains(edge))
					this.addChild(edge);
				else if(!isInView && this.contains(edge))
					this.removeChild(edge);
			}

			let texture : egret.Texture = RES.getRes("background_jpg");
			World.GRID_WIDTH = World.GRID_WIDTH ? World.GRID_WIDTH : texture.textureWidth;
			World.GRID_HEIGHT = World.GRID_HEIGHT ? World.GRID_HEIGHT : texture.textureHeight;

			let rect = Camera.viewPortRect;
			let count = 0;
			for(let i = rect.left;i < rect.right + World.GRID_WIDTH; i+= World.GRID_WIDTH)
			{
				for(let j = rect.top;j < rect.bottom + World.GRID_HEIGHT; j += World.GRID_HEIGHT)
				{
					if(!this.grids[count]) this.grids[count] = new egret.Bitmap(texture);
					let grid = this.grids[count];
					grid.x = Math.floor(i / World.GRID_WIDTH) * World.GRID_WIDTH;
					grid.y = Math.floor(j / World.GRID_HEIGHT) * World.GRID_HEIGHT;
					if(!grid.parent)this.addChild(grid);
					count++;
				}
			}
		}

	}
}