var play = 1
var end = 0
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, ground
var FoodGroup, obstacleGroup
var score
var gamestate = play
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600, 400);
  
  monkey = createSprite(50, 320, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(100, 350, 600, 10);
  ground.velocityX = -2 
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
 background(100);
  
   text("Score: "+ score, 500,50);
  
 if(gamestate === play){ 
   
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
 ground.x = ground.width /2;
   
 if(keyDown("space") && monkey.y >= 300){
   monkey.velocityY = -12;
 }
   monkey.velocityY = monkey.velocityY + 0.5
   monkey.collide(ground);
  
  spawnObstacles();
  spawnBanana();
 } 
  
     if(monkey.isTouching(obstacleGroup)){
        gameState = end;
     }
 if(gamestate === end){
   
   ground.velocityX = 0;
   obstacleGroup.setVelocityXEach(0);
   foodGroup.setVelocityXEach(0);
 } 
  
  
  drawSprites();
  
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400,350,10,40);
   obstacle.velocityX = -4;
   obstacle.addImage(obstacleImage);
   
   obstacle.scale = 0.1;
   obstacle.lifetime = 300;
   
   obstacleGroup.add(obstacle);
 }
}

function spawnBanana(){
  if(frameCount % 80 === 0){
    var banana = createSprite(200, 100, 10, 10);
    banana.y = Math.round(random(110,200));
    banana.velocityX = -4;
    banana.addImage(bananaImage);
    
    banana.scale = 0.1;
    banana.lifetime = 300;
    
    FoodGroup.add(banana);
  }
}