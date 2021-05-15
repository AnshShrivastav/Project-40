var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound,backgroundImg;
var object1;

function preload(){
  trex_running = loadImage("character1.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  backgroundImg=loadImage("background1.png");
  backgroundImg.scale=0.05;
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  //jumpSound = loadSound("jump.mp3")
 // dieSound = loadSound("die.mp3")
  //checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(displayWidth-100,displayHeight-100);

  var message = "This is a message";
 console.log(message)
  
  trex = createSprite(50,160,200,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  

  trex.scale = 0.4;
  
  ground = createSprite(200,180,displayWidth+500,displayHeight);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);

  object1=createSprite(20,20,20,20);
  object1.visible=false;
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(180,205,4000,50);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = false;
  
  score = 0;
 
  
}

function draw() {
  
  background(backgroundImg);
  //displaying score
  fill("black")
  text("Score: "+ score, 500,50);



  
  
  if(gameState === PLAY){

    if (keyDown(RIGHT_ARROW)){
      trex.x=trex.x+5;
      score.x+=5;
    }
    if (keyDown(LEFT_ARROW)){
      trex.x=trex.x-5 ; 
    }  

    gameOver.visible = false;
    restart.visible = false;

    //trex.velocityY=5;
    
    //  ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    //trex.velocityY=5;
    
    if(score>0 && score%100 === 0){
       //checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -10;
       // jumpSound.play();
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.5
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    spawnObstacles2();
    spawnObstacles3();
    
    if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
        //jumpSound.play();
        gameState = END;
       // dieSound.play()
      
    }
    //if(trex.x>=4000){
      //gameState=END;
   // }
    camera.position.y = displayWidth/4;
    camera.position.x= trex.x;  
    
  }
   else if (gameState === END) {
      //gameOver.visible = true;
      restart.visible = true;
     
     
     //change the trex animation
      //trex.changeAnimation("collided", trex_collided);
    
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0); 
       if(mousePressedOver(restart)) {
      reset();
    }
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  if(trex.position.x>=2300){
    gameState=END;
    textSize(50);
    text("YOU WON!",2300,200);
  }
  textSize(20);
  text("PRESS RIGHT & LEFT ARROW KEY TO MOVE",120,90);


  drawSprites();
}

function reset(){
   gameState=PLAY;
  trex.changeAnimation("running",trex_running);
   obstaclesGroup.destroyEach()
   cloudsGroup.destroyEach();
  score=0;
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   if(camera.position.x= trex.x )
   {
     var obstacle = createSprite(999,165,99999,40);
    // var obstacle=createSprite(990,150,99,)
     //obstacle.velocityX = (2 + score/100);
   }
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles2(){
  if (frameCount % 60 === 0){
    if(camera.position.x= trex.x )
    {
      var obstacle = createSprite(390,165,9999,40);
     // var obstacle=createSprite(990,150,99,)
      //obstacle.velocityX = (2 + score/100);
    }
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       case 5: obstacle.addImage(obstacle5);
               break;
       case 6: obstacle.addImage(obstacle6);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.5;
     obstacle.lifetime = 500;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }

 function spawnObstacles3(){
  if (frameCount % 60 === 0){
    if(camera.position.x= trex.x )
    {
      var obstacle = createSprite(790,165,9999,40);
     // var obstacle=createSprite(990,150,99,)
      //obstacle.velocityX = (2 + score/100);
    }
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       case 5: obstacle.addImage(obstacle5);
               break;
       case 6: obstacle.addImage(obstacle6);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.5;
     obstacle.lifetime = 500;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }

 
