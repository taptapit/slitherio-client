var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var event;
    (function (event) {
        var EventCenter = (function () {
            function EventCenter() {
            }
            EventCenter.addListener = function (type, callback, thisObject) {
                var listener = this.listeners[type] = this.listeners[type] ? this.listeners[type] : [];
                listener.push({ callback: callback, thisObject: thisObject });
            };
            EventCenter.removeListener = function (type, callback) {
                var listener = this.listeners[type];
                if (!listener) {
                    console.warn("EventCenter doesn't exist listener type:" + type);
                    return;
                }
                for (var i = 0; i < listener.length; i++) {
                    if (listener[i].callback && listener[i].callback == callback) {
                        listener.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };
            EventCenter.dispatch = function (type) {
                var argArray = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    argArray[_i - 1] = arguments[_i];
                }
                var listener = this.listeners[type];
                if (listener) {
                    for (var i = 0; i < listener.length; i++) {
                        var callback = listener[i].callback;
                        var thisObject = listener[i].thisObject;
                        if (callback) {
                            callback.call.apply(callback, [thisObject].concat(argArray));
                        }
                    }
                }
            };
            EventCenter.listeners = {};
            return EventCenter;
        }());
        event.EventCenter = EventCenter;
        __reflect(EventCenter.prototype, "game.event.EventCenter");
    })(event = game.event || (game.event = {}));
})(game || (game = {}));
//# sourceMappingURL=EventCenter.js.map