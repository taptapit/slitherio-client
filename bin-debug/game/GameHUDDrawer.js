var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameHUDDrawer = (function () {
        function GameHUDDrawer() {
        }
        GameHUDDrawer.render = function () {
            this.tick -= game.Time.deltaTime;
            if (this.tick > 0)
                return;
            this.tick = GameHUDDrawer.UPDATE_FREQUENCY;
            var ranks = GameObjectManager.getInstance().ranks;
            var history = GameObjectManager.getInstance().history;
            var stageWidth = egret.MainContext.instance.stage.stageWidth;
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            //右上角排行榜
            for (var i = 0; i < 10; i++) {
                var rank = i < ranks.length ? ranks[i] : null;
                var offsetX_1 = stageWidth - 300;
                var offsetY_1 = 0;
                if (rank) {
                    var alpha = 0.9 * (0.2 + 0.8 * Math.pow(1 - i / 10, 2));
                    var color = game.Snake.skinColor(rank.skin, 0);
                    this.draw("Rank1_" + i, "#" + (i + 1), offsetX_1 + 0, offsetY_1 + 14 * i, 11, color, alpha);
                    this.draw("Rank2_" + i, rank.name, offsetX_1 + 28, offsetY_1 + 14 * i, 11, color, alpha);
                    this.draw("Rank3_" + i, Math.floor(rank.energy), offsetX_1 + 200, offsetY_1 + 14 * i, 11, color, alpha);
                }
                else {
                    this.clear("Rank1_" + i);
                    this.clear("Rank2_" + i);
                    this.clear("Rank3_" + i);
                }
            }
            //左下角得分排名
            var offsetX = 0;
            var offsetY = stageHeight - 40;
            this.draw("ScoreText", "当前得分：", offsetX, offsetY, 12, 0xffffff, 0.6);
            this.draw("Score", Math.floor(GameObjectManager.getInstance().player.energy), offsetX + 50, offsetY, 14, 0xffffff, 1);
            this.draw("Rank", "当前排名：" + GameObjectManager.getInstance().ranks.indexOf(GameObjectManager.getInstance().player) + "/" + GameObjectManager.getInstance().ranks.length, offsetX, offsetY + 18, 12, 0xffffff, 0.6);
            //左上角历史记录
            if (history)
                this.draw("History", history.name + "创造了最好成绩：" + Math.floor(history.energy), 0, 0, 12, game.Snake.skinColor(history.skin, 0), 1);
            else
                this.clear("History");
        };
        GameHUDDrawer.clear = function (id) {
            var textField = GameHUDDrawer.textFields[id];
            if (textField) {
                if (textField.parent)
                    textField.parent.removeChild(textField);
                GameHUDDrawer.textFields[id] = null;
                delete GameHUDDrawer.textFields[id];
            }
        };
        GameHUDDrawer.draw = function (id, content, x, y, size, color, alpha) {
            var textField = GameHUDDrawer.textFields[id];
            if (!textField) {
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
            if (!textField.parent)
                GameLayerManager.getInstance().aboveUILayer.addChild(textField);
        };
        GameHUDDrawer.textFields = new Object();
        GameHUDDrawer.UPDATE_FREQUENCY = 1;
        GameHUDDrawer.tick = 0;
        return GameHUDDrawer;
    }());
    game.GameHUDDrawer = GameHUDDrawer;
    __reflect(GameHUDDrawer.prototype, "game.GameHUDDrawer");
})(game || (game = {}));
//# sourceMappingURL=GameHUDDrawer.js.map