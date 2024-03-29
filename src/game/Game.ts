import GameLayerManager = game.utils.GameLayerManager;
import WorldNodeManager = game.data.WorldNodeManager;
import WorldNode = game.data.WorldNode;
import SnakeAICenter = game.ai.SnakeAICenter;
import SnakeAI = game.ai.SnakeAI;
import MathUtils = game.utils.MathUtils;
import GameHUDRenderer = game.renderer.GameHUDRenderer;
import WorldRenderer = game.renderer.WorldRenderer;
import SnakeRenderer = game.renderer.SnakeRenderer;
import FoodRenderer = game.renderer.FoodRenderer;

module game {
	export class Game extends egret.DisplayObjectContainer {

		public player : Snake;

		public constructor(container) {
			super();
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
			scene.touchChildren = false;
			this.addChild(scene);
			GameLayerManager.getInstance().scene = scene;

			let world = new game.renderer.WorldRenderer();
        	world.touchEnabled = false;
			world.touchChildren = false;
			scene.addChild(world);
			GameLayerManager.getInstance().world = world;

			let underUILayer = new egret.DisplayObjectContainer();
			underUILayer.touchEnabled = false;
			underUILayer.touchChildren = false;
			scene.addChild(underUILayer);
			GameLayerManager.getInstance().underUILayer = underUILayer;

			let foodLayer = new egret.DisplayObjectContainer();
			foodLayer.touchEnabled = false;
			foodLayer.touchChildren = false;
			scene.addChild(foodLayer);
			GameLayerManager.getInstance().foodLayer = foodLayer;

			let foodBlendLayer = new egret.DisplayObjectContainer();
			foodBlendLayer.touchEnabled = false;
			foodBlendLayer.touchChildren = false;
			scene.addChild(foodBlendLayer);
			GameLayerManager.getInstance().foodBlendLayer = foodBlendLayer;

			let snakeLayer = new egret.DisplayObjectContainer();
			snakeLayer.touchEnabled = false;
			snakeLayer.touchChildren = false;
			scene.addChild(snakeLayer);
			GameLayerManager.getInstance().snakeLayer = snakeLayer;

			let snakeBlendLayer = new egret.DisplayObjectContainer();
			snakeBlendLayer.touchEnabled = false;
			snakeBlendLayer.touchChildren = false;
			scene.addChild(snakeBlendLayer);
			GameLayerManager.getInstance().snakeBlendLayer = snakeBlendLayer;

			let aboveUILayer = new egret.DisplayObjectContainer();
			aboveUILayer.touchEnabled = false;
			aboveUILayer.touchChildren = false;
			this.addChild(aboveUILayer);
			GameLayerManager.getInstance().aboveUILayer = aboveUILayer;

			let gameHUD = new GameHUDRenderer();
			aboveUILayer.addChild(gameHUD);
			GameLayerManager.getInstance().HUD = gameHUD;

			Camera.resize(egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
		}

		public start()
		{
			console.log("start");
			Time.frameCount = 0;

			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			egret.lifecycle.onPause = ()=> {
				console.log("onPause");
				this.lastTick = NaN;
				this.currentTick = NaN;
				this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}
			egret.lifecycle.onResume = ()=> {
				console.log("onResume");
				this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}

			this.player = SnakeFactory.RandomCreate();
			// this.player.ai = new SnakeAI(this.player);
			GameObjectManager.getInstance().player = this.player;
			GameObjectManager.getInstance().add(this.player);

			EventCenter.addListener(GameEvent.CREATE_FOOD, this.createFood, this);
		}

		public stop()
		{
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			EventCenter.removeListener(GameEvent.CREATE_FOOD, this.createFood);
			egret.lifecycle.onPause = null;
			egret.lifecycle.onResume = null;
		}

		public createFood(x:number, y:number, energy:number, color:number)
		{
			// console.log("createFood x:" + x + ",y:" + y + ",energy:" + energy + ",color:" + color);
			FoodFactory.Create(x, y, energy, color);
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
			Time.deltaTime = this.deltaTime;
			Time.frameCount += 1;
			// console.log("onEnterFrame:" + this.deltaTime);

			this.update();
			this.render();
		}

		private update()
		{
			Camera.update();

			// if(this.player && !this.player.dead)
			// {
			// 	let food = FoodFactory.RandomCreate();
			// 	food.energy = 0.1;
			// 	this.player.eat(food);
			// }
			if(Object.keys(GameObjectManager.getInstance().foods).length < 100)
			{
				FoodFactory.RandomCreate();
			}
			if(Object.keys(GameObjectManager.getInstance().snakes).length < 10)
			{
				let snake = SnakeFactory.RandomCreate();
				snake.ai = ObjectPool.get(SnakeAI);
				snake.ai.set(snake);
			}

			this.updateOperation();

			GameObjectManager.getInstance().update();

			this.updateWorldNode();
			SnakeAICenter.update();
		}

		public updateWorldNode()
		{
			let nodes = WorldNodeManager.getInstance().nodes;
			let snakes = GameObjectManager.getInstance().snakes;
			let foods = GameObjectManager.getInstance().foods;

			for(let key in nodes)
			{
				(nodes[key] as WorldNode).reset();
			}

			for(let index in snakes)
			{
				let snake = snakes[index];
				let node = WorldNodeManager.getInstance().get(Math.floor(snake.position.x/WorldNode.SIDE_LENGTH), Math.floor(snake.position.y/WorldNode.SIDE_LENGTH), true);
				node.snakes.push(snake);

				for(let index in snake.points)
				{
					let point = snake.points[index];
					let node = WorldNodeManager.getInstance().get(Math.floor(point.x/WorldNode.SIDE_LENGTH), Math.floor(point.y/WorldNode.SIDE_LENGTH), true);
					node.snakesPoints.push(point);
				}
			}

			for(let index in foods)
			{
				let food = foods[index];
				let node = WorldNodeManager.getInstance().get(Math.floor(food.position.x/WorldNode.SIDE_LENGTH), Math.floor(food.position.y/WorldNode.SIDE_LENGTH), true);
				node.foods.push(food);
			}

			for(let index in nodes)
			{
				let node:WorldNode = nodes[index];

				for(let i = 0; i < node.snakes.length; i++)
				{
					let snake = node.snakes[i];
					if(!snake.dead)
					{
						if((Math.pow(snake.position.x, 2) + Math.pow(snake.position.y, 2)) > Math.pow(WorldRenderer.RADIUS - WorldRenderer.EDGE_SEGMENT_HEIGHT * 0.5 - snake.radius(), 2)) snake.die();
					}

					for(let i = 0; i <= 9; i++)
					{
						let nearbyNode = WorldNodeManager.getInstance().get(node.column-1 + i%3, node.row-1 + Math.floor(i/3));
						if(nearbyNode)
						{
							for(let index in nearbyNode.foods)
							{
								let food = nearbyNode.foods[index];
								if(!snake.dead && !food.eaten && snake.hitTest(food))
								{
									snake.eat(food);
								}
							}

							for(let index in nearbyNode.snakesPoints)
							{
								let point = nearbyNode.snakesPoints[index];
								if(snake.id == point.id)continue;

								if(!snake.dead && snake.hitTest(point)) 
								{
									if(point.index == 0)//头碰头
									{
										let otherSnake : Snake = GameObjectManager.getInstance().get(point.id);
										snake.radius() >= otherSnake.radius() ? otherSnake.die() : snake.die();
									}else//头碰身
										snake.die();
								}
							}
						}
					}
				}
			}

			for(let key in nodes)
			{
				(nodes[key] as WorldNode).update();
			}
		}

		private lastDeltaX : number;
		private lastDeltaY : number;
		private deltaX : number;
		private deltaY : number;
		private updateOperation()
		{
			
			if(this.player && !this.player.dead)
			{
				this.lastDeltaX = this.deltaX;
				this.lastDeltaY = this.deltaY;
				this.deltaX = Input.getInstance().deltaX;
				this.deltaY = Input.getInstance().deltaY;
				if (this.deltaX != this.lastDeltaX || this.deltaY != this.lastDeltaY)
				{
					this.player.targetAngle = MathUtils.atan2(this.deltaY, this.deltaX);
				}

				this.player.isAccelerate = Input.getInstance().isDoubleClick;
				this.player.velocity = this.player.isAccelerate ? Snake.VELOCITY_FAST : Snake.VELOCITY_NORMAL;
			}
		}

		private render()
		{
			let snakes = GameObjectManager.getInstance().snakes;
			let foods = GameObjectManager.getInstance().foods;

			for(let key in snakes)
			{
				let snake = snakes[key] as Snake;
				snake.render();
			}
			for(let key in foods)
			{
				let food = foods[key] as Food;
				food.render();
			}

			GameLayerManager.getInstance().world.render();
			GameLayerManager.getInstance().HUD.render();

			// let nodes = WorldNodeManager.getInstance().nodes;
			// for(let key in nodes)
			// {
			// 	(nodes[key] as WorldNode).drawGizimos();
			// }
		}

	}
}