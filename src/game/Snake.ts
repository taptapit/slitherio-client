import ObjectPool = game.utils.ObjectPool
import GameObjectManager = game.data.GameObjectManager
import EventCenter = game.event.EventCenter;
import GameEvent = game.event.GameEvent;
import ColorUtils = game.utils.ColorUtils;

module game {

	export class Snake {
		public static BODY_SIZE = 100;
		public static BORN_BODY_LENGTH = 6;
		private static BORN_SCALE = 0.2;
		public static MAX_SCALE = 1;
		private static VELOCITY_TO_TURN_ANGLE = 0.1;
		public static VELOCITY_NORMAL = 200;
		public static VELOCITY_FAST = Snake.VELOCITY_NORMAL * 2;
		public static BODY_POINT_DELTA_SCALE = 50;
		public static ENERGY_PER_POINT = 20;
		public static ENERGY_SPEND_PER_SECOND = Snake.ENERGY_PER_POINT * 5;
		public static ENERGY_LIMIT_FOR_ACCELERATE = Snake.ENERGY_PER_POINT * 5;
		public static FOOD_DETECT_DISTANCE = 50;
		
		public id : number;
		public position : egret.Point;
		public points : game.SnakePoint[];
		public name : string;
		public color : number;
		public velocity : number;
		public scale : number;
		public angle : number;
		public scaleTurnAngle : number;
		public velocityTurnAngle : number;
		public dead : boolean;
		public dyingAlpha : number;
		public energy : number;
		public length : number;
		public targetAngle : number;
		public isAccelerate : boolean;
		public renderer : renderer.SnakeRenderer;
		public ai : ai.SnakeAI;

		private $hasViewStateChanged : boolean;
		public set hasViewStateChanged(value){this.$hasViewStateChanged = value;}
		public get hasViewStateChanged()
		{
			if(this.$hasViewStateChanged == undefined)
			{
				for(let i = 0;i < this.points.length;i++)
				{
					if(this.points[i].hasViewStateChanged) this.$hasViewStateChanged = true;
				}
				if(this.$hasViewStateChanged == undefined) this.$hasViewStateChanged = false;
			}
			return this.$hasViewStateChanged;
		}

		private $isInView : boolean;
		public get isInView()
		{
			if(this.$isInView == undefined)
			{
				for(let i = 0;i < this.points.length;i++)
				{
					if(this.points[i].isInView) this.$isInView = true;
				}
				if(this.$isInView == undefined) this.$isInView = false;
			}
			return this.$isInView;
		}

		public static skinColor(color:number, index:number)
		{
			let startColor = color;
			let endColor = ColorUtils.lerp(startColor, 0xC4C4C4, 0.7);
			let delta = 0x080808;
			let progress = index * delta / Math.abs(endColor-startColor);
			let direction = Math.floor(progress) % 2 == 0;
			progress = progress - Math.floor(progress);

			return direction ? ColorUtils.lerp(startColor, endColor, progress) : ColorUtils.lerp(endColor, startColor, progress);
		}

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

		public radius()
		{
			return Snake.BODY_SIZE * this.scale;
		}

		public constructor() {
		}

		public set(id, name, position, angle, velocity, points, color, energy)
		{
			this.id = id;
			this.name = name;
			this.position = position;
			this.angle = angle;
			this.targetAngle = angle;
			this.velocity = velocity;
			this.velocityTurnAngle = Snake.velocity2TurnAngle(this.velocity);
			this.points = points;
			this.color = color;
			this.energy = energy;
			this.length = Snake.energy2Length(energy);
			this.scale = Snake.length2Scale(this.length);
			this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
			this.dead = false;
		}

		public dispose()
		{
			ObjectPool.release(SnakeAI, this.ai);
			this.ai = null;

			if(this.renderer)
			{
				this.renderer.dispose();
				this.renderer = null;
			}
			GameObjectManager.getInstance().remove(this);
		}

		public hitTest(target:SnakePoint | Food)
		{
			if(target instanceof SnakePoint)
			{
				let point:SnakePoint = target as SnakePoint;
				let otherSnake : Snake = GameObjectManager.getInstance().get(point.id);
				return otherSnake && 
					!otherSnake.dead && 
					Math.pow(this.position.x - point.x, 2) + Math.pow(this.position.y - point.y, 2) < Math.pow(this.radius() + otherSnake.radius(), 2);
			}else if(target instanceof Food)
			{
				let food:Food = target as Food;
				return Math.pow(this.position.x - food.position.x, 2) + Math.pow(this.position.y - food.position.y, 2) < Math.pow(this.radius() + food.radius() + Snake.FOOD_DETECT_DISTANCE, 2);
			}else
			{
				console.error("snake hitTest on unkown type target" + target);
			}
		}

		public die()
		{
			this.dead = true;
			this.dispose();
			
			while(this.points.length > 0)
			{
				let point = this.points.pop();
				ObjectPool.release(SnakePoint, point);
				EventCenter.dispatch(GameEvent.CREATE_FOOD, point.x, point.y, Snake.ENERGY_PER_POINT * 0.5, point.color);
			}
		}

		public eat(food:Food)
		{
			food.eatBy(this);

			this.energy += food.energy;
			this.length = Snake.energy2Length(this.energy);
			this.scale = Snake.length2Scale(this.length);
			this.scaleTurnAngle = Snake.scale2TurnAngle(this.scale);
		}

		public update()
		{
			this.$isInView = undefined;

			let deltaTime = Time.deltaTime;
			
			this.updateDying(deltaTime);
			this.updateEnergy(deltaTime);
			this.turn(deltaTime);
			this.move(deltaTime);
		}

		public updateDying(deltaTime)
		{
			if(this.dead)
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
					ObjectPool.release(SnakePoint, point);
					EventCenter.dispatch(GameEvent.CREATE_FOOD, point.x, point.y, Snake.ENERGY_PER_POINT * 0.5, point.color);
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
			this.targetAngle = this.clamp(((this.targetAngle + Math.PI) % (Math.PI * 2)), -Math.PI, Math.PI) - Math.PI;

			let deltaAngle = deltaTime * this.scaleTurnAngle * this.velocityTurnAngle;
			deltaAngle = Math.min(deltaAngle, Math.abs(this.targetAngle-this.angle));
			
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
			let moveRatio = Math.min(1, distance / deltaPoint);
			
			this.position.x = this.position.x + MathUtils.cos(this.angle) * distance;
			this.position.y = this.position.y + MathUtils.sin(this.angle) * distance;

			if(this.points.length > this.length)
			{
				ObjectPool.release(SnakePoint, this.points.pop());
			}else
			{
				if(this.points.length < this.length)
				{
					let point : SnakePoint = ObjectPool.get(SnakePoint);
					let tailPoint = this.points[this.points.length-1];
					point.id = this.id;
					point.x = tailPoint ? tailPoint.x : 0;
					point.y = tailPoint ? tailPoint.y : 0;
					point.index = this.points.length;
					point.color = Snake.skinColor(this.color, this.points.length);
					this.points.push(point);
				}

				for(var i = this.points.length-1; i > 0; i--)
				{
					var p = this.points[i];
					var q = this.points[i-1];
					p.x = p.x + (q.x - p.x) * moveRatio;
					p.y = p.y + (q.y - p.y) * moveRatio;
				}
				
				this.points[0].x = this.position.x;
				this.points[0].y = this.position.y;
			}
		}

		public render()
		{
			if(this.isInView)
			{
				if(!this.renderer)
				{
					this.renderer = ObjectPool.get(SnakeRenderer);
					this.renderer.set(this);
				}
				this.renderer.render();
			}else
			{
				if(this.renderer)
				{
					this.renderer.dispose();
					this.renderer = null;
				}
			}
		}

	}
}