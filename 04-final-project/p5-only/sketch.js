let Button;
let myPlayer;
let life = 5;

let bulletLevel = 1;
let bulletSpeed = 10;
let bulletSize = 10;
let playerBullets = [];
let enemyBullets = [];
let playerAngle;
let playerInvul = 0;
let invulCD = 0;

let enemies = [];
let pickups =[];
let r;

let gameState = 0;
let timer = 0;
let count = 0;
let counts=[];
let frequency = 20;
//framerate = 60
function setup() {
  createCanvas(600, 690);
  textSize(32);
  myPlayer = new Player();
  rectMode(CENTER);
  /*
  button = Button("START");
  button.mousePressed(start);
  button.position(width/2, height/2);
  button.addClass('big-btn');*/
}

function draw() {
  if (gameState == 0){
    background("#060145");
    fill("#FFFFFF");
    text("SPACE TO START", 170, 450);
  }
  if (gameState == 1){
    background(0);
    //time based spawn
    switch (timer){
      case 120:
        enemies.push(new Enemy(width/2, 1, 50, 1, 1, 0.5));
        counts.push(0);
        break;
      case 180:
        enemies.push(new Enemy(width/2, 1, 50, 1, 1, 0.5));
        counts.push(0);
        break;
      case 240:
        enemies.push(new Enemy(width/2, 1, 50, 1, 1, 0.5));
        counts.push(0);
        break;
      case 300:
        enemies.push(new Enemy(width/2, 1, 50, 1, 1, 0.5));
        counts.push(0);
        break;
      case 360:
        enemies.push(new Enemy(width/2, 1, 50, 1, 1, 0.5));
        counts.push(0);
        break;
      case 1200:
        enemies.push(new Enemy(1, 100, 50, 1, 1, -0.5));
        counts.push(0);
        enemies.push(new Enemy(width-1, 100, 50, 1, -1, -0.5));
        counts.push(0);
        break;
      case 1260:
        enemies.push(new Enemy(1, 50, 50, 2, 0.5, 0)); //type 2
        counts.push(0);
        break;
      case 2760:
        enemies.push(new Enemy(3*width/4, 1, 50, 1, -1, 0.5));
        counts.push(0);
        break;
      case 2820:
        enemies.push(new Enemy(3*width/4, 1, 50, 1, -1, 0.5));
        counts.push(0);
        break;
      case 2880:
        enemies.push(new Enemy(3*width/4, 1, 50, 1, -1, 0.5));
        counts.push(0);
        break;
      case 2940:
        enemies.push(new Enemy(3*width/4, 1, 50, 1, -1, 0.5));
        counts.push(0);
        break;
      case 3000:
        enemies.push(new Enemy(3*width/4, 1, 50, 1, -1, 0.5));
        counts.push(0);
        break;
      case 3600:
        enemies.push(new Enemy(1, 50, 50, 2, 0.5, 0)); //type 2
        counts.push(0);
        enemies.push(new Enemy(width-1, 50, 50, 2, -0.5, 0)); //type 2
        counts.push(0);
        break;
      default:
        break;
    }
    //hp display
    fill("#00F0FF");
    text("Lives:", 0, 50);
    text(life, 90, 50);
    myPlayer.show();
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].show();
      enemies[i].move();
      enemies[i].checkCollision(playerBullets);
      switch (enemies[i].type){
        case 1:
          if (fract(counts[i]/50) == 0) {
            playerAngle = myPlayer.pos.sub(enemies[i].pos);
            enemyBullets.push(new EnemyBullet(enemies[i].pos.x, enemies[i].pos.y, playerAngle.heading(), 10, 1));
          }
          if (enemies[i].hp <= 0) {
            r = random(1, 100);
            if (r <= 20){
              pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 1));
            }
            enemies.splice(i, 1);
            counts.splice(i, 1);
          }
          break;
        case 2:
          if (fract(counts[i]/80) == 0) {
            for(a = 0; a <= 3.14; a+=0.523) {
              enemyBullets.push(new EnemyBullet(enemies[i].pos.x, enemies[i].pos.y, a, 20, 2));
            }
          }
          if (enemies[i].hp <= 0) {
            bulletSpeed +=5;
            bulletSize += 5;
            frequency -= 3;
            enemies.splice(i, 1);
            counts.splice(i, 1);
          }
          break;
        default:
          break;
      }
    }
    for (let i = 0; i < pickups.length; i++) {
      pickups[i].show();
      pickups[i].move();
    }
    myPlayer.checkCollision(enemyBullets);
    myPlayer.enemyCollision(enemies);
    myPlayer.checkPickup(pickups);
    if (invulCD == 180) {
      playerInvul = 0;
      invulCD = 0;
    } else if (playerInvul == 1){
      invulCD++;
    }
    if (fract(timer/frequency) == 0) {
      playerBullets.push(new PlayerBullet());
    }

    
    for (let i = 0; i < playerBullets.length; i++) {
      playerBullets[i].show();
      playerBullets[i].move();
    }
    for (let i = 0; i < enemyBullets.length; i++) {
      enemyBullets[i].show();
      enemyBullets[i].move();
    }
    for (let i = 0; i < playerBullets.length; i++) {
      if (playerBullets[i].y <= -10) {
        playerBullets.splice(i, 1);
      }
    }
    for (let i = 0; i < enemyBullets.length; i++) {
      if (enemyBullets[i].pos.x > width+10 || enemyBullets[i].pos.x < -10 || enemyBullets[i].pos.y > height) {
        enemyBullets.splice(i, 1);
      }
    }
    for (let i = 0; i < pickups.length; i++) {
      pickups[i].move();
    }
    for (let i = 0; i < pickups.length; i++) {
      if (pickups[i].pos.y >= height) {
        pickups.splice(i, 1);
      }
    }
    for (let i = 0; i < counts.length; i++) {
      counts[i]++;
    }
    timer++;
    if(life <= 0){
      gameState = 3;
      enemies.length = 0;
      counts.length = 0;
      playerBullets.length = 0;
      enemyBullets.length = 0;
    }
  }
  if (gameState == 3){
    background("#450142");
    fill("#E20A0A");
    text("GAME OVER", 170, 450);
  }
}

class Player {
  constructor() {
    this.size = 10;
    this.pos = createVector(mouseX, mouseY);
  }
  show() {
    this.pos.set(mouseX, mouseY);
    if(playerInvul == 0) {
      fill("#FFDC00");
      triangle(mouseX-20, mouseY+10, mouseX+20, mouseY+10, mouseX, mouseY-20);
      fill("#2AFF00");
      ellipse(mouseX, mouseY, this.size);
    } else {
      fill("#FFFFFF");
      triangle(mouseX-20, mouseY+10, mouseX+20, mouseY+10, mouseX, mouseY-20);
      fill("#FF8600");
      ellipse(mouseX, mouseY, this.size);
    }
  }
  checkCollision(blts) {
    for (let i = 0; i < blts.length; i++) {
      let blt = blts[i];
      let d = dist(this.pos.x, this.pos.y, blt.pos.x, blt.pos.y);
      if (d < this.size/2 + blt.size/2) {
        if(playerInvul == 0) {
          fill("#FF0000");
          ellipse(this.pos.x, this.pos.y, 20);
          blts.splice(i, 1);
          playerInvul = 1;
          life--;
        }
      }
    }
  }
  enemyCollision(enms) {
    for (let i = 0; i < enms.length; i++) {
      let enm = enms[i];
      let d = dist(this.pos.x, this.pos.y, enm.pos.x, enm.pos.y);
      if (d < this.size/2 + enm.size/2) {
        if(playerInvul == 0) {
          fill("#FF0000");
          ellipse(this.pos.x, this.pos.y, 20);
          playerInvul = 1;
          life--;
        }
      }
    }
  }
  checkPickup(ps) {
    for (let i = 0; i < ps.length; i++) {
      let p = ps[i];
      let d = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      if (d < this.size/2 + 12) {
        life +=1;
        ps.splice(i, 1);
      }
    }
  }
}

class PlayerBullet {
  constructor() {
    this.size = bulletSize;
    this.spd = bulletSpeed;
    this.pos = createVector(mouseX, mouseY);
  }
  show() {
    fill("#00F0FF");
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  move() {
    this.pos.y -= this.spd;
  }
}

class Enemy {
  constructor(x, y, size, type, vx, vy) {
    this.size = size;
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.type = type;
    switch (type){
      case 1:
        this.hp = 5;
        break;
      case 2:
        this.hp = 10;
        break;
      default:
        break;
    }
  }
  show() {
    if(this.type == 1){
      fill("#536B08");
    } else if(this.type == 2){
      fill("#C000B7");
    }
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  move(){
    this.pos.add(this.vel);
    if(this.pos.x <= 0 || this.pos.x >= width){
      this.vel.x *= (-1);
    }
    if(this.pos.y <= 0 || this.pos.y >= height/2){
      this.vel.y *= (-1);
    }
  }
  checkCollision(blts) {
    for (let i = 0; i < blts.length; i++) {
      let blt = blts[i];
      let d = dist(this.pos.x, this.pos.y, blt.pos.x, blt.pos.y);
      if (d < this.size/2 + blt.size/2) {
        fill("#FFFFFF");
        this.hp--;
        ellipse(this.pos.x, this.pos.y, this.size);
        blts.splice(i, 1);
      }
    }
  }
}

class EnemyBullet {
  constructor(x, y, a, s, t) {
    this.size = s;
    this.pos = createVector(x, y);
    this.vel = p5.Vector.fromAngle(a, 3);
    this.type = t;
  }
  show() {
    switch (this.type){
      case 1:
        fill("#b0fa04ff");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      case 2:
        fill("#FF0000");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      default:
        break;
    }
    
  }
  move() {
    this.pos.add(this.vel);
    if(this.type == 3){
      if(this.pos.x <= 0 || this.pos.x >= width){
      this.vel.x *= (-1);
    }
    }
  }
}

class Pickup {
  constructor(x, y, type) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 1);
    this.type = type;
  }
  show() {
    push();
    if(this.type == 1){
      strokeWeight(0);
      fill("#09d127ff");
      rect(this.pos.x, this.pos.y, 25, 10);
      rect(this.pos.x, this.pos.y, 10, 25);
      
    } else if(this.type == 2){
      fill("#e6b40fff");
      ellipse(this.pos.x, this.pos.y, 25);
    }
    pop();
  }
  move(){
    this.pos.add(this.vel);
  }
}

function keyPressed() {
  if (gameState == 0 && key === " ") {
    gameState = 1;
    
  }
}
function mousePressed(){
  if (gameState == 3 && key === " ") {
    timer = 0;
    count = 0;
    life = 5;
    bulletSpeed = 10;
    bulletSize = 10;
    bulletLevel = 1;
    frequency = 20;
    playerInvul = 0;
    invulCD = 0;
    gameState = 0;
  }
}