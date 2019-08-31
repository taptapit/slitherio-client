module game {
	export class Game extends egret.DisplayObjectContainer {

		public self : Snake;

		public constructor() {
			super();
			this.addChild(egret.MainContext.instance.stage);

			this.setup();
			this.start();
		}

		public send()
		{

		}

		public recieved()
		{

		}

		public setup()
		{
			Input.getInstance();

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
			aboveUILayer.touchEnabled = false;
			this.addChild(aboveUILayer);

			Context.scene = scene;

			Camera.resize(egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
		}

		public start()
		{
			console.log("start");
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

			Context.player = SnakeFactory.RandomCreate();
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

			console.log("onEnterFrame:" + this.deltaTime);

			this.update();
			this.render();
		}

		private update()
		{
			FoodFactory.RandomCreate();
			this.updateMiniMap();

			let snakes = GameObjectManager.getInstance().snakes;
			let foods = GameObjectManager.getInstance().foods;
			for(var i = 0 ; i <= snakes.length; i++)
			{
				snakes[i].update(this.deltaTime);
			}
			for(var i = 0 ; i <= foods.length; i++)
			{
				foods[i].update(this.deltaTime);
			}
		}

		private updateMiniMap()
		{
			//TODO
		}

		private render()
		{
			let snakes = GameObjectManager.getInstance().snakes;
			let foods = GameObjectManager.getInstance().foods;
			for(var i = 0 ; i <= snakes.length; i++)
			{
				snakes[i].render();
			}
			for(var i = 0 ; i <= foods.length; i++)
			{
				foods[i].render();
			}

			Camera.update();
		}

	}
}