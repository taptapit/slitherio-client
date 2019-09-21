module game.ai {
	export class SnakeAICenter {

		public constructor() {
		}

		public static update()
		{	
			let nodes = WorldNodeManager.getInstance().nodes;
			for(let key in nodes)
			{
				let node:WorldNode = nodes[key];
				for(let key in node.snakes)
				{
					let snake = node.snakes[key];
					if(snake.ai)
					{
						snake.ai.tick += Time.deltaTime;
						if(snake.ai.moveable)
						{
							for(let i = 0; i <= 9; i++)
							{
								let nearbyNode = WorldNodeManager.getInstance().get(node.column-1 + i%3, node.row-1 + Math.floor(i/3));
 								if(nearbyNode)
								{
									for(let index in nearbyNode.foods)
									{
										let food = nearbyNode.foods[index];
										if(!snake.dead && !food.eaten)
										{
											snake.ai.eat(food);
											break;
										}
									}
									for(let index in nearbyNode.snakesPoints)
									{
										let point = nearbyNode.snakesPoints[index];
										if(snake.id == point.id)continue;

										if(!snake.dead)
										{
											let otherSnake : Snake = GameObjectManager.getInstance().get(point.id);
											if(otherSnake && !otherSnake.dead)
											{
												snake.ai.dodgeSnake(point);
												break
											}
										}
									}
									for(let index in nearbyNode.snakes)
									{
										let otherSnake = nearbyNode.snakes[index];
										if(snake.id != otherSnake.id && !snake.dead && !otherSnake.dead)
										{
											snake.ai.kill(otherSnake);
											break;
										}
									}
								}
							}
							snake.ai.dodgeWall();
						}
					}
				}
			}
		}

	}
}