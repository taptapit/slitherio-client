module game.renderer {
	export class MapRenderer extends egret.Sprite {

		private static RADIUS : number = 80;

		private static SCALE : number = MapRenderer.RADIUS / WorldRenderer.RADIUS;

		private marks : egret.Shape[] = [];

		public constructor() {
			super();

			this.graphics.beginFill(0x303238, 1);
			this.graphics.drawCircle(MapRenderer.RADIUS, MapRenderer.RADIUS, MapRenderer.RADIUS);
			this.graphics.endFill();

			this.graphics.beginFill(0x50535B);
			this.graphics.moveTo(MapRenderer.RADIUS, MapRenderer.RADIUS);
			this.graphics.lineTo(MapRenderer.RADIUS, MapRenderer.RADIUS * 2);
			this.graphics.drawArc(MapRenderer.RADIUS, MapRenderer.RADIUS, MapRenderer.RADIUS, 270 * Math.PI / 180, 0, false);
			this.graphics.lineTo(MapRenderer.RADIUS, MapRenderer.RADIUS);
			this.graphics.endFill();

			this.graphics.beginFill(0x50535B);
			this.graphics.moveTo(MapRenderer.RADIUS, MapRenderer.RADIUS);
			this.graphics.lineTo(MapRenderer.RADIUS, -MapRenderer.RADIUS * 2);
			this.graphics.drawArc(MapRenderer.RADIUS, MapRenderer.RADIUS, MapRenderer.RADIUS, 90 * Math.PI / 180, Math.PI, false);
			this.graphics.lineTo(MapRenderer.RADIUS, MapRenderer.RADIUS);
			this.graphics.endFill();
		}

		public render()
		{
			let player = GameObjectManager.getInstance().player;
			let snakes = GameObjectManager.getInstance().snakes;
			let count = 0;
			for(let key in snakes)
			{
				let snake : Snake = snakes[key];
				let mark : egret.Shape = this.marks[count];
				if(!mark)
				{
					mark = this.marks[count] = new egret.Shape();
					mark.graphics.beginFill(0xFFFFFF, 1);
					mark.graphics.drawCircle(0, 0, 3);
					mark.graphics.endFill();
				}
				if(!mark.parent)
					this.addChild(mark);

				if(player && snake.id == player.id)
				{
					mark.scaleX = mark.scaleY = 1;
					mark.alpha = 0.8;
				}else
				{
					mark.scaleX = mark.scaleY = 0.2;
					mark.alpha = 0.7;
				}
				mark.x = MapRenderer.RADIUS + snake.position.x * MapRenderer.SCALE;
				mark.y = MapRenderer.RADIUS + snake.position.y * MapRenderer.SCALE;
				count++;
			}
			for(let i = this.marks.length - 1;i >= count;i--)
			{
				let mark : egret.Shape = this.marks[i];
				if(mark.parent)
					mark.parent.removeChild(mark);
			}
		}
	}
}