module game.utils {
	export class ObjectPool {
		public constructor() {
		}

		private static pools = new Object();

		private static construct(cls)
		{
			return new cls();
		}

		public static get(cls:any): any {
			let pool : any[] = this.pools[cls] = this.pools[cls] ? this.pools[cls] : [];
			if(pool.length > 0)
				return pool.pop();
			else
				return ObjectPool.construct(cls);
		}

		public static release(cls:any, object:Object)
		{
			let pool : any[] = this.pools[cls];
			pool.push(object);
		}

	}
}