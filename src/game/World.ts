module game {
	export class World extends egret.Sprite {
		
		public EDGE_SEGMENT_WIDTH = 20
		public EDGE_SEGMENT_HEIGHT = 10
		public EDGE_SEGMENT_COLOR = 0x2D2D2D
		public EDGE_SEGMENT_NUM = 60
		public WORLD_RADIUS = 100
		public DEG_TO_RAD = 2 * Math.PI / 360

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}

		private onAddToStage()
		{
			for (var i = 0; i < this.EDGE_SEGMENT_NUM; i ++) {
				var degree = i * 360 / this.EDGE_SEGMENT_NUM
				var x = Math.cos(degree * DEG_TO_RAD) * this.WORLD_RADIUS
				var y = Math.sin(degree * DEG_TO_RAD) * this.WORLD_RADIUS
				
				var shp:egret.Shape = new egret.Shape();
				shp.graphics.beginFill( this.EDGE_SEGMENT_COLOR, 1);
				shp.graphics.drawRect( -this.EDGE_SEGMENT_WIDTH*0.5, -this.EDGE_SEGMENT_HEIGHT*0.5, this.EDGE_SEGMENT_WIDTH, this.EDGE_SEGMENT_HEIGHT );
				shp.graphics.endFill();
				shp.x = x;
				shp.y = y;
				shp.rotation = degree + 90;
				this.addChild( shp );
			}
		}

	}
}