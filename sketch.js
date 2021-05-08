var rocket, rocketImg, space, spaceImg;
var asteroid,asteroidImg, asteroidGrp;
var star, starImg, starGrp, starVal=0;
var fuel,fuelImg, fuelGrp, fuelVal=5000;
var gameOver, gamveOverImg;
var reset,resetImg;
var PLAY=1,END=0,gameState=PLAY;

function preload(){
  rocketImg = loadImage("rocket.png");
  spaceImg = loadImage("space.png");
  asteroidImg = loadImage("a2.png");
  starImg = loadImage("star.png");
  fuelImg = loadImage("fuel.png");
  gameOverImg = loadImage("gameover.png");
  resetImg = loadImage("reset.png");
}

function setup() {
  createCanvas(600,600);
  
  space = createSprite(300,300);
  space.addImage(spaceImg);
  space.velocityY = 2+(starVal/100);
  
  rocket = createSprite(300,200);
  rocket.addImage(rocketImg);
  rocket.scale = 0.15;
  //rocket.debug = true;
  rocket.setCollider("rectangle", 0,-100,300,700);
  
  gameOver = createSprite(300,200);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  reset = createSprite(300,400);
  reset.addImage(resetImg);
  reset.scale = 0.2;
  reset.visible = false;
  
  asteroidGrp = new Group();
  starGrp = new Group();
  fuelGrp = new Group();
}

function draw() {
  background("orange");
  
  if(gameState===PLAY){
    
    //getting all the functions
    makeAsteroid();
    makeStar();
    makeFuel();
    
    //to reset the background
    if(space.y > 400){
      space.y = 300;
    }
    
    //gravity
    rocket.velocityY = rocket.velocityY + 0.6;
    
    //controls of rocket
    if(keyDown("LEFT_ARROW") || keyDown("a")){
      rocket.x = rocket.x - 5;
    }
    if(keyDown("RIGHT_ARROW") || keyDown("d")){
      rocket.x = rocket.x + 5;
    }
    if(keyDown("space") || keyDown("UP_ARROW") || keyDown("w")){
      rocket.velocityY = -5;
      fuelVal = fuelVal - 10;
    }
    
    //benefit of star
    if(rocket.isTouching(starGrp)){
      starVal = starVal + 1;
      fuelVal = fuelVal + 100;
      starGrp.destroyEach();
    }
    
    //benefit of fuel
    if(rocket.isTouching(fuelGrp)){
      fuelVal = fuelVal + 1000;
      fuelGrp.destroyEach();
    }
    
    //when does the game end?
    if(rocket.isTouching(asteroidGrp) || fuelVal===0 || rocket.y>=600){
      gameState = END;
    }
  }
  
  else if(gameState===END){
     asteroidGrp.destroyEach();
      rocket.visible = false;
      space.visible = false;
      starGrp.destroyEach();
      fuelGrp.destroyEach();
      gameOver.visible = true;
      reset.visible = true;
    if(mousePressedOver(reset)){
      BackToStart();
    }
  }
  
  drawSprites();
  textSize(15);
  fill("orange");
  text("Stars : "+starVal , 10,15);
  text("Fuel :"+fuelVal ,10,35);
}

function makeAsteroid(){
  if(frameCount % 200 === 0){
    var r = Math.round(random(50,550));
    asteroid = createSprite(300,-20);
    asteroid.x=r;
    asteroid.velocityY =2+(starVal/100);
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.2;
    asteroid.lifetime = 320;
    asteroidGrp.add(asteroid);
  }
}

function makeStar(){
  if(frameCount % 300 === 0){
    var ra = Math.round(random(50,550));
    star = createSprite(300,-20);
    star.x = ra;
    star.velocityY = 2+(starVal/100);
    star.addImage(starImg);
    star.scale = 0.09;
    star.lifetime = 320;
    starGrp.add(star);
  }
}

function makeFuel(){
  if(frameCount % 450 === 0){
    var rand = Math.round(random(50,550));
    fuel = createSprite(300,-20);
    fuel.x=rand;
    fuel.velocityY = 2+(starVal/100);
    fuel.addImage(fuelImg);
    fuel.scale = 0.08;
    fuel.lifetime = 320;
    fuelGrp.add(fuel);
  }
}

function BackToStart(){
  gameState=PLAY;
  starVal = 0;
  fuelVal = 5000;
  rocket.visible = true;
  rocket.x = 300;
  rocket.y = 200;
  gameOver.visible = false;
  reset.visible = false;
  space.visible = true;
  space.velocityY = 2+(starVal/100);
}