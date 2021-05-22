var tower,towerImg;
var doors,doorsImg,doorsGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockG;
var sound;
var gameState="play";
function preload(){
  towerImg=loadImage("tower.png");
  doorsImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png","ghost-jumping.png");
 sound=loadSound("spooky.wav");
}
function setup(){
createCanvas(600,600);
sound.loop();
  tower=createSprite(300,300);
tower.addImage("tower",towerImg);
tower.velocityY=1;

ghost=createSprite(200,200,50,50);
ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  climberGroup=new Group();
  doorsGroup=new Group();
invisibleBlockG=new Group();
}






function draw(){
 background("black");
 if(gameState==="play"){
  if(keyDown("left_arrow")){
ghost.x=ghost.x-3;
  }    
    
  
    if(keyDown("right_arrow")){
ghost.x=ghost.x+3;
  }   

  
    if(keyDown("space")){
ghost.velocityY=-5;
  }  
ghost.velocityY=ghost.velocityY+0.1;
    if(tower.y>600){
     tower.y=300;
     }
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }

spawnDoors();
if(invisibleBlockG.isTouching(ghost)||ghost.y>600){
   ghost.destroy();
  gameState="end";
   }
   drawSprites();
  }
if(gameState==="end"){
stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over",230,250);
   }
}

function spawnDoors(){
  if(frameCount%150===0){
     
    
  doors=createSprite(200,-50);
climber=createSprite(200,10);
 invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
doors.addImage("door",doorsImg);   
climber.addImage("climber",climberImg);
    

doors.x=Math.round(random(120,400));    
climber.x=doors.x;
invisibleBlock.x=doors.x;
  
doors.velocityY=2;   
climber.velocityY=doors.velocityY;
invisibleBlock.velocityY=doors.velocityY;

invisibleBlock.lifetime=800;
doors.lifetime=800;
climber.lifetime=800;
invisibleBlock.debug=true;
ghost.depth=doors.depth;
ghost.depth=ghost.depth+1;

doorsGroup.add(doors);
climberGroup.add(climber);
invisibleBlockG.add(invisibleBlock);
  }
 }