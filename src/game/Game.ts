module game {
	export class Game extends egret.DisplayObjectContainer {

		public player : Snake;

		public constructor(container) {
			super();
			// this.addChild(egret.MainContext.instance.stage);
			container.addChild(this);

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
			Context.snakeLayer = snakeLayer;

			Camera.resize(egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
		}

		public start()
		{
			console.log("start");
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

			this.player = SnakeFactory.RandomCreate();
			Context.player = this.player;
			GameObjectManager.getInstance().snakes.push(this.player);
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
			if(isNaN(this.lastTick))this.lastTick = egret.getTimer() * 0.001;
			if(isNaN(this.currentTick))this.currentTick = egret.getTimer() * 0.001;
			this.currentTick = egret.getTimer() * 0.001;
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
			this.updateOperation();

			if(this.player && !this.player.isDead)
			{
				this.player.eat(1);
			}

			let snakes = GameObjectManager.getInstance().snakes;
			let foods = GameObjectManager.getInstance().foods;
			for(var i = 0 ; i <= snakes.length - 1; i++)
			{
				snakes[i].update(this.deltaTime);
			}
			for(var i = 0 ; i <= foods.length - 1; i++)
			{
				foods[i].update(this.deltaTime);
			}
		}

		private lastDeltaX : number;
		private lastDeltaY : number;
		private deltaX : number;
		private deltaY : number;
		private updateOperation()
		{
			if(this.player && !this.player.isDead)
			{
				this.lastDeltaX = this.deltaX;
				this.lastDeltaY = this.deltaY;
				this.deltaX = Input.getInstance().deltaX;
				this.deltaY = Input.getInstance().deltaY;
				if (this.deltaX != this.lastDeltaX || this.deltaY != this.lastDeltaY)
				{
					this.player.targetAngle = Math.atan2(this.deltaY, this.deltaX);
					console.log("updateTargetAngle targetAngle:" + this.player.targetAngle);
				}

				this.player.isAccelerate = Input.getInstance().isDoubleClick;
				this.player.velocity = this.player.isAccelerate ? Snake.VELOCITY_FAST : Snake.VELOCITY_NORMAL;
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
			for(var i = 0 ; i < snakes.length; i++)
			{
				snakes[i].render();
			}
			for(var i = 0 ; i < foods.length; i++)
			{
				foods[i].render();
			}

			Camera.update();
		}

	}
}