module game {
	export class Game extends egret.DisplayObjectContainer {

		public self : Snake;

		public constructor() {
			super();
			this.addChild(egret.MainContext.instance.stage);

			this.setupInput();
			this.setupContainer();
		}

		public send()
		{

		}

		public recieved()
		{

		}

		public setupInput()
		{
			Input.getInstance();
		}

		public setupContainer()
		{
			let scene = new egret.DisplayObjectContainer();
			scene.touchEnabled = false;
			this.addChild(scene);

			let world = new game.World();
        	world.touchEnabled = false;
			scene.addChild(world);

			let underUILayer = new egret.DisplayObjectContainer();
			underUILayer.touchEnabled = false;
			scene.addChild(underUILayer);

			let footLayer = new egret.DisplayObjectContainer();
			footLayer.touchEnabled = false;
			scene.addChild(footLayer);

			let snakeLayer = new egret.DisplayObjectContainer();
			snakeLayer.touchEnabled = false;
			scene.addChild(snakeLayer);

			let aboveUILayer = new egret.DisplayObjectContainer();
			snakeLayer.touchEnabled = false;
			scene.addChild(snakeLayer);
		}

		public start()
		{
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

			this.self = SnakeFactory.RandomCreate();
		}

		public stop()
		{
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}

		private lastTick : number;
		private currentTick : number;
		private deltaTime : number;
		private onEnterFrame(event:egret.Event)
		{
			if(isNaN(this.lastTick))this.lastTick = egret.getTimer();
			if(isNaN(this.currentTick))this.currentTick = egret.getTimer();
			this.currentTick = egret.getTimer();
			this.deltaTime = this.currentTick - this.lastTick;
			this.lastTick = this.currentTick;

			this.preRender();
			this.render();
		}

		private preRender()
		{
			FoodFactory.RandomCreate();
			this.updateMiniMap();
		}

		private updateMiniMap()
		{
			//TODO
		}

		private render()
		{

		}

	}
}