
var monkey, monkey_running;
var banana, bananaImage;
var obstacle, obstacleImage, obstacleGroup;
var FoodGroup;
var score;
var survivalTime = 0;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload() {


    monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");

}



function setup() {

    //creating monkey
    monkey = createSprite(80, 315, 20, 20);
    monkey.addAnimation("moving", monkey_running);
    monkey.scale = 0.1;

    ground = createSprite(400, 350, 900, 10);
    ground.velocityX = -4;
    ground.x = ground.width / 2;
    console.log(ground.x);

    obstaclesGroup = new Group();
    foodsGroup = new Group();

    monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
    monkey.debug = true;

    score = 0;
}


function draw() {
    background("white");
    stroke("white");
    textSize(20);
    fill("white");
    text("Score:" + score, 500, 50);

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount / frameRate());
    text("survival Time:" + survivalTime, 100, 50);

    if (gameState === PLAY) {

        ground.velocityX = -(4 + 3 * score / 100)
        //scoring
        score = score + Math.round(getFrameRate() / 60);

        if(foodsGroup.isTouching(monkey)){
           foodsGroup.destroyEach();
}
        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }



        if (keyDown("space")) {
            monkey.velocityY = -10;
        }

        monkey.velocityY = monkey.velocityY + 1;

        //add gravity
        monkey.velocityY = monkey.velocityY + 0.8;


        //spawn obstacle on ground
        spawnObstacles();
      
        spawnBanana();

        if (obstaclesGroup.isTouching(monkey)) {
            gameState = END;
          
          if(obstaclesGroup.isTouching(monkey)){
            monkey.scale=0.2;
            
            switch(score){
                case 10: monkey.scale=0.12;
                break;
                case 20: monkey.scale=0.14;
                break;
                case 30: monkey.scale=0.16;
                break;
                case 40: monkey.scale=0.18;
                break;
                default:break;   
            }
          }

        }
    }

    if (gameState === END) {

        foodsGroup.destroyEach();

        ground.velocityX = 0;
        ground.velocityY = 0;

        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
    }

    monkey.collide(ground);


    drawSprites();

}

function spawnObstacles() {
    if (frameCount % 60 === 0) {
        var obstacle = createSprite(600, 320, 10, 40);
        obstacle.velocityX = -(6 + score / 100);
        obstacle.addImage(obstacleImage);

        //assign scale and lifetime to the obstacle           
        obstacle.scale = 0.1;
        obstacle.lifetime = 300;
        
        //add each obstacle to the group
        obstaclesGroup.add(obstacle);


        obstacle.setCollider("rectangle", 0, 0, 380, 380);
    }
}

function spawnBanana() {

    if (frameCount % 140 === 0) {

        banana = createSprite(570, 350, 40, 10);
        banana.addImage(bananaImage);
        banana.y = Math.round(random(70, 230));
        banana.scale = 0.1;

        banana.velocityX = -7;
        banana.lifetime = 200;

        foodsGroup.add(banana)
    }
}

