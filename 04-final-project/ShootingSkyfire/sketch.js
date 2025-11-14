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
let bossTimer = 0;
let count = 0;
let counts=[];
let frequency = 20;
let dropToggle = 0;
let stageBGM, hitSE, startSE, endSE, menuBGM, laserSE, bombSE, pickupSE, killSE, bossBGM;
let stageBG, menuBG, winBG, endBG, enemya, enemyb, enemyc, boss, ship, ship2, click;
//framerate = 60
function setup() {
  createCanvas(600, 690);
  textSize(32);
  myPlayer = new Player();
  rectMode(CENTER);
  imageMode(CENTER);
  /*
  button = Button("START");
  button.mousePressed(start);
  button.position(width/2, height/2);
  button.addClass('big-btn');*/
}
function preload() {
  stageBG = loadImage("assets/DarkClouds.png");
  menuBG = loadImage("assets/Mountains1.png");
  endBG = loadImage("assets/StarlitSky.png");
  winBG = loadImage("assets/Clouds.png");
  enemya = loadImage("assets/enemy12.png");
  enemyb = loadImage("assets/enemy2.png");
  enemyc = loadImage("assets/enemy3.png");
  boss = loadImage("assets/Boss.png");
  ship = loadImage("assets/ship.png");
  ship2 = loadImage("assets/ship2.png");
  click = loadImage("assets/click.png");
  stageBGM = loadSound("sfx/stagebg.ogg");
  menuBGM = loadSound("sfx/menubg.ogg");
  bossBGM = loadSound("sfx/Boss.ogg");
  startSE = loadSound("sfx/load.ogg");
  endSE = loadSound("sfx/end.ogg");
  hitSE = loadSound("sfx/damage.ogg");
  laserSE = loadSound("sfx/laser.ogg");
  bombSE = loadSound("sfx/bomb.ogg");
  pickupSE = loadSound("sfx/pickup.ogg");
  killSE = loadSound("sfx/collapse.ogg");
  laserSE.setVolume(0.2);
  endSE.setVolume(0.3);
  stageBGM.setVolume(0.7);
}
function draw() {
  if (gameState == 0){
    background("#060145");
    image(menuBG, width/2, height/2);
    push();
    fill("#c44f02ff");
    textStyle(BOLD);
    text("SHOOTING SKYFIRE", 150, 250);
    fill("#000000ff");
    text("SPACE TO START", 170, 450);
    pop();
  }
  if (gameState == 1){
    background(0);
    image(stageBG, width/2, height/2);
    

    //TIME BASED SPAWN


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


    //BOSS TIMER


    switch (true){
      case bossTimer == 10:
        stageBGM.stop();
        break;
      case bossTimer == 60:
        enemies.push(new Enemy(width/2, -20, 500, 4, 0, 1)); //boss spawns after 1s, will take 2s to move from -20 to 100, start timer at 180s
        bossBGM.setVolume(0.3);
        bossBGM.loop();
        break;
      case bossTimer >= 180 && bossTimer < 660 && fract(bossTimer/60) == 0:
        for(a = 0.449; a <= 2.694; a+=0.449) {
          enemyBullets.push(new EnemyBullet(260, 240, a, 10, 2, 2, 2));
          enemyBullets.push(new EnemyBullet(340, 240, a, 10, 2, 2, 2));
        }
        break;
      case bossTimer >= 800 && bossTimer < 1800 :
        if (fract(bossTimer/60) == 0){    
          for(a = 0.628; a <= 2.512; a+=0.628) {
            enemyBullets.push(new EnemyBullet(300, 250, a, 15, 2, 1, 1));
          }
        }
        if (fract((bossTimer+30)/120) == 0){
          for (let i = 0; i < enemies.length; i++) {
            playerAngle = myPlayer.pos.sub(enemies[i].pos);
            enemyBullets.push(new EnemyBullet(enemies[i].pos.x, enemies[i].pos.y, playerAngle.heading(), 60, 4, 6, 1));
          }
        }
        
        break;
      case bossTimer >= 1900 && bossTimer < 3200 :
        if (fract(bossTimer/240) == 0){    
          enemyBullets.push(new EnemyBullet(random(20, 280), 250, 1.57, 0, 6, 0, 210));
          enemyBullets.push(new EnemyBullet(random(320, 580), 250, 1.57, 0, 6, 0, 210));
        }
        if (fract(bossTimer/60) == 0){
          for (let i = 0; i < enemies.length; i++) {
            playerAngle = myPlayer.pos.sub(300, 240);
            enemyBullets.push(new EnemyBullet(300, 240, playerAngle.heading(), 20, 3, 4, 3));
          }
        }
        
        break;
      default:
        break;
    }
    myPlayer.show();


    //ENEMY ACTION CHECKS


    for (let i = 0; i < enemies.length; i++) {
      enemies[i].show();
      enemies[i].move();
      enemies[i].checkCollision(playerBullets);
      switch (enemies[i].type){
        case 1:
          if (fract(counts[i]/50) == 0) {
            playerAngle = myPlayer.pos.sub(enemies[i].pos);
            enemyBullets.push(new EnemyBullet(enemies[i].pos.x, enemies[i].pos.y, playerAngle.heading(), 10, 1, 3, 1));
          }
          if (enemies[i].hp <= 0) {
            r = random(1, 100);
            if (r <= 10){
              pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 1));
            } else if (r >= 90){
              pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 4));
            }
            killSE.play();
            score++;
            enemies.splice(i, 1);
            counts.splice(i, 1);
          }
          break;
        case 2:
          if (fract(counts[i]/80) == 0) {
            for(a = 0; a <= 3.14; a+=0.523) {
              enemyBullets.push(new EnemyBullet(enemies[i].pos.x, enemies[i].pos.y, a, 20, 2, 3, 1));
            }
          }
          if (enemies[i].hp <= 0) {
            //r = random(1, 100);
            //if (r <= 50){
              pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 2));
            //} else if (r >= 80){
              //pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 4));
            //}
            killSE.play();
            score++;
            enemies.splice(i, 1);
            counts.splice(i, 1);
          }
          break;
        case 3:
          if (fract(counts[i]/180) == 0) {
            playerAngle = myPlayer.pos.sub(enemies[i].pos);
            enemyBullets.push(new EnemyBullet(enemies[i].pos.x, enemies[i].pos.y, playerAngle.heading(), 25, 3, 5, 3));
          }
          if (enemies[i].hp <= 0) {
            //r = random(1, 100);
            //if (r <= 50){
              pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 3));
            //} else if (r > 50){
              //pickups.push(new Pickup(enemies[i].pos.x, enemies[i].pos.y, 2));
            //}
            killSE.play();
            score++;
            enemies.splice(i, 1);
            counts.splice(i, 1);
          }
          break;
        case 4:
          if (enemies[i].hp <= 2000) {
            if(dropToggle == 0){
              pickups.push(new Pickup(random(200, 400), enemies[i].pos.y, 1));
              pickups.push(new Pickup(random(200, 400), enemies[i].pos.y, 1));
              pickups.push(new Pickup(random(200, 400), enemies[i].pos.y, 1));
              dropToggle = 1;
            }
          }
          if (enemies[i].hp <= 0) {
            killSE.play();
            score+=14;
            enemies.splice(i, 1);
            gameState = 2;
            enemies.length = 0;
            counts.length = 0;
            playerBullets.length = 0;
            enemyBullets.length = 0;
            bossBGM.stop();
          }
          break;
        default:
          break;
      }
    }


    //PICKUP ACTION CHECK


    for (let i = 0; i < pickups.length; i++) {
      pickups[i].show();
      pickups[i].move();
    }


    //PLAYER ACTION CHECK


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
      //laserSE.play();
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


    //PROJECTILE ACTION CHECK


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
      if (enemyBullets[i].life <= 0) {
        if (enemyBullets[i].type == 4){
          for(a = 0; a <= 6; a+=0.523) {
            enemyBullets.push(new EnemyBullet(enemyBullets[i].pos.x, enemyBullets[i].pos.y, a, 30, 5, 5, 1));
          }
        }
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


    //USER INTERFACE


    push();
    fill("#804200ff");
    rect(width/2, height, width, 80);
    fill("#ffffffff");
    textSize(18);
    push();
    textStyle(BOLD);
    fill("#09d127ff");
    text("Lives:", 5, 680);
    text(life, 55, 680);
    pop();
    text("Score:", 75, 680);
    text(score, 130, 680);
    image(click, 250, 670);
    text("Bombs:", 275, 680);
    text(bombs, 340, 680);
    text("Q: quit stage", 450, 680);
    pop();


    //TIMER PROCESSING


    timer++;
    if (score == 16){
      push();
      rectMode(CORNER);
      fill("#620000ff");
      for (let i = 0; i < enemies.length; i++) {
      rect(50, 50, enemies[i].hp/8, 20);
      }
      pop();
      bossTimer++;
      if (bossTimer >=3300){
        bossTimer = 180;
      }
    }
    if(life <= 0){
      gameState = 3;
      enemies.length = 0;
      counts.length = 0;
      playerBullets.length = 0;
      enemyBullets.length = 0;
      stageBGM.stop();
      bossBGM.stop();
      endSE.play();
    }
  }
  if (gameState == 3){
    background("#450142");
    image(endBG, width/2, height/2);
    push();
    textStyle(BOLD);
    fill("#E20A0A");
    text("GAME OVER", 200, 450);
    pop();
  }
  if (gameState == 2){
    background("#450142");
    image(winBG, width/2, height/2);
    push();
    textStyle(BOLD);
    fill("#005a00ff");
    text("VICTORY", 230, 250);
    fill("#ffffffff");
    text("SCORE:", 230, 450);
    text(score, 370, 450);
    pop();
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
      //fill("#FFDC00");
      //triangle(mouseX-20, mouseY+10, mouseX+20, mouseY+10, mouseX, mouseY-20);
      image(ship,mouseX,mouseY);
      fill("#2AFF00");
      ellipse(mouseX, mouseY, this.size);
    } else {
      //fill("#FFFFFF");
      //triangle(mouseX-20, mouseY+10, mouseX+20, mouseY+10, mouseX, mouseY-20);
      image(ship2,mouseX,mouseY);
      fill("#FF8600");
      ellipse(mouseX, mouseY, this.size);
    }
  }
  checkCollision(blts) {
    for (let i = 0; i < blts.length; i++) {
      let blt = blts[i];
      if(blt.type == 6){
        let d = dist(this.pos.x, 0, blt.pos.x, 0);
        if (d < this.size/2 + blt.size/2) {
          if(playerInvul == 0 && blt.life <=180) {
            hitSE.play();
            playerInvul = 1;
            life--;
          }
        }
      } else {
        let d = dist(this.pos.x, this.pos.y, blt.pos.x, blt.pos.y);
        if (d < this.size/2 + blt.size/2) {
          if(playerInvul == 0) {
            hitSE.play();
            blt.life = 0;
            playerInvul = 1;
            life--;
          }
        }
      }
    }
  }
  enemyCollision(enms) {
    for (let i = 0; i < enms.length; i++) {
      let enm = enms[i];
      if(enm.type == 4){
        let d = dist(0, this.pos.y, 0, enm.pos.y);
        if(this.pos.x > 50 && this.pos.x < 550){
          if(d < this.size/2 + 150){
            if(playerInvul == 0) {
              hitSE.play();
              fill("#FF0000");
              ellipse(this.pos.x, this.pos.y, 20);
              playerInvul = 1;
              life--;
            }
          }
        }
      }else {
        let d = dist(this.pos.x, this.pos.y, enm.pos.x, enm.pos.y);
        if (d < this.size/2 + enm.size/2) {
          if(playerInvul == 0) {
            hitSE.play();
            fill("#FF0000");
            ellipse(this.pos.x, this.pos.y, 20);
            playerInvul = 1;
            life--;
          }
        }
      }
    }
  }
  checkPickup(ps) {
    for (let i = 0; i < ps.length; i++) {
      let p = ps[i];
      let d = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      if (d < this.size/2 + 12) {
        pickupSE.play();
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
    push();
    strokeWeight(2);
    switch (bulletStrength){
      case 1:
        stroke("#8ef3faff");
        fill("#00F0FF");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      case 2:
        stroke("#8ef3faff");
        fill("#00F0FF");
        triangle(this.pos.x-this.size/1.732, this.pos.y+this.size/2, this.pos.x+this.size/1.732, this.pos.y+this.size/2, this.pos.x, this.pos.y-this.size/2);
        break;
      case 3:
        stroke("#f987f9ff");
        fill("#ff00ffff");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      case 4:
        stroke("#f987f9ff");
        fill("#ff00ffff");
        triangle(this.pos.x-this.size/1.732, this.pos.y+this.size/2, this.pos.x+this.size/1.732, this.pos.y+this.size/2, this.pos.x, this.pos.y-this.size/2);
        break;
      default:
        break;
    }  
    pop();
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
      case 4:
        this.hp = 4000;
        break;
      default:
        break;
    }
  }
  show() {
    switch (this.type){
      case 1:
        //fill("#536B08");
        image(enemya, this.pos.x, this.pos.y);
        break;
      case 2:
        //fill("#C000B7");
        image(enemyb, this.pos.x, this.pos.y);
        break;
      case 3:
        //fill("#4a00c0ff");
        image(enemyc, this.pos.x, this.pos.y);
        break;
      case 4:
        //fill("#4a00c0ff");
        //rect(this.pos.x, this.pos.y, this.size, 300);
        image(boss, this.pos.x, this.pos.y);
        break;
      default:
        break;
    }
    //ellipse(this.pos.x, this.pos.y, this.size);
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
      if(this.pos.y >= 3*height/5){
        this.pos.y = 3*height/5-1;
        this.vel.x = (random(-2, 2));
        this.vel.y = (-random(0.5, 2));
      }
    } else if (this.type == 4){
      if(this.pos.y >= 100){
        this.vel.y = 0;
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
      if(this.type == 4){
        if(blt.pos.x > 50 && blt.pos.x < 550){
          if(blt.pos.y < this.pos.y+150){
            this.hp-=bulletStrength;
            fill("#FFFFFF");
            ellipse(blt.pos.x, blt.pos.y, 30);
            blts.splice(i, 1);
          }
        }
      } else {
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
}

class EnemyBullet {
  constructor(x, y, a, s, t, spd, life) {
    this.size = s;
    this.pos = createVector(x, y);
    this.vel = p5.Vector.fromAngle(a, spd);
    this.type = t;
    this.life = life;
  }
  show() {
    push();
    strokeWeight(2);
    switch (this.type){
      case 1:
        strokeWeight(0);
        fill("#cefc46ff");
        rect(this.pos.x, this.pos.y, this.size);
        break;
      case 2:
        stroke("#fc8865ff");
        fill("#ff3c00ff");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      case 3:
        stroke("#fdf978ff");
        fill("#ffdd00ff");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      case 4:
        stroke("#d699ffff");
        fill("#9900ffff");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      case 5:
        stroke("#99a5ffff");
        fill("#0400ffff");
        ellipse(this.pos.x, this.pos.y, this.size);
        break;
      case 6:
        stroke("#2ff1ffff");
        fill("#ff00c8ff"); 
        if(this.life > 150 && this.life <= 180){
          this.size++;
        } else if (this.life <= 30){
          this.size--;
        }
        rect(this.pos.x, 470, this.size, 440);
        ellipse(this.pos.x, this.pos.y, 30);//y=250
        break;
      default:
        break;
    }
    pop();
  }
  move() {
    this.pos.add(this.vel);
    if(this.type < 6){
      if(this.pos.x <= 0){
        this.pos.x = 1;
        this.vel.x *= (-1);
        this.life--;
      }
      if(this.pos.x >= width){
        this.pos.x = width - 1;
        this.vel.x *= (-1);
        this.life--;
      }
      if(this.pos.y <= 0){
        this.pos.y = 1;
        this.vel.y *= (-1);
        this.life--;
      } 
      if(this.pos.y >= height){
        this.pos.y = height - 1;
        this.vel.y *= (-1);
        this.life--;
      } 
    } else {
      this.life--;
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
    menuBGM.stop();
    startSE.play();
    stageBGM.loop();
    score = 0;
    //timer = 4000;
  } else if (gameState == 1 && key === "q"){
    life = 0;
  }
}
function mousePressed(){
  if (gameState == 3 || gameState == 2) {
    //menuBGM.loop();
    bossTimer = 0;
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
    dropToggle = 0;
  } else if (gameState == 1){
    if (bombs >=1){
      bombSE.play();
      enemyBullets.length = 0;
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].hp -= 5;
      }
      explosion.push(new Explosion(mouseX, mouseY));
      bombs--;
    }
  } else if (gameState == 0){
    if (menuBGM.isPlaying()==false){
      menuBGM.setVolume(0.1);
      menuBGM.loop();
    }
  }
}