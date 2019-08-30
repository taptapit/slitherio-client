module game {
	export class Input {
		private static instance : Input;

		public static getInstance()
		{
			if(!this.instance)
			{
				this.instance = new Input();
			}
			return this.instance;
		}

		public isTouching : boolean;
		public isDoubleClick : boolean;
		public lastTouchX : number;
		public lastTouchY : number;
		public lastDeltaX : number;
		public lastDeltaY : number;
		public deltaX : number;
		public deltaY : number;
		public angle : number;

		public constructor() {
			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		}

		public lastClickTime : number;
		public IsDoubleClick()
		{
			let curClickTime = egret.getTimer();
			let value = !isNaN(this.lastClickTime) && (curClickTime - this.lastClickTime) < 400;
			this.lastClickTime = curClickTime;
			return value;
		}

		public onTouchBegin(e: egret.TouchEvent)
		{
			this.isDoubleClick = this.IsDoubleClick();
			this.isTouching = true;
			this.lastTouchX = e.stageX;
			this.lastTouchY = e.stageY;
			console.log("onTouchBegin isDoubleClick:" + this.isDoubleClick);
		}

		public onTouchMove(e: egret.TouchEvent)
		{
			this.lastDeltaX = this.deltaX;
			this.lastDeltaY = this.deltaY;
			this.deltaX = e.stageX - this.lastTouchX;
			this.deltaY = e.stageY - this.lastTouchY;
			this.lastTouchX = e.stageX;
			this.lastTouchY = e.stageY;

			console.log("onTouchMove:x:" + this.deltaX + ",y:" + this.deltaY);
		}

		public onTouchEnd(e: egret.TouchEvent)
		{
			this.isTouching = false;
			this.isDoubleClick = false;

			console.log("onTouchEnd")
		}

	}
}