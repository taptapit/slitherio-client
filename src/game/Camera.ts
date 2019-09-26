module game {
	export class Camera {
		
		private static VIEW_PORT_EXTENSION : number = WorldNode.SIDE_LENGTH;

		public constructor() {
		}

		private static stageWith : number;
		private static stageHeight : number;
		
		public static viewPortRect : egret.Rectangle;
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
			let player = GameObjectManager.getInstance().player;
			let scene = GameLayerManager.getInstance().scene;
			if (player && scene)
			{
				let sceneOffsetX = player.position.x - this.stageWith * 0.5;
				let sceneOffsetY = player.position.y - this.stageHeight * 0.5;
				scene.x = -sceneOffsetX;
				scene.y = -sceneOffsetY;

				this.viewPortMinX = sceneOffsetX - Camera.VIEW_PORT_EXTENSION;
				this.viewPortMaxX = sceneOffsetX + this.stageWith + Camera.VIEW_PORT_EXTENSION;
				this.viewPortMinY = sceneOffsetY - Camera.VIEW_PORT_EXTENSION;
				this.viewPortMaxY = sceneOffsetY + this.stageHeight + Camera.VIEW_PORT_EXTENSION;

				this.viewPortRect = this.viewPortRect ? this.viewPortRect : new egret.Rectangle();
				this.viewPortRect.setTo(this.viewPortMinX, this.viewPortMinY, this.viewPortMaxX-this.viewPortMinX, this.viewPortMaxY - this.viewPortMinY);

				this.viewPortCenterX = (this.viewPortMaxX + this.viewPortMinX) * 0.5;
				this.viewPortCenterY = (this.viewPortMaxY + this.viewPortMinY) * 0.5;
			}
		}

		public static isInViewPort(rect : egret.Rectangle | egret.Point)
		{
			if(rect instanceof egret.Rectangle)
			{
				let rectCenterX = (rect.right + rect.left) * 0.5;
				let rectCenterY = (rect.bottom + rect.top) * 0.5;
				return Math.abs(this.viewPortCenterX - rectCenterX) <= this.viewPortRect.width * 0.5 + rect.width * 0.5  &&
						Math.abs(this.viewPortCenterY - rectCenterY) <= this.viewPortRect.height * 0.5 + rect.height * 0.5;
			}else if(rect instanceof egret.Point)
			{
				return this.viewPortRect.containsPoint(rect);
			}
			else
			{
				console.error("[isInViewPort]param1 is unsupport type:" + rect);
			}
		}
	}
}