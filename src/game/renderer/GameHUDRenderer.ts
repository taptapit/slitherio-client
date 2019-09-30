module game.renderer {
	export class GameHUDRenderer extends egret.DisplayObjectContainer {

		public textFields = new Object();

		public map : MapRenderer;

		public constructor() {
			super();
			this.map = new MapRenderer();
			this.map.x = egret.MainContext.instance.stage.stageWidth - 200;
			this.map.y = egret.MainContext.instance.stage.stageHeight - 200;
			this.addChild(this.map);
		}

		private static UPDATE_FREQUENCY = 1;
		private tick = 0;
		public render()
		{
			this.tick -= Time.deltaTime; 
			if(this.tick > 0) return;
			this.tick = GameHUDRenderer.UPDATE_FREQUENCY;

			this.map.render();

			let ranks = GameObjectManager.getInstance().ranks;
			let history = GameObjectManager.getInstance().history;

			let stageWidth = egret.MainContext.instance.stage.stageWidth;
			let stageHeight = egret.MainContext.instance.stage.stageHeight;

			let bp:egret.Bitmap = new egret.Bitmap();

			//右上角排行榜
			for(let i = 0;i < 10;i++)
			{
				let rank = i < ranks.length ? ranks[i] : null;
				let offsetX = stageWidth - 300;
				let offsetY = 0;
				if(rank)
				{
					let alpha = 0.9 * (0.2 + 0.8 * Math.pow(1 - i / 10, 2));
					let color = Snake.skinColor(rank.color,0);
					this.drawText("Rank1_"+i, "#" + (i+1), offsetX + 0, offsetY + 14 * i, 11, color, alpha);
					this.drawText("Rank2_"+i, rank.name, offsetX + 28, offsetY + 14 * i, 11, color, alpha);
					this.drawText("Rank3_"+i, Math.floor(rank.energy), offsetX + 200, offsetY + 14 * i, 11, color, alpha);
				}else
				{
					this.clear("Rank1_"+i);
					this.clear("Rank2_"+i);
					this.clear("Rank3_"+i);
				}
			}

			//左下角得分排名
			let offsetX = 0;
			let offsetY = stageHeight - 40;
			this.drawText("ScoreText", "当前得分：", offsetX, offsetY, 12, 0xffffff, 0.6);
			this.drawText("Score", Math.floor(GameObjectManager.getInstance().player.energy), offsetX + 50, offsetY, 14, 0xffffff, 1);
			this.drawText("Rank", 
			"当前排名：" + GameObjectManager.getInstance().ranks.indexOf(GameObjectManager.getInstance().player) + "/" + GameObjectManager.getInstance().ranks.length, offsetX, offsetY + 18, 12, 0xffffff, 0.6);
			
			//左上角历史记录
			if(history)
				this.drawText("History", history.name + "创造了最好成绩：" + Math.floor(history.energy), 0, 0, 12, Snake.skinColor(history.color, 0), 1);
			else
				this.clear("History");
		}

		private clear(id)
		{
			let textField : egret.TextField = this.textFields[id];
			if(textField)
			{
				if(textField.parent) textField.parent.removeChild(textField);
				this.textFields[id] = null;
				delete this.textFields[id];
			}
		}

		private drawText(id, content, x, y, size, color, alpha)
		{
			let textField : egret.TextField = this.textFields[id];
			if(!textField)
			{
				textField = new egret.TextField();
				textField.textAlign = egret.HorizontalAlign.LEFT;
				this.textFields[id] = textField;
			}
			textField.text = content;
			textField.x = x;
			textField.y = y;
			textField.size = size;
			textField.textColor = color;
			textField.alpha = alpha;
			
			if(!textField.parent) this.addChild(textField);
		}

	}
}