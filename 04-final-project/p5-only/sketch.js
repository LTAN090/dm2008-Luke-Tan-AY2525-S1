let Button;
let myPlayer;
let life = 5;
let bombs = 1;
let bulletLevel = 1;
let bulletStrength = 1;
let bulletSpeed = 10;
let bulletSize = 10;
let playerBullets = [];
let enemyBullets = [];
let playerAngle;
let playerInvul = 0;
let invulCD = 0;
let explosion = [];
let enemies = [];
let pickups =[];
let r;
let score = 0;
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
      case 780:
        enemies.push(new Enemy(width/2, 1, 50, 3, 0, 1));//type 3
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
      case 2000:
        enemies.push(new Enemy(width-1, 1, 50, 3, -1, 1));//type 3
        counts.push(0);
        break;
      case 2010:
        enemies.push(new Enemy(1, 1, 50, 3, 1, 1));//type 3
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
            if (r <= 10){
              pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 1));
            } else if (r >= 90){
              pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 4));
            }
            score++;
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
            r = random(1, 100);
            if (r <= 50){
              pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 2));
            } else if (r >= 80){
              pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 4));
            }
            score++;
            enemies.splice(i, 1);
            counts.splice(i, 1);
          }
          break;
        case 3:
          if (fract(counts[i]/180) == 0) {
            playerAngle = myPlayer.pos.sub(enemies[i].pos);
            enemyBullets.push(new EnemyBullet(enemies[i].pos.x, enemies[i].pos.y, playerAngle.heading(), 25, 3));
          }
          if (enemies[i].hp <= 0) {
            r = random(1, 100);
            if (r <= 80){
              pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 3));
            }
            score++;
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
      switch (bulletLevel){
        case 1:
          playerBullets.push(new PlayerBullet(mouseX, mouseY, 4.71));
          break;
        case 2:
          playerBullets.push(new PlayerBullet(mouseX, mouseY, 4.71));
          playerBullets.push(new PlayerBullet(mouseX, mouseY, 5.23));
          playerBullets.push(new PlayerBullet(mouseX, mouseY, 4.19));
          break;
        case 3:
          playerBullets.push(new PlayerBullet(mouseX+10, mouseY, 4.71));
          playerBullets.push(new PlayerBullet(mouseX-10, mouseY, 4.71));
          playerBullets.push(new PlayerBullet(mouseX, mouseY, 5.23));
          playerBullets.push(new PlayerBullet(mouseX, mouseY, 4.19));
          break;
        default:
          break;
      }
      
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
      if (enemyBullets[i].pos.x > width+10 || enemyBullets[i].pos.x < -10 || enemyBullets[i].pos.y > height+5 || enemyBullets[i].life <= 0) {
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
    for (let i = 0; i < explosion.length; i++) {
      explosion[i].show();
      if (explosion[i].size > height){
        explosion.splice(i,1);
      }
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
        switch (p.type){
          case 1:
            if(life < 5){
              life +=1;
            }
            break;
          case 2:
            if (bulletStrength < 4){
              bulletSize +=2;
              bulletStrength +=1;
            }
            break;
          case 3:
            if (bulletLevel < 3){
              bulletLevel +=1;
            }
            break;
          case 4:
            bombs++;
            break;
          default:
            break;
        }
        ps.splice(i, 1);
      }
    }
  }
}

class PlayerBullet {
  constructor(x, y, a) {
    this.size = bulletSize;
    this.spd = bulletSpeed;
    this.pos = createVector(x, y);
    this.vel = p5.Vector.fromAngle(a, 10);
  }
  show() {
    switch (bulletStrength){
      case 1:
        fill("#00F0FF");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      case 2:
        fill("#00F0FF");
        triangle(this.pos.x-this.size/1.732, this.pos.y+this.size/2, this.pos.x+this.size/1.732, this.pos.y+this.size/2, this.pos.x, this.pos.y-this.size/2);
        break;
      case 3:
        fill("#ff00ffff");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      case 4:
        fill("#ff00ffff");
        triangle(this.pos.x-this.size/1.732, this.pos.y+this.size/2, this.pos.x+this.size/1.732, this.pos.y+this.size/2, this.pos.x, this.pos.y-this.size/2);
        break;
      default:
        break;
    }  
  }
  move() {
    this.pos.add(this.vel);
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
        this.hp = 10;
        break;
      case 2:
        this.hp = 20;
        break;
      case 3:
        this.hp = 15;
        break;
      default:
        break;
    }
  }
  show() {
    switch (this.type){
      case 1:
        fill("#536B08");
        break;
      case 2:
        fill("#C000B7");
        break;
      case 3:
        fill("#4a00c0ff");
        break;
      default:
        break;
    }
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  move(){
    this.pos.add(this.vel);
    if(this.type == 3){
      if(this.pos.x <= 0){
        this.pos.x = 1;
        this.vel.x = (random(0.5, 2));
        this.vel.y = (random(-2, 2));
      }
      if(this.pos.x >= width){
        this.pos.x = width -1;
        this.vel.x = (-random(0.5, 2));
        this.vel.y = (random(-2, 2));
      }
      if(this.pos.y <= 0){
        this.pos.y=1;
        this.vel.x = (random(-2, 2));
        this.vel.y = (random(0.5, 2));
      }
      if(this.pos.y >= 3*height/4){
        this.pos.y = 3*height/4-1;
        this.vel.x = (random(-2, 2));
        this.vel.y = (-random(0.5, 2));
      }
    } else {
      if(this.pos.x <= 0 || this.pos.x >= width){
        this.vel.x *= (-1);
      }
      if(this.pos.y <= 0 || this.pos.y >= height/2){
        this.vel.y *= (-1);
      }
    }
  }
  checkCollision(blts) {
    for (let i = 0; i < blts.length; i++) {
      let blt = blts[i];
      let d = dist(this.pos.x, this.pos.y, blt.pos.x, blt.pos.y);
      if (d < this.size/2 + blt.size/2) {
        fill("#FFFFFF");
        this.hp-=bulletStrength;
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
    //this.life = 1;
    if (t==3){
      this.life = 3;
      this.vel = p5.Vector.fromAngle(a, 5);
    } else if (t==4){
      this.life = 60;
    }
  }
  show() {
    switch (this.type){
      case 1:
        fill("#fcd546ff");
        rect(this.pos.x, this.pos.y, this.size);
        break;
      case 2:
        fill("#ff3c00ff");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      case 3:
        fill("#ff7700ff");
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
        this.life--;
      }
      if(this.pos.y <= 0 || this.pos.y >= height){
        this.vel.y *= (-1);
        this.life--;
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
    strokeWeight(0);
    switch (this.type){
      case 1:
        fill("#09d127ff");
        rect(this.pos.x, this.pos.y, 25, 10);
        rect(this.pos.x, this.pos.y, 10, 25);
        break;
      case 2:
        fill("#e6b40fff");
        rect(this.pos.x, this.pos.y+10, 25, 5);
        rect(this.pos.x, this.pos.y+7, 8, 25);
        triangle(this.pos.x+4, this.pos.y-5, this.pos.x-4, this.pos.y-5, this.pos.x, this.pos.y-14,);
        break;
      case 3:
        fill("#00d5ffff");
        rect(this.pos.x, this.pos.y+10, 24, 4);
        triangle(this.pos.x+4, this.pos.y+12, this.pos.x-4, this.pos.y+12, this.pos.x, this.pos.y-14,);
        triangle(this.pos.x+12, this.pos.y+12, this.pos.x+6, this.pos.y+12, this.pos.x+12, this.pos.y-14,);
        triangle(this.pos.x-12, this.pos.y+12, this.pos.x-6, this.pos.y+12, this.pos.x-12, this.pos.y-14,);
        break;
      case 4:
        strokeWeight(4);
        stroke("#ffffffff");
        noFill();
        ellipse(this.pos.x, this.pos.y, 20);
        break;
      default:
        break;
    }
    pop();
  }
  move(){
    this.pos.add(this.vel);
  }
}

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 1;
  }
  show() {
    push();
    strokeWeight(20);
    stroke("#ffffffff");
    noFill();
    ellipse(this.x, this.y, this.size);
    pop();
    this.size+=20;
  }

}

function keyPressed() {
  if (gameState == 0 && key === " ") {
    gameState = 1;
    score = 0;
  }
}
function mousePressed(){
  if (gameState == 3) {
    timer = 0;
    count = 0;
    life = 5;
    bulletSpeed = 10;
    bulletStrength = 1;
    bulletSize = 10;
    bulletLevel = 1;
    frequency = 20;
    playerInvul = 0;
    invulCD = 0;
    gameState = 0;
    bombs = 1;
  } else if (gameState == 1){
    if (bombs >=1){
      enemyBullets.length = 0;
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].hp -= 5;
      }
      explosion.push(new Explosion(mouseX, mouseY));
      bombs--;
    }
  }
}