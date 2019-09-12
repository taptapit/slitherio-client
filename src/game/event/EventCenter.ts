module game.event {
	export class EventCenter {
		public constructor() {
		}

		private static listeners : Object = {};

		public static addListener(type : any, callback : Function, thisObject : any)
		{
			let listener : any[] = this.listeners[type] = this.listeners[type] ? this.listeners[type] : [];
			listener.push({callback:callback, thisObject:thisObject});
		}

		public static removeListener(type : any, callback : Function)
		{
			let listener : any[]  = this.listeners[type];
			if(!listener)
			{
				console.warn("EventCenter doesn't exist listener type:" + type);
				return;
			}

			for(let i = 0; i < listener.length; i++)
			{
				if(listener[i].callback && listener[i].callback == callback)
				{
					listener.splice(i, 1);
					return true;
				}
			}
			return false;
		}

		public static dispatch(type : any, ...argArray: any[])
		{
			let listener : any[]  = this.listeners[type];
			if(listener)
			{
				for(let i = 0; i < listener.length; i++)
				{
					let callback : Function = listener[i].callback;
					let thisObject = listener[i].thisObject;
					if(callback)
					{
						callback.call(thisObject, ...argArray);
					}
				}
			}
		}

	}
}