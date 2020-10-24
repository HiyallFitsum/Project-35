//Create variables here
var dog, happyDog, database, foodStock;

var foodS = 5;

var database = firebase.database();

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  dog = createSprite(250,250,25,25);
  dog.addImage(dogImage);
  //dog.addImage(happyDogImage);
  dog.scale = 0.25;

  
}


function draw() {  
  background(46,139,87);

  //foodS = 5;

  if(foodS > 0 && keyWentDown(UP_ARROW)){
    //foodS = 5;
    writeStock(foodS);
    dog.addImage(happyDogImage);
    textSize(25);
    fill("white");
    text("BARK!!", 120, 100);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
  }


  drawSprites();

  //add styles here
  fill("black");
  textSize(15);
  text("FoodStock:" + foodS, 25, 25);
  text("Press the up arrow key to feed the dog milk!", 200, 25);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }

  database.ref("/").update({
    Food:x
  })
}

