const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground;
var rope,rope2,rope3;
var fruit, fruitimg;
var conection,conection2,conection3;
var bgimg;
var bunnyimg;
var bunny;
var cut,cut2,cut3, ballon, mute;
var sad_anim;
var eat_anim;
var blink_anim;
var next;
var rope_cut, cut_through, eating_sound, bg_sound, blow_sound, sad;
var canW, canH;

let engine;
let world;

function preload() {
  rope_cut = loadSound("rope_cut.mp3")
  sad = loadSound("sad.wav")
  blow_sound = loadSound("air.wav")
  eating_sound = loadSound("eating_sound.mp3")
  bg_sound = loadSound("sound1.mp3")
  fruitimg = loadImage("melon.png")
  bgimg = loadImage("background.png")
  bunnyimg = loadImage("Rabbit-01.png")
  sad_anim = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")
  eat_anim = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png", "blink_1.png")
  blink_anim = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  eat_anim.looping = false
  sad_anim.looping = false
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    canW = displayWidth
    canH = displayHeight
  }
  else{
    canW = windowWidth
    canH = windowHeight
  }
  createCanvas(canW, canH);
  engine = Engine.create();
  world = engine.world;

  rectMode(CENTER);
  imageMode(CENTER);
  textSize(50)

  bg_sound.play()
  bg_sound.setVolume(0.2)

  ground = new Ground(canW/2, 600, canW, 10)
  rope = new Rope(7, { x: 85, y: 50 })
  rope2 = new Rope(7, { x: 255, y: 65 })
  rope3 = new Rope(7, { x: 435, y: 90 })
  fruit = Bodies.circle(250, 300, 10)
  World.add(world, fruit)
  Matter.Composite.add(rope.body, fruit)

  bunny = createSprite(250, 540, 60, 60)
  bunny.scale = 0.2
  bunny.addAnimation('blink', blink_anim)
  bunny.addAnimation('eat', eat_anim)
  bunny.addAnimation('sad', sad_anim)
  bunny.changeAnimation('blink')

  cut = createImg("cut_btn.png")
  cut.position(70, 34)
  cut.size(40, 40)
  cut.mouseClicked(drop)

  cut2 = createImg("cut_btn.png")
  cut2.position(240, 49)
  cut2.size(40, 40)
  cut2.mouseClicked(drop2)

  cut3 = createImg("cut_btn.png")
  cut3.position(420, 74)
  cut3.size(40, 40)
  cut3.mouseClicked(drop3)

  ballon = createImg("balloon.png")
  ballon.position(10,300)
  ballon.size(150,150)
  ballon.mouseClicked(blow)

  mute = createImg("mute.png")
  mute.position(450,50)
  mute.size(40,40)
  mute.mouseClicked(mute_vol)

  next = createImg('next.png')
  next.position(200, 220)
  next.size(0, 0)
  next = false

  conection = new Link(rope, fruit)
  conection2 = new Link(rope2, fruit)
  conection3 = new Link(rope3, fruit)
}

function draw() {
  background(51);
  image(bgimg,width/2,height/2,canW,canH)
  Engine.update(engine);
  ground.display()
  rope.show()
  rope2.show()
  rope3.show()
  if (fruit != null) {
    image(fruitimg, fruit.position.x, fruit.position.y, 70, 70)
  }

  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation('eat')
  }

  if (collide(fruit, ground.body) == true) {
    bunny.changeAnimation('sad')
    sad.play()
  }

  drawSprites()
}

function drop() {
  rope.break()
  conection.detach()
  rope_cut.play()

}
function drop2() {
  rope2.break()
  conection2.detach()
  rope_cut.play()

}
function drop3() {
  rope3.break()
  conection3.detach()
  rope_cut.play()

}

function blow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  blow_sound.play()
}

function mute_vol(){
  if(bg_sound.isPlaying()){
    bg_sound.stop()
  }
  else{
    bg_sound.play()
  }
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)

    if (d <= 80) {
      World.remove(engine.world, fruit)
      fruit = null
      eating_sound.play()
      return true
    }

    else {
      return false
    }
  }
}



