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

		private static TOUCH_MOVE_INTERVAL : number = 50;
		private static DOUBLE_CLICK_INTERVAL : number = 400;

		public isDoubleClick : boolean;
		private lastTouchX : number;
		private lastTouchY : number;

		public isTouching : boolean;
		public deltaX : number;
		public deltaY : number;

		public constructor() {
			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		}

		public lastClickTime : number;
		public IsDoubleClick()
		{
			let curClickTime = egret.getTimer();
			let value = !isNaN(this.lastClickTime) && (curClickTime - this.lastClickTime) < Input.DOUBLE_CLICK_INTERVAL;
			this.lastClickTime = curClickTime;
			return value;
		}

		public onTouchBegin(e: egret.TouchEvent)
		{
			this.isDoubleClick = this.IsDoubleClick();
			this.isTouching = true;
			this.lastTouchX = e.stageX;
			this.lastTouchY = e.stageY;
			// console.log("onTouchBegin isDoubleClick:" + this.isDoubleClick);
		}

		private touchMoveTime : number;
		public onTouchMove(e: egret.TouchEvent)
		{
			let nowTime = egret.getTimer();
			this.touchMoveTime = isNaN(this.touchMoveTime) ? nowTime : this.touchMoveTime; 
			if(nowTime - this.touchMoveTime > Input.TOUCH_MOVE_INTERVAL)
			{
				this.touchMoveTime = nowTime;

				this.deltaX = e.stageX - this.lastTouchX;
				this.deltaY = e.stageY - this.lastTouchY;
				this.lastTouchX = e.stageX;
				this.lastTouchY = e.stageY;

				// console.log("onTouchMove:x:" + this.deltaX + ",y:" + this.deltaY);
			}
		}

		public onTouchEnd(e: egret.TouchEvent)
		{
			this.isTouching = false;
			this.isDoubleClick = false;

			// console.log("onTouchEnd");
		}

	}
}