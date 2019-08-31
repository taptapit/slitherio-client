module game {
	export class World extends egret.Sprite {
		
		public static EDGE_SEGMENT_WIDTH = 20;
		public static EDGE_SEGMENT_HEIGHT = 10;
		public static EDGE_SEGMENT_COLOR = 0x2D2D2D;
		public static EDGE_SEGMENT_NUM = 60;
		public static RADIUS = 100;
		public static DEG_TO_RAD = 2 * Math.PI / 360;

		public constructor() {
			super();
			// this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.onAddToStage();
		}

		private onAddToStage()
		{
			for (var i = 0; i < World.EDGE_SEGMENT_NUM; i ++) {
				var degree = i * 360 / World.EDGE_SEGMENT_NUM;
				var x = Math.cos(degree * DEG_TO_RAD) * World.RADIUS;
				var y = Math.sin(degree * DEG_TO_RAD) * World.RADIUS;
				
				var shp:egret.Shape = new egret.Shape();
				shp.graphics.beginFill(World.EDGE_SEGMENT_COLOR, 1);
				shp.graphics.drawRect(-World.EDGE_SEGMENT_WIDTH*0.5, -World.EDGE_SEGMENT_HEIGHT*0.5, World.EDGE_SEGMENT_WIDTH, World.EDGE_SEGMENT_HEIGHT);
				shp.graphics.endFill();
				shp.x = x;
				shp.y = y;
				shp.rotation = degree + 90;
				this.addChild( shp );
			}
		}

	}
}