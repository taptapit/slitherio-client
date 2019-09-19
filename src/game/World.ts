module game {
	export class World extends egret.Sprite {
		
		public static EDGE_SEGMENT_WIDTH = 200;
		public static EDGE_SEGMENT_HEIGHT = 100;
		public static EDGE_SEGMENT_COLOR = 0x2D2D2D;
		public static EDGE_SEGMENT_NUM = 120;
		public static RADIUS = 1000;
		public static DEG_TO_RAD = 2 * Math.PI / 360;

		public constructor() {
			super();
			this.onAddToStage();
		}

		private onAddToStage()
		{
			for (let i = 0; i < World.EDGE_SEGMENT_NUM; i ++) {
				let degree = i * 360 / World.EDGE_SEGMENT_NUM;
				let x = Math.cos(degree * DEG_TO_RAD) * World.RADIUS;
				let y = Math.sin(degree * DEG_TO_RAD) * World.RADIUS;
				
				let shp:egret.Shape = new egret.Shape();
				shp.graphics.beginFill(World.EDGE_SEGMENT_COLOR, 1);
				shp.graphics.drawRect(-World.EDGE_SEGMENT_WIDTH*0.5, -World.EDGE_SEGMENT_HEIGHT*0.5, World.EDGE_SEGMENT_WIDTH, World.EDGE_SEGMENT_HEIGHT);
				shp.graphics.endFill();
				shp.x = x;
				shp.y = y;
				shp.rotation = degree + 90;
				shp.cacheAsBitmap = true;
				this.addChild( shp );
			}
		}

	}
}