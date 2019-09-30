module game.renderer {
	export class WorldRenderer extends egret.Sprite {
		
		public static EDGE_SEGMENT_WIDTH = 200 * 4;
		public static EDGE_SEGMENT_HEIGHT = 100 * 4;
		public static EDGE_SEGMENT_COLOR = 0x2D2D2D;
		public static EDGE_SEGMENT_NUM = 120;
		public static RADIUS = 1000 * 4;

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
			for (let i = 0; i < WorldRenderer.EDGE_SEGMENT_NUM; i ++) {
				let degree = i * 360 / WorldRenderer.EDGE_SEGMENT_NUM;
				let x = MathUtils.cos(degree * MathUtils.DegRad) * WorldRenderer.RADIUS;
				let y = MathUtils.sin(degree * MathUtils.DegRad) * WorldRenderer.RADIUS;
				
				let shape:egret.Shape = new egret.Shape();
				shape.graphics.beginFill(WorldRenderer.EDGE_SEGMENT_COLOR, 1);
				shape.graphics.drawRect(-WorldRenderer.EDGE_SEGMENT_WIDTH*0.5, -WorldRenderer.EDGE_SEGMENT_HEIGHT*0.5, WorldRenderer.EDGE_SEGMENT_WIDTH, WorldRenderer.EDGE_SEGMENT_HEIGHT);
				shape.graphics.endFill();
				shape.x = x;
				shape.y = y;
				shape.rotation = degree + 90;
				this.edges.push(shape);
			}
		}

		public render()
		{
			this.renderEdges();
			this.renderGrids();
		}

		private renderEdges()
		{
			for(let key in this.edges)
			{
				let edge = this.edges[key];

				let rect = egret.Rectangle.create();
				rect.setTo(edge.x, edge.y, WorldRenderer.EDGE_SEGMENT_WIDTH, WorldRenderer.EDGE_SEGMENT_WIDTH);
				let isInView = Camera.isInViewPort(rect);
				egret.Rectangle.release(rect);

				if(isInView && !edge.parent)
					this.addChild(edge);
				else if(!isInView && edge.parent)
					this.removeChild(edge);
			}
		}

		private renderGrids()
		{
			let texture : egret.Texture = RES.getRes("background_jpg");
			WorldRenderer.GRID_WIDTH = WorldRenderer.GRID_WIDTH ? WorldRenderer.GRID_WIDTH : texture.textureWidth;
			WorldRenderer.GRID_HEIGHT = WorldRenderer.GRID_HEIGHT ? WorldRenderer.GRID_HEIGHT : texture.textureHeight;

			let rect = Camera.viewPortRect;
			let count = 0;
			for(let i = rect.left;i < rect.right + WorldRenderer.GRID_WIDTH; i+= WorldRenderer.GRID_WIDTH)
			{
				for(let j = rect.top;j < rect.bottom + WorldRenderer.GRID_HEIGHT; j += WorldRenderer.GRID_HEIGHT)
				{
					if(!this.grids[count]) this.grids[count] = new egret.Bitmap(texture);
					let grid = this.grids[count];
					grid.x = Math.floor(i / WorldRenderer.GRID_WIDTH) * WorldRenderer.GRID_WIDTH;
					grid.y = Math.floor(j / WorldRenderer.GRID_HEIGHT) * WorldRenderer.GRID_HEIGHT;
					if(!grid.parent)this.addChildAt(grid, 0);
					count++;
				}
			}
		}

	}
}