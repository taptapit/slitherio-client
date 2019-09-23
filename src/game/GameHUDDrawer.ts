module game {
	export class GameHUDDrawer {

		public static textFields = new Object();

		public constructor() {
		}

		private static UPDATE_FREQUENCY = 1;
		private static tick = 0;
		public static render()
		{
			this.tick -= Time.deltaTime; 
			if(this.tick > 0) return;
			this.tick = GameHUDDrawer.UPDATE_FREQUENCY;

			let ranks = GameObjectManager.getInstance().ranks;
			let history = GameObjectManager.getInstance().history;

			let stageWidth = egret.MainContext.instance.stage.stageWidth;
			let stageHeight = egret.MainContext.instance.stage.stageHeight;

			//右上角排行榜
			for(let i = 0;i < 10;i++)
			{
				let rank = i < ranks.length ? ranks[i] : null;
				let offsetX = stageWidth - 300;
				let offsetY = 0;
				if(rank)
				{
					let alpha = 0.9 * (0.2 + 0.8 * Math.pow(1 - i / 10, 2));
					let color = Snake.skinColor(rank.skin,0);
					this.draw("Rank1_"+i, "#" + (i+1), offsetX + 0, offsetY + 14 * i, 11, color, alpha);
					this.draw("Rank2_"+i, rank.name, offsetX + 28, offsetY + 14 * i, 11, color, alpha);
					this.draw("Rank3_"+i, Math.floor(rank.energy), offsetX + 200, offsetY + 14 * i, 11, color, alpha);
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
			this.draw("ScoreText", "当前得分：", offsetX, offsetY, 12, 0xffffff, 0.6);
			this.draw("Score", Math.floor(GameObjectManager.getInstance().player.energy), offsetX + 50, offsetY, 14, 0xffffff, 1);
			this.draw("Rank", 
			"当前排名：" + GameObjectManager.getInstance().ranks.indexOf(GameObjectManager.getInstance().player) + "/" + GameObjectManager.getInstance().ranks.length, offsetX, offsetY + 18, 12, 0xffffff, 0.6);
			
			//左上角历史记录
			if(history)
				this.draw("History", history.name + "创造了最好成绩：" + Math.floor(history.energy), 0, 0, 12, Snake.skinColor(history.skin, 0), 1);
			else
				this.clear("History");
		}

		private static clear(id)
		{
			let textField : egret.TextField = GameHUDDrawer.textFields[id];
			if(textField)
			{
				if(textField.parent) textField.parent.removeChild(textField);
				GameHUDDrawer.textFields[id] = null;
				delete GameHUDDrawer.textFields[id];
			}
		}

		private static draw(id, content, x, y, size, color, alpha)
		{
			let textField : egret.TextField = GameHUDDrawer.textFields[id];
			if(!textField)
			{
				textField = new egret.TextField();
				textField.textAlign = egret.HorizontalAlign.LEFT;
				GameHUDDrawer.textFields[id] = textField;
			}
			textField.text = content;
			textField.x = x;
			textField.y = y;
			textField.size = size;
			textField.textColor = color;
			textField.alpha = alpha;
			
			if(!textField.parent) GameLayerManager.getInstance().aboveUILayer.addChild(textField);
		}

	}
}