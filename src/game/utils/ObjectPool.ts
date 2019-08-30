module game.utils {
	export class ObjectPool {
		public constructor() {
		}

		public static _construct(cls)
		{
			return new cls();
		}

		public static get(cls:any): any {
			return ObjectPool._construct(cls);
		}

		public static release(object:any)
		{

		}

	}
}