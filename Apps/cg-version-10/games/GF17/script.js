var canvas,ctx;
var left,right,up,down;
var fade=1,dead=false;
var player = {
    x:0,y:0,size:30,speed:3
};
var lvl=0,lvlStart=true,lvlComplete=false,gameCompleted=false;
var coins = [0,1,1,3,0,4,4,3,1,0,2,1,0,0,0,4,0,67,0,7,3,0,36,0,0,4,1,0,2,4];
var coinSum = [0,1,2,5,5,9,13,16,17,17,19,20,20,20,20,24,24,91,91,98,101,101,137,137,137,141,142,142,144,148];
var currentCoins = 0;
var Coins = new Array(148);
for (var i=0;i<Coins.length;i++) Coins[i] = new Array(2);
var firstCoin,coinIndex;
var c = [];
var checkPoint1=false,checkPoint2=false;
var Enemies = new Array(745);
for (var i=0;i<Enemies.length;i++) Enemies[i] = new Array(4);
var rotateX,rotateY;
var speedRotation = 1,clockRotation = true;
var rotation1 = true,rotation2 = true;
var angle=0;
var deaths=0;
var audioDeath = new Audio('audios/death.ogg');
var audioCoin = new Audio('audios/coin.ogg');
var audioLevel = new Audio('audios/level.ogg');
var mute = false;
var startTime,endTime,timeDiff,previousTime;
var sentences = ["you don't know what/you're getting into.","don't even bother/trying.","i can almost guarantee/you will fail.","that one was easy.",
"this one is easier than/your mother.","don't get dizzy, now.","how fast can you/go?","don't get confuzed,/now.","how good are your/reflexes?",
"harder than it looks.","just give up... it keeps/getting harder.","i hope you're not in/a hurry.","this is way too easy./seriously. not hard.",
"it starts to get real/tricky here.","there's an easy way/and a hard way.","give up, this one isn't/even hard.","you won't beat the/game.",
"this one is so hard/you'll never do it.","not so easy, is it?","it gets harder now.","you've already lost.","don't choke!","around and around...",
"this one isn't hard/if you know the trick.","you're probably/getting frustrated.","shouldn't even take/more than 2 deaths...","not hard at all.",
"baby want his bottle?","might be tricky.","impossible."];
var slash = 0;
var leftWallCollision = rightWallCollision = upWallCollision = downWallCollision = false;
var checkPoint1Collision = checkPoint2Collision = finishCollision = coinCollision = enemieCollision = false;
function startGame(statement) {
    lvl = statement ? 0 : localStorage.getItem('lvl') != undefined ? parseInt(localStorage.getItem('lvl')) : 0;
    deaths = statement ? 0 : localStorage.getItem('deaths') != undefined ? parseInt(localStorage.getItem('deaths')) : 0;
    previousTime = statement ? 0 : localStorage.getItem('time') != undefined ? parseInt(localStorage.getItem('time')) : 0;
    document.getElementById('home-screen').style.display = "none";
    document.getElementById('cvs').style.visibility = "visible";
    if(!mute) {
        audioLevel.currentTime = 0;
        audioLevel.play();
    }
    init();
}
function init() {
    canvas = document.getElementById("cvs");
    ctx = canvas.getContext('2d');
    ctx.width = 1100;
    ctx.height = 700;
    ctx.lineWidth = 5;
    ctx.translate(0.5,0.5);
    screenLevelStart(lvl);
    setTimeout(() => {
        startTime = new Date();
        drawCoins();
        drawEnemies();
        draw();
    },2000);
    
}
function draw() {
	var date = window.performance.now();
    localStorage.setItem('lvl', lvl);
    localStorage.setItem('deaths', deaths);
    localStorage.setItem('time', (timeDiff+previousTime));
    endTime = new Date();
    timeDiff = endTime - startTime;
    timeDiff = Math.round(timeDiff/1000);
    document.getElementById('time').innerHTML = new Date((timeDiff+previousTime) * 1000).toISOString().substr(11, 8);
    document.getElementById('coins').innerHTML = (currentCoins < 10 ? "&nbsp;&nbsp;" + currentCoins : currentCoins) + " / " + coins[lvl];
    document.getElementById('level').innerHTML = ((lvl+1) < 10 ? "&nbsp;&nbsp;" + (lvl+1) : (lvl+1)) + " / 30";
    document.getElementById('deaths').innerHTML = String(deaths).padStart(4,"0");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawLevel(lvl);
    drawPlayer();
    if(lvlComplete) screenLevelStart(lvl+1);
    checkCollide();
    if(!gameCompleted) requestAnimationFrame(draw);
}
function drawPlayer() {
    ctx.save();
    if(dead) fade -= 0.05;
    else fade = 1;
    ctx.beginPath();ctx.rect(player.x,player.y,player.size,player.size);fill("rgba(255,0,0,"+fade);ctx.strokeStyle="rgba(1,1,1,"+fade;ctx.stroke();
    ctx.restore();
}
function drawLevel(lvl) {
    ctx.beginPath();ctx.rect(0,0,1100,700);
    if(lvl < 19) fill("#8080ff");
    if(lvl >=19 && lvl < 29) fill("#df80ff");
    if(lvl == 29) fill("#ff8080");
    if(lvl == 0) {
        if(lvlStart) {
            player.x = 175 - player.size/2;
            player.y = ctx.height/2 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(100,200,150,300);fill("red");
        ctx.beginPath();ctx.rect(850,200,150,300);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        ctx.rect(250,450,50,50);ctx.rect(800,200,50,50);
        for(var x=350;x<800;x+=100) ctx.rect(x,250,50,50);for(var x=300;x<750;x+=100) ctx.rect(x,300,50,50);
        for(var x=350;x<800;x+=100) ctx.rect(x,350,50,50);for(var x=300;x<750;x+=100) ctx.rect(x,400,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(250,450);ctx.lineTo(250,200);ctx.lineTo(100,200);ctx.lineTo(100,500);ctx.lineTo(350,500);ctx.lineTo(350,450);
        ctx.lineTo(800,450);ctx.lineTo(800,250);ctx.lineTo(850,250);ctx.lineTo(850,500);ctx.lineTo(1000,500);ctx.lineTo(1000,200);
        ctx.lineTo(750,200);ctx.lineTo(750,250);ctx.lineTo(300,250);ctx.lineTo(300,450);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 1) {
        if(lvlStart) {
            player.x = 175 - player.size/2;
            player.y = ctx.height/2 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(100,300,150,100);fill("red");
        ctx.beginPath();ctx.rect(850,300,150,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=300;x<850;x+=100) ctx.rect(x,200,50,50);for(var x=250;x<800;x+=100) ctx.rect(x,250,50,50);
        for(var x=300;x<850;x+=100) ctx.rect(x,300,50,50);for(var x=250;x<800;x+=100) ctx.rect(x,350,50,50);
        for(var x=300;x<850;x+=100) ctx.rect(x,400,50,50);for(var x=250;x<800;x+=100) ctx.rect(x,450,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(250,400);ctx.lineTo(100,400);ctx.lineTo(100,300);ctx.lineTo(250,300);ctx.lineTo(250,200);ctx.lineTo(850,200);
        ctx.lineTo(850,300);ctx.lineTo(1000,300);ctx.lineTo(1000,400);ctx.lineTo(850,400);ctx.lineTo(850,500);ctx.lineTo(250,500);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 2) {
        if(lvlStart) {
            player.x = ctx.width/2 - player.size/2;
            player.y = ctx.height/2 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(500,300,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        ctx.rect(450,250,50,50);ctx.rect(450,350,50,50);ctx.rect(550,250,50,50);ctx.rect(600,300,50,50);
        ctx.rect(500,400,50,50);ctx.rect(600,400,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(500,250);ctx.lineTo(650,250);ctx.lineTo(650,450);ctx.lineTo(450,450);ctx.lineTo(450,200);ctx.lineTo(500,200);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 3) {
        if(lvlStart) {
            player.x = ctx.width/2 - player.size/2;
            player.y = 125 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(500,50,100,150);fill("red");
        ctx.beginPath();ctx.rect(200,350,150,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=500;x<650;x+=100) ctx.rect(x,200,50,50);for(var x=450;x<700;x+=100) ctx.rect(x,250,50,50);
        for(var x=400;x<750;x+=100) ctx.rect(x,300,50,50);for(var x=350;x<700;x+=100) ctx.rect(x,350,50,50);
        for(var x=400;x<750;x+=100) ctx.rect(x,400,50,50);for(var x=350;x<700;x+=100) ctx.rect(x,450,50,50);
        for(var x=400;x<650;x+=100) ctx.rect(x,500,50,50);for(var x=450;x<600;x+=100) ctx.rect(x,550,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(500,200);ctx.lineTo(500,50);ctx.lineTo(600,50);ctx.lineTo(600,200);ctx.lineTo(650,200);
        ctx.lineTo(650,250);ctx.lineTo(700,250);ctx.lineTo(700,300);ctx.lineTo(750,300);ctx.lineTo(750,500);
        ctx.lineTo(700,500);ctx.lineTo(700,550);ctx.lineTo(650,550);ctx.lineTo(650,600);ctx.lineTo(450,600);
        ctx.lineTo(450,550);ctx.lineTo(400,550);ctx.lineTo(400,500);ctx.lineTo(350,500);ctx.lineTo(350,450);
        ctx.lineTo(200,450);ctx.lineTo(200,350);ctx.lineTo(350,350);ctx.lineTo(350,300);ctx.lineTo(400,300);
        ctx.lineTo(400,250);ctx.lineTo(450,250);ctx.lineTo(450,200);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 4) {
        if(lvlStart) {
            player.x = 150 - player.size/2;
            player.y = 125 - player.size/2;
            lvlStart = false;
            if(checkPoint1) {
                player.x = 925 - player.size/2;
                player.y = 125 - player.size/2;
            }
            if(checkPoint2) {
                player.x = 125 - player.size/2;
                player.y = 225 - player.size/2;
            }
        }
        ctx.beginPath();ctx.rect(100,100,100,50);fill("red");
        ctx.beginPath();ctx.rect(900,100,50,50);fill("rgb(0,250,0)");
        checkPoint1Collision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
        ctx.beginPath();ctx.rect(100,200,50,50);fill("rgb(0,230,0)");
        checkPoint2Collision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
        ctx.beginPath();ctx.rect(650,300,50,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=200;x<850;x+=100) ctx.rect(x,100,50,50);for(var y=150;y<600;y+=100) ctx.rect(850,y,50,50);
        for(var x=250;x<800;x+=100) ctx.rect(x,550,50,50);for(var y=200;y<600;y+=100) ctx.rect(200,y,50,50);
        for(var x=300;x<800;x+=100) ctx.rect(x,200,50,50);for(var y=250;y<500;y+=100) ctx.rect(750,y,50,50);
        for(var x=350;x<750;x+=100) ctx.rect(x,450,50,50);for(var y=300;y<450;y+=100) ctx.rect(300,y,50,50);
        for(var x=400;x<650;x+=100) ctx.rect(x,300,50,50);for(var x=450;x<600;x+=100) ctx.rect(x,350,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(100,150);ctx.lineTo(100,100);ctx.lineTo(950,100);ctx.lineTo(950,150);ctx.lineTo(900,150);ctx.lineTo(900,600);
        ctx.lineTo(200,600);ctx.lineTo(200,250);ctx.lineTo(100,250);ctx.lineTo(100,200);ctx.lineTo(800,200);ctx.lineTo(800,500);
        ctx.lineTo(300,500);ctx.lineTo(300,300);ctx.lineTo(700,300);ctx.lineTo(700,400);ctx.lineTo(400,400);ctx.lineTo(400,350);
        ctx.lineTo(350,350);ctx.lineTo(350,450);ctx.lineTo(750,450);ctx.lineTo(750,250);ctx.lineTo(250,250);ctx.lineTo(250,550);
        ctx.lineTo(850,550);ctx.lineTo(850,150);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 5) {
        if(lvlStart) {
            player.x = 150 - player.size/2;
            player.y = 150 - player.size/2;
            lvlStart = false;
            if(checkPoint1) {
                player.x = 900 - player.size/2;
                player.y = 350 - player.size/2;
                checkPoint1 = false;
            }
        }
        ctx.beginPath();ctx.rect(100,100,100,100);fill("red");
        ctx.beginPath();ctx.rect(800,300,200,100);fill("rgb(0,250,0)");
        checkPoint1Collision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
        ctx.beginPath();ctx.rect(100,500,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=200;x<950;x+=100) ctx.rect(x,100,50,50);for(var x=250;x<1000;x+=100) ctx.rect(x,150,50,50);
        for(var x=200;x<950;x+=100) ctx.rect(x,200,50,50);for(var x=250;x<1000;x+=100) ctx.rect(x,250,50,50);
        for(var x=200;x<950;x+=100) ctx.rect(x,400,50,50);for(var x=250;x<1000;x+=100) ctx.rect(x,450,50,50);
        for(var x=200;x<950;x+=100) ctx.rect(x,500,50,50);for(var x=250;x<1000;x+=100) ctx.rect(x,550,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(100,100);ctx.lineTo(1000,100);ctx.lineTo(1000,600);ctx.lineTo(100,600);ctx.lineTo(100,500);
        ctx.lineTo(200,500);ctx.lineTo(200,400);ctx.lineTo(800,400);ctx.lineTo(800,300);ctx.lineTo(200,300);
        ctx.lineTo(200,200);ctx.lineTo(100,200);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 6) {
        if(lvlStart) {
            player.x = 175 - player.size/2;
            player.y = 350 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(100,300,150,100);fill("red");
        ctx.beginPath();ctx.rect(850,300,150,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=250;x<850;x+=100) ctx.rect(x,150,50,50);for(var x=300;x<850;x+=100) ctx.rect(x,200,50,50);
        for(var x=250;x<850;x+=100) ctx.rect(x,250,50,50);for(var x=300;x<850;x+=100) ctx.rect(x,300,50,50);
        for(var x=250;x<850;x+=100) ctx.rect(x,350,50,50);for(var x=300;x<850;x+=100) ctx.rect(x,400,50,50);
        for(var x=250;x<850;x+=100) ctx.rect(x,450,50,50);for(var x=300;x<850;x+=100) ctx.rect(x,500,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(100,300);ctx.lineTo(250,300);ctx.lineTo(250,150);ctx.lineTo(850,150);ctx.lineTo(850,300);ctx.lineTo(1000,300);
        ctx.lineTo(1000,400);ctx.lineTo(850,400);ctx.lineTo(850,550);ctx.lineTo(250,550);ctx.lineTo(250,400);ctx.lineTo(100,400);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 7) {
        if(lvlStart) {
            player.x = 325 - player.size/2;
            player.y = 175 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(300,150,50,50);fill("red");
        ctx.beginPath();ctx.rect(750,300,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var y=150;y<600;y+=100) ctx.rect(250,y,50,50);for(var y=100;y<550;y+=100) ctx.rect(400,y,50,50);
        for(var y=150;y<600;y+=100) ctx.rect(550,y,50,50);for(var y=100;y<550;y+=100) ctx.rect(700,y,50,50);
        ctx.rect(300,100,50,50);ctx.rect(350,250,50,50);ctx.rect(300,400,50,50);ctx.rect(350,550,50,50);ctx.rect(450,150,50,50);
        ctx.rect(500,500,50,50);ctx.rect(600,100,50,50);ctx.rect(650,250,50,50);ctx.rect(600,400,50,50);ctx.rect(650,550,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(250,100);ctx.lineTo(450,100);ctx.lineTo(450,150);ctx.lineTo(550,150);ctx.lineTo(550,100);ctx.lineTo(750,100);
        ctx.lineTo(750,300);ctx.lineTo(850,300);ctx.lineTo(850,400);ctx.lineTo(750,400);ctx.lineTo(750,600);ctx.lineTo(550,600);
        ctx.lineTo(550,550);ctx.lineTo(450,550);ctx.lineTo(450,600);ctx.lineTo(250,600);ctx.lineTo(250,100);
        ctx.moveTo(350,150);ctx.lineTo(400,150);ctx.lineTo(400,250);ctx.lineTo(300,250);ctx.lineTo(300,200);ctx.lineTo(350,200);
        ctx.lineTo(350,150);
        ctx.rect(300,300,100,100);ctx.rect(300,450,100,100);ctx.rect(450,200,100,300);
        ctx.rect(600,150,100,100);ctx.rect(600,300,100,100);ctx.rect(600,450,100,100);
        ctx.stroke();
    }
    if(lvl == 8) {
        if(lvlStart) {
            player.x = 150 - player.size/2;
            player.y = 150 - player.size/2;
            lvlStart = false;
            if(checkPoint1) {
                player.x = 550 - player.size/2;
                player.y = 450 - player.size/2;
                checkPoint1 = false;
            }
        }
        ctx.beginPath();ctx.rect(100,100,100,100);fill("red");
        ctx.beginPath();ctx.rect(500,400,100,100);fill("rgb(0,250,0)");
        checkPoint1Collision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
        ctx.beginPath();ctx.rect(900,300,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var y=200;y<550;y+=100) ctx.rect(100,y,50,50);for(var y=250;y<600;y+=100) ctx.rect(150,y,50,50);
        for(var y=100;y<550;y+=100) ctx.rect(700,y,50,50);for(var y=150;y<600;y+=100) ctx.rect(750,y,50,50);
        for(var y=100;y<350;y+=100) ctx.rect(500,y,50,50);for(var y=150;y<400;y+=100) ctx.rect(550,y,50,50);
        ctx.rect(200,200,50,50);ctx.rect(250,250,50,50);ctx.rect(300,200,50,50);ctx.rect(350,250,50,50);ctx.rect(300,100,50,50);
        ctx.rect(350,150,50,50);ctx.rect(400,100,50,50);ctx.rect(450,150,50,50);ctx.rect(200,500,50,50);ctx.rect(250,550,50,50);
        ctx.rect(300,500,50,50);ctx.rect(350,550,50,50);ctx.rect(300,400,50,50);ctx.rect(350,450,50,50);ctx.rect(400,400,50,50);
        ctx.rect(450,450,50,50);ctx.rect(600,400,50,50);ctx.rect(650,450,50,50);ctx.rect(800,100,50,50);ctx.rect(850,150,50,50);
        ctx.rect(900,100,50,50);ctx.rect(950,150,50,50);ctx.rect(900,200,50,50);ctx.rect(950,250,50,50);ctx.rect(800,500,50,50);
        ctx.rect(850,550,50,50);ctx.rect(900,500,50,50);ctx.rect(950,550,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(100,100);ctx.lineTo(200,100);ctx.lineTo(200,200);ctx.lineTo(300,200);ctx.lineTo(300,100);ctx.lineTo(600,100);
        ctx.lineTo(600,400);ctx.lineTo(700,400);ctx.lineTo(700,100);ctx.lineTo(1000,100);ctx.lineTo(1000,400);ctx.lineTo(900,400);
        ctx.lineTo(900,200);ctx.lineTo(800,200);ctx.lineTo(800,500);ctx.lineTo(1000,500);ctx.lineTo(1000,600);ctx.lineTo(700,600);
        ctx.lineTo(700,500);ctx.lineTo(400,500);ctx.lineTo(400,600);ctx.lineTo(100,600);ctx.lineTo(100,100);
        ctx.moveTo(200,300);ctx.lineTo(400,300);ctx.lineTo(400,200);ctx.lineTo(500,200);ctx.lineTo(500,400);ctx.lineTo(300,400);
        ctx.lineTo(300,500);ctx.lineTo(200,500);ctx.lineTo(200,300);
        ctx.stroke();
    }
    if(lvl == 9) {
        if(lvlStart) {
            player.x = 475 - player.size/2;
            player.y = 150 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(400,100,150,100);fill("red");
        ctx.beginPath();ctx.rect(600,100,150,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=300;x<750;x+=100) ctx.rect(x,500,50,50);ctx.rect(400,200,50,50);ctx.rect(450,250,50,50);ctx.rect(400,300,50,50);
        ctx.rect(450,350,50,50);ctx.rect(400,400,50,50);ctx.rect(300,400,50,50);ctx.rect(350,450,50,50);ctx.rect(450,550,50,50);
        ctx.rect(550,550,50,50);ctx.rect(650,450,50,50);ctx.rect(700,400,50,50);ctx.rect(600,400,50,50);ctx.rect(550,350,50,50);
        ctx.rect(600,300,50,50);ctx.rect(550,250,50,50);ctx.rect(600,200,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(400,100);ctx.lineTo(550,100);ctx.lineTo(550,200);ctx.lineTo(450,200);ctx.lineTo(450,250);ctx.lineTo(500,250);
        ctx.lineTo(500,450);ctx.lineTo(400,450);ctx.lineTo(400,500);ctx.lineTo(650,500);ctx.lineTo(650,450);ctx.lineTo(550,450);
        ctx.lineTo(550,250);ctx.lineTo(600,250);ctx.lineTo(600,100);ctx.lineTo(750,100);ctx.lineTo(750,200);ctx.lineTo(650,200);
        ctx.lineTo(650,400);ctx.lineTo(750,400);ctx.lineTo(750,550);ctx.lineTo(650,550);ctx.lineTo(650,600);ctx.lineTo(400,600);
        ctx.lineTo(400,550);ctx.lineTo(300,550);ctx.lineTo(300,400);ctx.lineTo(400,400);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 10) {
        if(lvlStart) {
            player.x = 900 - player.size/2;
            player.y = 300 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(850,250,100,100);fill("red");
        ctx.beginPath();ctx.rect(150,350,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=350;x<900;x+=100) ctx.rect(x,150,50,50);for(var x=400;x<750;x+=100) ctx.rect(x,200,50,50);ctx.rect(150,450,50,50);
        for(var x=350;x<700;x+=100) ctx.rect(x,250,50,50);for(var x=400;x<750;x+=100) ctx.rect(x,300,50,50);ctx.rect(900,200,50,50);
        for(var x=350;x<700;x+=100) ctx.rect(x,350,50,50);for(var x=400;x<750;x+=100) ctx.rect(x,400,50,50);
        for(var x=350;x<700;x+=100) ctx.rect(x,450,50,50);for(var x=200;x<750;x+=100) ctx.rect(x,500,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(150,350);ctx.lineTo(250,350);ctx.lineTo(250,500);ctx.lineTo(350,500);ctx.lineTo(350,150);ctx.lineTo(950,150);
        ctx.lineTo(950,350);ctx.lineTo(850,350);ctx.lineTo(850,200);ctx.lineTo(750,200);ctx.lineTo(750,550);ctx.lineTo(150,550);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 11) {
        if(lvlStart) {
            player.x = 900 - player.size/2;
            player.y = 450 - player.size/2;
            lvlStart = false;
            if(checkPoint1) {
                player.x = 200 - player.size/2;
                player.y = 250 - player.size/2;
                checkPoint1 = false;
            }
        }
        ctx.beginPath();ctx.rect(850,400,100,100);fill("red");
        ctx.beginPath();ctx.rect(150,200,100,100);fill("rgb(0,250,0)");
        checkPoint1Collision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
        ctx.beginPath();ctx.rect(150,400,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        ctx.rect(300,200,50,50);ctx.rect(400,200,50,50);ctx.rect(500,200,50,50);ctx.rect(600,200,25,50);ctx.rect(450,250,50,25);
        ctx.rect(575,250,25,50);ctx.rect(200,300,50,50);ctx.rect(300,300,50,50);ctx.rect(400,325,50,25);ctx.rect(600,300,25,50);
        ctx.rect(350,350,50,25);ctx.rect(450,350,50,25);ctx.rect(575,350,25,50);ctx.rect(300,400,50,50);ctx.rect(525,400,25,50);
        ctx.rect(500,425,25,25);ctx.rect(600,400,50,50);ctx.rect(700,425,50,25);ctx.rect(800,425,50,25);ctx.rect(275,450,25,25);
        ctx.rect(350,450,50,50);ctx.rect(450,450,50,50);ctx.rect(550,450,25,25);ctx.rect(650,450,50,25);ctx.rect(750,450,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(125,175);ctx.lineTo(975,175);ctx.lineTo(975,525);ctx.lineTo(125,525);
        ctx.closePath();ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(150,200);ctx.lineTo(450,200);ctx.lineTo(450,225);ctx.lineTo(500,225);ctx.lineTo(500,200);ctx.lineTo(625,200);
        ctx.lineTo(625,400);ctx.lineTo(675,400);ctx.lineTo(675,425);ctx.lineTo(750,425);ctx.lineTo(750,450);ctx.lineTo(800,450);
        ctx.lineTo(800,425);ctx.lineTo(850,425);ctx.lineTo(850,400);ctx.lineTo(950,400);ctx.lineTo(950,500);ctx.lineTo(700,500);
        ctx.lineTo(700,475);ctx.lineTo(625,475);ctx.lineTo(625,450);ctx.lineTo(575,450);ctx.lineTo(575,475);ctx.lineTo(500,475);
        ctx.lineTo(500,500);ctx.lineTo(325,500);ctx.lineTo(325,475);ctx.lineTo(275,475);ctx.lineTo(275,450);ctx.lineTo(250,450);
        ctx.lineTo(250,500);ctx.lineTo(150,500);ctx.lineTo(150,400);ctx.lineTo(350,400);ctx.lineTo(350,425);ctx.lineTo(400,425);
        ctx.lineTo(400,450);ctx.lineTo(450,450);ctx.lineTo(450,425);ctx.lineTo(525,425);ctx.lineTo(525,400);ctx.lineTo(575,400);
        ctx.lineTo(575,250);ctx.lineTo(550,250);ctx.lineTo(550,275);ctx.lineTo(400,275);ctx.lineTo(400,250);ctx.lineTo(250,250);
        ctx.lineTo(250,300);ctx.lineTo(400,300);ctx.lineTo(400,325);ctx.lineTo(500,325);ctx.lineTo(500,375);ctx.lineTo(350,375);
        ctx.lineTo(350,350);ctx.lineTo(150,350);
        ctx.save();
        ctx.strokeStyle = "rgb(5,5,5)";
        ctx.closePath();ctx.stroke();
        ctx.restore();
    }
    if(lvl == 12) {
        if(lvlStart) {
            player.x = 550 - player.size/2;
            player.y = 550 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(500,500,100,100);fill("red");
        ctx.beginPath();ctx.rect(500,100,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=300;x<750;x+=100) ctx.rect(x,200,50,50);for(var x=350;x<800;x+=100) ctx.rect(x,250,50,50);
        for(var x=300;x<750;x+=100) ctx.rect(x,300,50,50);for(var x=350;x<800;x+=100) ctx.rect(x,350,50,50);
        for(var x=300;x<750;x+=100) ctx.rect(x,400,50,50);for(var x=350;x<800;x+=100) ctx.rect(x,450,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(500,100);ctx.lineTo(600,100);ctx.lineTo(600,200);ctx.lineTo(800,200);ctx.lineTo(800,500);ctx.lineTo(600,500);
        ctx.lineTo(600,600);ctx.lineTo(500,600);ctx.lineTo(500,500);ctx.lineTo(300,500);ctx.lineTo(300,200);ctx.lineTo(500,200);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 13) {
        if(lvlStart) {
            player.x = 175 - player.size/2;
            player.y = 425 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(100,350,150,150);fill("red");
        ctx.beginPath();ctx.rect(850,200,150,150);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=250;x<1000;x+=100) ctx.rect(x,350,50,50);for(var x=300;x<950;x+=100) ctx.rect(x,400,50,50);
        for(var x=250;x<1000;x+=100) ctx.rect(x,450,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(100,350);ctx.lineTo(850,350);ctx.lineTo(850,200);ctx.lineTo(1000,200);ctx.lineTo(1000,500);ctx.lineTo(100,500);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 14) {
        if(lvlStart) {
            player.x = 125 - player.size/2;
            player.y = 150 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(50,100,150,100);fill("red");
        ctx.beginPath();ctx.rect(900,500,150,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var y=250;y<600;y+=100) ctx.rect(50,y,50,50);for(var y=300;y<550;y+=100) ctx.rect(100,y,50,50);
        for(var y=250;y<600;y+=100) ctx.rect(150,y,50,50);for(var y=150;y<600;y+=100) ctx.rect(250,y,50,50);
        for(var y=100;y<550;y+=100) ctx.rect(300,y,50,50);for(var y=150;y<600;y+=100) ctx.rect(350,y,50,50);
        for(var y=150;y<600;y+=100) ctx.rect(450,y,50,50);for(var y=100;y<550;y+=100) ctx.rect(500,y,50,50);
        for(var y=150;y<600;y+=100) ctx.rect(550,y,50,50);for(var y=150;y<600;y+=100) ctx.rect(650,y,50,50);
        for(var y=100;y<550;y+=100) ctx.rect(700,y,50,50);for(var y=150;y<600;y+=100) ctx.rect(750,y,50,50);
        for(var y=100;y<450;y+=100) ctx.rect(900,y,50,50);for(var y=150;y<400;y+=100) ctx.rect(950,y,50,50);
        for(var y=100;y<450;y+=100) ctx.rect(1000,y,50,50);
        ctx.rect(200,500,50,50);ctx.rect(400,100,50,50);ctx.rect(400,200,50,50);ctx.rect(600,500,50,50);ctx.rect(800,100,50,50);
        ctx.rect(800,200,50,50);ctx.rect(850,150,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(50,100);ctx.lineTo(200,100);ctx.lineTo(200,200);ctx.lineTo(100,200);ctx.lineTo(100,250);ctx.lineTo(200,250);
        ctx.lineTo(200,450);ctx.lineTo(250,450);ctx.lineTo(250,100);ctx.lineTo(600,100);ctx.lineTo(600,450);ctx.lineTo(650,450);
        ctx.lineTo(650,100);ctx.lineTo(1050,100);ctx.lineTo(1050,600);ctx.lineTo(900,600);ctx.lineTo(900,500);ctx.lineTo(1000,500);
        ctx.lineTo(1000,450);ctx.lineTo(900,450);ctx.lineTo(900,250);ctx.lineTo(800,250);ctx.lineTo(800,600);ctx.lineTo(450,600);
        ctx.lineTo(450,250);ctx.lineTo(400,250);ctx.lineTo(400,600);ctx.lineTo(50,600);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 15) {
        if(lvlStart) {
            player.x = 100 - player.size/2;
            player.y = 350 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(50,300,100,100);fill("red");
        ctx.beginPath();ctx.rect(950,300,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=200;x<650;x+=100) ctx.rect(x,400,50,50);for(var x=150;x<600;x+=100) ctx.rect(x,450,50,50);
        for(var x=500;x<950;x+=100) ctx.rect(x,200,50,50);for(var x=450;x<900;x+=100) ctx.rect(x,250,50,50);
        ctx.rect(200,200,50,50);ctx.rect(300,200,50,50);ctx.rect(150,250,50,50);ctx.rect(250,250,50,50);ctx.rect(200,300,50,50);
        ctx.rect(300,300,50,50);ctx.rect(150,350,50,50);ctx.rect(250,350,50,50);ctx.rect(500,300,50,50);ctx.rect(600,300,50,50);
        ctx.rect(450,350,50,50);ctx.rect(550,350,50,50);ctx.rect(800,300,50,50);ctx.rect(900,300,50,50);ctx.rect(750,350,50,50);
        ctx.rect(850,350,50,50);ctx.rect(800,400,50,50);ctx.rect(900,400,50,50);ctx.rect(750,450,50,50);ctx.rect(850,450,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(50,300);ctx.lineTo(150,300);ctx.lineTo(150,200);ctx.lineTo(350,200);ctx.lineTo(350,400);ctx.lineTo(450,400);
        ctx.lineTo(450,200);ctx.lineTo(950,200);ctx.lineTo(950,300);ctx.lineTo(1050,300);ctx.lineTo(1050,400);ctx.lineTo(950,400);
        ctx.lineTo(950,500);ctx.lineTo(750,500);ctx.lineTo(750,300);ctx.lineTo(650,300);ctx.lineTo(650,500);
        ctx.lineTo(150,500);ctx.lineTo(150,400);ctx.lineTo(50,400);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 16) {
        if(lvlStart) {
            player.x = 225 - player.size/2;
            player.y = 125 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(200,100,50,50);fill("red");
        ctx.beginPath();ctx.rect(700,400,50,50);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=350;x<900;x+=100) ctx.rect(x,150,50,50);for(var x=200;x<750;x+=100) ctx.rect(x,500,50,50);
        for(var x=350;x<800;x+=100) ctx.rect(x,250,50,50);for(var x=400;x<650;x+=100) ctx.rect(x,400,50,50);
        for(var y=50;y<500;y+=100) ctx.rect(250,y,50,50);for(var y=350;y<600;y+=100) ctx.rect(450,y,50,50);
        for(var y=200;y<650;y+=100) ctx.rect(800,y,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(200,100);ctx.lineTo(250,100);ctx.lineTo(250,50);ctx.lineTo(300,50);ctx.lineTo(300,150);ctx.lineTo(950,150);
        ctx.lineTo(950,200);ctx.lineTo(850,200);ctx.lineTo(850,650);ctx.lineTo(800,650);ctx.lineTo(800,550);ctx.lineTo(500,550);
        ctx.lineTo(500,650);ctx.lineTo(450,650);ctx.lineTo(450,550);ctx.lineTo(150,550);ctx.lineTo(150,500);ctx.lineTo(250,500);
        ctx.lineTo(250,150);ctx.lineTo(200,150);ctx.lineTo(200,100);
        ctx.moveTo(300,200);ctx.lineTo(450,200);ctx.lineTo(450,250);ctx.lineTo(350,250);ctx.lineTo(350,300);ctx.lineTo(450,300);
        ctx.lineTo(450,400);ctx.lineTo(350,400);ctx.lineTo(350,450);ctx.lineTo(450,450);ctx.lineTo(450,500);ctx.lineTo(300,500);
        ctx.lineTo(300,200);
        ctx.rect(500,200,300,50);ctx.rect(500,300,300,100);ctx.rect(500,450,300,50);
        ctx.stroke();
    }
    if(lvl == 17) {
        if(lvlStart) {
            player.x = 250 - player.size/2;
            player.y = 350 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(200,300,100,100);fill("red");
        ctx.beginPath();ctx.rect(800,300,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=350;x<800;x+=100) ctx.rect(x,250,50,50);for(var x=300;x<750;x+=100) ctx.rect(x,300,50,50);
        for(var x=350;x<800;x+=100) ctx.rect(x,350,50,50);for(var x=300;x<750;x+=100) ctx.rect(x,400,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(200,300);ctx.lineTo(300,300);ctx.lineTo(300,250);ctx.lineTo(800,250);ctx.lineTo(800,300);ctx.lineTo(900,300);
        ctx.lineTo(900,400);ctx.lineTo(800,400);ctx.lineTo(800,450);ctx.lineTo(300,450);ctx.lineTo(300,400);ctx.lineTo(200,400);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 18) {
        if(lvlStart) {
            player.x = 200 - player.size/2;
            player.y = 350 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(150,250,100,200);fill("red");
        ctx.beginPath();ctx.rect(850,250,100,200);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=300;x<850;x+=100) ctx.rect(x,200,50,50);for(var x=250;x<800;x+=100) ctx.rect(x,250,50,50);
        for(var x=300;x<850;x+=100) ctx.rect(x,300,50,50);for(var x=250;x<800;x+=100) ctx.rect(x,350,50,50);
        for(var x=300;x<850;x+=100) ctx.rect(x,400,50,50);for(var x=250;x<800;x+=100) ctx.rect(x,450,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(150,250);ctx.lineTo(250,250);ctx.lineTo(250,200);ctx.lineTo(850,200);ctx.lineTo(850,250);ctx.lineTo(950,250);
        ctx.lineTo(950,450);ctx.lineTo(850,450);ctx.lineTo(850,500);ctx.lineTo(250,500);ctx.lineTo(250,450);ctx.lineTo(150,450);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 19) {
        if(lvlStart) {
            player.x = 1000 - player.size/2;
            player.y = 500 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(950,450,100,100);fill("red");
        ctx.beginPath();ctx.rect(50,150,150,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        ctx.rect(250,150,50,50);ctx.rect(250,250,50,50);ctx.rect(250,350,50,50);ctx.rect(300,400,50,50);ctx.rect(350,350,50,50);
        ctx.rect(350,250,50,50);ctx.rect(350,150,50,50);ctx.rect(400,300,50,50);ctx.rect(450,150,50,50);ctx.rect(450,350,50,50);
        ctx.rect(500,200,50,50);ctx.rect(500,300,50,50);ctx.rect(500,400,50,50);ctx.rect(550,250,50,50);ctx.rect(600,300,50,50);
        ctx.rect(600,400,50,50);ctx.rect(650,150,50,50);ctx.rect(650,250,50,50);ctx.rect(650,350,50,50);ctx.rect(700,300,50,50);
        ctx.rect(750,150,50,50);ctx.rect(750,350,50,50);ctx.rect(800,200,50,50);ctx.rect(800,300,50,50);ctx.rect(800,400,50,50);
        ctx.rect(850,250,50,50);ctx.rect(900,300,50,50);ctx.rect(900,400,50,50);ctx.rect(950,150,50,50);ctx.rect(950,250,50,50);
        ctx.rect(950,350,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(400,200);ctx.lineTo(450,200);ctx.lineTo(450,250);ctx.lineTo(500,250);ctx.lineTo(500,300);ctx.lineTo(400,300);
        ctx.lineTo(400,200);
        ctx.moveTo(550,300);ctx.lineTo(600,300);ctx.lineTo(600,350);ctx.lineTo(650,350);ctx.lineTo(650,400);ctx.lineTo(550,400);
        ctx.lineTo(550,300);
        ctx.moveTo(700,200);ctx.lineTo(750,200);ctx.lineTo(750,250);ctx.lineTo(800,250);ctx.lineTo(800,300);ctx.lineTo(700,300);
        ctx.lineTo(700,200);
        ctx.moveTo(850,300);ctx.lineTo(900,300);ctx.lineTo(900,350);ctx.lineTo(950,350);ctx.lineTo(950,400);ctx.lineTo(850,400);
        ctx.lineTo(850,300);
        ctx.moveTo(50,150);ctx.lineTo(300,150);ctx.lineTo(300,400);ctx.lineTo(350,400);ctx.lineTo(350,150);ctx.lineTo(550,150);
        ctx.lineTo(550,250);ctx.lineTo(650,250);ctx.lineTo(650,150);ctx.lineTo(850,150);ctx.lineTo(850,250);ctx.lineTo(950,250);
        ctx.lineTo(950,150);ctx.lineTo(1000,150);ctx.lineTo(1000,450);ctx.lineTo(1050,450);ctx.lineTo(1050,550);ctx.lineTo(950,550);
        ctx.lineTo(950,500);ctx.lineTo(900,500);ctx.lineTo(900,450);ctx.lineTo(800,450);ctx.lineTo(800,400);ctx.lineTo(750,400);
        ctx.lineTo(750,350);ctx.lineTo(700,350);ctx.lineTo(700,450);ctx.lineTo(500,450);ctx.lineTo(500,400);ctx.lineTo(450,400);
        ctx.lineTo(450,350);ctx.lineTo(400,350);ctx.lineTo(400,450);ctx.lineTo(250,450);ctx.lineTo(250,200);ctx.lineTo(200,200);
        ctx.lineTo(200,250);ctx.lineTo(50,250);ctx.lineTo(50,150);
        ctx.stroke();
    }
    if(lvl == 20) {
        if(lvlStart) {
            player.x = 150 - player.size/2;
            player.y = 200 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(100,150,100,100);fill("red");
        ctx.beginPath();ctx.rect(900,450,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=250;x<900;x+=100) ctx.rect(x,150,50,50);for(var x=200;x<850;x+=100) ctx.rect(x,200,50,50);
        for(var x=250;x<900;x+=100) ctx.rect(x,250,50,50);for(var x=200;x<850;x+=100) ctx.rect(x,300,50,50);
        for(var x=250;x<900;x+=100) ctx.rect(x,350,50,50);for(var x=200;x<850;x+=100) ctx.rect(x,400,50,50);
        for(var x=250;x<900;x+=100) ctx.rect(x,450,50,50);for(var x=200;x<850;x+=100) ctx.rect(x,500,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(100,150);ctx.lineTo(900,150);ctx.lineTo(900,450);ctx.lineTo(1000,450);ctx.lineTo(1000,550);ctx.lineTo(200,550);
        ctx.lineTo(200,250);ctx.lineTo(100,250);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 21) {
        if(lvlStart) {
            player.x = 1000 - player.size/2;
            player.y = 150 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(950,100,100,100);fill("red");
        ctx.beginPath();ctx.rect(250,500,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var y=150;y<600;y+=100) ctx.rect(150,y,50,50);for(var y=100;y<550;y+=100) ctx.rect(200,y,50,50);
        for(var y=150;y<600;y+=100) ctx.rect(450,y,50,50);for(var y=100;y<550;y+=100) ctx.rect(500,y,50,50);
        for(var x=600;x<950;x+=100) ctx.rect(x,500,50,50);for(var x=550;x<900;x+=100) ctx.rect(x,550,50,50);
        for(var x=700;x<950;x+=100) ctx.rect(x,300,50,50);for(var x=650;x<900;x+=100) ctx.rect(x,350,50,50);
        for(var x=700;x<950;x+=100) ctx.rect(x,100,50,50);for(var x=650;x<900;x+=100) ctx.rect(x,150,50,50);
        ctx.rect(250,150,50,50);ctx.rect(300,100,50,50);ctx.rect(350,150,50,50);ctx.rect(400,100,50,50);
        ctx.rect(650,250,50,50);ctx.rect(700,200,50,50);ctx.rect(850,450,50,50);ctx.rect(900,400,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(350,500);ctx.lineTo(250,500);ctx.lineTo(250,200);ctx.lineTo(450,200);ctx.lineTo(450,600);ctx.lineTo(950,600);
        ctx.lineTo(950,300);ctx.lineTo(750,300);ctx.lineTo(750,200);ctx.lineTo(1050,200);ctx.lineTo(1050,100);ctx.lineTo(650,100);
        ctx.lineTo(650,400);ctx.lineTo(850,400);ctx.lineTo(850,500);ctx.lineTo(550,500);ctx.lineTo(550,100);ctx.lineTo(150,100);
        ctx.lineTo(150,600);ctx.lineTo(350,600);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 22) {
        if(lvlStart) {
            player.x = 350 - player.size/2;
            player.y = 150 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(300,100,100,100);fill("red");
        ctx.beginPath();ctx.rect(700,500,50,50);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=400;x<650;x+=100) ctx.rect(x,100,50,50);for(var x=450;x<700;x+=100) ctx.rect(x,150,50,50);
        for(var x=300;x<750;x+=100) ctx.rect(x,200,50,50);for(var x=350;x<800;x+=100) ctx.rect(x,250,50,50);
        for(var x=300;x<750;x+=100) ctx.rect(x,300,50,50);for(var x=350;x<800;x+=100) ctx.rect(x,350,50,50);
        for(var x=300;x<750;x+=100) ctx.rect(x,400,50,50);for(var x=350;x<800;x+=100) ctx.rect(x,450,50,50);
        for(var x=400;x<650;x+=100) ctx.rect(x,500,50,50);for(var x=450;x<700;x+=100) ctx.rect(x,550,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(300,100);ctx.lineTo(700,100);ctx.lineTo(700,150);ctx.lineTo(750,150);ctx.lineTo(750,200);ctx.lineTo(800,200);
        ctx.lineTo(800,500);ctx.lineTo(750,500);ctx.lineTo(750,550);ctx.lineTo(700,550);ctx.lineTo(700,600);ctx.lineTo(400,600);
        ctx.lineTo(400,550);ctx.lineTo(350,550);ctx.lineTo(350,500);ctx.lineTo(300,500);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 23) {
        if(lvlStart) {
            player.x = 100 - player.size/2;
            player.y = 550 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(50,500,100,100);fill("red");
        ctx.beginPath();ctx.rect(950,100,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=100;x<1050;x+=100) ctx.rect(x,200,50,50);for(var x=50;x<1000;x+=100) ctx.rect(x,250,50,50);
        for(var x=100;x<1050;x+=100) ctx.rect(x,300,50,50);for(var x=50;x<1000;x+=100) ctx.rect(x,350,50,50);
        for(var x=100;x<1050;x+=100) ctx.rect(x,400,50,50);for(var x=50;x<1000;x+=100) ctx.rect(x,450,50,50);
        ctx.rect(350,150,50,50);ctx.rect(400,100,50,50);ctx.rect(650,550,50,50);ctx.rect(700,500,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(50,600);ctx.lineTo(50,200);ctx.lineTo(350,200);ctx.lineTo(350,100);ctx.lineTo(450,100);ctx.lineTo(450,100);
        ctx.lineTo(450,200);ctx.lineTo(950,200);ctx.lineTo(950,100);ctx.lineTo(1050,100);ctx.lineTo(1050,500);ctx.lineTo(750,500);
        ctx.lineTo(750,600);ctx.lineTo(650,600);ctx.lineTo(650,500);ctx.lineTo(150,500);ctx.lineTo(150,600);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 24) {
        if(lvlStart) {
            player.x = 150 - player.size/2;
            player.y = 150 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(100,100,100,100);fill("red");
        ctx.beginPath();ctx.rect(950,450,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var y=250;y<600;y+=100) ctx.rect(50,y,50,50);for(var y=200;y<550;y+=100) ctx.rect(100,y,50,50);
        for(var y=250;y<600;y+=100) ctx.rect(150,y,50,50);for(var y=200;y<550;y+=100) ctx.rect(200,y,50,50);
        for(var x=300;x<950;x+=100) ctx.rect(x,400,50,50);for(var x=250;x<900;x+=100) ctx.rect(x,450,50,50);
        for(var x=300;x<950;x+=100) ctx.rect(x,500,50,50);for(var x=250;x<900;x+=100) ctx.rect(x,550,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(100,100);ctx.lineTo(200,100);ctx.lineTo(200,200);ctx.lineTo(250,200);ctx.lineTo(250,400);ctx.lineTo(950,400);
        ctx.lineTo(950,450);ctx.lineTo(1050,450);ctx.lineTo(1050,550);ctx.lineTo(950,550);ctx.lineTo(950,600);ctx.lineTo(50,600);
        ctx.lineTo(50,200);ctx.lineTo(100,200);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 25) {
        if(lvlStart) {
            player.x = 550 - player.size/2;
            player.y = 500 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(450,500,200,100);ctx.rect(500,400,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=50;x<500;x+=100) ctx.rect(x,450,50,50);for(var x=100;x<450;x+=100) ctx.rect(x,500,50,50);
        for(var x=650;x<1050;x+=100) ctx.rect(x,450,50,50);for(var x=700;x<1050;x+=100) ctx.rect(x,500,50,50);
        for(var x=50;x<400;x+=100) ctx.rect(x,550,50,50);for(var x=650;x<1000;x+=100) ctx.rect(x,550,50,50);
        ctx.rect(150,150,50,50);ctx.rect(200,100,50,50);ctx.rect(200,200,50,50);ctx.rect(250,150,50,50);ctx.rect(250,250,50,50);
        ctx.rect(300,200,50,50);ctx.rect(300,300,50,50);ctx.rect(350,250,50,50);ctx.rect(350,350,50,50);ctx.rect(400,300,50,50);
        ctx.rect(400,400,50,50);ctx.rect(450,350,50,50);ctx.rect(600,400,50,50);ctx.rect(650,350,50,50);ctx.rect(700,300,50,50);
        ctx.rect(750,250,50,50);ctx.rect(800,200,50,50);ctx.rect(850,150,50,50);ctx.rect(900,100,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(50,450);ctx.lineTo(400,450);ctx.lineTo(400,400);ctx.lineTo(350,400);ctx.lineTo(350,350);ctx.lineTo(300,350);
        ctx.lineTo(300,300);ctx.lineTo(250,300);ctx.lineTo(250,250);ctx.lineTo(200,250);ctx.lineTo(200,200);ctx.lineTo(150,200);
        ctx.lineTo(150,100);ctx.lineTo(250,100);ctx.lineTo(250,150);ctx.lineTo(300,150);ctx.lineTo(300,200);ctx.lineTo(350,200);
        ctx.lineTo(350,250);ctx.lineTo(400,250);ctx.lineTo(400,300);ctx.lineTo(450,300);ctx.lineTo(450,350);ctx.lineTo(500,350);
        ctx.lineTo(500,400);ctx.lineTo(600,400);ctx.lineTo(600,350);ctx.lineTo(650,350);ctx.lineTo(650,300);ctx.lineTo(700,300);
        ctx.lineTo(700,250);ctx.lineTo(750,250);ctx.lineTo(750,200);ctx.lineTo(800,200);ctx.lineTo(800,150);ctx.lineTo(850,150);
        ctx.lineTo(850,100);ctx.lineTo(950,100);ctx.lineTo(950,200);ctx.lineTo(900,200);ctx.lineTo(900,250);ctx.lineTo(850,250);
        ctx.lineTo(850,300);ctx.lineTo(800,300);ctx.lineTo(800,350);ctx.lineTo(750,350);ctx.lineTo(750,400);ctx.lineTo(700,400);
        ctx.lineTo(700,450);ctx.lineTo(1050,450);ctx.lineTo(1050,600);ctx.lineTo(50,600);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 26) {
        if(lvlStart) {
            player.x = 100 - player.size/2;
            player.y = 450 - player.size/2;
            lvlStart = false;
            if(checkPoint1) {
                player.x = 1000 - player.size/2;
                player.y = 350 - player.size/2;
                checkPoint1 = false;
            }
        }
        ctx.beginPath();ctx.rect(50,400,100,100);fill("red");
        ctx.beginPath();ctx.rect(950,300,100,100);fill("rgb(0,250,0)");
        checkPoint1Collision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
        ctx.beginPath();ctx.rect(50,200,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=200;x<950;x+=100) ctx.rect(x,100,50,50);for(var x=150;x<900;x+=100) ctx.rect(x,150,50,50);
        for(var x=200;x<950;x+=100) ctx.rect(x,200,50,50);for(var x=150;x<900;x+=100) ctx.rect(x,250,50,50);
        for(var x=200;x<950;x+=100) ctx.rect(x,300,50,50);for(var x=150;x<900;x+=100) ctx.rect(x,350,50,50);
        for(var x=200;x<950;x+=100) ctx.rect(x,400,50,50);for(var x=150;x<900;x+=100) ctx.rect(x,450,50,50);
        for(var x=200;x<950;x+=100) ctx.rect(x,500,50,50);for(var x=150;x<900;x+=100) ctx.rect(x,550,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(50,200);ctx.lineTo(150,200);ctx.lineTo(150,100);ctx.lineTo(950,100);ctx.lineTo(950,300);ctx.lineTo(1050,300);
        ctx.lineTo(1050,400);ctx.lineTo(950,400);ctx.lineTo(950,600);ctx.lineTo(150,600);ctx.lineTo(150,500);ctx.lineTo(50,500);
        ctx.lineTo(50,400);ctx.lineTo(150,400);ctx.lineTo(150,300);ctx.lineTo(50,300);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 27) {
        if(lvlStart) {
            player.x = 150 - player.size/2;
            player.y = 600 - player.size/2;
            lvlStart = false;
            if(checkPoint1) {
                player.x = 950 - player.size/2;
                player.y = 350 - player.size/2;
                checkPoint1 = false;
            }
        }
        ctx.beginPath();ctx.rect(100,550,100,100);fill("red");
        ctx.beginPath();ctx.rect(900,300,100,100);fill("rgb(0,250,0)");
        checkPoint1Collision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
        ctx.beginPath();ctx.rect(100,50,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=250;x<900;x+=100) ctx.rect(x,50,50,50);for(var x=200;x<950;x+=100) ctx.rect(x,100,50,50);
        for(var x=250;x<900;x+=100) ctx.rect(x,150,50,50);for(var x=200;x<950;x+=100) ctx.rect(x,200,50,50);
        for(var x=250;x<1000;x+=100) ctx.rect(x,250,50,50);for(var x=200;x<950;x+=100) ctx.rect(x,400,50,50);
        for(var x=250;x<1000;x+=100) ctx.rect(x,450,50,50);for(var x=200;x<950;x+=100) ctx.rect(x,500,50,50);
        for(var x=250;x<900;x+=100) ctx.rect(x,550,50,50);for(var x=200;x<950;x+=100) ctx.rect(x,600,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(100,50);ctx.lineTo(950,50);ctx.lineTo(950,200);ctx.lineTo(1000,200);ctx.lineTo(1000,500);ctx.lineTo(950,500);
        ctx.lineTo(950,650);ctx.lineTo(100,650);ctx.lineTo(100,550);ctx.lineTo(200,550);ctx.lineTo(200,400);ctx.lineTo(900,400);
        ctx.lineTo(900,300);ctx.lineTo(200,300);ctx.lineTo(200,150);ctx.lineTo(100,150);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 28) {
        if(lvlStart) {
            player.x = 975 - player.size/2;
            player.y = 150 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(900,100,150,100);fill("red");
        ctx.beginPath();ctx.rect(50,100,150,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
     	}
        ctx.beginPath();
        for(var x=150;x<900;x+=100) ctx.rect(x,250,50,50);for(var x=200;x<950;x+=100) ctx.rect(x,300,50,50);
        for(var x=150;x<900;x+=100) ctx.rect(x,350,50,50);for(var x=200;x<950;x+=100) ctx.rect(x,400,50,50);
        for(var x=150;x<900;x+=100) ctx.rect(x,450,50,50);for(var x=200;x<950;x+=100) ctx.rect(x,500,50,50);
        for(var x=150;x<900;x+=100) ctx.rect(x,550,50,50);ctx.rect(900,200,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(50,100);ctx.lineTo(200,100);ctx.lineTo(200,250);ctx.lineTo(900,250);ctx.lineTo(900,100);ctx.lineTo(1050,100);
        ctx.lineTo(1050,200);ctx.lineTo(950,200);ctx.lineTo(950,600);ctx.lineTo(150,600);ctx.lineTo(150,200);ctx.lineTo(50,200);
        ctx.closePath();ctx.stroke();
    }
    if(lvl == 29) {
        if(lvlStart) {
            player.x = 100 - player.size/2;
            player.y = 600 - player.size/2;
            lvlStart = false;
        }
        ctx.beginPath();ctx.rect(50,550,100,100);fill("rgb(0,128,0)");
        if(!lvlComplete) { 
        	finishCollision = leftPathCollision() || rightPathCollision() || upPathCollision() || downPathCollision();
		}
        ctx.beginPath();
        for(var x=50;x<1000;x+=100) ctx.rect(x,50,50,50);for(var x=100;x<1050;x+=100) ctx.rect(x,100,50,50);
        for(var x=50;x<1000;x+=100) ctx.rect(x,150,50,50);for(var x=100;x<1050;x+=100) ctx.rect(x,200,50,50);
        for(var x=50;x<1000;x+=100) ctx.rect(x,250,50,50);for(var x=100;x<1050;x+=100) ctx.rect(x,300,50,50);
        for(var x=50;x<1000;x+=100) ctx.rect(x,350,50,50);for(var x=100;x<1050;x+=100) ctx.rect(x,400,50,50);
        for(var x=50;x<1000;x+=100) ctx.rect(x,450,50,50);for(var x=100;x<1050;x+=100) ctx.rect(x,500,50,50);
        fill("white");
        ctx.beginPath();
        ctx.moveTo(50,50);ctx.lineTo(1050,50);ctx.lineTo(1050,550);ctx.lineTo(150,550);ctx.lineTo(150,650);ctx.lineTo(50,650);
        ctx.closePath();ctx.stroke();
    }
    leftWallCollision = leftCollision();
    rightWallCollision = rightCollision();
    upWallCollision = upCollision();
    downWallCollision = downCollision();
    draw_Coins(coinSum[lvl-1],coinSum[lvl]);
    draw_Enemies(lvl);
}
function drawCoins() {
    //1
    Coins[0][0] = 550;Coins[0][1] = 350;
    //2
    Coins[1][0] = 475;Coins[1][1] = 225;
    //3
    Coins[2][0] = 550;Coins[2][1] = 250;
    Coins[3][0] = 700;Coins[3][1] = 400;
    Coins[4][0] = 550;Coins[4][1] = 550;
    //5
    Coins[5][0] = 225;Coins[5][1] = 425;
    Coins[6][0] = 425;Coins[6][1] = 425;
    Coins[7][0] = 625;Coins[7][1] = 425;
    Coins[8][0] = 825;Coins[8][1] = 425;
    //6
    Coins[9][0] = 275;Coins[9][1] = 175;
    Coins[10][0] = 275;Coins[10][1] = 525;
    Coins[11][0] = 825;Coins[11][1] = 175;
    Coins[12][0] = 825;Coins[12][1] = 525;
    //7
    Coins[13][0] = 275;Coins[13][1] = 575;
    Coins[14][0] = 725;Coins[14][1] = 125;
    Coins[15][0] = 725;Coins[15][1] = 575;
    //8
    Coins[16][0] = 950;Coins[16][1] = 550;
    //10
    Coins[17][0] = 375;Coins[17][1] = 175;
    Coins[18][0] = 725;Coins[18][1] = 525;
    //11
    Coins[19][0] = 475;Coins[19][1] = 350;
    //15
    Coins[20][0] = 325;Coins[20][1] = 225;
    Coins[21][0] = 475;Coins[21][1] = 225;
    Coins[22][0] = 625;Coins[22][1] = 475;
    Coins[23][0] = 775;Coins[23][1] = 475;
    //17
    Coins[24][0] = 325;Coins[24][1] = 275;
    Coins[25][0] = 375;Coins[25][1] = 275;
    Coins[26][0] = 425;Coins[26][1] = 275;
    Coins[27][0] = 475;Coins[27][1] = 275;
    Coins[28][0] = 525;Coins[28][1] = 275;
    Coins[29][0] = 575;Coins[29][1] = 275;
    Coins[30][0] = 625;Coins[30][1] = 275;
    Coins[31][0] = 675;Coins[31][1] = 275;
    Coins[32][0] = 725;Coins[32][1] = 275;
    Coins[33][0] = 775;Coins[33][1] = 275;
    Coins[34][0] = 325;Coins[34][1] = 325;
    Coins[35][0] = 375;Coins[35][1] = 325;
    Coins[36][0] = 425;Coins[36][1] = 325;
    Coins[37][0] = 475;Coins[37][1] = 325;
    Coins[38][0] = 525;Coins[38][1] = 325;
    Coins[39][0] = 575;Coins[39][1] = 325;
    Coins[40][0] = 625;Coins[40][1] = 325;
    Coins[41][0] = 675;Coins[41][1] = 325;
    Coins[42][0] = 725;Coins[42][1] = 325;
    Coins[43][0] = 775;Coins[43][1] = 325;
    Coins[44][0] = 325;Coins[44][1] = 375;
    Coins[45][0] = 375;Coins[45][1] = 375;
    Coins[46][0] = 425;Coins[46][1] = 375;
    Coins[47][0] = 475;Coins[47][1] = 375;
    Coins[48][0] = 525;Coins[48][1] = 375;
    Coins[49][0] = 575;Coins[49][1] = 375;
    Coins[50][0] = 625;Coins[50][1] = 375;
    Coins[51][0] = 675;Coins[51][1] = 375;
    Coins[52][0] = 725;Coins[52][1] = 375;
    Coins[53][0] = 775;Coins[53][1] = 375;
    Coins[54][0] = 325;Coins[54][1] = 425;
    Coins[55][0] = 375;Coins[55][1] = 425;
    Coins[56][0] = 425;Coins[56][1] = 425;
    Coins[57][0] = 475;Coins[57][1] = 425;
    Coins[58][0] = 525;Coins[58][1] = 425;
    Coins[59][0] = 575;Coins[59][1] = 425;
    Coins[60][0] = 625;Coins[60][1] = 425;
    Coins[61][0] = 675;Coins[61][1] = 425;
    Coins[62][0] = 725;Coins[62][1] = 425;
    Coins[63][0] = 775;Coins[63][1] = 425;
    Coins[64][0] = 350;Coins[64][1] = 300;
    Coins[65][0] = 400;Coins[65][1] = 300;
    Coins[66][0] = 450;Coins[66][1] = 300;
    Coins[67][0] = 500;Coins[67][1] = 300;
    Coins[68][0] = 550;Coins[68][1] = 300;
    Coins[69][0] = 600;Coins[69][1] = 300;
    Coins[70][0] = 650;Coins[70][1] = 300;
    Coins[71][0] = 700;Coins[71][1] = 300;
    Coins[72][0] = 750;Coins[72][1] = 300;
    Coins[73][0] = 350;Coins[73][1] = 350;
    Coins[74][0] = 400;Coins[74][1] = 350;
    Coins[75][0] = 450;Coins[75][1] = 350;
    Coins[76][0] = 500;Coins[76][1] = 350;
    Coins[77][0] = 550;Coins[77][1] = 350;
    Coins[78][0] = 600;Coins[78][1] = 350;
    Coins[79][0] = 650;Coins[79][1] = 350;
    Coins[80][0] = 700;Coins[80][1] = 350;
    Coins[81][0] = 750;Coins[81][1] = 350;
    Coins[82][0] = 350;Coins[82][1] = 400;
    Coins[83][0] = 400;Coins[83][1] = 400;
    Coins[84][0] = 450;Coins[84][1] = 400;
    Coins[85][0] = 500;Coins[85][1] = 400;
    Coins[86][0] = 550;Coins[86][1] = 400;
    Coins[87][0] = 600;Coins[87][1] = 400;
    Coins[88][0] = 650;Coins[88][1] = 400;
    Coins[89][0] = 700;Coins[89][1] = 400;
    Coins[90][0] = 750;Coins[90][1] = 400;
    //19
    Coins[91][0] = 975;Coins[91][1] = 175;
    Coins[92][0] = 925;Coins[92][1] = 325;
    Coins[93][0] = 775;Coins[93][1] = 225;
    Coins[94][0] = 775;Coins[94][1] = 375;
    Coins[95][0] = 625;Coins[95][1] = 325;
    Coins[96][0] = 475;Coins[96][1] = 225;
    Coins[97][0] = 475;Coins[97][1] = 375;
    //20
    Coins[98][0] = 225;Coins[98][1] = 525;
    Coins[99][0] = 550;Coins[99][1] = 350;
    Coins[100][0] = 875;Coins[100][1] = 175;
    //22
    Coins[101][0] = 525;Coins[101][1] = 175;
    Coins[102][0] = 575;Coins[102][1] = 175;
    Coins[103][0] = 475;Coins[103][1] = 225;
    Coins[104][0] = 525;Coins[104][1] = 225;
    Coins[105][0] = 575;Coins[105][1] = 225;
    Coins[106][0] = 625;Coins[106][1] = 225;
    Coins[107][0] = 425;Coins[107][1] = 275;
    Coins[108][0] = 475;Coins[108][1] = 275;
    Coins[109][0] = 525;Coins[109][1] = 275;
    Coins[110][0] = 575;Coins[110][1] = 275;
    Coins[111][0] = 625;Coins[111][1] = 275;
    Coins[112][0] = 675;Coins[112][1] = 275;
    Coins[113][0] = 375;Coins[113][1] = 325;
    Coins[114][0] = 425;Coins[114][1] = 325;
    Coins[115][0] = 475;Coins[115][1] = 325;
    Coins[116][0] = 625;Coins[116][1] = 325;
    Coins[117][0] = 675;Coins[117][1] = 325;
    Coins[118][0] = 725;Coins[118][1] = 325;
    Coins[119][0] = 375;Coins[119][1] = 375;
    Coins[120][0] = 425;Coins[120][1] = 375;
    Coins[121][0] = 475;Coins[121][1] = 375;
    Coins[122][0] = 625;Coins[122][1] = 375;
    Coins[123][0] = 675;Coins[123][1] = 375;
    Coins[124][0] = 725;Coins[124][1] = 375;
    Coins[125][0] = 425;Coins[125][1] = 425;
    Coins[126][0] = 475;Coins[126][1] = 425;
    Coins[127][0] = 525;Coins[127][1] = 425;
    Coins[128][0] = 575;Coins[128][1] = 425;
    Coins[129][0] = 625;Coins[129][1] = 425;
    Coins[130][0] = 675;Coins[130][1] = 425;
    Coins[131][0] = 475;Coins[131][1] = 475;
    Coins[132][0] = 525;Coins[132][1] = 475;
    Coins[133][0] = 575;Coins[133][1] = 475;
    Coins[134][0] = 625;Coins[134][1] = 475;
    Coins[135][0] = 525;Coins[135][1] = 525;
    Coins[136][0] = 575;Coins[136][1] = 525;
    //25
    Coins[137][0] =  75;Coins[137][1] = 525;
    Coins[138][0] =1025;Coins[138][1] = 525;
    Coins[139][0] = 200;Coins[139][1] = 150;
    Coins[140][0] = 900;Coins[140][1] = 150;
    //26
    Coins[141][0] =1000;Coins[141][1] = 350;
    //28
    Coins[142][0] = 175;Coins[142][1] = 575;
    Coins[143][0] = 925;Coins[143][1] = 575;
    //29
    Coins[144][0] = 100;Coins[144][1] = 100;
    Coins[145][0] = 550;Coins[145][1] = 300;
    Coins[146][0] =1000;Coins[146][1] = 100;
    Coins[147][0] =1000;Coins[147][1] = 500;
}
function draw_Coins(c1,c2) {
    for(var i=c1;i<c2;i++) {
        if(Coins[i][0] != "---") {
            ctx.beginPath();
            ctx.arc(Coins[i][0],Coins[i][1],10,0,2*Math.PI);
            fill("yellow");
            ctx.save();
            ctx.strokeStyle = "rgb(10,10,10)";
            ctx.stroke();
            coinCollision = coinCollision ? true : (leftCollision() || rightCollision() || upCollision() ||
            downCollision());
            ctx.restore();
        }
    }
}
function drawEnemies() {
    //0
    Enemies[0][0] = 325;Enemies[0][1] = 325;Enemies[0][2] = 6;Enemies[0][3] = 0;
    Enemies[1][0] = 325;Enemies[1][1] = 425;Enemies[1][2] = 6;Enemies[1][3] = 0;
    Enemies[2][0] = 775;Enemies[2][1] = 275;Enemies[2][2] =-6;Enemies[2][3] = 0;
    Enemies[3][0] = 775;Enemies[3][1] = 375;Enemies[3][2] =-6;Enemies[3][3] = 0;
    //1
    Enemies[4][0] = 275;Enemies[4][1] = 226;Enemies[4][2] = 0;Enemies[4][3] = 4;
    Enemies[5][0] = 375;Enemies[5][1] = 226;Enemies[5][2] = 0;Enemies[5][3] = 4;
    Enemies[6][0] = 475;Enemies[6][1] = 226;Enemies[6][2] = 0;Enemies[6][3] = 4;
    Enemies[7][0] = 575;Enemies[7][1] = 226;Enemies[7][2] = 0;Enemies[7][3] = 4;
    Enemies[8][0] = 675;Enemies[8][1] = 226;Enemies[8][2] = 0;Enemies[8][3] = 4;
    Enemies[9][0] = 775;Enemies[9][1] = 226;Enemies[9][2] = 0;Enemies[9][3] = 4;
    Enemies[10][0] = 325;Enemies[10][1] = 474;Enemies[10][2] = 0;Enemies[10][3] =-4;
    Enemies[11][0] = 425;Enemies[11][1] = 474;Enemies[11][2] = 0;Enemies[11][3] =-4;
    Enemies[12][0] = 525;Enemies[12][1] = 474;Enemies[12][2] = 0;Enemies[12][3] =-4;
    Enemies[13][0] = 625;Enemies[13][1] = 474;Enemies[13][2] = 0;Enemies[13][3] =-4;
    Enemies[14][0] = 725;Enemies[14][1] = 474;Enemies[14][2] = 0;Enemies[14][3] =-4;
    Enemies[15][0] = 825;Enemies[15][1] = 474;Enemies[15][2] = 0;Enemies[15][3] =-4;
    //2
    Enemies[16][0] = 526;Enemies[16][1] = 275;Enemies[16][2] = 3;Enemies[16][3] = 0;
    Enemies[17][0] = 574;Enemies[17][1] = 275;Enemies[17][2] = 3;Enemies[17][3] = 0;
    Enemies[18][0] = 625;Enemies[18][1] = 275;Enemies[18][2] = 0;Enemies[18][3] = 3;
    Enemies[19][0] = 625;Enemies[19][1] = 326;Enemies[19][2] = 0;Enemies[19][3] = 3;
    Enemies[20][0] = 625;Enemies[20][1] = 374;Enemies[20][2] = 0;Enemies[20][3] = 3;
    Enemies[21][0] = 625;Enemies[21][1] = 425;Enemies[21][2] =-3;Enemies[21][3] = 0;
    Enemies[22][0] = 574;Enemies[22][1] = 425;Enemies[22][2] =-3;Enemies[22][3] = 0;
    Enemies[23][0] = 526;Enemies[23][1] = 425;Enemies[23][2] =-3;Enemies[23][3] = 0;
    Enemies[24][0] = 475;Enemies[24][1] = 425;Enemies[24][2] = 0;Enemies[24][3] =-3;
    Enemies[25][0] = 475;Enemies[25][1] = 374;Enemies[25][2] = 0;Enemies[25][3] =-3;
    //3
    Enemies[26][0] = 550;Enemies[26][1] = 400;Enemies[26][2] = 0;Enemies[26][3] = 0;
    Enemies[27][0] = 550;Enemies[27][1] = 400;Enemies[27][2] = 175;Enemies[27][3] = 0;
    Enemies[28][0] = 550;Enemies[28][1] = 400;Enemies[28][2] = 140;Enemies[28][3] = 0;
    Enemies[29][0] = 550;Enemies[29][1] = 400;Enemies[29][2] = 105;Enemies[29][3] = 0;
    Enemies[30][0] = 550;Enemies[30][1] = 400;Enemies[30][2] =  70;Enemies[30][3] = 0;
    Enemies[31][0] = 550;Enemies[31][1] = 400;Enemies[31][2] =  35;Enemies[31][3] = 0;
    Enemies[32][0] = 550;Enemies[32][1] = 400;Enemies[32][2] = 175;Enemies[32][3] = 1.6;
    Enemies[33][0] = 550;Enemies[33][1] = 400;Enemies[33][2] = 140;Enemies[33][3] = 1.6;
    Enemies[34][0] = 550;Enemies[34][1] = 400;Enemies[34][2] = 105;Enemies[34][3] = 1.6;
    Enemies[35][0] = 550;Enemies[35][1] = 400;Enemies[35][2] =  70;Enemies[35][3] = 1.6;
    Enemies[36][0] = 550;Enemies[36][1] = 400;Enemies[36][2] =  35;Enemies[36][3] = 1.6;
    Enemies[37][0] = 550;Enemies[37][1] = 400;Enemies[37][2] = 175;Enemies[37][3] = 3.2;
    Enemies[38][0] = 550;Enemies[38][1] = 400;Enemies[38][2] = 140;Enemies[38][3] = 3.2;
    Enemies[39][0] = 550;Enemies[39][1] = 400;Enemies[39][2] = 105;Enemies[39][3] = 3.2;
    Enemies[40][0] = 550;Enemies[40][1] = 400;Enemies[40][2] =  70;Enemies[40][3] = 3.2;
    Enemies[41][0] = 550;Enemies[41][1] = 400;Enemies[41][2] =  35;Enemies[41][3] = 3.2;
    Enemies[42][0] = 550;Enemies[42][1] = 400;Enemies[42][2] = 175;Enemies[42][3] = 4.8;
    Enemies[43][0] = 550;Enemies[43][1] = 400;Enemies[43][2] = 140;Enemies[43][3] = 4.8;
    Enemies[44][0] = 550;Enemies[44][1] = 400;Enemies[44][2] = 105;Enemies[44][3] = 4.8;
    Enemies[45][0] = 550;Enemies[45][1] = 400;Enemies[45][2] =  70;Enemies[45][3] = 4.8;
    Enemies[46][0] = 550;Enemies[46][1] = 400;Enemies[46][2] =  35;Enemies[46][3] = 4.8;
    //4
    Enemies[47][0] = 550;Enemies[47][1] = 350;Enemies[47][2] = 375;Enemies[47][3] = 0;
    Enemies[48][0] = 550;Enemies[48][1] = 350;Enemies[48][2] = 275;Enemies[48][3] = 0;
    Enemies[49][0] = 550;Enemies[49][1] = 350;Enemies[49][2] = 175;Enemies[49][3] = 0;
    Enemies[50][0] = 550;Enemies[50][1] = 350;Enemies[50][2] =  75;Enemies[50][3] = 0;
    Enemies[51][0] = 550;Enemies[51][1] = 350;Enemies[51][2] = 375;Enemies[51][3] = 1.6;
    Enemies[52][0] = 550;Enemies[52][1] = 350;Enemies[52][2] = 275;Enemies[52][3] = 1.6;
    Enemies[53][0] = 550;Enemies[53][1] = 350;Enemies[53][2] = 175;Enemies[53][3] = 1.6;
    Enemies[54][0] = 550;Enemies[54][1] = 350;Enemies[54][2] =  75;Enemies[54][3] = 1.6;
    Enemies[55][0] = 550;Enemies[55][1] = 350;Enemies[55][2] = 375;Enemies[55][3] = 3.2;
    Enemies[56][0] = 550;Enemies[56][1] = 350;Enemies[56][2] = 275;Enemies[56][3] = 3.2;
    Enemies[57][0] = 550;Enemies[57][1] = 350;Enemies[57][2] = 175;Enemies[57][3] = 3.2;
    Enemies[58][0] = 550;Enemies[58][1] = 350;Enemies[58][2] =  75;Enemies[58][3] = 3.2;
    Enemies[59][0] = 550;Enemies[59][1] = 350;Enemies[59][2] = 375;Enemies[59][3] = 4.8;
    Enemies[60][0] = 550;Enemies[60][1] = 350;Enemies[60][2] = 275;Enemies[60][3] = 4.8;
    Enemies[61][0] = 550;Enemies[61][1] = 350;Enemies[61][2] = 175;Enemies[61][3] = 4.8;
    Enemies[62][0] = 550;Enemies[62][1] = 350;Enemies[62][2] =  75;Enemies[62][3] = 4.8;
    //5
    Enemies[63][0] = 300;Enemies[63][1] = 200;Enemies[63][2] =   0;Enemies[63][3] = 0;
    Enemies[64][0] = 500;Enemies[64][1] = 200;Enemies[64][2] =   0;Enemies[64][3] = 0;
    Enemies[65][0] = 700;Enemies[65][1] = 200;Enemies[65][2] =   0;Enemies[65][3] = 0;
    Enemies[66][0] = 900;Enemies[66][1] = 200;Enemies[66][2] =   0;Enemies[66][3] = 0;
    Enemies[67][0] = 300;Enemies[67][1] = 500;Enemies[67][2] =   0;Enemies[67][3] = 0;
    Enemies[68][0] = 500;Enemies[68][1] = 500;Enemies[68][2] =   0;Enemies[68][3] = 0;
    Enemies[69][0] = 700;Enemies[69][1] = 500;Enemies[69][2] =   0;Enemies[69][3] = 0;
    Enemies[70][0] = 900;Enemies[70][1] = 500;Enemies[70][2] =   0;Enemies[70][3] = 0;
    Enemies[71][0] = 300;Enemies[71][1] = 200;Enemies[71][2] =  86;Enemies[71][3] = 0;
    Enemies[72][0] = 300;Enemies[72][1] = 200;Enemies[72][2] =  43;Enemies[72][3] = 0;
    Enemies[73][0] = 300;Enemies[73][1] = 200;Enemies[73][2] =  86;Enemies[73][3] = 1.6;
    Enemies[74][0] = 300;Enemies[74][1] = 200;Enemies[74][2] =  43;Enemies[74][3] = 1.6;
    Enemies[75][0] = 300;Enemies[75][1] = 200;Enemies[75][2] =  86;Enemies[75][3] = 3.2;
    Enemies[76][0] = 300;Enemies[76][1] = 200;Enemies[76][2] =  43;Enemies[76][3] = 3.2;
    Enemies[77][0] = 300;Enemies[77][1] = 200;Enemies[77][2] =  86;Enemies[77][3] = 4.8;
    Enemies[78][0] = 300;Enemies[78][1] = 200;Enemies[78][2] =  43;Enemies[78][3] = 4.8;
    Enemies[79][0] = 500;Enemies[79][1] = 200;Enemies[79][2] =  86;Enemies[79][3] = 0;
    Enemies[80][0] = 500;Enemies[80][1] = 200;Enemies[80][2] =  43;Enemies[80][3] = 0;
    Enemies[81][0] = 500;Enemies[81][1] = 200;Enemies[81][2] =  86;Enemies[81][3] = 1.6;
    Enemies[82][0] = 500;Enemies[82][1] = 200;Enemies[82][2] =  43;Enemies[82][3] = 1.6;
    Enemies[83][0] = 500;Enemies[83][1] = 200;Enemies[83][2] =  86;Enemies[83][3] = 3.2;
    Enemies[84][0] = 500;Enemies[84][1] = 200;Enemies[84][2] =  43;Enemies[84][3] = 3.2;
    Enemies[85][0] = 500;Enemies[85][1] = 200;Enemies[85][2] =  86;Enemies[85][3] = 4.8;
    Enemies[86][0] = 500;Enemies[86][1] = 200;Enemies[86][2] =  43;Enemies[86][3] = 4.8;
    Enemies[87][0] = 700;Enemies[87][1] = 200;Enemies[87][2] =  86;Enemies[87][3] = 0;
    Enemies[88][0] = 700;Enemies[88][1] = 200;Enemies[88][2] =  43;Enemies[88][3] = 0;
    Enemies[89][0] = 700;Enemies[89][1] = 200;Enemies[89][2] =  86;Enemies[89][3] = 1.6;
    Enemies[90][0] = 700;Enemies[90][1] = 200;Enemies[90][2] =  43;Enemies[90][3] = 1.6;
    Enemies[91][0] = 700;Enemies[91][1] = 200;Enemies[91][2] =  86;Enemies[91][3] = 3.2;
    Enemies[92][0] = 700;Enemies[92][1] = 200;Enemies[92][2] =  43;Enemies[92][3] = 3.2;
    Enemies[93][0] = 700;Enemies[93][1] = 200;Enemies[93][2] =  86;Enemies[93][3] = 4.8;
    Enemies[94][0] = 700;Enemies[94][1] = 200;Enemies[94][2] =  43;Enemies[94][3] = 4.8;
    Enemies[95][0] = 900;Enemies[95][1] = 200;Enemies[95][2] =  86;Enemies[95][3] = 0;
    Enemies[96][0] = 900;Enemies[96][1] = 200;Enemies[96][2] =  43;Enemies[96][3] = 0;
    Enemies[97][0] = 900;Enemies[97][1] = 200;Enemies[97][2] =  86;Enemies[97][3] = 1.6;
    Enemies[98][0] = 900;Enemies[98][1] = 200;Enemies[98][2] =  43;Enemies[98][3] = 1.6;
    Enemies[99][0] = 900;Enemies[99][1] = 200;Enemies[99][2] =  86;Enemies[99][3] = 3.2;
    Enemies[100][0] = 900;Enemies[100][1] = 200;Enemies[100][2] =  43;Enemies[100][3] = 3.2;
    Enemies[101][0] = 900;Enemies[101][1] = 200;Enemies[101][2] =  86;Enemies[101][3] = 4.8;
    Enemies[102][0] = 900;Enemies[102][1] = 200;Enemies[102][2] =  43;Enemies[102][3] = 4.8;
    Enemies[103][0] = 300;Enemies[103][1] = 500;Enemies[103][2] =  86;Enemies[103][3] = 0;
    Enemies[104][0] = 300;Enemies[104][1] = 500;Enemies[104][2] =  43;Enemies[104][3] = 0;
    Enemies[105][0] = 300;Enemies[105][1] = 500;Enemies[105][2] =  86;Enemies[105][3] = 1.6;
    Enemies[106][0] = 300;Enemies[106][1] = 500;Enemies[106][2] =  43;Enemies[106][3] = 1.6;
    Enemies[107][0] = 300;Enemies[107][1] = 500;Enemies[107][2] =  86;Enemies[107][3] = 3.2;
    Enemies[108][0] = 300;Enemies[108][1] = 500;Enemies[108][2] =  43;Enemies[108][3] = 3.2;
    Enemies[109][0] = 300;Enemies[109][1] = 500;Enemies[109][2] =  86;Enemies[109][3] = 4.8;
    Enemies[110][0] = 300;Enemies[110][1] = 500;Enemies[110][2] =  43;Enemies[110][3] = 4.8;
    Enemies[111][0] = 500;Enemies[111][1] = 500;Enemies[111][2] =  86;Enemies[111][3] = 0;
    Enemies[112][0] = 500;Enemies[112][1] = 500;Enemies[112][2] =  43;Enemies[112][3] = 0;
    Enemies[113][0] = 500;Enemies[113][1] = 500;Enemies[113][2] =  86;Enemies[113][3] = 1.6;
    Enemies[114][0] = 500;Enemies[114][1] = 500;Enemies[114][2] =  43;Enemies[114][3] = 1.6;
    Enemies[115][0] = 500;Enemies[115][1] = 500;Enemies[115][2] =  86;Enemies[115][3] = 3.2;
    Enemies[116][0] = 500;Enemies[116][1] = 500;Enemies[116][2] =  43;Enemies[116][3] = 3.2;
    Enemies[117][0] = 500;Enemies[117][1] = 500;Enemies[117][2] =  86;Enemies[117][3] = 4.8;
    Enemies[118][0] = 500;Enemies[118][1] = 500;Enemies[118][2] =  43;Enemies[118][3] = 4.8;
    Enemies[119][0] = 700;Enemies[119][1] = 500;Enemies[119][2] =  86;Enemies[119][3] = 0;
    Enemies[120][0] = 700;Enemies[120][1] = 500;Enemies[120][2] =  43;Enemies[120][3] = 0;
    Enemies[121][0] = 700;Enemies[121][1] = 500;Enemies[121][2] =  86;Enemies[121][3] = 1.6;
    Enemies[122][0] = 700;Enemies[122][1] = 500;Enemies[122][2] =  43;Enemies[122][3] = 1.6;
    Enemies[123][0] = 700;Enemies[123][1] = 500;Enemies[123][2] =  86;Enemies[123][3] = 3.2;
    Enemies[124][0] = 700;Enemies[124][1] = 500;Enemies[124][2] =  43;Enemies[124][3] = 3.2;
    Enemies[125][0] = 700;Enemies[125][1] = 500;Enemies[125][2] =  86;Enemies[125][3] = 4.8;
    Enemies[126][0] = 700;Enemies[126][1] = 500;Enemies[126][2] =  43;Enemies[126][3] = 4.8;
    Enemies[127][0] = 900;Enemies[127][1] = 500;Enemies[127][2] =  86;Enemies[127][3] = 0;
    Enemies[128][0] = 900;Enemies[128][1] = 500;Enemies[128][2] =  43;Enemies[128][3] = 0;
    Enemies[129][0] = 900;Enemies[129][1] = 500;Enemies[129][2] =  86;Enemies[129][3] = 1.6;
    Enemies[130][0] = 900;Enemies[130][1] = 500;Enemies[130][2] =  43;Enemies[130][3] = 1.6;
    Enemies[131][0] = 900;Enemies[131][1] = 500;Enemies[131][2] =  86;Enemies[131][3] = 3.2;
    Enemies[132][0] = 900;Enemies[132][1] = 500;Enemies[132][2] =  43;Enemies[132][3] = 3.2;
    Enemies[133][0] = 900;Enemies[133][1] = 500;Enemies[133][2] =  86;Enemies[133][3] = 4.8;
    Enemies[134][0] = 900;Enemies[134][1] = 500;Enemies[134][2] =  43;Enemies[134][3] = 4.8;
    //6
    Enemies[135][0] = 275;Enemies[135][1] = 170;Enemies[135][2] =   0;Enemies[135][3] = 8;
    Enemies[136][0] = 325;Enemies[136][1] = 530;Enemies[136][2] =   0;Enemies[136][3] = -8;
    Enemies[137][0] = 375;Enemies[137][1] = 170;Enemies[137][2] =   0;Enemies[137][3] = 8;
    Enemies[138][0] = 425;Enemies[138][1] = 530;Enemies[138][2] =   0;Enemies[138][3] = -8;
    Enemies[139][0] = 475;Enemies[139][1] = 170;Enemies[139][2] =   0;Enemies[139][3] = 8;
    Enemies[140][0] = 525;Enemies[140][1] = 530;Enemies[140][2] =   0;Enemies[140][3] = -8;
    Enemies[141][0] = 575;Enemies[141][1] = 170;Enemies[141][2] =   0;Enemies[141][3] = 8;
    Enemies[142][0] = 625;Enemies[142][1] = 530;Enemies[142][2] =   0;Enemies[142][3] = -8;
    Enemies[143][0] = 675;Enemies[143][1] = 170;Enemies[143][2] =   0;Enemies[143][3] = 8;
    Enemies[144][0] = 725;Enemies[144][1] = 530;Enemies[144][2] =   0;Enemies[144][3] = -8;
    Enemies[145][0] = 775;Enemies[145][1] = 170;Enemies[145][2] =   0;Enemies[145][3] = 8;
    Enemies[146][0] = 825;Enemies[146][1] = 530;Enemies[146][2] =   0;Enemies[146][3] = -8;
    //7
    Enemies[147][0] = 274;Enemies[147][1] = 124;Enemies[147][2] =   4;Enemies[147][3] = 0;
    Enemies[148][0] = 274;Enemies[148][1] = 274;Enemies[148][2] =   4;Enemies[148][3] = 0;
    Enemies[149][0] = 274;Enemies[149][1] = 424;Enemies[149][2] =   4;Enemies[149][3] = 0;
    Enemies[150][0] = 726;Enemies[150][1] = 124;Enemies[150][2] =  -4;Enemies[150][3] = 0;
    Enemies[151][0] = 726;Enemies[151][1] = 274;Enemies[151][2] =  -4;Enemies[151][3] = 0;
    Enemies[152][0] = 726;Enemies[152][1] = 424;Enemies[152][2] =  -4;Enemies[152][3] = 0;
    Enemies[153][0] = 424;Enemies[153][1] = 174;Enemies[153][2] =   4;Enemies[153][3] = 0;
    //8
    Enemies[154][0] = 250;Enemies[154][1] = 225;Enemies[154][2] =   0;Enemies[154][3] = 0;
    Enemies[155][0] = 325;Enemies[155][1] = 150;Enemies[155][2] =   0;Enemies[155][3] = 0;
    Enemies[156][0] = 450;Enemies[156][1] = 175;Enemies[156][2] =   0;Enemies[156][3] = 0;
    Enemies[157][0] = 525;Enemies[157][1] = 250;Enemies[157][2] =   0;Enemies[157][3] = 0;
    Enemies[158][0] = 175;Enemies[158][1] = 350;Enemies[158][2] =   0;Enemies[158][3] = 0;
    Enemies[159][0] = 125;Enemies[159][1] = 450;Enemies[159][2] =   0;Enemies[159][3] = 0;
    Enemies[160][0] = 250;Enemies[160][1] = 525;Enemies[160][2] =   0;Enemies[160][3] = 0;
    Enemies[161][0] = 325;Enemies[161][1] = 450;Enemies[161][2] =   0;Enemies[161][3] = 0;
    Enemies[162][0] = 400;Enemies[162][1] = 425;Enemies[162][2] =   0;Enemies[162][3] = 0;
    Enemies[163][0] = 475;Enemies[163][1] = 475;Enemies[163][2] =   0;Enemies[163][3] = 0;
    Enemies[164][0] = 725;Enemies[164][1] = 550;Enemies[164][2] =   0;Enemies[164][3] = 0;
    Enemies[165][0] = 725;Enemies[165][1] = 350;Enemies[165][2] =   0;Enemies[165][3] = 0;
    Enemies[166][0] = 775;Enemies[166][1] = 250;Enemies[166][2] =   0;Enemies[166][3] = 0;
    Enemies[167][0] = 850;Enemies[167][1] = 175;Enemies[167][2] =   0;Enemies[167][3] = 0;
    Enemies[168][0] = 925;Enemies[168][1] = 250;Enemies[168][2] =   0;Enemies[168][3] = 0;
    Enemies[169][0] = 125;Enemies[169][1] = 225;Enemies[169][2] =   5;Enemies[169][3] = 0;
    Enemies[170][0] = 375;Enemies[170][1] = 275;Enemies[170][2] =  -5;Enemies[170][3] = 0;
    Enemies[171][0] = 575;Enemies[171][1] = 175;Enemies[171][2] =  -5;Enemies[171][3] = 0;
    Enemies[172][0] = 175;Enemies[172][1] = 575;Enemies[172][2] =  -5;Enemies[172][3] = 0;
    Enemies[173][0] = 375;Enemies[173][1] = 575;Enemies[173][2] =  -5;Enemies[173][3] = 0;
    Enemies[174][0] = 725;Enemies[174][1] = 425;Enemies[174][2] =   5;Enemies[174][3] = 0;
    Enemies[175][0] = 725;Enemies[175][1] = 125;Enemies[175][2] =   5;Enemies[175][3] = 0;
    Enemies[176][0] = 975;Enemies[176][1] = 175;Enemies[176][2] =  -5;Enemies[176][3] = 0;
    Enemies[177][0] = 525;Enemies[177][1] = 376;Enemies[177][2] =   5;Enemies[177][3] = 0;
    Enemies[178][0] = 901;Enemies[178][1] = 575;Enemies[178][2] =   0;Enemies[178][3] = -5;
    //9
    Enemies[179][0] = 486;Enemies[179][1] = 275;Enemies[179][2] =  -2;Enemies[179][3] = 0;
    Enemies[180][0] = 486;Enemies[180][1] = 375;Enemies[180][2] =  -2;Enemies[180][3] = 0;
    Enemies[181][0] = 386;Enemies[181][1] = 475;Enemies[181][2] =  -2;Enemies[181][3] = 0;
    Enemies[182][0] = 736;Enemies[182][1] = 525;Enemies[182][2] =  -2;Enemies[182][3] = 0;
    Enemies[183][0] = 736;Enemies[183][1] = 425;Enemies[183][2] =  -2;Enemies[183][3] = 0;
    Enemies[184][0] = 636;Enemies[184][1] = 425;Enemies[184][2] =  -2;Enemies[184][3] = 0;
    Enemies[185][0] = 636;Enemies[185][1] = 325;Enemies[185][2] =  -2;Enemies[185][3] = 0;
    Enemies[186][0] = 414;Enemies[186][1] = 325;Enemies[186][2] =   2;Enemies[186][3] = 0;
    Enemies[187][0] = 414;Enemies[187][1] = 425;Enemies[187][2] =   2;Enemies[187][3] = 0;
    Enemies[188][0] = 314;Enemies[188][1] = 425;Enemies[188][2] =   2;Enemies[188][3] = 0;
    Enemies[189][0] = 314;Enemies[189][1] = 525;Enemies[189][2] =   2;Enemies[189][3] = 0;
    Enemies[190][0] = 664;Enemies[190][1] = 475;Enemies[190][2] =   2;Enemies[190][3] = 0;
    Enemies[191][0] = 564;Enemies[191][1] = 375;Enemies[191][2] =   2;Enemies[191][3] = 0;
    Enemies[192][0] = 564;Enemies[192][1] = 275;Enemies[192][2] =   2;Enemies[192][3] = 0;
    Enemies[193][0] = 425;Enemies[193][1] = 514;Enemies[193][2] =   0;Enemies[193][3] = 2;
    Enemies[194][0] = 525;Enemies[194][1] = 514;Enemies[194][2] =   0;Enemies[194][3] = 2;
    Enemies[195][0] = 625;Enemies[195][1] = 514;Enemies[195][2] =   0;Enemies[195][3] = 2;
    Enemies[196][0] = 475;Enemies[196][1] = 586;Enemies[196][2] =   0;Enemies[196][3] = -2;
    Enemies[197][0] = 575;Enemies[197][1] = 586;Enemies[197][2] =   0;Enemies[197][3] = -2;
    //10
    Enemies[198][0] = 550;Enemies[198][1] = 350;Enemies[198][2] = 250;Enemies[198][3] = 0;
    Enemies[199][0] = 550;Enemies[199][1] = 350;Enemies[199][2] = 215;Enemies[199][3] = 0;
    Enemies[200][0] = 550;Enemies[200][1] = 350;Enemies[200][2] = 180;Enemies[200][3] = 0;
    Enemies[201][0] = 550;Enemies[201][1] = 350;Enemies[201][2] = 145;Enemies[201][3] = 0;
    Enemies[202][0] = 550;Enemies[202][1] = 350;Enemies[202][2] = 110;Enemies[202][3] = 0;
    Enemies[203][0] = 550;Enemies[203][1] = 350;Enemies[203][2] =  75;Enemies[203][3] = 0;
    Enemies[204][0] = 550;Enemies[204][1] = 350;Enemies[204][2] =  40;Enemies[204][3] = 0;
    Enemies[205][0] = 550;Enemies[205][1] = 350;Enemies[205][2] = 250;Enemies[205][3] = 1.6;
    Enemies[206][0] = 550;Enemies[206][1] = 350;Enemies[206][2] = 215;Enemies[206][3] = 1.6;
    Enemies[207][0] = 550;Enemies[207][1] = 350;Enemies[207][2] = 180;Enemies[207][3] = 1.6;
    Enemies[208][0] = 550;Enemies[208][1] = 350;Enemies[208][2] = 145;Enemies[208][3] = 1.6;
    Enemies[209][0] = 550;Enemies[209][1] = 350;Enemies[209][2] = 110;Enemies[209][3] = 1.6;
    Enemies[210][0] = 550;Enemies[210][1] = 350;Enemies[210][2] =  75;Enemies[210][3] = 1.6;
    Enemies[211][0] = 550;Enemies[211][1] = 350;Enemies[211][2] =  40;Enemies[211][3] = 1.6
    Enemies[212][0] = 550;Enemies[212][1] = 350;Enemies[212][2] = 250;Enemies[212][3] = 3.2;
    Enemies[213][0] = 550;Enemies[213][1] = 350;Enemies[213][2] = 215;Enemies[213][3] = 3.2;
    Enemies[214][0] = 550;Enemies[214][1] = 350;Enemies[214][2] = 180;Enemies[214][3] = 3.2;
    Enemies[215][0] = 550;Enemies[215][1] = 350;Enemies[215][2] = 145;Enemies[215][3] = 3.2;
    Enemies[216][0] = 550;Enemies[216][1] = 350;Enemies[216][2] = 110;Enemies[216][3] = 3.2;
    Enemies[217][0] = 550;Enemies[217][1] = 350;Enemies[217][2] =  75;Enemies[217][3] = 3.2;
    Enemies[218][0] = 550;Enemies[218][1] = 350;Enemies[218][2] =  40;Enemies[218][3] = 3.2;
    Enemies[219][0] = 550;Enemies[219][1] = 350;Enemies[219][2] = 250;Enemies[219][3] = 4.8;
    Enemies[220][0] = 550;Enemies[220][1] = 350;Enemies[220][2] = 215;Enemies[220][3] = 4.8;
    Enemies[221][0] = 550;Enemies[221][1] = 350;Enemies[221][2] = 180;Enemies[221][3] = 4.8;
    Enemies[222][0] = 550;Enemies[222][1] = 350;Enemies[222][2] = 145;Enemies[222][3] = 4.8;
    Enemies[223][0] = 550;Enemies[223][1] = 350;Enemies[223][2] = 110;Enemies[223][3] = 4.8;
    Enemies[224][0] = 550;Enemies[224][1] = 350;Enemies[224][2] =  75;Enemies[224][3] = 4.8;
    Enemies[225][0] = 550;Enemies[225][1] = 350;Enemies[225][2] =  40;Enemies[225][3] = 4.8;
    //11
    Enemies[226][0] = 313;Enemies[226][1] = 187;Enemies[226][2] =   0;Enemies[226][3] = 2.6;
    Enemies[227][0] = 337;Enemies[227][1] = 187;Enemies[227][2] =   0;Enemies[227][3] = 2.6;
    Enemies[228][0] = 588;Enemies[228][1] = 187;Enemies[228][2] =   0;Enemies[228][3] = 2.6;
    Enemies[229][0] = 612;Enemies[229][1] = 187;Enemies[229][2] =   0;Enemies[229][3] = 2.6;
    Enemies[230][0] = 463;Enemies[230][1] = 512;Enemies[230][2] =   0;Enemies[230][3] = -2.6;
    Enemies[231][0] = 487;Enemies[231][1] = 512;Enemies[231][2] =   0;Enemies[231][3] = -2.6;
    Enemies[232][0] = 763;Enemies[232][1] = 512;Enemies[232][2] =   0;Enemies[232][3] = -2.6;
    Enemies[233][0] = 787;Enemies[233][1] = 512;Enemies[233][2] =   0;Enemies[233][3] = -2.6;
    //12
    Enemies[234][0] = 375;Enemies[234][1] = 225;Enemies[234][2] =   0;Enemies[234][3] = 5;
    Enemies[235][0] = 475;Enemies[235][1] = 225;Enemies[235][2] =   0;Enemies[235][3] = 5;
    Enemies[236][0] = 575;Enemies[236][1] = 225;Enemies[236][2] =   0;Enemies[236][3] = 5;
    Enemies[237][0] = 675;Enemies[237][1] = 225;Enemies[237][2] =   0;Enemies[237][3] = 5;
    Enemies[238][0] = 775;Enemies[238][1] = 225;Enemies[238][2] =   0;Enemies[238][3] = 5;
    Enemies[239][0] = 325;Enemies[239][1] = 475;Enemies[239][2] =   0;Enemies[239][3] = -5;
    Enemies[240][0] = 425;Enemies[240][1] = 475;Enemies[240][2] =   0;Enemies[240][3] = -5;
    Enemies[241][0] = 525;Enemies[241][1] = 475;Enemies[241][2] =   0;Enemies[241][3] = -5;
    Enemies[242][0] = 625;Enemies[242][1] = 475;Enemies[242][2] =   0;Enemies[242][3] = -5;
    Enemies[243][0] = 725;Enemies[243][1] = 475;Enemies[243][2] =   0;Enemies[243][3] = -5;
    Enemies[244][0] = 325;Enemies[244][1] = 325;Enemies[244][2] =   9;Enemies[244][3] = 0;
    Enemies[245][0] = 775;Enemies[245][1] = 375;Enemies[245][2] =  -9;Enemies[245][3] = 0;
    //13
    Enemies[246][0] = 325;Enemies[246][1] = 425;Enemies[246][2] =   0;Enemies[246][3] = 0;
    Enemies[247][0] = 525;Enemies[247][1] = 425;Enemies[247][2] =   0;Enemies[247][3] = 0;
    Enemies[248][0] = 725;Enemies[248][1] = 425;Enemies[248][2] =   0;Enemies[248][3] = 0;
    Enemies[249][0] = 925;Enemies[249][1] = 425;Enemies[249][2] =   0;Enemies[249][3] = 0;
    Enemies[250][0] = 325;Enemies[250][1] = 425;Enemies[250][2] =  30;Enemies[250][3] = 0;
    Enemies[251][0] = 325;Enemies[251][1] = 425;Enemies[251][2] =  60;Enemies[251][3] = 0;
    Enemies[252][0] = 325;Enemies[252][1] = 425;Enemies[252][2] =  30;Enemies[252][3] = 1.6;
    Enemies[253][0] = 325;Enemies[253][1] = 425;Enemies[253][2] =  60;Enemies[253][3] = 1.6;
    Enemies[254][0] = 325;Enemies[254][1] = 425;Enemies[254][2] =  30;Enemies[254][3] = 3.2;
    Enemies[255][0] = 325;Enemies[255][1] = 425;Enemies[255][2] =  60;Enemies[255][3] = 3.2;
    Enemies[256][0] = 325;Enemies[256][1] = 425;Enemies[256][2] =  30;Enemies[256][3] = 4.8;
    Enemies[257][0] = 325;Enemies[257][1] = 425;Enemies[257][2] =  60;Enemies[257][3] = 4.8;
    Enemies[258][0] = 525;Enemies[258][1] = 425;Enemies[258][2] =  30;Enemies[258][3] = 0;
    Enemies[259][0] = 525;Enemies[259][1] = 425;Enemies[259][2] =  60;Enemies[259][3] = 0;
    Enemies[260][0] = 525;Enemies[260][1] = 425;Enemies[260][2] =  30;Enemies[260][3] = 1.6;
    Enemies[261][0] = 525;Enemies[261][1] = 425;Enemies[261][2] =  60;Enemies[261][3] = 1.6;
    Enemies[262][0] = 525;Enemies[262][1] = 425;Enemies[262][2] =  30;Enemies[262][3] = 3.2;
    Enemies[263][0] = 525;Enemies[263][1] = 425;Enemies[263][2] =  60;Enemies[263][3] = 3.2;
    Enemies[264][0] = 525;Enemies[264][1] = 425;Enemies[264][2] =  30;Enemies[264][3] = 4.8;
    Enemies[265][0] = 525;Enemies[265][1] = 425;Enemies[265][2] =  60;Enemies[265][3] = 4.8;
    Enemies[266][0] = 725;Enemies[266][1] = 425;Enemies[266][2] =  30;Enemies[266][3] = 0;
    Enemies[267][0] = 725;Enemies[267][1] = 425;Enemies[267][2] =  60;Enemies[267][3] = 0;
    Enemies[268][0] = 725;Enemies[268][1] = 425;Enemies[268][2] =  30;Enemies[268][3] = 1.6;
    Enemies[269][0] = 725;Enemies[269][1] = 425;Enemies[269][2] =  60;Enemies[269][3] = 1.6;
    Enemies[270][0] = 725;Enemies[270][1] = 425;Enemies[270][2] =  30;Enemies[270][3] = 3.2;
    Enemies[271][0] = 725;Enemies[271][1] = 425;Enemies[271][2] =  60;Enemies[271][3] = 3.2;
    Enemies[272][0] = 725;Enemies[272][1] = 425;Enemies[272][2] =  30;Enemies[272][3] = 4.8;
    Enemies[273][0] = 725;Enemies[273][1] = 425;Enemies[273][2] =  60;Enemies[273][3] = 4.8;
    Enemies[274][0] = 925;Enemies[274][1] = 425;Enemies[274][2] =  30;Enemies[274][3] = 0;
    Enemies[275][0] = 925;Enemies[275][1] = 425;Enemies[275][2] =  60;Enemies[275][3] = 0;
    Enemies[276][0] = 925;Enemies[276][1] = 425;Enemies[276][2] =  30;Enemies[276][3] = 1.6;
    Enemies[277][0] = 925;Enemies[277][1] = 425;Enemies[277][2] =  60;Enemies[277][3] = 1.6;
    Enemies[278][0] = 925;Enemies[278][1] = 425;Enemies[278][2] =  30;Enemies[278][3] = 3.2;
    Enemies[279][0] = 925;Enemies[279][1] = 425;Enemies[279][2] =  60;Enemies[279][3] = 3.2;
    Enemies[280][0] = 925;Enemies[280][1] = 425;Enemies[280][2] =  30;Enemies[280][3] = 4.8;
    Enemies[281][0] = 925;Enemies[281][1] = 425;Enemies[281][2] =  60;Enemies[281][3] = 4.8;
    Enemies[282][0] = 425;Enemies[282][1] = 490;Enemies[282][2] =   0;Enemies[282][3] = -1.6;
    Enemies[283][0] = 625;Enemies[283][1] = 386;Enemies[283][2] =   0;Enemies[283][3] = 1.6;
    Enemies[284][0] = 825;Enemies[284][1] = 490;Enemies[284][2] =   0;Enemies[284][3] = -1.6;
    Enemies[285][0] = 425;Enemies[285][1] = 464;Enemies[285][2] =   0;Enemies[285][3] = -1.6;
    Enemies[286][0] = 625;Enemies[286][1] = 360;Enemies[286][2] =   0;Enemies[286][3] = 1.6;
    Enemies[287][0] = 825;Enemies[287][1] = 464;Enemies[287][2] =   0;Enemies[287][3] = -1.6;
    //14
    Enemies[288][0] =  75;Enemies[288][1] = 575;Enemies[288][2] =   0;Enemies[288][3] = -6;
    Enemies[289][0] = 125;Enemies[289][1] = 275;Enemies[289][2] =   0;Enemies[289][3] = 6;
    Enemies[290][0] = 175;Enemies[290][1] = 575;Enemies[290][2] =   0;Enemies[290][3] = -6;
    Enemies[291][0] = 225;Enemies[291][1] = 475;Enemies[291][2] =   0;Enemies[291][3] = 5;
    Enemies[292][0] = 275;Enemies[292][1] = 575;Enemies[292][2] =   0;Enemies[292][3] = -6;
    Enemies[293][0] = 325;Enemies[293][1] = 125;Enemies[293][2] =   0;Enemies[293][3] = 6;
    Enemies[294][0] = 375;Enemies[294][1] = 575;Enemies[294][2] =   0;Enemies[294][3] = -6;
    Enemies[295][0] = 425;Enemies[295][1] = 125;Enemies[295][2] =   0;Enemies[295][3] = 5;
    Enemies[296][0] = 475;Enemies[296][1] = 575;Enemies[296][2] =   0;Enemies[296][3] = -6;
    Enemies[297][0] = 525;Enemies[297][1] = 125;Enemies[297][2] =   0;Enemies[297][3] = 6;
    Enemies[298][0] = 575;Enemies[298][1] = 575;Enemies[298][2] =   0;Enemies[298][3] = -6;
    Enemies[299][0] = 625;Enemies[299][1] = 475;Enemies[299][2] =   0;Enemies[299][3] = 5;
    Enemies[300][0] = 675;Enemies[300][1] = 575;Enemies[300][2] =   0;Enemies[300][3] = -6;
    Enemies[301][0] = 725;Enemies[301][1] = 125;Enemies[301][2] =   0;Enemies[301][3] = 6;
    Enemies[302][0] = 775;Enemies[302][1] = 575;Enemies[302][2] =   0;Enemies[302][3] = -6;
    Enemies[303][0] = 825;Enemies[303][1] = 125;Enemies[303][2] =   0;Enemies[303][3] = 5;
    Enemies[304][0] = 875;Enemies[304][1] = 225;Enemies[304][2] =   0;Enemies[304][3] = -5;
    Enemies[305][0] = 925;Enemies[305][1] = 125;Enemies[305][2] =   0;Enemies[305][3] = 6;
    Enemies[306][0] = 975;Enemies[306][1] = 425;Enemies[306][2] =   0;Enemies[306][3] = -6;
    Enemies[307][0] =1025;Enemies[307][1] = 125;Enemies[307][2] =   0;Enemies[307][3] = 6;
    //15
    Enemies[308][0] = 175;Enemies[308][1] = 225;Enemies[308][2] =   2;Enemies[308][3] = 0;
    Enemies[309][0] = 175;Enemies[309][1] = 325;Enemies[309][2] =   2;Enemies[309][3] = 0;
    Enemies[310][0] = 175;Enemies[310][1] = 425;Enemies[310][2] =   2;Enemies[310][3] = 0;
    Enemies[311][0] = 275;Enemies[311][1] = 225;Enemies[311][2] =   2;Enemies[311][3] = 0;
    Enemies[312][0] = 275;Enemies[312][1] = 325;Enemies[312][2] =   2;Enemies[312][3] = 0;
    Enemies[313][0] = 275;Enemies[313][1] = 425;Enemies[313][2] =   2;Enemies[313][3] = 0;
    Enemies[314][0] = 375;Enemies[314][1] = 425;Enemies[314][2] =   2;Enemies[314][3] = 0;
    Enemies[315][0] = 475;Enemies[315][1] = 225;Enemies[315][2] =   2;Enemies[315][3] = 0;
    Enemies[316][0] = 475;Enemies[316][1] = 325;Enemies[316][2] =   2;Enemies[316][3] = 0;
    Enemies[317][0] = 475;Enemies[317][1] = 425;Enemies[317][2] =   2;Enemies[317][3] = 0;
    Enemies[318][0] = 575;Enemies[318][1] = 225;Enemies[318][2] =   2;Enemies[318][3] = 0;
    Enemies[319][0] = 575;Enemies[319][1] = 325;Enemies[319][2] =   2;Enemies[319][3] = 0;
    Enemies[320][0] = 575;Enemies[320][1] = 425;Enemies[320][2] =   2;Enemies[320][3] = 0;
    Enemies[321][0] = 675;Enemies[321][1] = 225;Enemies[321][2] =   2;Enemies[321][3] = 0;
    Enemies[322][0] = 775;Enemies[322][1] = 225;Enemies[322][2] =   2;Enemies[322][3] = 0;
    Enemies[323][0] = 775;Enemies[323][1] = 325;Enemies[323][2] =   2;Enemies[323][3] = 0;
    Enemies[324][0] = 775;Enemies[324][1] = 425;Enemies[324][2] =   2;Enemies[324][3] = 0;
    Enemies[325][0] = 875;Enemies[325][1] = 225;Enemies[325][2] =   2;Enemies[325][3] = 0;
    Enemies[326][0] = 875;Enemies[326][1] = 325;Enemies[326][2] =   2;Enemies[326][3] = 0;
    Enemies[327][0] = 875;Enemies[327][1] = 425;Enemies[327][2] =   2;Enemies[327][3] = 0;
    //16
    Enemies[328][0] = 325;Enemies[328][1] = 175;Enemies[328][2] =   0;Enemies[328][3] = 0;
    Enemies[329][0] = 475;Enemies[329][1] = 225;Enemies[329][2] =   0;Enemies[329][3] = 0;
    Enemies[330][0] = 775;Enemies[330][1] = 425;Enemies[330][2] =   0;Enemies[330][3] = 0;
    Enemies[331][0] = 475;Enemies[331][1] = 475;Enemies[331][2] =   0;Enemies[331][3] = 0;
    Enemies[332][0] = 475;Enemies[332][1] = 575;Enemies[332][2] =   0;Enemies[332][3] = 0;
    Enemies[333][0] = 375;Enemies[333][1] = 425;Enemies[333][2] =   3;Enemies[333][3] = 0;
    Enemies[334][0] = 375;Enemies[334][1] = 275;Enemies[334][2] =   3;Enemies[334][3] = 0;
    Enemies[335][0] = 475;Enemies[335][1] = 625;Enemies[335][2] =   0;Enemies[335][3] = -3;
    Enemies[336][0] = 825;Enemies[336][1] = 625;Enemies[336][2] =   0;Enemies[336][3] = -3;
    Enemies[337][0] = 275;Enemies[337][1] =  75;Enemies[337][2] =   0;Enemies[337][3] = 3;
    Enemies[338][0] = 175;Enemies[338][1] = 525;Enemies[338][2] =   3;Enemies[338][3] = 0;
    Enemies[339][0] = 925;Enemies[339][1] = 175;Enemies[339][2] =  -3;Enemies[339][3] = 0;
    //17
    Enemies[340][0] = 325;Enemies[340][1] = 274;Enemies[340][2] =   0;Enemies[340][3] = 4;
    Enemies[341][0] = 375;Enemies[341][1] = 426;Enemies[341][2] =   0;Enemies[341][3] = -4;
    Enemies[342][0] = 425;Enemies[342][1] = 274;Enemies[342][2] =   0;Enemies[342][3] = 4;
    Enemies[343][0] = 475;Enemies[343][1] = 426;Enemies[343][2] =   0;Enemies[343][3] = -4;
    Enemies[344][0] = 525;Enemies[344][1] = 274;Enemies[344][2] =   0;Enemies[344][3] = 4;
    Enemies[345][0] = 575;Enemies[345][1] = 426;Enemies[345][2] =   0;Enemies[345][3] = -4;
    Enemies[346][0] = 625;Enemies[346][1] = 274;Enemies[346][2] =   0;Enemies[346][3] = 4;
    Enemies[347][0] = 675;Enemies[347][1] = 426;Enemies[347][2] =   0;Enemies[347][3] = -4;
    Enemies[348][0] = 725;Enemies[348][1] = 274;Enemies[348][2] =   0;Enemies[348][3] = 4;
    Enemies[349][0] = 775;Enemies[349][1] = 426;Enemies[349][2] =   0;Enemies[349][3] = -4;
    //18
    Enemies[350][0] = 275;Enemies[350][1] = 475;Enemies[350][2] =   0;Enemies[350][3] = -5;
    Enemies[351][0] = 325;Enemies[351][1] = 225;Enemies[351][2] =   0;Enemies[351][3] = 5;
    Enemies[352][0] = 375;Enemies[352][1] = 475;Enemies[352][2] =   0;Enemies[352][3] = -5;
    Enemies[353][0] = 425;Enemies[353][1] = 225;Enemies[353][2] =   0;Enemies[353][3] = 5;
    Enemies[354][0] = 475;Enemies[354][1] = 475;Enemies[354][2] =   0;Enemies[354][3] = -5;
    Enemies[355][0] = 525;Enemies[355][1] = 225;Enemies[355][2] =   0;Enemies[355][3] = 5;
    Enemies[356][0] = 575;Enemies[356][1] = 475;Enemies[356][2] =   0;Enemies[356][3] = -5;
    Enemies[357][0] = 625;Enemies[357][1] = 225;Enemies[357][2] =   0;Enemies[357][3] = 5;
    Enemies[358][0] = 675;Enemies[358][1] = 475;Enemies[358][2] =   0;Enemies[358][3] = -5;
    Enemies[359][0] = 725;Enemies[359][1] = 225;Enemies[359][2] =   0;Enemies[359][3] = 5;
    Enemies[360][0] = 775;Enemies[360][1] = 475;Enemies[360][2] =   0;Enemies[360][3] = -5;
    Enemies[361][0] = 825;Enemies[361][1] = 225;Enemies[361][2] =   0;Enemies[361][3] = 5;
    Enemies[362][0] = 275;Enemies[362][1] = 225;Enemies[362][2] =   5;Enemies[362][3] = 5;
    Enemies[363][0] = 275;Enemies[363][1] = 475;Enemies[363][2] =   5;Enemies[363][3] = -5;
    Enemies[364][0] = 825;Enemies[364][1] = 225;Enemies[364][2] =  -5;Enemies[364][3] = 5;
    Enemies[365][0] = 825;Enemies[365][1] = 475;Enemies[365][2] =  -5;Enemies[365][3] = -5;
    //19
    Enemies[366][0] = 975;Enemies[366][1] = 425;Enemies[366][2] =   0;Enemies[366][3] = -3;
    Enemies[367][0] = 825;Enemies[367][1] = 425;Enemies[367][2] =   0;Enemies[367][3] = -3;
    Enemies[368][0] = 675;Enemies[368][1] = 425;Enemies[368][2] =   0;Enemies[368][3] = -3;
    Enemies[369][0] = 525;Enemies[369][1] = 425;Enemies[369][2] =   0;Enemies[369][3] = -3;
    Enemies[370][0] = 375;Enemies[370][1] = 425;Enemies[370][2] =   0;Enemies[370][3] = -3;
    Enemies[371][0] = 825;Enemies[371][1] = 275;Enemies[371][2] =   2.5;Enemies[371][3] = 0;
    Enemies[372][0] = 825;Enemies[372][1] = 425;Enemies[372][2] =   2.5;Enemies[372][3] = 0;
    Enemies[373][0] = 675;Enemies[373][1] = 175;Enemies[373][2] =   2.5;Enemies[373][3] = 0;
    Enemies[374][0] = 675;Enemies[374][1] = 325;Enemies[374][2] =   2.5;Enemies[374][3] = 0;
    Enemies[375][0] = 525;Enemies[375][1] = 275;Enemies[375][2] =   2.5;Enemies[375][3] = 0;
    Enemies[376][0] = 525;Enemies[376][1] = 425;Enemies[376][2] =   2.5;Enemies[376][3] = 0;
    Enemies[377][0] = 375;Enemies[377][1] = 175;Enemies[377][2] =   2.5;Enemies[377][3] = 0;
    Enemies[378][0] = 375;Enemies[378][1] = 325;Enemies[378][2] =   2.5;Enemies[378][3] = 0;
    //20
    Enemies[379][0] = 225;Enemies[379][1] = 175;Enemies[379][2] =     0;Enemies[379][3] = 8;
    Enemies[380][0] = 375;Enemies[380][1] = 175;Enemies[380][2] =     0;Enemies[380][3] = 8;
    Enemies[381][0] = 525;Enemies[381][1] = 175;Enemies[381][2] =     0;Enemies[381][3] = 8;
    Enemies[382][0] = 675;Enemies[382][1] = 175;Enemies[382][2] =     0;Enemies[382][3] = 8;
    Enemies[383][0] = 825;Enemies[383][1] = 175;Enemies[383][2] =     0;Enemies[383][3] = 8;
    Enemies[384][0] = 275;Enemies[384][1] = 175;Enemies[384][2] =     0;Enemies[384][3] = 4;
    Enemies[385][0] = 425;Enemies[385][1] = 175;Enemies[385][2] =     0;Enemies[385][3] = 4;
    Enemies[386][0] = 575;Enemies[386][1] = 175;Enemies[386][2] =     0;Enemies[386][3] = 4;
    Enemies[387][0] = 725;Enemies[387][1] = 175;Enemies[387][2] =     0;Enemies[387][3] = 4;
    Enemies[388][0] = 875;Enemies[388][1] = 175;Enemies[388][2] =     0;Enemies[388][3] = 4;
    Enemies[389][0] = 325;Enemies[389][1] = 175;Enemies[389][2] =     0;Enemies[389][3] = 8/3;
    Enemies[390][0] = 475;Enemies[390][1] = 175;Enemies[390][2] =     0;Enemies[390][3] = 8/3;
    Enemies[391][0] = 625;Enemies[391][1] = 175;Enemies[391][2] =     0;Enemies[391][3] = 8/3;
    Enemies[392][0] = 775;Enemies[392][1] = 175;Enemies[392][2] =     0;Enemies[392][3] = 8/3;
    //21
    Enemies[393][0] = 675;Enemies[393][1] = 275;Enemies[393][2] =     0;Enemies[393][3] = -3;
    Enemies[394][0] = 875;Enemies[394][1] = 475;Enemies[394][2] =     0;Enemies[394][3] = -3;
    Enemies[395][0] = 575;Enemies[395][1] = 575;Enemies[395][2] =     0;Enemies[395][3] = -3;
    Enemies[396][0] = 475;Enemies[396][1] = 275;Enemies[396][2] =     0;Enemies[396][3] = -3;
    Enemies[397][0] = 175;Enemies[397][1] = 175;Enemies[397][2] =     0;Enemies[397][3] = -3;
    Enemies[398][0] = 175;Enemies[398][1] = 575;Enemies[398][2] =     0;Enemies[398][3] = -3;
    Enemies[399][0] = 725;Enemies[399][1] = 225;Enemies[399][2] =     0;Enemies[399][3] = 3;
    Enemies[400][0] = 925;Enemies[400][1] = 425;Enemies[400][2] =     0;Enemies[400][3] = 3;
    Enemies[401][0] = 625;Enemies[401][1] = 525;Enemies[401][2] =     0;Enemies[401][3] = 3;
    Enemies[402][0] = 525;Enemies[402][1] = 225;Enemies[402][2] =     0;Enemies[402][3] = 3;
    Enemies[403][0] = 225;Enemies[403][1] = 125;Enemies[403][2] =     0;Enemies[403][3] = 3;
    Enemies[404][0] = 225;Enemies[404][1] = 525;Enemies[404][2] =     0;Enemies[404][3] = 3;
    Enemies[405][0] = 675;Enemies[405][1] = 175;Enemies[405][2] =     0;Enemies[405][3] = -3;
    Enemies[406][0] = 675;Enemies[406][1] = 375;Enemies[406][2] =     0;Enemies[406][3] = -3;
    Enemies[407][0] = 675;Enemies[407][1] = 575;Enemies[407][2] =     0;Enemies[407][3] = -3;
    Enemies[408][0] = 275;Enemies[408][1] = 175;Enemies[408][2] =     0;Enemies[408][3] = -3;
    Enemies[409][0] = 925;Enemies[409][1] = 125;Enemies[409][2] =     0;Enemies[409][3] = 3;
    Enemies[410][0] = 925;Enemies[410][1] = 325;Enemies[410][2] =     0;Enemies[410][3] = 3;
    Enemies[411][0] = 925;Enemies[411][1] = 525;Enemies[411][2] =     0;Enemies[411][3] = 3;
    Enemies[412][0] = 525;Enemies[412][1] = 125;Enemies[412][2] =     0;Enemies[412][3] = 3;
    Enemies[413][0] = 175;Enemies[413][1] = 475;Enemies[413][2] =     3;Enemies[413][3] = 0;
    Enemies[414][0] = 475;Enemies[414][1] = 575;Enemies[414][2] =     3;Enemies[414][3] = 0;
    Enemies[415][0] = 225;Enemies[415][1] = 225;Enemies[415][2] =    -3;Enemies[415][3] = 0;
    Enemies[416][0] = 525;Enemies[416][1] = 325;Enemies[416][2] =    -3;Enemies[416][3] = 0;
    //22
    Enemies[417][0] = 550;Enemies[417][1] = 350;Enemies[417][2] =     0;Enemies[417][3] = 0;
    Enemies[418][0] = 550;Enemies[418][1] = 350;Enemies[418][2] =    24;Enemies[418][3] = 0;
    Enemies[419][0] = 550;Enemies[419][1] = 350;Enemies[419][2] =    48;Enemies[419][3] = 0;
    Enemies[420][0] = 550;Enemies[420][1] = 350;Enemies[420][2] =    72;Enemies[420][3] = 0;
    Enemies[421][0] = 550;Enemies[421][1] = 350;Enemies[421][2] =    96;Enemies[421][3] = 0;
    Enemies[422][0] = 550;Enemies[422][1] = 350;Enemies[422][2] =   120;Enemies[422][3] = 0;
    Enemies[423][0] = 550;Enemies[423][1] = 350;Enemies[423][2] =   144;Enemies[423][3] = 0;
    Enemies[424][0] = 550;Enemies[424][1] = 350;Enemies[424][2] =   168;Enemies[424][3] = 0;
    Enemies[425][0] = 550;Enemies[425][1] = 350;Enemies[425][2] =   192;Enemies[425][3] = 0;
    Enemies[426][0] = 550;Enemies[426][1] = 350;Enemies[426][2] =   216;Enemies[426][3] = 0;
    Enemies[427][0] = 550;Enemies[427][1] = 350;Enemies[427][2] =   240;Enemies[427][3] = 0;
    Enemies[428][0] = 550;Enemies[428][1] = 350;Enemies[428][2] =    24;Enemies[428][3] = 1.6;
    Enemies[429][0] = 550;Enemies[429][1] = 350;Enemies[429][2] =    48;Enemies[429][3] = 1.6;
    Enemies[430][0] = 550;Enemies[430][1] = 350;Enemies[430][2] =    72;Enemies[430][3] = 1.6;
    Enemies[431][0] = 550;Enemies[431][1] = 350;Enemies[431][2] =    96;Enemies[431][3] = 1.6;
    Enemies[432][0] = 550;Enemies[432][1] = 350;Enemies[432][2] =   120;Enemies[432][3] = 1.6;
    Enemies[433][0] = 550;Enemies[433][1] = 350;Enemies[433][2] =   144;Enemies[433][3] = 1.6;
    Enemies[434][0] = 550;Enemies[434][1] = 350;Enemies[434][2] =   168;Enemies[434][3] = 1.6;
    Enemies[435][0] = 550;Enemies[435][1] = 350;Enemies[435][2] =   192;Enemies[435][3] = 1.6;
    Enemies[436][0] = 550;Enemies[436][1] = 350;Enemies[436][2] =   216;Enemies[436][3] = 1.6;
    Enemies[437][0] = 550;Enemies[437][1] = 350;Enemies[437][2] =   240;Enemies[437][3] = 1.6;
    Enemies[438][0] = 550;Enemies[438][1] = 350;Enemies[438][2] =    24;Enemies[438][3] = 3.2;
    Enemies[439][0] = 550;Enemies[439][1] = 350;Enemies[439][2] =    48;Enemies[439][3] = 3.2;
    Enemies[440][0] = 550;Enemies[440][1] = 350;Enemies[440][2] =    72;Enemies[440][3] = 3.2;
    Enemies[441][0] = 550;Enemies[441][1] = 350;Enemies[441][2] =    96;Enemies[441][3] = 3.2;
    Enemies[442][0] = 550;Enemies[442][1] = 350;Enemies[442][2] =   120;Enemies[442][3] = 3.2;
    Enemies[443][0] = 550;Enemies[443][1] = 350;Enemies[443][2] =   144;Enemies[443][3] = 3.2;
    Enemies[444][0] = 550;Enemies[444][1] = 350;Enemies[444][2] =   168;Enemies[444][3] = 3.2;
    Enemies[445][0] = 550;Enemies[445][1] = 350;Enemies[445][2] =   192;Enemies[445][3] = 3.2;
    Enemies[446][0] = 550;Enemies[446][1] = 350;Enemies[446][2] =   216;Enemies[446][3] = 3.2;
    Enemies[447][0] = 550;Enemies[447][1] = 350;Enemies[447][2] =   240;Enemies[447][3] = 3.2;
    Enemies[448][0] = 550;Enemies[448][1] = 350;Enemies[448][2] =    24;Enemies[448][3] = 4.8;
    Enemies[449][0] = 550;Enemies[449][1] = 350;Enemies[449][2] =    48;Enemies[449][3] = 4.8;
    Enemies[450][0] = 550;Enemies[450][1] = 350;Enemies[450][2] =    72;Enemies[450][3] = 4.8;
    Enemies[451][0] = 550;Enemies[451][1] = 350;Enemies[451][2] =    96;Enemies[451][3] = 4.8;
    Enemies[452][0] = 550;Enemies[452][1] = 350;Enemies[452][2] =   120;Enemies[452][3] = 4.8;
    Enemies[453][0] = 550;Enemies[453][1] = 350;Enemies[453][2] =   144;Enemies[453][3] = 4.8;
    Enemies[454][0] = 550;Enemies[454][1] = 350;Enemies[454][2] =   168;Enemies[454][3] = 4.8;
    Enemies[455][0] = 550;Enemies[455][1] = 350;Enemies[455][2] =   192;Enemies[455][3] = 4.8;
    Enemies[456][0] = 550;Enemies[456][1] = 350;Enemies[456][2] =   216;Enemies[456][3] = 4.8;
    Enemies[457][0] = 550;Enemies[457][1] = 350;Enemies[457][2] =   240;Enemies[457][3] = 4.8;
    //23
    Enemies[458][0] =  75;Enemies[458][1] = 475;Enemies[458][2] =     0;Enemies[458][3] = -6;
    Enemies[459][0] = 175;Enemies[459][1] = 475;Enemies[459][2] =     0;Enemies[459][3] = -6;
    Enemies[460][0] = 275;Enemies[460][1] = 475;Enemies[460][2] =     0;Enemies[460][3] = -6;
    Enemies[461][0] = 375;Enemies[461][1] = 475;Enemies[461][2] =     0;Enemies[461][3] = -6;
    Enemies[462][0] = 475;Enemies[462][1] = 475;Enemies[462][2] =     0;Enemies[462][3] = -6;
    Enemies[463][0] = 575;Enemies[463][1] = 475;Enemies[463][2] =     0;Enemies[463][3] = -6;
    Enemies[464][0] = 675;Enemies[464][1] = 475;Enemies[464][2] =     0;Enemies[464][3] = -6;
    Enemies[465][0] = 775;Enemies[465][1] = 475;Enemies[465][2] =     0;Enemies[465][3] = -6;
    Enemies[466][0] = 875;Enemies[466][1] = 475;Enemies[466][2] =     0;Enemies[466][3] = -6;
    Enemies[467][0] = 975;Enemies[467][1] = 475;Enemies[467][2] =     0;Enemies[467][3] = -6;
    Enemies[468][0] = 125;Enemies[468][1] = 223;Enemies[468][2] =     0;Enemies[468][3] = 6;
    Enemies[469][0] = 225;Enemies[469][1] = 223;Enemies[469][2] =     0;Enemies[469][3] = 6;
    Enemies[470][0] = 325;Enemies[470][1] = 223;Enemies[470][2] =     0;Enemies[470][3] = 6;
    Enemies[471][0] = 425;Enemies[471][1] = 223;Enemies[471][2] =     0;Enemies[471][3] = 6;
    Enemies[472][0] = 525;Enemies[472][1] = 223;Enemies[472][2] =     0;Enemies[472][3] = 6;
    Enemies[473][0] = 625;Enemies[473][1] = 223;Enemies[473][2] =     0;Enemies[473][3] = 6;
    Enemies[474][0] = 725;Enemies[474][1] = 223;Enemies[474][2] =     0;Enemies[474][3] = 6;
    Enemies[475][0] = 825;Enemies[475][1] = 223;Enemies[475][2] =     0;Enemies[475][3] = 6;
    Enemies[476][0] = 925;Enemies[476][1] = 223;Enemies[476][2] =     0;Enemies[476][3] = 6;
    Enemies[477][0] =1025;Enemies[477][1] = 223;Enemies[477][2] =     0;Enemies[477][3] = 6;
    Enemies[478][0] =  75;Enemies[478][1] = 225;Enemies[478][2] =     4;Enemies[478][3] = 0;
    Enemies[479][0] =  75;Enemies[479][1] = 325;Enemies[479][2] =     4;Enemies[479][3] = 0;
    Enemies[480][0] =  75;Enemies[480][1] = 425;Enemies[480][2] =     4;Enemies[480][3] = 0;
    Enemies[481][0] =1027;Enemies[481][1] = 275;Enemies[481][2] =    -4;Enemies[481][3] = 0;
    Enemies[482][0] =1027;Enemies[482][1] = 375;Enemies[482][2] =    -4;Enemies[482][3] = 0;
    Enemies[483][0] =1027;Enemies[483][1] = 475;Enemies[483][2] =    -4;Enemies[483][3] = 0;
    //24
    Enemies[484][0] = 125;Enemies[484][1] = 225;Enemies[484][2] =  -1.5;Enemies[484][3] = 0;
    Enemies[485][0] = 125;Enemies[485][1] = 275;Enemies[485][2] =  -1.5;Enemies[485][3] = 0;
    Enemies[486][0] = 125;Enemies[486][1] = 325;Enemies[486][2] =  -1.5;Enemies[486][3] = 0;
    Enemies[487][0] = 125;Enemies[487][1] = 375;Enemies[487][2] =  -1.5;Enemies[487][3] = 0;
    Enemies[488][0] = 125;Enemies[488][1] = 425;Enemies[488][2] =  -1.5;Enemies[488][3] = 0;
    Enemies[489][0] = 225;Enemies[489][1] = 225;Enemies[489][2] =  -1.5;Enemies[489][3] = 0;
    Enemies[490][0] = 225;Enemies[490][1] = 275;Enemies[490][2] =  -1.5;Enemies[490][3] = 0;
    Enemies[491][0] = 225;Enemies[491][1] = 325;Enemies[491][2] =  -1.5;Enemies[491][3] = 0;
    Enemies[492][0] = 225;Enemies[492][1] = 375;Enemies[492][2] =  -1.5;Enemies[492][3] = 0;
    Enemies[493][0] = 225;Enemies[493][1] = 425;Enemies[493][2] =  -1.5;Enemies[493][3] = 0;
    Enemies[494][0] = 225;Enemies[494][1] = 475;Enemies[494][2] =     0;Enemies[494][3] = -1.5;
    Enemies[495][0] = 225;Enemies[495][1] = 575;Enemies[495][2] =     0;Enemies[495][3] = -1.5;
    Enemies[496][0] = 275;Enemies[496][1] = 475;Enemies[496][2] =     0;Enemies[496][3] = -1.5;
    Enemies[497][0] = 275;Enemies[497][1] = 575;Enemies[497][2] =     0;Enemies[497][3] = -1.5;
    Enemies[498][0] = 325;Enemies[498][1] = 475;Enemies[498][2] =     0;Enemies[498][3] = -1.5;
    Enemies[499][0] = 325;Enemies[499][1] = 575;Enemies[499][2] =     0;Enemies[499][3] = -1.5;
    Enemies[500][0] = 375;Enemies[500][1] = 475;Enemies[500][2] =     0;Enemies[500][3] = -1.5;
    Enemies[501][0] = 375;Enemies[501][1] = 575;Enemies[501][2] =     0;Enemies[501][3] = -1.5;
    Enemies[502][0] = 425;Enemies[502][1] = 475;Enemies[502][2] =     0;Enemies[502][3] = -1.5;
    Enemies[503][0] = 425;Enemies[503][1] = 575;Enemies[503][2] =     0;Enemies[503][3] = -1.5;
    Enemies[504][0] = 475;Enemies[504][1] = 475;Enemies[504][2] =     0;Enemies[504][3] = -1.5;
    Enemies[505][0] = 475;Enemies[505][1] = 575;Enemies[505][2] =     0;Enemies[505][3] = -1.5;
    Enemies[506][0] = 525;Enemies[506][1] = 475;Enemies[506][2] =     0;Enemies[506][3] = -1.5;
    Enemies[507][0] = 525;Enemies[507][1] = 575;Enemies[507][2] =     0;Enemies[507][3] = -1.5;
    Enemies[508][0] = 575;Enemies[508][1] = 475;Enemies[508][2] =     0;Enemies[508][3] = -1.5;
    Enemies[509][0] = 575;Enemies[509][1] = 575;Enemies[509][2] =     0;Enemies[509][3] = -1.5;
    Enemies[510][0] = 625;Enemies[510][1] = 475;Enemies[510][2] =     0;Enemies[510][3] = -1.5;
    Enemies[511][0] = 625;Enemies[511][1] = 575;Enemies[511][2] =     0;Enemies[511][3] = -1.5;
    Enemies[512][0] = 675;Enemies[512][1] = 475;Enemies[512][2] =     0;Enemies[512][3] = -1.5;
    Enemies[513][0] = 675;Enemies[513][1] = 575;Enemies[513][2] =     0;Enemies[513][3] = -1.5;
    Enemies[514][0] = 725;Enemies[514][1] = 475;Enemies[514][2] =     0;Enemies[514][3] = -1.5;
    Enemies[515][0] = 725;Enemies[515][1] = 575;Enemies[515][2] =     0;Enemies[515][3] = -1.5;
    Enemies[516][0] = 775;Enemies[516][1] = 475;Enemies[516][2] =     0;Enemies[516][3] = -1.5;
    Enemies[517][0] = 775;Enemies[517][1] = 575;Enemies[517][2] =     0;Enemies[517][3] = -1.5;
    Enemies[518][0] = 825;Enemies[518][1] = 475;Enemies[518][2] =     0;Enemies[518][3] = -1.5;
    Enemies[519][0] = 825;Enemies[519][1] = 575;Enemies[519][2] =     0;Enemies[519][3] = -1.5;
    Enemies[520][0] = 875;Enemies[520][1] = 475;Enemies[520][2] =     0;Enemies[520][3] = -1.5;
    Enemies[521][0] = 875;Enemies[521][1] = 575;Enemies[521][2] =     0;Enemies[521][3] = -1.5;
    Enemies[522][0] = 925;Enemies[522][1] = 475;Enemies[522][2] =     0;Enemies[522][3] = -1.5;
    Enemies[523][0] = 925;Enemies[523][1] = 575;Enemies[523][2] =     0;Enemies[523][3] = -1.5;
    Enemies[524][0] = 150;Enemies[524][1] = 500;Enemies[524][2] =    33;Enemies[524][3] = 0;
    Enemies[525][0] = 150;Enemies[525][1] = 500;Enemies[525][2] =    66;Enemies[525][3] = 0;
    Enemies[526][0] = 150;Enemies[526][1] = 500;Enemies[526][2] =   100;Enemies[526][3] = 0;
    Enemies[527][0] = 150;Enemies[527][1] = 500;Enemies[527][2] =    33;Enemies[527][3] = 3.2;
    Enemies[528][0] = 150;Enemies[528][1] = 500;Enemies[528][2] =    66;Enemies[528][3] = 3.2;
    Enemies[529][0] = 150;Enemies[529][1] = 500;Enemies[529][2] =   100;Enemies[529][3] = 3.2;
    Enemies[530][0] = 150;Enemies[530][1] = 500;Enemies[530][2] =     0;Enemies[530][3] = 0;
    //25
    Enemies[531][0] =  75;Enemies[531][1] = 575;Enemies[531][2] =     0;Enemies[531][3] = -2.5;
    Enemies[532][0] = 175;Enemies[532][1] = 575;Enemies[532][2] =     0;Enemies[532][3] = -2.5;
    Enemies[533][0] = 275;Enemies[533][1] = 575;Enemies[533][2] =     0;Enemies[533][3] = -2.5;
    Enemies[534][0] = 375;Enemies[534][1] = 575;Enemies[534][2] =     0;Enemies[534][3] = -2.5;
    Enemies[535][0] = 725;Enemies[535][1] = 575;Enemies[535][2] =     0;Enemies[535][3] = -2.5;
    Enemies[536][0] = 825;Enemies[536][1] = 575;Enemies[536][2] =     0;Enemies[536][3] = -2.5;
    Enemies[537][0] = 925;Enemies[537][1] = 575;Enemies[537][2] =     0;Enemies[537][3] = -2.5;
    Enemies[538][0] =1025;Enemies[538][1] = 575;Enemies[538][2] =     0;Enemies[538][3] = -2.5;
    Enemies[539][0] = 325;Enemies[539][1] = 325;Enemies[539][2] =     0;Enemies[539][3] = -2.5;
    Enemies[540][0] = 425;Enemies[540][1] = 425;Enemies[540][2] =     0;Enemies[540][3] = -2.5;
    Enemies[541][0] = 625;Enemies[541][1] = 475;Enemies[541][2] =     0;Enemies[541][3] = -2.5;
    Enemies[542][0] = 725;Enemies[542][1] = 375;Enemies[542][2] =     0;Enemies[542][3] = -2.5;
    Enemies[543][0] = 825;Enemies[543][1] = 275;Enemies[543][2] =     0;Enemies[543][3] = -2.5;
    Enemies[544][0] = 125;Enemies[544][1] = 475;Enemies[544][2] =     0;Enemies[544][3] = 2.5;
    Enemies[545][0] = 225;Enemies[545][1] = 475;Enemies[545][2] =     0;Enemies[545][3] = 2.5;
    Enemies[546][0] = 325;Enemies[546][1] = 475;Enemies[546][2] =     0;Enemies[546][3] = 2.5;
    Enemies[547][0] = 425;Enemies[547][1] = 475;Enemies[547][2] =     0;Enemies[547][3] = 2.5;
    Enemies[548][0] = 675;Enemies[548][1] = 475;Enemies[548][2] =     0;Enemies[548][3] = 2.5;
    Enemies[549][0] = 775;Enemies[549][1] = 475;Enemies[549][2] =     0;Enemies[549][3] = 2.5;
    Enemies[550][0] = 875;Enemies[550][1] = 475;Enemies[550][2] =     0;Enemies[550][3] = 2.5;
    Enemies[551][0] = 975;Enemies[551][1] = 475;Enemies[551][2] =     0;Enemies[551][3] = 2.5;
    Enemies[552][0] = 275;Enemies[552][1] = 175;Enemies[552][2] =     0;Enemies[552][3] = 2.5;
    Enemies[553][0] = 375;Enemies[553][1] = 275;Enemies[553][2] =     0;Enemies[553][3] = 2.5;
    Enemies[554][0] = 475;Enemies[554][1] = 375;Enemies[554][2] =     0;Enemies[554][3] = 2.5;
    Enemies[555][0] = 675;Enemies[555][1] = 325;Enemies[555][2] =     0;Enemies[555][3] = 2.5;
    Enemies[556][0] = 775;Enemies[556][1] = 225;Enemies[556][2] =     0;Enemies[556][3] = 2.5;
    //26
    Enemies[557][0] = 325;Enemies[557][1] = 125;Enemies[557][2] =     0;Enemies[557][3] = 1.5;
    Enemies[558][0] = 325;Enemies[558][1] = 175;Enemies[558][2] =     0;Enemies[558][3] = 1.5;
    Enemies[559][0] = 325;Enemies[559][1] = 225;Enemies[559][2] =     0;Enemies[559][3] = 1.5;
    Enemies[560][0] = 325;Enemies[560][1] = 375;Enemies[560][2] =     0;Enemies[560][3] = 1.5;
    Enemies[561][0] = 325;Enemies[561][1] = 425;Enemies[561][2] =     0;Enemies[561][3] = 1.5;
    Enemies[562][0] = 325;Enemies[562][1] = 475;Enemies[562][2] =     0;Enemies[562][3] = 1.5;
    Enemies[563][0] = 375;Enemies[563][1] = 125;Enemies[563][2] =     0;Enemies[563][3] = 1.5;
    Enemies[564][0] = 375;Enemies[564][1] = 175;Enemies[564][2] =     0;Enemies[564][3] = 1.5;
    Enemies[565][0] = 375;Enemies[565][1] = 225;Enemies[565][2] =     0;Enemies[565][3] = 1.5;
    Enemies[566][0] = 375;Enemies[566][1] = 375;Enemies[566][2] =     0;Enemies[566][3] = 1.5;
    Enemies[567][0] = 375;Enemies[567][1] = 425;Enemies[567][2] =     0;Enemies[567][3] = 1.5;
    Enemies[568][0] = 375;Enemies[568][1] = 475;Enemies[568][2] =     0;Enemies[568][3] = 1.5;
    Enemies[569][0] = 625;Enemies[569][1] = 125;Enemies[569][2] =     0;Enemies[569][3] = 1.5;
    Enemies[570][0] = 625;Enemies[570][1] = 175;Enemies[570][2] =     0;Enemies[570][3] = 1.5;
    Enemies[571][0] = 625;Enemies[571][1] = 225;Enemies[571][2] =     0;Enemies[571][3] = 1.5;
    Enemies[572][0] = 625;Enemies[572][1] = 375;Enemies[572][2] =     0;Enemies[572][3] = 1.5;
    Enemies[573][0] = 625;Enemies[573][1] = 425;Enemies[573][2] =     0;Enemies[573][3] = 1.5;
    Enemies[574][0] = 625;Enemies[574][1] = 475;Enemies[574][2] =     0;Enemies[574][3] = 1.5;
    Enemies[575][0] = 725;Enemies[575][1] = 125;Enemies[575][2] =     0;Enemies[575][3] = 1.5;
    Enemies[576][0] = 725;Enemies[576][1] = 175;Enemies[576][2] =     0;Enemies[576][3] = 1.5;
    Enemies[577][0] = 725;Enemies[577][1] = 225;Enemies[577][2] =     0;Enemies[577][3] = 1.5;
    Enemies[578][0] = 725;Enemies[578][1] = 375;Enemies[578][2] =     0;Enemies[578][3] = 1.5;
    Enemies[579][0] = 725;Enemies[579][1] = 425;Enemies[579][2] =     0;Enemies[579][3] = 1.5;
    Enemies[580][0] = 725;Enemies[580][1] = 475;Enemies[580][2] =     0;Enemies[580][3] = 1.5;
    Enemies[581][0] = 925;Enemies[581][1] = 125;Enemies[581][2] =     0;Enemies[581][3] = 1.5;
    Enemies[582][0] = 925;Enemies[582][1] = 175;Enemies[582][2] =     0;Enemies[582][3] = 1.5;
    Enemies[583][0] = 925;Enemies[583][1] = 225;Enemies[583][2] =     0;Enemies[583][3] = 1.5;
    Enemies[584][0] = 925;Enemies[584][1] = 375;Enemies[584][2] =     0;Enemies[584][3] = 1.5;
    Enemies[585][0] = 925;Enemies[585][1] = 425;Enemies[585][2] =     0;Enemies[585][3] = 1.5;
    Enemies[586][0] = 925;Enemies[586][1] = 475;Enemies[586][2] =     0;Enemies[586][3] = 1.5;
    Enemies[587][0] = 225;Enemies[587][1] = 475;Enemies[587][2] =     0;Enemies[587][3] = -2.5;
    Enemies[588][0] = 225;Enemies[588][1] = 525;Enemies[588][2] =     0;Enemies[588][3] = -2.5;
    Enemies[589][0] = 225;Enemies[589][1] = 575;Enemies[589][2] =     0;Enemies[589][3] = -2.5;
    Enemies[590][0] = 425;Enemies[590][1] = 475;Enemies[590][2] =     0;Enemies[590][3] = -2.5;
    Enemies[591][0] = 425;Enemies[591][1] = 525;Enemies[591][2] =     0;Enemies[591][3] = -2.5;
    Enemies[592][0] = 425;Enemies[592][1] = 575;Enemies[592][2] =     0;Enemies[592][3] = -2.5;
    Enemies[593][0] = 675;Enemies[593][1] = 475;Enemies[593][2] =     0;Enemies[593][3] = -2.5;
    Enemies[594][0] = 675;Enemies[594][1] = 525;Enemies[594][2] =     0;Enemies[594][3] = -2.5;
    Enemies[595][0] = 675;Enemies[595][1] = 575;Enemies[595][2] =     0;Enemies[595][3] = -2.5;
    Enemies[596][0] = 875;Enemies[596][1] = 475;Enemies[596][2] =     0;Enemies[596][3] = -2.5;
    Enemies[597][0] = 875;Enemies[597][1] = 525;Enemies[597][2] =     0;Enemies[597][3] = -2.5;
    Enemies[598][0] = 875;Enemies[598][1] = 575;Enemies[598][2] =     0;Enemies[598][3] = -2.5;
    Enemies[599][0] = 475;Enemies[599][1] = 125;Enemies[599][2] =     0;Enemies[599][3] = 2.5;
    Enemies[600][0] = 475;Enemies[600][1] = 175;Enemies[600][2] =     0;Enemies[600][3] = 2.5;
    Enemies[601][0] = 475;Enemies[601][1] = 225;Enemies[601][2] =     0;Enemies[601][3] = 2.5;
    Enemies[602][0] = 825;Enemies[602][1] = 125;Enemies[602][2] =     0;Enemies[602][3] = 2.5;
    Enemies[603][0] = 825;Enemies[603][1] = 175;Enemies[603][2] =     0;Enemies[603][3] = 2.5;
    Enemies[604][0] = 825;Enemies[604][1] = 225;Enemies[604][2] =     0;Enemies[604][3] = 2.5;
    Enemies[605][0] = 175;Enemies[605][1] = 225;Enemies[605][2] =     0;Enemies[605][3] = -1.5;
    Enemies[606][0] = 175;Enemies[606][1] = 275;Enemies[606][2] =     0;Enemies[606][3] = -1.5;
    Enemies[607][0] = 175;Enemies[607][1] = 325;Enemies[607][2] =     0;Enemies[607][3] = -1.5;
    Enemies[608][0] = 175;Enemies[608][1] = 475;Enemies[608][2] =     0;Enemies[608][3] = -1.5;
    Enemies[609][0] = 175;Enemies[609][1] = 525;Enemies[609][2] =     0;Enemies[609][3] = -1.5;
    Enemies[610][0] = 175;Enemies[610][1] = 575;Enemies[610][2] =     0;Enemies[610][3] = -1.5;
    Enemies[611][0] = 275;Enemies[611][1] = 275;Enemies[611][2] =     0;Enemies[611][3] = -2.25;
    Enemies[612][0] = 275;Enemies[612][1] = 425;Enemies[612][2] =     0;Enemies[612][3] = -2.25;
    Enemies[613][0] = 275;Enemies[613][1] = 575;Enemies[613][2] =     0;Enemies[613][3] = -2.25;
    Enemies[614][0] = 575;Enemies[614][1] = 275;Enemies[614][2] =     0;Enemies[614][3] = -2.25;
    Enemies[615][0] = 575;Enemies[615][1] = 425;Enemies[615][2] =     0;Enemies[615][3] = -2.25;
    Enemies[616][0] = 575;Enemies[616][1] = 575;Enemies[616][2] =     0;Enemies[616][3] = -2.25;
    Enemies[617][0] = 525;Enemies[617][1] = 125;Enemies[617][2] =     0;Enemies[617][3] = 2.25;
    Enemies[618][0] = 525;Enemies[618][1] = 275;Enemies[618][2] =     0;Enemies[618][3] = 2.25;
    Enemies[619][0] = 525;Enemies[619][1] = 425;Enemies[619][2] =     0;Enemies[619][3] = 2.25;
    Enemies[620][0] = 775;Enemies[620][1] = 125;Enemies[620][2] =     0;Enemies[620][3] = 2.25;
    Enemies[621][0] = 775;Enemies[621][1] = 275;Enemies[621][2] =     0;Enemies[621][3] = 2.25;
    Enemies[622][0] = 775;Enemies[622][1] = 425;Enemies[622][2] =     0;Enemies[622][3] = 2.25;
    //27
    Enemies[623][0] = 275;Enemies[623][1] =  75;Enemies[623][2] =     0;Enemies[623][3] = 4;
    Enemies[624][0] = 375;Enemies[624][1] =  75;Enemies[624][2] =     0;Enemies[624][3] = 4;
    Enemies[625][0] = 475;Enemies[625][1] =  75;Enemies[625][2] =     0;Enemies[625][3] = 4;
    Enemies[626][0] = 575;Enemies[626][1] =  75;Enemies[626][2] =     0;Enemies[626][3] = 4;
    Enemies[627][0] = 675;Enemies[627][1] =  75;Enemies[627][2] =     0;Enemies[627][3] = 4;
    Enemies[628][0] = 775;Enemies[628][1] =  75;Enemies[628][2] =     0;Enemies[628][3] = 4;
    Enemies[629][0] = 875;Enemies[629][1] =  75;Enemies[629][2] =     0;Enemies[629][3] = 4;
    Enemies[630][0] = 225;Enemies[630][1] = 425;Enemies[630][2] =     0;Enemies[630][3] = 4;
    Enemies[631][0] = 325;Enemies[631][1] = 425;Enemies[631][2] =     0;Enemies[631][3] = 4;
    Enemies[632][0] = 425;Enemies[632][1] = 425;Enemies[632][2] =     0;Enemies[632][3] = 4;
    Enemies[633][0] = 525;Enemies[633][1] = 425;Enemies[633][2] =     0;Enemies[633][3] = 4;
    Enemies[634][0] = 625;Enemies[634][1] = 425;Enemies[634][2] =     0;Enemies[634][3] = 4;
    Enemies[635][0] = 725;Enemies[635][1] = 425;Enemies[635][2] =     0;Enemies[635][3] = 4;
    Enemies[636][0] = 825;Enemies[636][1] = 425;Enemies[636][2] =     0;Enemies[636][3] = 4;
    Enemies[637][0] = 925;Enemies[637][1] = 425;Enemies[637][2] =     0;Enemies[637][3] = 4;
    Enemies[638][0] = 225;Enemies[638][1] = 275;Enemies[638][2] =     0;Enemies[638][3] = -4;
    Enemies[639][0] = 325;Enemies[639][1] = 275;Enemies[639][2] =     0;Enemies[639][3] = -4;
    Enemies[640][0] = 425;Enemies[640][1] = 275;Enemies[640][2] =     0;Enemies[640][3] = -4;
    Enemies[641][0] = 525;Enemies[641][1] = 275;Enemies[641][2] =     0;Enemies[641][3] = -4;
    Enemies[642][0] = 625;Enemies[642][1] = 275;Enemies[642][2] =     0;Enemies[642][3] = -4;
    Enemies[643][0] = 725;Enemies[643][1] = 275;Enemies[643][2] =     0;Enemies[643][3] = -4;
    Enemies[644][0] = 825;Enemies[644][1] = 275;Enemies[644][2] =     0;Enemies[644][3] = -4;
    Enemies[645][0] = 925;Enemies[645][1] = 275;Enemies[645][2] =     0;Enemies[645][3] = -4;
    Enemies[646][0] = 275;Enemies[646][1] = 625;Enemies[646][2] =     0;Enemies[646][3] = -4;
    Enemies[647][0] = 375;Enemies[647][1] = 625;Enemies[647][2] =     0;Enemies[647][3] = -4;
    Enemies[648][0] = 475;Enemies[648][1] = 625;Enemies[648][2] =     0;Enemies[648][3] = -4;
    Enemies[649][0] = 575;Enemies[649][1] = 625;Enemies[649][2] =     0;Enemies[649][3] = -4;
    Enemies[650][0] = 675;Enemies[650][1] = 625;Enemies[650][2] =     0;Enemies[650][3] = -4;
    Enemies[651][0] = 775;Enemies[651][1] = 625;Enemies[651][2] =     0;Enemies[651][3] = -4;
    Enemies[652][0] = 875;Enemies[652][1] = 625;Enemies[652][2] =     0;Enemies[652][3] = -4;
    Enemies[653][0] = 225;Enemies[653][1] = 475;Enemies[653][2] =     4;Enemies[653][3] = 0;
    Enemies[654][0] = 225;Enemies[654][1] = 525;Enemies[654][2] =     4;Enemies[654][3] = 0;
    Enemies[655][0] = 225;Enemies[655][1] = 575;Enemies[655][2] =     4;Enemies[655][3] = 0;
    Enemies[656][0] = 225;Enemies[656][1] = 625;Enemies[656][2] =     4;Enemies[656][3] = 0;
    Enemies[657][0] = 475;Enemies[657][1] = 425;Enemies[657][2] =     4;Enemies[657][3] = 0;
    Enemies[658][0] = 475;Enemies[658][1] = 475;Enemies[658][2] =     4;Enemies[658][3] = 0;
    Enemies[659][0] = 475;Enemies[659][1] = 525;Enemies[659][2] =     4;Enemies[659][3] = 0;
    Enemies[660][0] = 475;Enemies[660][1] = 575;Enemies[660][2] =     4;Enemies[660][3] = 0;
    Enemies[661][0] = 725;Enemies[661][1] = 475;Enemies[661][2] =     4;Enemies[661][3] = 0;
    Enemies[662][0] = 725;Enemies[662][1] = 525;Enemies[662][2] =     4;Enemies[662][3] = 0;
    Enemies[663][0] = 725;Enemies[663][1] = 575;Enemies[663][2] =     4;Enemies[663][3] = 0;
    Enemies[664][0] = 725;Enemies[664][1] = 625;Enemies[664][2] =     4;Enemies[664][3] = 0;
    Enemies[665][0] = 425;Enemies[665][1] =  75;Enemies[665][2] =    -4;Enemies[665][3] = 0;
    Enemies[666][0] = 425;Enemies[666][1] = 125;Enemies[666][2] =    -4;Enemies[666][3] = 0;
    Enemies[667][0] = 425;Enemies[667][1] = 175;Enemies[667][2] =    -4;Enemies[667][3] = 0;
    Enemies[668][0] = 425;Enemies[668][1] = 275;Enemies[668][2] =    -4;Enemies[668][3] = 0;
    Enemies[669][0] = 675;Enemies[669][1] =  75;Enemies[669][2] =    -4;Enemies[669][3] = 0;
    Enemies[670][0] = 675;Enemies[670][1] = 175;Enemies[670][2] =    -4;Enemies[670][3] = 0;
    Enemies[671][0] = 675;Enemies[671][1] = 225;Enemies[671][2] =    -4;Enemies[671][3] = 0;
    Enemies[672][0] = 675;Enemies[672][1] = 275;Enemies[672][2] =    -4;Enemies[672][3] = 0;
    Enemies[673][0] = 925;Enemies[673][1] =  75;Enemies[673][2] =    -4;Enemies[673][3] = 0;
    Enemies[674][0] = 925;Enemies[674][1] = 125;Enemies[674][2] =    -4;Enemies[674][3] = 0;
    Enemies[675][0] = 925;Enemies[675][1] = 175;Enemies[675][2] =    -4;Enemies[675][3] = 0;
    Enemies[676][0] = 925;Enemies[676][1] = 275;Enemies[676][2] =    -4;Enemies[676][3] = 0;
    //28
    Enemies[677][0] = 175;Enemies[677][1] = 325;Enemies[677][2] =     5;Enemies[677][3] = 0;
    Enemies[678][0] = 175;Enemies[678][1] = 425;Enemies[678][2] =     5;Enemies[678][3] = 0;
    Enemies[679][0] = 175;Enemies[679][1] = 525;Enemies[679][2] =     5;Enemies[679][3] = 0;
    Enemies[680][0] = 925;Enemies[680][1] = 275;Enemies[680][2] =    -5;Enemies[680][3] = 0;
    Enemies[681][0] = 925;Enemies[681][1] = 375;Enemies[681][2] =    -5;Enemies[681][3] = 0;
    Enemies[682][0] = 925;Enemies[682][1] = 475;Enemies[682][2] =    -5;Enemies[682][3] = 0;
    Enemies[683][0] = 925;Enemies[683][1] = 575;Enemies[683][2] =    -5;Enemies[683][3] = 0;
    Enemies[684][0] = 225;Enemies[684][1] = 275;Enemies[684][2] =     0;Enemies[684][3] = 5;
    Enemies[685][0] = 325;Enemies[685][1] = 275;Enemies[685][2] =     0;Enemies[685][3] = 5;
    Enemies[686][0] = 425;Enemies[686][1] = 275;Enemies[686][2] =     0;Enemies[686][3] = 5;
    Enemies[687][0] = 525;Enemies[687][1] = 275;Enemies[687][2] =     0;Enemies[687][3] = 5;
    Enemies[688][0] = 625;Enemies[688][1] = 275;Enemies[688][2] =     0;Enemies[688][3] = 5;
    Enemies[689][0] = 725;Enemies[689][1] = 275;Enemies[689][2] =     0;Enemies[689][3] = 5;
    Enemies[690][0] = 825;Enemies[690][1] = 275;Enemies[690][2] =     0;Enemies[690][3] = 5;
    Enemies[691][0] = 925;Enemies[691][1] = 275;Enemies[691][2] =     0;Enemies[691][3] = 5;
    Enemies[692][0] = 175;Enemies[692][1] = 575;Enemies[692][2] =     0;Enemies[692][3] = -5;
    Enemies[693][0] = 275;Enemies[693][1] = 575;Enemies[693][2] =     0;Enemies[693][3] = -5;
    Enemies[694][0] = 375;Enemies[694][1] = 575;Enemies[694][2] =     0;Enemies[694][3] = -5;
    Enemies[695][0] = 475;Enemies[695][1] = 575;Enemies[695][2] =     0;Enemies[695][3] = -5;
    Enemies[696][0] = 575;Enemies[696][1] = 575;Enemies[696][2] =     0;Enemies[696][3] = -5;
    Enemies[697][0] = 675;Enemies[697][1] = 575;Enemies[697][2] =     0;Enemies[697][3] = -5;
    Enemies[698][0] = 775;Enemies[698][1] = 575;Enemies[698][2] =     0;Enemies[698][3] = -5;
    Enemies[699][0] = 875;Enemies[699][1] = 575;Enemies[699][2] =     0;Enemies[699][3] = -5;
    //29
    Enemies[700][0] = 125;Enemies[700][1] =  75;Enemies[700][2] =     0;Enemies[700][3] = 1.5;
    Enemies[701][0] = 225;Enemies[701][1] =  75;Enemies[701][2] =     0;Enemies[701][3] = 1.5;
    Enemies[702][0] = 325;Enemies[702][1] =  75;Enemies[702][2] =     0;Enemies[702][3] = 1.5;
    Enemies[703][0] = 425;Enemies[703][1] =  75;Enemies[703][2] =     0;Enemies[703][3] = 1.5;
    Enemies[704][0] = 525;Enemies[704][1] =  75;Enemies[704][2] =     0;Enemies[704][3] = 1.5;
    Enemies[705][0] = 625;Enemies[705][1] =  75;Enemies[705][2] =     0;Enemies[705][3] = 1.5;
    Enemies[706][0] = 725;Enemies[706][1] =  75;Enemies[706][2] =     0;Enemies[706][3] = 1.5;
    Enemies[707][0] = 825;Enemies[707][1] =  75;Enemies[707][2] =     0;Enemies[707][3] = 1.5;
    Enemies[708][0] = 925;Enemies[708][1] =  75;Enemies[708][2] =     0;Enemies[708][3] = 1.5;
    Enemies[709][0] =1025;Enemies[709][1] =  75;Enemies[709][2] =     0;Enemies[709][3] = 1.5;
    Enemies[710][0] =  75;Enemies[710][1] = 525;Enemies[710][2] =     0;Enemies[710][3] = -1.5;
    Enemies[711][0] = 175;Enemies[711][1] = 525;Enemies[711][2] =     0;Enemies[711][3] = -1.5;
    Enemies[712][0] = 275;Enemies[712][1] = 525;Enemies[712][2] =     0;Enemies[712][3] = -1.5;
    Enemies[713][0] = 375;Enemies[713][1] = 525;Enemies[713][2] =     0;Enemies[713][3] = -1.5;
    Enemies[714][0] = 475;Enemies[714][1] = 525;Enemies[714][2] =     0;Enemies[714][3] = -1.5;
    Enemies[715][0] = 575;Enemies[715][1] = 525;Enemies[715][2] =     0;Enemies[715][3] = -1.5;
    Enemies[716][0] = 675;Enemies[716][1] = 525;Enemies[716][2] =     0;Enemies[716][3] = -1.5;
    Enemies[717][0] = 775;Enemies[717][1] = 525;Enemies[717][2] =     0;Enemies[717][3] = -1.5;
    Enemies[718][0] = 875;Enemies[718][1] = 525;Enemies[718][2] =     0;Enemies[718][3] = -1.5;
    Enemies[719][0] = 975;Enemies[719][1] = 525;Enemies[719][2] =     0;Enemies[719][3] = -1.5;
    Enemies[720][0] =  75;Enemies[720][1] = 475;Enemies[720][2] =     0;Enemies[720][3] = -6;
    Enemies[721][0] = 125;Enemies[721][1] = 475;Enemies[721][2] =     0;Enemies[721][3] = -6;
    Enemies[722][0] = 100;Enemies[722][1] = 500;Enemies[722][2] =     0;Enemies[722][3] = -6;
    Enemies[723][0] =  75;Enemies[723][1] = 525;Enemies[723][2] =     0;Enemies[723][3] = -6;
    Enemies[724][0] = 125;Enemies[724][1] = 525;Enemies[724][2] =     0;Enemies[724][3] = -6;
    Enemies[725][0] = 975;Enemies[725][1] =  73;Enemies[725][2] =     0;Enemies[725][3] = 6;
    Enemies[726][0] =1025;Enemies[726][1] =  73;Enemies[726][2] =     0;Enemies[726][3] = 6;
    Enemies[727][0] =1000;Enemies[727][1] =  98;Enemies[727][2] =     0;Enemies[727][3] = 6;
    Enemies[728][0] = 975;Enemies[728][1] = 123;Enemies[728][2] =     0;Enemies[728][3] = 6;
    Enemies[729][0] =1025;Enemies[729][1] = 123;Enemies[729][2] =     0;Enemies[729][3] = 6;
    Enemies[730][0] = 175;Enemies[730][1] = 375;Enemies[730][2] =     0;Enemies[730][3] = -6;
    Enemies[731][0] = 225;Enemies[731][1] = 375;Enemies[731][2] =     0;Enemies[731][3] = -6;
    Enemies[732][0] = 200;Enemies[732][1] = 400;Enemies[732][2] =     0;Enemies[732][3] = -6;
    Enemies[733][0] = 175;Enemies[733][1] = 425;Enemies[733][2] =     0;Enemies[733][3] = -6;
    Enemies[734][0] = 225;Enemies[734][1] = 425;Enemies[734][2] =     0;Enemies[734][3] = -6;
    Enemies[735][0] = 877;Enemies[735][1] = 177;Enemies[735][2] =     0;Enemies[735][3] = 6;
    Enemies[736][0] = 927;Enemies[736][1] = 177;Enemies[736][2] =     0;Enemies[736][3] = 6;
    Enemies[737][0] = 902;Enemies[737][1] = 202;Enemies[737][2] =     0;Enemies[737][3] = 6;
    Enemies[738][0] = 877;Enemies[738][1] = 227;Enemies[738][2] =     0;Enemies[738][3] = 6;
    Enemies[739][0] = 927;Enemies[739][1] = 227;Enemies[739][2] =     0;Enemies[739][3] = 6;
    Enemies[740][0] = 275;Enemies[740][1] = 275;Enemies[740][2] =     6;Enemies[740][3] = 0;
    Enemies[741][0] = 325;Enemies[741][1] = 275;Enemies[741][2] =     6;Enemies[741][3] = 0;
    Enemies[742][0] = 300;Enemies[742][1] = 300;Enemies[742][2] =     6;Enemies[742][3] = 0;
    Enemies[743][0] = 275;Enemies[743][1] = 325;Enemies[743][2] =     6;Enemies[743][3] = 0;
    Enemies[744][0] = 325;Enemies[744][1] = 325;Enemies[744][2] =     6;Enemies[744][3] = 0;
}
function draw_Enemies(lvl) {
    ctx.save();
    ctx.strokeStyle = "rgb(5,5,5)";
    if(lvl == 0) {
        for(var i=0;i<4;i++) {
            Enemies[i][0] += Enemies[i][2];
            if(Enemies[i][0] == 325) Enemies[i][2] = 6;
            if(Enemies[i][0] == 775) Enemies[i][2] = -6;
            ctx.beginPath();
            ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 1) {
        for(var i=4;i<16;i++) {
            Enemies[i][1] += Enemies[i][3];
            if(Enemies[i][1] == 226) Enemies[i][3] = 4;
            if(Enemies[i][1] == 474) Enemies[i][3] = -4;
            ctx.beginPath();
            ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 2) {
        for(var i=16;i<26;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(Enemies[i][0] == 475 && Enemies[i][1] == 275) {
                Enemies[i][2] = 3;Enemies[i][3] = 0;
            }
            if(Enemies[i][0] == 625 && Enemies[i][1] == 275) {
                Enemies[i][2] = 0;Enemies[i][3] = 3;
            }
            if(Enemies[i][0] == 625 && Enemies[i][1] == 425) {
                Enemies[i][2] = -3;Enemies[i][3] = 0;
            }
            if(Enemies[i][0] == 475 && Enemies[i][1] == 425) {
                Enemies[i][2] = 0;Enemies[i][3] = -3;
            }
            ctx.beginPath();
            ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 3) {
        ctx.beginPath();
        ctx.arc(Enemies[26][0],Enemies[26][1],10,0,2*Math.PI);
        fillStroke();
        if(!dead) {
        	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        }
        angle += Math.acos(1-Math.pow(6/175,2)/2);
        for(var i=27;i<47;i++) {
            rotateX = Enemies[i][0] + Enemies[i][2] * Math.cos(angle+Enemies[i][3]);
            rotateY = Enemies[i][1] + Enemies[i][2] * Math.sin(angle+Enemies[i][3]);
            ctx.beginPath();
            ctx.arc(rotateX,rotateY,10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 4) {
        angle += Math.acos(1-Math.pow(9/375,2)/2);
        for(var i=47;i<63;i++) {
            rotateX = Enemies[i][0] + Enemies[i][2] * Math.cos(angle+Enemies[i][3]);
            rotateY = Enemies[i][1] + Enemies[i][2] * Math.sin(angle+Enemies[i][3]);
            ctx.beginPath();
            ctx.arc(rotateX,rotateY,10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 5) {
        for(var i=63;i<71;i++) {
            ctx.beginPath();
            ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
        angle += Math.acos(1-Math.pow(3/86,2)/2);
        for(var i=71;i<135;i++) {
            rotateX = Enemies[i][0] + Enemies[i][2] * Math.cos(angle+Enemies[i][3]);
            rotateY = Enemies[i][1] + Enemies[i][2] * Math.sin(angle+Enemies[i][3]);
            ctx.beginPath();
            ctx.arc(rotateX,rotateY,10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 6) {
        for(var i=135;i<147;i++) {
            Enemies[i][1] += Enemies[i][3];
            if(Enemies[i][1] == 170) Enemies[i][3] = 8;
            if(Enemies[i][1] == 530) Enemies[i][3] = -8;
            ctx.beginPath();
            ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 7) {
        for(var i=147;i<154;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if([426,574,576].includes(Enemies[i][0]) && [124,174,274,424].includes(Enemies[i][1])) {
                Enemies[i][2] = 0;Enemies[i][3] = 4;
            }
            if(Enemies[i][0] == 426 && [276,426,576].includes(Enemies[i][1])) {
                Enemies[i][2] = -4;Enemies[i][3] = 0;
            }
            if(Enemies[i][0] == 574 && [276,426,576].includes(Enemies[i][1])) {
                Enemies[i][2] = 4;Enemies[i][3] = 0;
            }
            if([274,424,726].includes(Enemies[i][0]) && [276,426,526,576].includes(Enemies[i][1])) {
                Enemies[i][2] = 0;Enemies[i][3] = -4;
            }
            if(Enemies[i][0] == 274 && [124,274,424].includes(Enemies[i][1])) {
                Enemies[i][2] = 4;Enemies[i][3] = 0;
            }
            if(Enemies[i][0] == 726 && [124,274,424].includes(Enemies[i][1])) {
                Enemies[i][2] = -4;Enemies[i][3] = 0;
            }
            if(Enemies[i][0] == 576 && Enemies[i][1] == 526) {
                Enemies[i][2] = -4;Enemies[i][3] = 0;
            }
            if(Enemies[i][0] == 424 && Enemies[i][1] == 174) {
                Enemies[i][2] = 4;Enemies[i][3] = 0;
            }
            ctx.beginPath();
            ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 8) {
        for(var i=154;i<169;i++) {
            ctx.beginPath();
            ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
        for(var i=169;i<179;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(i<177) {
                if([175,375,575,775,975].includes(Enemies[i][0]) && [125,225,425,525].includes(Enemies[i][1])) {
                    Enemies[i][2] = 0;Enemies[i][3] = 5;
                }
                if([175,375,575,775,975].includes(Enemies[i][0]) && [175,275,475,575].includes(Enemies[i][1])) {
                    Enemies[i][2] = -5;Enemies[i][3] = 0;
                }
                if([125,325,525,725,925].includes(Enemies[i][0]) && [175,275,475,575].includes(Enemies[i][1])) {
                    Enemies[i][2] = 0;Enemies[i][3] = -5;
                }
                if([125,325,525,725,925].includes(Enemies[i][0]) && [125,225,425,525].includes(Enemies[i][1])) {
                    Enemies[i][2] = 5;Enemies[i][3] = 0;
                }
            }
            else if(i == 177) {
                if(Enemies[i][0] == 525 && Enemies[i][1] == 376) {
                    Enemies[i][2] = 5;Enemies[i][3] = 0;
                }
                else if(Enemies[i][0] == 575 && Enemies[i][1] == 376 && rotation1) {
                    Enemies[i][2] = 0;Enemies[i][3] = -8;rotation1 = false;
                }
                else if(Enemies[i][0] == 575 && Enemies[i][1] == 224) {
                    Enemies[i][2] = 0;Enemies[i][3] = 8;
                }
                else if(Enemies[i][0] == 575 && Enemies[i][1] == 376) {
                    Enemies[i][2] = -5;Enemies[i][3] = 0;rotation1 = true;
                }
            }
            else if(i == 178) {
                if(Enemies[i][0] == 901 && Enemies[i][1] == 575) {
                    Enemies[i][2] = 0;Enemies[i][3] = -5;
                }
                else if(Enemies[i][0] == 901 && Enemies[i][1] == 525 && rotation2) {
                    Enemies[i][2] = -8;Enemies[i][3] = 0;rotation2 = false;
                }
                else if(Enemies[i][0] == 749 && Enemies[i][1] == 525) {
                    Enemies[i][2] = 8;Enemies[i][3] = 0;
                }
                else if(Enemies[i][0] == 901 && Enemies[i][1] == 525) {
                    Enemies[i][2] = 0;Enemies[i][3] = 5;rotation2 = true;
                }
            }
            ctx.beginPath();
            ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);
            fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 9) {
        for(var i=179;i<198;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(i < 186) {
                if(Enemies[179][0] == 486) Enemies[i][2] = -2;
                if(Enemies[179][0] == 414) Enemies[i][2] = 2;
            }
            else if(i < 193) {
                if(Enemies[186][0] == 414) Enemies[i][2] = 2;
                if(Enemies[186][0] == 486) Enemies[i][2] = -2;
            }
            else if(i < 196) {
                if(Enemies[193][1] == 514) Enemies[i][3] = 2;
                if(Enemies[193][1] == 586) Enemies[i][3] = -2;
            }
            else {
                if(Enemies[196][1] == 586) Enemies[i][3] = -2;
                if(Enemies[196][1] == 514) Enemies[i][3] = 2;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 10) {
        speedRotation = speedRotation > 15 ? speedRotation : speedRotation+0.009;
        angle -= Math.acos(1-Math.pow(speedRotation/250,2)/2);
        for(var i=198;i<226;i++) {
            rotateX = Enemies[i][0] + Enemies[i][2] * Math.cos(angle+Enemies[i][3]);
            rotateY = Enemies[i][1] + Enemies[i][2] * Math.sin(angle+Enemies[i][3]);
            ctx.beginPath();ctx.arc(rotateX,rotateY,10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 11) {
        for(var i=226;i<234;i++) {
            Enemies[i][1] += Enemies[i][3];
            if(Math.round(Enemies[i][1]) == 187) Enemies[i][3] = 2.6;
            if(Math.round(Enemies[i][1]) == 512) Enemies[i][3] = -2.6;
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 12) {
        for(var i=234;i<246;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(Enemies[i][1] == 225 && i < 244) Enemies[i][3] = 5;
            if(Enemies[i][1] == 475 && i < 244) Enemies[i][3] = -5;
            if(Enemies[i][0] == 325 && i > 243) Enemies[i][2] = 9;
            if(Enemies[i][0] == 775 && i > 243) Enemies[i][2] = -9
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
        	if(!dead) {
        		enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}

        }
    }
    if(lvl == 13) {
        for(var i=246;i<250;i++) {
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
        angle -= Math.acos(1-Math.pow(12/250,2)/2);
        for(var i=250;i<282;i++) {
            rotateX = Enemies[i][0] + Enemies[i][2] * Math.cos(angle+Enemies[i][3]);
            rotateY = Enemies[i][1] + Enemies[i][2] * Math.sin(angle+Enemies[i][3]);
            ctx.beginPath();ctx.arc(rotateX,rotateY,10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
        for(var i=282;i<285;i++) {
            Enemies[i][1] += Enemies[i][3];
            if(Math.round(Enemies[i][1]) == 386) Enemies[i][3] = 1.6;
            if(Math.round(Enemies[i][1]) == 490) Enemies[i][3] = -1.6;
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
        for(var i=285;i<288;i++) {
            Enemies[i][1] += Enemies[i][3];
            if(Math.round(Enemies[i][1]) == 360) Enemies[i][3] = 1.6;
            if(Math.round(Enemies[i][1]) == 464) Enemies[i][3] = -1.6;
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 14) {
        for(var i=288;i<308;i++) {
            Enemies[i][1] += Enemies[i][3];
            if(Enemies[i][1] == 575 && ![291,299].includes(i)) Enemies[i][3] = -6;
            if(Enemies[i][1] == 125 && ![295,303,304].includes(i)) Enemies[i][3] = 6;
            if(Enemies[i][1] == 575 && [291,299].includes(i)) Enemies[i][3] = -5;
            if(Enemies[i][1] == 475 && [291,299].includes(i)) Enemies[i][3] = 5;
            if(Enemies[i][1] == 275 && i < 291) Enemies[i][3] = 6;
            if(Enemies[i][1] == 125 && [295,303,304].includes(i)) Enemies[i][3] = 5;
            if(Enemies[i][1] == 225 && [295,303,304].includes(i)) Enemies[i][3] = -5;
            if(Enemies[i][1] == 425 && i > 304) Enemies[i][3] = -6; 
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 15) {
        for(var i=308;i<328;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(Enemies[308][0] == 175 && Enemies[308][1] == 225) {
                Enemies[i][2] = 2;
                Enemies[i][3] = 0;
            }
            if(Enemies[308][0] == 225 && Enemies[308][1] == 225) {
                Enemies[i][2] = 0;
                Enemies[i][3] = 2;
            }
            if(Enemies[308][0] == 225 && Enemies[308][1] == 275) {
                Enemies[i][2] = -2;
                Enemies[i][3] = 0;
            }
            if(Enemies[308][0] == 175 && Enemies[308][1] == 275) {
                Enemies[i][2] = 0;
                Enemies[i][3] = -2;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 16) {
        for(var i=328;i<333;i++) {
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
        for(var i=333;i<340;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(Enemies[333][0] == 375) {
                Enemies[333][2] = 3;Enemies[334][2] = 3;Enemies[335][3] = -3;Enemies[336][3] = -3;Enemies[337][3] = 3;
            }
            if(Enemies[333][0] == 825) {
                Enemies[333][2] = -3;Enemies[334][2] = -3;Enemies[335][3] = 3;Enemies[336][3] = 3;Enemies[337][3] = -3;
            }
            if(Enemies[338][0] == 175) {
                Enemies[338][2] = 3;Enemies[339][2] = -3;
            }
            if(Enemies[338][0] == 826) {
                Enemies[338][2] = -3;Enemies[339][2] = 3;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 17) {
        for(var i=340;i<350;i++) {
            Enemies[i][1] += Enemies[i][3];
            if(Enemies[i][1] == 274) Enemies[i][3] = 4;
            if(Enemies[i][1] == 426) Enemies[i][3] = -4;
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 18) {
        for(var i=350;i<366;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(i < 362) {
                if(Enemies[i][1] == 225) Enemies[i][3] = 5;
                if(Enemies[i][1] == 475) Enemies[i][3] = -5;
            }
            if(i == 362) {
                if(Enemies[362][0] == 275) {
                    Enemies[362][2] = 5;Enemies[363][2] = 5;Enemies[364][2] = -5;Enemies[365][2] = -5;
                }
                if(Enemies[362][0] == 825) {
                    Enemies[362][2] = -5;Enemies[363][2] = -5;Enemies[364][2] = 5;Enemies[365][2] = 5;
                }
                if(Enemies[362][1] == 225) {
                    Enemies[362][3] = 5;Enemies[363][3] = -5;Enemies[364][3] = 5;Enemies[365][3] = -5;
                }
                if(Enemies[362][1] == 475) {
                    Enemies[362][3] = -5;Enemies[363][3] = 5;Enemies[364][3] = -5;Enemies[365][3] = 5;
                }
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 19) {
        for(var i=366;i<379;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(i < 371) {
                if(Enemies[366][1] == 425) Enemies[i][3] = -3;
                if(Enemies[366][1] == 176) Enemies[i][3] = 3;
            }
            else {
                if(Enemies[371][0] == 825) Enemies[i][2] = 2.5;
                if(Enemies[371][0] == 975) Enemies[i][2] = -2.5;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 20) {
        for(var i=379;i<393;i++) {
            Enemies[i][1] += Enemies[i][3];
            if(i < 384) {
                if(Enemies[379][1] == 175) Enemies[i][3] = 8;
                if(Enemies[379][1] == 527) Enemies[i][3] = -8;
            }
            if(i > 383 && i < 389) {
                if(Enemies[384][1] == 175) Enemies[i][3] = 4;
                if(Enemies[384][1] == 527) Enemies[i][3] = -4;
            }
            if(i > 388) {
                if(Math.round(Enemies[389][1]) == 175) Enemies[i][3] = 8/3;
                if(Math.round(Enemies[389][1]) == 527) Enemies[i][3] = -8/3;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
            }
        }
    }
    if(lvl == 21) {
        for(var i=393;i<417;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(i < 399) {
                if(Enemies[393][0] == 675 && Enemies[393][1] == 275) {
                    Enemies[i][2] = 0;Enemies[i][3] = -3;
                }
                if(Enemies[393][0] == 675 && Enemies[393][1] == 224) {
                    Enemies[i][2] = 3;Enemies[i][3] = 0;
                }
                if(Enemies[393][0] == 726 && Enemies[393][1] == 224) {
                    Enemies[i][2] = 0;Enemies[i][3] = 3;
                }
                if(Enemies[393][0] == 726 && Enemies[393][1] == 275) {
                    Enemies[i][2] = -3;Enemies[i][3] = 0;
                }
            }
            else if(i < 405) {
                if(Enemies[399][0] == 725 && Enemies[399][1] == 225) {
                    Enemies[i][2] = 0;Enemies[i][3] = 3;
                }
                if(Enemies[399][0] == 725 && Enemies[399][1] == 276) {
                    Enemies[i][2] = -3;Enemies[i][3] = 0;
                }
                if(Enemies[399][0] == 674 && Enemies[399][1] == 276) {
                    Enemies[i][2] = 0;Enemies[i][3] = -3;
                }
                if(Enemies[399][0] == 674 && Enemies[399][1] == 225) {
                    Enemies[i][2] = 3;Enemies[i][3] = 0;
                }
            }
            else if(i < 409) {
                if(Enemies[405][0] == 675 && Enemies[405][1] == 175) {
                    Enemies[i][2] = 0;Enemies[i][3] = -3;
                }
                if(Enemies[405][0] == 675 && Enemies[405][1] == 124) {
                    Enemies[i][2] = 3;Enemies[i][3] = 0;
                }
                if(Enemies[405][0] == 924 && Enemies[405][1] == 124) {
                    Enemies[i][2] = 0;Enemies[i][3] = 3;
                }
                if(Enemies[405][0] == 924 && Enemies[405][1] == 175) {
                    Enemies[i][2] = -3;Enemies[i][3] = 0;
                }
            }
            else if(i < 413) {
                if(Enemies[409][0] == 925 && Enemies[409][1] == 125) {
                    Enemies[i][2] = 0;Enemies[i][3] = 3;
                }
                if(Enemies[409][0] == 925 && Enemies[409][1] == 176) {
                    Enemies[i][2] = -3;Enemies[i][3] = 0;
                }
                if(Enemies[409][0] == 676 && Enemies[409][1] == 176) {
                    Enemies[i][2] = 0;Enemies[i][3] = -3;
                }
                if(Enemies[409][0] == 676 && Enemies[409][1] == 125) {
                    Enemies[i][2] = 3;Enemies[i][3] = 0;
                }
            }
            else if(i < 415) {
                if(Enemies[413][0] == 175 && Enemies[413][1] == 475) {
                    Enemies[i][2] = 3;Enemies[i][3] = 0;
                }
                if(Enemies[413][0] == 226 && Enemies[413][1] == 475) {
                    Enemies[i][2] = 0;Enemies[i][3] = -3;
                }
                if(Enemies[413][0] == 226 && Enemies[413][1] == 226) {
                    Enemies[i][2] = -3;Enemies[i][3] = 0;
                }
                if(Enemies[413][0] == 175 && Enemies[413][1] == 226) {
                    Enemies[i][2] = 0;Enemies[i][3] = 3;
                }
            }
            else {
                if(Enemies[415][0] == 225 && Enemies[415][1] == 225) {
                    Enemies[i][2] = -3;Enemies[i][3] = 0;
                }
                if(Enemies[415][0] == 174 && Enemies[415][1] == 225) {
                    Enemies[i][2] = 0;Enemies[i][3] = 3;
                }
                if(Enemies[415][0] == 174 && Enemies[415][1] == 474) {
                    Enemies[i][2] = 3;Enemies[i][3] = 0;
                }
                if(Enemies[415][0] == 225 && Enemies[415][1] == 474) {
                    Enemies[i][2] = 0;Enemies[i][3] = -3;
                }
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}
        }
    }
    if(lvl == 22) {
        ctx.beginPath();ctx.arc(Enemies[417][0],Enemies[417][1],10,0,2*Math.PI);fillStroke();
        if(!dead) {
        	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
    	}
        if(angle > 6.4) clockRotation = false;
        if(angle < 0) clockRotation = true;
        if(clockRotation) angle += Math.acos(1-Math.pow(6/230,2)/2);
        if(!clockRotation) angle -= Math.acos(1-Math.pow(6/230,2)/2);
        for(var i=418;i<458;i++) {
            rotateX = Enemies[i][0] + Enemies[i][2] * Math.cos(angle+Enemies[i][3]);
            rotateY = Enemies[i][1] + Enemies[i][2] * Math.sin(angle+Enemies[i][3]);
            ctx.beginPath();ctx.arc(rotateX,rotateY,10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}
        }
    }
    if(lvl == 23) {
        for(var i=458;i<484;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(i < 478) {
                if(Enemies[i][1] == 475) Enemies[i][3] = -6;
                if(Enemies[i][1] == 223) Enemies[i][3] = 6;
            }
            else {
                if(Enemies[i][0] == 75) Enemies[i][2] = 4;
                if(Enemies[i][0] == 1027) Enemies[i][2] = -4;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}
        }
    }
    if(lvl == 24) {
        ctx.beginPath();ctx.arc(Enemies[530][0],Enemies[530][1],10,0,2*Math.PI);fillStroke();
        if(!dead) {
        	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
    	}
        angle -= Math.acos(1-Math.pow(5/100,2)/2);
        for(var i=484;i<524;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(i < 494) {
                if(Enemies[484][0] == 125) Enemies[i][2] = -1.5;
                if(Enemies[484][0] == 74) Enemies[i][2] = 1.5;
            }
            else {
                if(Enemies[494][1] == 475) Enemies[i][3] = -1.5;
                if(Enemies[494][1] == 424) Enemies[i][3] = 1.5;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}
        }
        for(var i=524;i<530;i++) {
            rotateX = Enemies[i][0] + Enemies[i][2] * Math.cos(angle+Enemies[i][3]);
            rotateY = Enemies[i][1] + Enemies[i][2] * Math.sin(angle+Enemies[i][3]);
            ctx.beginPath();ctx.arc(rotateX,rotateY,10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}
        }
    }
    if(lvl == 25) {
        for(var i=531;i<557;i++) {
            Enemies[i][1] += Enemies[i][3];
            if(i < 544) {
                if(Enemies[531][1] == 475) Enemies[i][3] = 2.5;
                if(Enemies[531][1] == 575) Enemies[i][3] = -2.5;
            }
            else {
                if(Enemies[544][1] == 475) Enemies[i][3] = 2.5;
                if(Enemies[544][1] == 575) Enemies[i][3] = -2.5;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}
        }
    }
    if(lvl == 26) {
        for(var i=557;i<623;i++) {
            Enemies[i][1] += Enemies[i][3];
            if(i < 587) {
                if(Enemies[557][1] == 125) Enemies[i][3] = 1.5;
                if(Enemies[557][1] == 224) Enemies[i][3] = -1.5;
            }
            else if(i < 599) {
                if(Enemies[587][1] == 475) Enemies[i][3] = -2.5;
                if(Enemies[587][1] == 125) Enemies[i][3] = 2.5;
            }
            else if(i < 605) {
                if(Enemies[599][1] == 125) Enemies[i][3] = 2.5;
                if(Enemies[599][1] == 475) Enemies[i][3] = -2.5;
            }
            else if(i < 611) {
                if(Enemies[605][1] == 126) Enemies[i][3] = 1.5;
                if(Enemies[605][1] == 225) Enemies[i][3] = -1.5;
            }
            else if(i < 617) {
                if(Enemies[611][1] == 275) Enemies[i][3] = -2.25;
                if(Enemies[611][1] == 126.5) Enemies[i][3] = 2.25;
            }
            else {
                if(Enemies[617][1] == 125) Enemies[i][3] = 2.25;
                if(Enemies[617][1] == 273.5) Enemies[i][3] = -2.25;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}
        }
    }
    if(lvl == 27) {
        for(var i=623;i<677;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(i < 638) {
                if(Enemies[623][1] == 75) Enemies[i][3] = 4;
                if(Enemies[623][1] == 275) Enemies[i][3] = -4;
            }
            else if(i < 653) {
                if(Enemies[638][1] == 75) Enemies[i][3] = 4;
                if(Enemies[638][1] == 275) Enemies[i][3] = -4;
            }
            else if(i < 665) {
                if(Enemies[653][0] == 225) Enemies[i][2] = 4;
                if(Enemies[653][0] == 425) Enemies[i][2] = -4;
            }
            else {
                if(Enemies[665][0] == 425) Enemies[i][2] = -4;
                if(Enemies[665][0] == 225) Enemies[i][2] = 4;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}
        }
    }
    if(lvl == 28) {
        for(var i=677;i<700;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(i < 680) {
                if(Enemies[677][0] == 175) Enemies[i][2] = 5;
                if(Enemies[677][0] == 925) Enemies[i][2] = -5;
            }
            else if(i < 684) {
                if(Enemies[680][0] == 175) Enemies[i][2] = 5;
                if(Enemies[680][0] == 925) Enemies[i][2] = -5;
            }
            else if(i < 692) {
                if(Enemies[684][1] == 275) Enemies[i][3] = 5;
                if(Enemies[684][1] == 575) Enemies[i][3] = -5;
            }
            else {
                if(Enemies[692][1] == 275) Enemies[i][3] = 5;
                if(Enemies[692][1] == 575) Enemies[i][3] = -5;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}
        }
    }
    if(lvl == 29) {
        for(var i=700;i<745;i++) {
            Enemies[i][0] += Enemies[i][2];
            Enemies[i][1] += Enemies[i][3];
            if(i < 710) {
                if(Enemies[700][1] == 75) Enemies[i][3] = 1.5;
                if(Enemies[700][1] == 525) Enemies[i][3] = -1.5;
            }
            else if(i < 720) {
                if(Enemies[710][1] == 75) Enemies[i][3] = 1.5;
                if(Enemies[710][1] == 525) Enemies[i][3] = -1.5;
            }
            else if(i < 725) {
                if(Enemies[720][0] == 75 && Enemies[720][1] == 475) {
                    Enemies[i][2] = 0;Enemies[i][3] = -6;
                }
                if(Enemies[720][0] == 75 && Enemies[720][1] == 73) {
                    Enemies[i][2] = 6;Enemies[i][3] = 0;
                }
                if(Enemies[720][0] == 975 && Enemies[720][1] == 73) {
                    Enemies[i][2] = 0;Enemies[i][3] = 6;
                }
                if(Enemies[720][0] == 975 && Enemies[720][1] == 475) {
                    Enemies[i][2] = -6;Enemies[i][3] = 0;
                }
            }
            else if(i < 730) {
                if(Enemies[725][0] == 975 && Enemies[725][1] == 73) {
                    Enemies[i][2] = 0;Enemies[i][3] = 6;
                }
                if(Enemies[725][0] == 975 && Enemies[725][1] == 475) {
                    Enemies[i][2] = -6;Enemies[i][3] = 0;
                }
                if(Enemies[725][0] == 75 && Enemies[725][1] == 475) {
                    Enemies[i][2] = 0;Enemies[i][3] = -6;
                }
                if(Enemies[725][0] == 75 && Enemies[725][1] == 73) {
                    Enemies[i][2] = 6;Enemies[i][3] = 0;
                }
            }
            else if(i < 735) {
                if(Enemies[730][0] == 175 && Enemies[730][1] == 375) {
                    Enemies[i][2] = 0;Enemies[i][3] = -6;
                }
                if(Enemies[730][0] == 175 && Enemies[730][1] == 177) {
                    Enemies[i][2] = 6;Enemies[i][3] = 0;
                }
                if(Enemies[730][0] == 877 && Enemies[730][1] == 177) {
                    Enemies[i][2] = 0;Enemies[i][3] = 6;
                }
                if(Enemies[730][0] == 877 && Enemies[730][1] == 375) {
                    Enemies[i][2] = -6;Enemies[i][3] = 0;
                }
            }
            else if(i < 740) {
                if(Enemies[735][0] == 877 && Enemies[735][1] == 177) {
                    Enemies[i][2] = 0;Enemies[i][3] = 6;
                }
                if(Enemies[735][0] == 877 && Enemies[735][1] == 375) {
                    Enemies[i][2] = -6;Enemies[i][3] = 0;
                }
                if(Enemies[735][0] == 175 && Enemies[735][1] == 375) {
                    Enemies[i][2] = 0;Enemies[i][3] = -6;
                }
                if(Enemies[735][0] == 175 && Enemies[735][1] == 177) {
                    Enemies[i][2] = 6;Enemies[i][3] = 0;
                }
            }
            else {
                if(Enemies[740][0] == 275) Enemies[i][2] = 6;
                if(Enemies[740][0] == 773) Enemies[i][2] = -6;
            }
            ctx.beginPath();ctx.arc(Enemies[i][0],Enemies[i][1],10,0,2*Math.PI);fillStroke();
            if(!dead) {
            	enemieCollision = enemieCollision ? true : leftCollision() || rightCollision() || upCollision() || downCollision();
        	}
        }
    }
    ctx.restore();
}
function fill(color) {
    ctx.fillStyle = color;
    ctx.fill();
}
function fillStroke() {
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.fill();
    ctx.stroke();
}
function screenLevelStart(lvl) {
    slash = sentences[lvl].indexOf("/");
    ctx.save();
    ctx.beginPath();ctx.rect(0,0,1100,700);
    if(lvl < 19) fill("#8080ff");
    if(lvl >=19 && lvl < 29) fill("#df80ff");
    if(lvl == 29) fill("#ff8080");
    ctx.font ="900 70px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    if(slash != -1) {
        ctx.fillText(sentences[lvl].substring(0,slash).toUpperCase(), canvas.width/2, (canvas.height-80)/2);
        ctx.fillText(sentences[lvl].substring(slash+1,sentences[lvl].length).toUpperCase(), canvas.width/2, (canvas.height+120)/2);
    }
    else {
        ctx.fillText(sentences[lvl].toUpperCase(), canvas.width/2, canvas.height/2);
    }
    ctx.restore();
}
function endGame() {
    ctx.beginPath();ctx.rect(0,0,1100,700);fill("#8080ff");
    ctx.font ="900 70px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("congratulations!".toUpperCase(), canvas.width/2, (canvas.height-200)/2);
    ctx.fillText("you beat the game in".toUpperCase(), canvas.width/2, (canvas.height)/2);
    ctx.fillText(new Date((timeDiff+previousTime) * 1000).toISOString().substr(11, 8), canvas.width/2, (canvas.height+200)/2);
}
function checkCollide() {
    if(right && !dead && !rightWallCollision) player.x+=player.speed;
    if(left && !dead && !leftWallCollision) player.x-=player.speed;
    if(up && !dead && !upWallCollision) player.y-=player.speed;
    if(down && !dead && !downWallCollision) player.y+=player.speed;

    if(coinCollision) {
    	coinCollision = false;
        currentCoins++;
        checkCollideCoins(coinSum[lvl-1],coinSum[lvl]);
        if(!mute) {
            audioCoin.currentTime = 0;
            audioCoin.play();
        }
    }

    if(finishCollision && currentCoins == coins[lvl]) {
    	finishCollision = false;
        if(!mute) {
            audioLevel.currentTime = 0;
            audioLevel.play();
        }
        if(lvl == 29) {
            gameCompleted = true;
            endGame();
        }
        currentCoins = 0;
        lvlComplete=true;
        setTimeout(() => {
            lvl++;
            lvlStart = true;
            checkPoint1 = false;
            checkPoint2 = false;
            lvlComplete = false;
        },2000);
    }

    if(checkPoint1Collision) {
        checkPoint1 = true;
    }

    if(checkPoint2Collision) {
        checkPoint2 = true;
    }

    if(enemieCollision && fade == 1) {
    	enemieCollision = false;
        currentCoins = 0;
        dead = true;
        deaths++;
        speedRotation = 1;
        if(!mute) {
            audioDeath.currentTime = 0;
            audioDeath.play();
        }
        setTimeout(() => {
            dead = false;
            lvlStart = true;
            drawCoins();
        },500);
    }
}
function checkCollideCoins(c1,c2) {
    c = [];
    firstCoin = true;
    for(var i=c1;i<c2;i++) {
        if(Coins[i][0] != "---") {
            c[i] = Math.abs(Coins[i][0] + 10 - player.x-30) + Math.abs(Coins[i][0] - 10 - player.x) + 
            Math.abs(Coins[i][1]+10 - player.y-30) + Math.abs(Coins[i][1] - 10 - player.y);
            if(firstCoin) {
                coinIndex = i;
                firstCoin = !firstCoin;
            }
            if(c[i] < c[coinIndex]) coinIndex = i;
        }
    }
    Coins[coinIndex][0] = "---";
}
function fullScreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null);
    if (!isInFullScreen) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
            document.getElementById('container').style.width = "75%";
            document.getElementById('container').style.marginLeft = "12.5%";
            document.getElementById('title').children[0].style.fontSize = '50px';
            document.getElementById('title').children[0].style.marginBottom = '90px';
            document.getElementById('title').children[1].style.fontSize = '130px';
            document.getElementById('title').children[1].style.margin = '90px 0';
            document.getElementById('title').children[2].style.fontSize = '50px';
            document.getElementById('title').children[2].style.marginTop = '90px';
            document.getElementById('new-game').style.fontSize = '100px';
            document.getElementById('load-game').style.fontSize = '100px';
        }
    }
    else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
            document.getElementById('container').style.width = "60%";
            document.getElementById('container').style.marginLeft = "20%";
            document.getElementById('title').children[0].style.fontSize = '30px';
            document.getElementById('title').children[0].style.marginBottom = '70px';
            document.getElementById('title').children[1].style.fontSize = '105px';
            document.getElementById('title').children[1].style.margin = '70px 0';
            document.getElementById('title').children[2].style.fontSize = '30px';
            document.getElementById('title').children[2].style.marginTop = '70px';
            document.getElementById('new-game').style.fontSize = '80px';
            document.getElementById('load-game').style.fontSize = '80px';
        }
    }
    
}
function leftCollision() {
	return ctx.isPointInStroke(player.x-2,player.y+2) || ctx.isPointInStroke(player.x-2,player.y+15) || 
		   ctx.isPointInStroke(player.x-2,player.y+28);
}
function leftPathCollision() {
	return ctx.isPointInPath(player.x-2,player.y+2) || ctx.isPointInPath(player.x-2,player.y+15) || 
		   ctx.isPointInPath(player.x-2,player.y+28);
}
function rightCollision() {
	return ctx.isPointInStroke(player.x+32,player.y+2) || ctx.isPointInStroke(player.x+32,player.y+15) ||
		   ctx.isPointInStroke(player.x+32,player.y+28);
}
function rightPathCollision() {
	return ctx.isPointInPath(player.x+32,player.y+2) || ctx.isPointInPath(player.x+32,player.y+15) ||
		   ctx.isPointInPath(player.x+32,player.y+28);
}
function upCollision() {
	return ctx.isPointInStroke(player.x+2,player.y-2) || ctx.isPointInStroke(player.x+15,player.y-2) ||
    	   ctx.isPointInStroke(player.x+28,player.y-2);
}
function upPathCollision() {
	return ctx.isPointInPath(player.x+2,player.y-2) || ctx.isPointInPath(player.x+15,player.y-2) ||
    	   ctx.isPointInPath(player.x+28,player.y-2);
}
function downCollision() {
	return ctx.isPointInStroke(player.x+2,player.y+32) || ctx.isPointInStroke(player.x+15,player.y+32) ||
    	   ctx.isPointInStroke(player.x+28,player.y+32);
}
function downPathCollision() {
	return ctx.isPointInPath(player.x+2,player.y+32) || ctx.isPointInPath(player.x+15,player.y+32) ||
    	   ctx.isPointInPath(player.x+28,player.y+32);
}
function sound() {
    if(mute) document.getElementById('sound').innerHTML = '🔊';
    else document.getElementById('sound').innerHTML = '🔇';
    mute = !mute;
}
document.onkeydown = function(e) {
    if(e.keyCode == 37) left = true;
    if(e.keyCode == 39) right = true;
    if(e.keyCode == 38) up = true;
    if(e.keyCode == 40) down = true;
    if(e.keyCode == 70) fullScreen();
}
document.onkeyup = function(e) {
    if(e.keyCode == 37) left = false;
    if(e.keyCode == 39) right = false;
    if(e.keyCode == 38) up = false;
    if(e.keyCode == 40) down = false;
}