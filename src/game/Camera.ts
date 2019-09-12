module game {
	export class Camera {
		private 
		public constructor() {
		}

		private static stageWith : number;
		private static stageHeight : number;
		private static Epsilon : number = 200;
		
		private static viewPortRect : egret.Rectangle;
		private static viewPortMinX : number;
		private static viewPortMinY : number;
		private static viewPortMaxX : number;
		private static viewPortMaxY : number;
		private static viewPortCenterX : number;
		private static viewPortCenterY : number;

		public static resize(stageWith, stageHeight)
		{
			this.stageWith = stageWith;
			this.stageHeight = stageHeight
		}

		public static update()
		{
			let player = Context.player;
			let scene = Context.scene;
			if (player && scene)
			{
				let sceneOffsetX = player.position.x - this.stageWith * 0.5;
				let sceneOffsetY = player.position.y - this.stageHeight * 0.5;
				scene.x = -sceneOffsetX;
				scene.y = -sceneOffsetY;

				// console.log("stageWith:" + this.stageWith + ",stageHeight:" + this.stageHeight);
				// console.log("player.x:" + player.position.x + ",player.y:" + player.position.y);
				// console.log("scene.x:" + scene.x + ",scene.y:" + scene.y);

				this.viewPortMinX = scene.x;
				this.viewPortMaxX = scene.x +this.stageWith;
				this.viewPortMinY = scene.y;
				this.viewPortMaxY = scene.y +this.stageHeight;

				this.viewPortRect = this.viewPortRect ? this.viewPortRect : new egret.Rectangle();
				this.viewPortRect.setTo(this.viewPortMinX, this.viewPortMinY, this.stageWith, this.stageHeight);

				this.viewPortCenterX = (this.viewPortMaxX - this.viewPortMinX) * 0.5;
				this.viewPortCenterY = (this.viewPortMaxY - this.viewPortMinY) * 0.5;
			}
		}

		public static isInViewPort(rect : egret.Rectangle | egret.Point)
		{
			if(rect instanceof egret.Rectangle)
			{
				let rectCenterX = (rect.right - rect.left) * 0.5;
				let rectCenterY = (rect.bottom - rect.top) * 0.5;
				return Math.abs(this.viewPortCenterX - rectCenterX) <= this.stageWith * 0.5 + rect.width * 0.5 &&
						Math.abs(this.viewPortCenterY - rectCenterY) <= this.stageHeight * 0.5 + rect.height * 0.5;
			}else
			{
				return this.viewPortRect.containsPoint(rect);
			}
		}
	}
}