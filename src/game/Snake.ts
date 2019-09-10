import ObjectPool = game.utils.ObjectPool
import GameObjectManager = game.data.GameObjectManager

module game {

	export class Snake {
		public static BODY_SIZE = 10;
		public static BORN_BODY_LENGTH = 6;
		private static BORN_SCALE = 1;
		private static MAX_SCALE = 5;
		private static VELOCITY_TO_TURN_ANGLE = 0.1;
		public static VELOCITY_NORMAL = 100;
		public static VELOCITY_FAST = Snake.VELOCITY_NORMAL * 2;
		public static BODY_POINT_DELTA_SCALE = 10;
		public static ENERGY_PER_POINT = 20;
		public static ENERGY_SPEND_PER_SECOND = Snake.ENERGY_PER_POINT * 5;
		public static ENERGY_LIMIT_FOR_ACCELERATE = Snake.ENERGY_PER_POINT * 5;
		
		public id : number;
		public position : egret.Point;
		public points : game.SnakePoint[];
		public name : string;
		public skin : number;
		public velocity : number;
		public scale : number;
		public angle : number;
		public turnAngle : number;
		public scaleTurnAngle : number;
		public velocityTurnAngle : number;
		public isDead : boolean;
		public dyingAlpha : number;
		public energy : number;
		public length : number;
		public targetAngle : number;
		public isAccelerate : boolean;
		public renderer : renderer.SnakeRenderer;
		public isInView : boolean;
		public boundingBox : egret.Rectangle;

		public static length2Scale(length)
		{
			length -= this.BORN_BODY_LENGTH;
			return Math.min(this.MAX_SCALE, this.BORN_SCALE + length / 100 );
		}

		public static scale2TurnAngle(scale)
		{
			return 0.13 + 0.87 * Math.pow((this.BORN_SCALE + this.MAX_SCALE - scale) / this.MAX_SCALE, 2);
		}

		public static velocity2TurnAngle(velocity)
		{
			return velocity * this.VELOCITY_TO_TURN_ANGLE;
		}

		public static energy2Length(energy)
		{
			return Math.floor(energy / Snake.ENERGY_PER_POINT);
		}

		public constructor(id, name, position, angle, velocity, points = null, skin = 0, energy = 0) {
			this.id = id;
			this.name = name;
			this.position = position;
			this.angle = angle;
			this.targetAngle = angle;
			this.velocity = velocity;
			this.velocityTurnAngle = Snake.velocity2TurnAngle(this.velocity);
			this.points = points;
			this.skin = skin;
			this.energy = energy;
			this.length = Snake.energy2Length(energy);
			this.scale = Snake.length2Scale(this.length);
			this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
			this.boundingBox = egret.Rectangle.create();
			this.renderer = new renderer.SnakeRenderer(this);
		}

		public dead()
		{
		}

		public eat(energy)
		{
			this.energy += energy;
			this.length = Snake.energy2Length(this.energy);
			this.scale = Snake.length2Scale(this.length);
			this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
		}

		public update(deltaTime)
		{
			this.updateNameAlpha();
			this.updateDying(deltaTime);
			this.updateEnergy(deltaTime);
			this.turn(deltaTime);
			this.move(deltaTime);
		}

		public updateNameAlpha()
		{
			//TODO
		}

		public updateDying(deltaTime)
		{
			if(this.isDead)
			{
				this.dyingAlpha += deltaTime * 0.02;
				if(this.dyingAlpha >= 1)
				{
					delete GameObjectManager.getInstance().snakes[this.id];
				}
			}
		}

		public updateEnergy(deltaTime)
		{
			if(!this.isAccelerate)return;

			let canAccelerate = this.energy - deltaTime * Snake.ENERGY_SPEND_PER_SECOND > Snake.ENERGY_LIMIT_FOR_ACCELERATE;
			if(canAccelerate)
			{
				this.isAccelerate = true;

				this.energy -= deltaTime * Snake.ENERGY_SPEND_PER_SECOND;
				this.length = Snake.energy2Length(this.energy);
				this.scale = Snake.length2Scale(this.length);
				this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);

				while(this.points.length > this.length)
				{
					let point = this.points.pop();
					FoodFactory.Create(point.x, point.y, Snake.ENERGY_PER_POINT);
				}
			}else
			{
				this.isAccelerate = false;
			}
		}

		public clamp(value, min, max)
		{
			return value < min ? value += (max-min) : (value > max ? value -= (max-min) : value);
		}

		public turn(deltaTime)
		{
			this.angle = this.clamp(((this.angle + Math.PI) % (Math.PI * 2)), -Math.PI, Math.PI) - Math.PI;
			// console.log("turn angle:" + this.angle);
			this.targetAngle = this.clamp(((this.targetAngle + Math.PI) % (Math.PI * 2)), -Math.PI, Math.PI) - Math.PI;
			// console.log("turn targetAngle:" + this.targetAngle);

			let deltaAngle = deltaTime * this.scaleTurnAngle * this.velocityTurnAngle;
			deltaAngle = Math.min(deltaAngle, Math.abs(this.targetAngle-this.angle));

			// console.log("turn deltaTime:" + deltaTime);
			// console.log("turn velocityTurnAngle:" + this.velocityTurnAngle);
			// console.log("turn scaleTurnAngle:" + this.scaleTurnAngle);
			// console.log("turn deltaAngle:" + deltaAngle);
			
			if(Math.abs(this.angle - this.targetAngle) > Math.PI)
			{
				if(this.targetAngle > this.angle)this.angle -= deltaAngle;
				else this.angle += deltaAngle;
			}else
			{
				if(this.targetAngle > this.angle)this.angle += deltaAngle;
				else this.angle -= deltaAngle;
			}
		}

		public move(deltaTime)
		{
			let distance = this.velocity * deltaTime;
			let deltaPoint = this.scale * Snake.BODY_POINT_DELTA_SCALE;
			let movePoints = distance / deltaPoint;
			
			// console.log("scale:" + this.scale);
			// console.log("move time:" + deltaTime);
			// console.log("move distance:" + distance);
			// console.log("move movePoints:" + movePoints);
			// console.log("this.angle:" + this.angle);

			// console.log("111this.position:x:" + this.position.x + ",y:" + this.position.y);
			
			this.position.x = this.position.x + Math.cos(this.angle) * distance;
			this.position.y = this.position.y + Math.sin(this.angle) * distance;

			// console.log("222this.position:x:" + this.position.x + ",y:" + this.position.y);
			// console.log("this.points.length" + this.points.length);
			// console.log("this.length" + this.length);
			if(this.points.length > this.length)
			{
				this.points.pop();
			}else
			{
				if(this.points.length < this.length)
				{
					let point = ObjectPool.get(SnakePoint);
					point.x = this.position.x;
					point.y = this.position.y;
					this.points.unshift(point);
				}else
				{
					for(var i = this.points.length-1; i > 0; i--)
					{
						var p = this.points[i];
						var q = this.points[i-1];
						p.x = p.x + (q.x - p.x) * movePoints;
						p.y = p.y + (q.y - p.y) * movePoints;
					}
					
					this.points[0].x = this.position.x;
					this.points[0].y = this.position.y;
				}
			}
			
		}

		public updateBoundingBox()
		{
			let minX :number;
			let minY :number;
			let maxX :number;
			let maxY :number;
			let point : SnakePoint;
			let radius : number = this.scale;

			for(var i = 0; i <= this.points.length; i++)
			{
				point = this.points[i];
				minX = isNaN(minX) ? point.x : Math.min(minX, point.x);
				minY = isNaN(minY) ? point.y : Math.min(minY, point.y);
				maxX = isNaN(maxX) ? point.x : Math.max(minX, point.x);
				maxY = isNaN(maxY) ? point.y : Math.max(minY, point.y);
			}

			this.boundingBox.setTo(minX-radius, minY-radius, maxX-minX, maxY-minY);
		}

		public render()
		{
			let isVisible = Camera.isInViewPort(this.boundingBox);
			console.log("isVisible:" + isVisible);

			if(Camera.isInViewPort(this.boundingBox))
			{
				if(this.renderer)
				{
					if(!this.renderer.parent) Context.snakeLayer.addChild(this.renderer);
					
					this.renderer.render();
				}
			}else
			{
				if(this.renderer.parent) Context.snakeLayer.removeChild(this.renderer);
			}
			
		}

	}
}