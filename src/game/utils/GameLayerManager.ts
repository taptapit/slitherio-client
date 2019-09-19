module game.utils {
	export class GameLayerManager {

		private static instance : GameLayerManager;

		public static getInstance()
		{
			if(!this.instance)
			{
				this.instance = new GameLayerManager();
			}
			return this.instance;
		}

		public constructor() {
		}

		public scene : egret.DisplayObjectContainer;
		public world : game.World;
		public underUILayer : egret.DisplayObjectContainer;
		public foodLayer : egret.DisplayObjectContainer;
		public snakeLayer : egret.DisplayObjectContainer;
		public aboveUILayer : egret.DisplayObjectContainer;
	}
}