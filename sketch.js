/* 
IDEAS:
have a monster on the right side - DONE
have some unstatic blocks stacked up so the player can push them - DONE
	they will act as a wall for the player - DONE
allow the player to move using key arrows (setPosition or force functions) - DONE
using a constraint, allow the player to throw rocks at the monstor to kill it - DONE
give the monster a lifetime of 5 so the play has to shoot the monster 5 times
  calculate monster life by using an isTouching function and reducing the number by 1 each time - DONE
give a time limit by using frame count, instead decrease number of shots from the space pressed function

make the boy an image? - DONE
*/

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var ground;
var monster;
var player;
var b1, b2, b3, b4, b5, b6, b7;
var rock;
var slingshot;
var greenb;
var monsterLife;
var numTries;
var gameState;
var bg = "sunny.png.jpg";
var backgroundImg;

function preload(){
	getBackgroundImg();
	player = loadImage("player.png");
}

function setup() {
	createCanvas(1700, 600);

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	ground = new Ground(850, 575, 1700, 50);
	World.add(world, ground);

	monster = new Monster(1530, 350, 300, 400);
	World.add(world, monster);

	//player = new Player(200, 500, 100, 120);
	//World.add(world, player);

	//make the bricks
	b1 = new Bricks(900, 525, 150, 50);
	World.add(world, b1);
	b2 = new Bricks(900, 500, 150, 50);
	World.add(world, b2);
	b3 = new Bricks(900, 425, 150, 50);
	World.add(world, b3);
	b4 = new Bricks(900, 400, 150, 50);
	World.add(world, b4);
	b5 = new Bricks(900, 325, 150, 50);
	World.add(world, b5);
	b6 = new Bricks(900, 300, 150, 50);
	World.add(world, b6);
	b7 = new Bricks(900, 225, 150, 50);
	World.add(world, b7);
	b8 = new Bricks(900, 200, 150, 50);
	World.add(world, b7);
	b9 = new Bricks(900, 125, 150, 50);
	World.add(world, b7);
	b10 = new Bricks(900, 100, 150, 50);
	World.add(world, b7);

	rock = new Rock(210, 565, 6);
	World.add(world, rock);

	slingshot = new Slingshot(rock.body, {x:305, y: 460});
	World.add(world, slingshot);

	monsterLife = 50;
	numTries = 20;
	gameState = "start";

	Engine.run(engine);
  
}


function draw() {
	if(backgroundImg)
		background(backgroundImg);

  Engine.update(engine);
  imageMode(CENTER);
  image(player, 250, 450, 120, 250);

  fill(255);
  textSize(50);
  text("Monster Life: "+monsterLife, 1300, 70);
  text("Number of Rocks Left: "+numTries, 50, 70);

  if(gameState == "start"){
	textSize(20);
	text("The monster has a life of 50 hearts. Every time the rock hits the monster, his life will go down", 5, 170);
	text("Drag and Release your mouse to make the rock Launch.", 5, 190);
	text("You only have 20 rocks to beat the monster", 5, 210);
	text("Launch the rock to destroy the wall the monster has made.", 5, 230);
	text("Good Luck!", 5, 250);

  }

  if(numTries <= 0){
	text("Uh oh! You ran out of rocks!", 5, 200);
	text("Press r to restart", 5, 240);
  }

  if(monsterLife <= 0){
	text("Yay! You Defeated the monster!", 5, 200);
	text("Press r to play again", 5, 240);
  }

  if(keyCode == 114 && monsterLife <= 0 || keyCode == 114 && numTries <=0){
	numTries = 20;
	monsterLife = 50;

	/*
	Matter.Body.setPosition(b1.body, {x:b1.body.position.x, y:b1.body.position.y});
	Matter.Body.setPosition(b2.body, {x:b2.body.position.x, y:b2.body.position.y});
	Matter.Body.setPosition(b3.body, {x:b3.body.position.x, y:b3.body.position.y});
	Matter.Body.setPosition(b4.body, {x:b4.body.position.x, y:b4.body.position.y});
	Matter.Body.setPosition(b5.body, {x:b5.body.position.x, y:b5.body.position.y});
	Matter.Body.setPosition(b6.body, {x:b6.body.position.x, y:b6.body.position.y});
	Matter.Body.setPosition(b7.body, {x:900, y:225});
	Matter.Body.setPosition(b8.body, {x:900, y:200});
	Matter.Body.setPosition(b9.body, {x:900, y:125});
	Matter.Body.setPosition(b10.body, {x:900, y:100});
*/
	gameState = "start";
  }

  //display everything here
  ground.display();
  monster.display();
  //player.display();  
  rock.display();
  slingshot.display();
  
  //display the bricks
  b1.display();
  b2.display();
  b3.display();
  b4.display();
  b5.display();
  b6.display();
  b7.display();
  b8.display();
  b9.display();
  b10.display();

  detectcollision(rock, monster);
}

function keyPressed(){
	if(keyCode === 32 && gameState == "fly"){
		slingshot.attach(rock.body);
		numTries = numTries-1;
		gameState = "reset";
	  }

}

function mouseDragged(){
	if(gameState == "start" || gameState == "reset"){
    	Matter.Body.setPosition(rock.body, {x: mouseX , y: mouseY});
	}
}

function mouseReleased(){
    slingshot.fly();
	gameState = "fly";
}

function detectcollision(lrock, lmonster){

	rockBodyPosition = lrock.body.position
	monsterBodyPosition = lmonster.body.position
  
	var distance = dist(rockBodyPosition.x, rockBodyPosition.y, monsterBodyPosition.x, monsterBodyPosition.y);
	if(distance<=lrock.r+lmonster.width){
	  monsterLife = monsterLife-1;
	  Matter.Body.setPosition(rock.body, {x: rock.body.position.x-10, y:rock.body.position.y});
	}
  
  }

  async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/america/edmonton");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    console.log(hour);
    
    if(hour>=06 && hour<=17){
        bg = "sunny.png.jpg";
    }
    else{
        bg = "dark.png.jpg";
    }

    backgroundImg = loadImage(bg);
}