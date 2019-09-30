module game.utils {
	export class ObjectPool {
		public constructor() {
		}

		private static pools : Object = new Object();

		private static MAX_POOL_NUM = 2000;

		private static construct(cls, ...args)
		{
			return new cls(...args);
		}

		public static get(cls:any, ...args): any {
			let pool = this.pools[cls];
			if(!pool) pool = this.pools[cls] = [];
			if(pool.length > 0 && pool.length <= ObjectPool.MAX_POOL_NUM)
				return pool.pop();
			else
				return ObjectPool.construct(cls, ...args);
		}

		public static release(cls:any, object:Object)
		{
			let pool : any[] = this.pools[cls];
			if(pool.length < ObjectPool.MAX_POOL_NUM)
				pool.push(object);
		}

	}
}