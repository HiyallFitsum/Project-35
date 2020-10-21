//Create variables here
var dog, happyDog, database, foodS, foodStock;

var foodS = 5;

var database = firebase.database();

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  var dog = createSprite(250,250,25,25);
  dog.addImage("Dog", dogImage);
  //dog.addImage("Happy-Dog", happyDogImage);
  dog.scale = 0.25;

  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    //dog.addImage("Happy-Dog", happyDogImage);
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
    x=x-1;
  }

  database.ref("/").update({
    Food:x
  })
}

