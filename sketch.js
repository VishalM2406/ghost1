var towerImage,tower;
var doorImg,door,doorsGroup;
var climberImg,climber,climbersGroup;
var ghostImg,ghost;
var invisibleBlock,invisibleBlockGroup
var gameState="play";

function preload(){
 towerImage=loadImage("tower.png");
 doorImg=loadImage("door.png");
 climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png")
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=3;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
}

function draw(){
  background(0);
  
  if(gameState=="play"){
    if (tower.y >400){
   tower.y=300; 
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8
    
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
    
  }
   spawnDoors();
    
  drawSprites();
  }
  
  if (gameState=="end"){
    stroke("yellow");
    fill("yellow");
    textSize(50);
    text("GAME OVER",150,300);


    if (index === player.index){
      cars[index - 1].shapeColor = "red";
      camera.position.x = displayWidth/2;
      camera.position.y = cars[index-1].y
    }
    
  }
  
  
}

function spawnDoors (){
  if(frameCount % 150==0){
    door=createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY=2;
    door.x=Math.round(random(120,400));
    door.lifetime=800;
    doorsGroup.add(door);
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY=2;
    climber.x=door.x;
    climber.lifetime=800;
    climbersGroup.add(climber);
    
     invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.velocityY=2;
    invisibleBlock.x=door.x;
    invisibleBlock.lifetime=800;
  invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug=true;
    
  }
  
}