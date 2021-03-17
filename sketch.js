var PLAY = 1;
var END = 0;
var gameState = PLAY;

var level10 ,Level1 ;
var level20, Level2;

var level30 , Level3;
var finale , Final12;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6 , obstacleP ;

var obstaclep;

var score=0;

//var scoreCard1 , scoreCard ;

var gameOver, restart;

var soundlevelup , sound ;

var setting , set;

var invisblechhat ;
function preload() {
 
  
   Final12 = loadImage("Final level.png");
// trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("collide run 1.jpg");
  
 //  trex_running =   loadAnimation("video running.mp4");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  obstacleP = loadImage("dino 2nd in trex.png");
  
 Level1 = loadImage("LEVEL.png");
 Level2 = loadImage("Level2.jpg");
 Level3 = loadImage("level3.jpg");

  
  sound = loadSound("mixkit-arcade-retro-changing-tab-206.wav");
  
  soundlevelup = loadSound("mixkit-player-boost-recharging-2040.wav");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  set = loadImage("setting icon gear.png");
  
 // scoreCard =loadImage("199-1994383_transparent-basketball-scoreboard-png-png-download.png");
   
   trex_running = loadAnimation("run3.jpg" , "run4.jpg" , "run3.jpg" , "run4.jpg" , "run3.jpg" , "run4.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  score = 0;
  
  trex = createSprite(50,height-210,2,5);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.15;
  
  ground = createSprite(200,height-210,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(80 ,height-330);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(75,height-300);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.4;
  restart.scale = 0.5;

  level10 = createSprite(75,height-400,30,3);
  level10.addImage(Level1);  
  level10.scale = 0.150;
  level10.visible = true;
  
  level20 = createSprite(75,height-400,30,3);
  level20.addImage(Level2);
  level20.scale = 0.240;
  level20.visible = false;
  
  level30 = createSprite(75,height-400,30,3);
  level30.addImage(Level3);
  level30.scale = 0.250;
  level30.visible = false;
  
  finale = createSprite (75,height-400,30,3);
  finale.addImage(Final12);
  finale.scale = 0.150;
  finale.visible = false;
  
  gameOver.visible = false;
  restart.visible = false;
  
  invisblechhat = createSprite(width/2,height-420,width,10);
  invisblechhat.visible = false;
  
  invisibleGround = createSprite(width/2,height-200,width,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  setting = createSprite(30,50);
  setting.addImage(set);
  setting.scale = 0.2;
  setting.visible = false;

// obstaclep.addImage( obstacleP);
 //obstacleP.scale = 0.1;
  
 
  
//   trex.setCollider("circle", trex.Xoffset, trex.Yoffset ,radius);
  trex.setCollider("circle" ,0,0,restart.height+150 );
//  trex.debug = true;
}

function draw() {
  
  background(255);
  fill(15);
textSize(20);
textFont('fontItalic');
  text("Score: "+ score, 60,60 );
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if((touches.length > 0||keyDown("UP_ARROW")) && trex.y >= 189) {
      trex.velocityY = -12;
      touches =[];
    }
  setting.visible = false;
    
    
    
     if ( score === 0){
      level10.visible = true;
      level20.visible = false;
      finale.visible = false;
      level30.visible = false;
     }
   if ( score === 200){
      level20.visible = true;
      level10.visible = false;
      level10.visible = false;
     soundlevelup.play();
     }
     if ( score === 400){
      level30.visible = true;
       soundlevelup.play();
     }
     if ( score === 550){
      finale.visible = true;
      level20.visible = false;
      level30.visible = false;
      level10.visible = false;
       soundlevelup.play();
     }
    
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    
     trex.collide( invisblechhat);
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
      sound.play();
    }
  }

  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    setting.visible = true;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
     trex.depth = restart.depth;
    restart.depth = restart.depth +1;
    
    if(touches.length > 0||mousePressedOver(restart)) {
      reset();
      touches = [];
    }
     if(touches.length > 0||mousePressedOver(setting)) {
       
       textSize(12);
      text ("Level 1 = 0-200 points",30,height-70);
      text ("Level 2 = 200-400 points",30,height-58);
      text ("Level 3 = 400-550 points",30,height-46);
      text ("Finale  = 550-1000 points",30,height-34);
      touches = [];
    }
    
  }
  
  if (trex.isTouching(level10)){
     trex.depth = level10.depth;
    level10.depth = level10.depth +1;
  }
  
  drawSprites();
   
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width,height-190,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 280;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    trex.depth = ground.depth;
    ground.depth = ground.depth +1;
    
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width,height-230,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
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
  //   case 7: obstacle.addImage(obstacleP);
      //        break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 390;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 level10.visible = true;
  
  score = 0;
  
}

