var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var renderer;
    (function (renderer) {
        var GameHUDRenderer = (function (_super) {
            __extends(GameHUDRenderer, _super);
            function GameHUDRenderer() {
                var _this = _super.call(this) || this;
                _this.textFields = new Object();
                _this.tick = 0;
                _this.map = new renderer.MapRenderer();
                _this.map.x = egret.MainContext.instance.stage.stageWidth - 200;
                _this.map.y = egret.MainContext.instance.stage.stageHeight - 200;
                _this.addChild(_this.map);
                return _this;
            }
            GameHUDRenderer.prototype.render = function () {
                this.tick -= game.Time.deltaTime;
                if (this.tick > 0)
                    return;
                this.tick = GameHUDRenderer.UPDATE_FREQUENCY;
                this.map.render();
                var ranks = GameObjectManager.getInstance().ranks;
                var history = GameObjectManager.getInstance().history;
                var stageWidth = egret.MainContext.instance.stage.stageWidth;
                var stageHeight = egret.MainContext.instance.stage.stageHeight;
                var bp = new egret.Bitmap();
                //右上角排行榜
                for (var i = 0; i < 10; i++) {
                    var rank = i < ranks.length ? ranks[i] : null;
                    var offsetX_1 = stageWidth - 300;
                    var offsetY_1 = 0;
                    if (rank) {
                        var alpha = 0.9 * (0.2 + 0.8 * Math.pow(1 - i / 10, 2));
                        var color = game.Snake.skinColor(rank.color, 0);
                        this.drawText("Rank1_" + i, "#" + (i + 1), offsetX_1 + 0, offsetY_1 + 14 * i, 11, color, alpha);
                        this.drawText("Rank2_" + i, rank.name, offsetX_1 + 28, offsetY_1 + 14 * i, 11, color, alpha);
                        this.drawText("Rank3_" + i, Math.floor(rank.energy), offsetX_1 + 200, offsetY_1 + 14 * i, 11, color, alpha);
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
                this.drawText("ScoreText", "当前得分：", offsetX, offsetY, 12, 0xffffff, 0.6);
                this.drawText("Score", Math.floor(GameObjectManager.getInstance().player.energy), offsetX + 50, offsetY, 14, 0xffffff, 1);
                this.drawText("Rank", "当前排名：" + GameObjectManager.getInstance().ranks.indexOf(GameObjectManager.getInstance().player) + "/" + GameObjectManager.getInstance().ranks.length, offsetX, offsetY + 18, 12, 0xffffff, 0.6);
                //左上角历史记录
                if (history)
                    this.drawText("History", history.name + "创造了最好成绩：" + Math.floor(history.energy), 0, 0, 12, game.Snake.skinColor(history.color, 0), 1);
                else
                    this.clear("History");
            };
            GameHUDRenderer.prototype.clear = function (id) {
                var textField = this.textFields[id];
                if (textField) {
                    if (textField.parent)
                        textField.parent.removeChild(textField);
                    this.textFields[id] = null;
                    delete this.textFields[id];
                }
            };
            GameHUDRenderer.prototype.drawText = function (id, content, x, y, size, color, alpha) {
                var textField = this.textFields[id];
                if (!textField) {
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
                if (!textField.parent)
                    this.addChild(textField);
            };
            GameHUDRenderer.UPDATE_FREQUENCY = 1;
            return GameHUDRenderer;
        }(egret.DisplayObjectContainer));
        renderer.GameHUDRenderer = GameHUDRenderer;
        __reflect(GameHUDRenderer.prototype, "game.renderer.GameHUDRenderer");
    })(renderer = game.renderer || (game.renderer = {}));
})(game || (game = {}));
//# sourceMappingURL=GameHUDRenderer.js.map