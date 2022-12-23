const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let speed = 10; //let initializes the variable speed
let tileCount = 20; // Number of tiles per row and column
let tileSize = canvas.width / tileCount - 3 //size of the snake or apple

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

//For the snake
let head_x = 10;
let head_y = 10; //the x and y coordinates of the head are 10,10 tile position
let x_vel = 0;
let y_vel = 0;
const snakeParts = []; //constant because we never remove the list but only modify it
let tail_length = 0;

//For the fruit
let apple_x = 5;
let apple_y = 5;
const gulp = new Audio("gulp.mp3");
const bgm = new Audio("Komiku_-_12_-_Bicycle.mp3") //Music: https://www.chosic.com/free-music/all/ 

let score = 0

function drawGame(){
    //console.log('draw game');
    bgm.play();
    changeSnakePosition();
    let result = isGameOver();
    if (result){
        bgm.pause()
        return;
    }
    if(head_x < 0){head_x = tileCount -1;}
    if(head_x >= tileCount){head_x = 0;}
    if(head_y < 0){head_y = tileCount -1;}
    if(head_y >= tileCount){head_y = 0;}
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    //game loop
    setTimeout(drawGame, 1000 / speed); //Refresh Time (1000ms/speed) 
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    //BODY OF MOVING SNAKE
    ctx.fillStyle = 'rgb(37, 249, 29, 1)';
    for (let i = 0 ; i < snakeParts.length ; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x* tileCount,part.y * tileCount,tileSize,tileSize);
    }
    snakeParts.push(new SnakePart(head_x,head_y));  
    if(snakeParts.length > tail_length){
        snakeParts.shift(); //allows movement of head with the body; it removes furthest block from the head
    }
    //HEAD OF THE SNAKE
    ctx.fillStyle = 'rgb(249, 144, 29, 1)';
    ctx.fillRect(head_x * tileCount,head_y * tileCount,tileSize,tileSize);

}

function changeSnakePosition(){
    head_x += x_vel;
    head_y += y_vel;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(apple_x * tileCount ,apple_y * tileCount ,tileSize,tileSize);
}


function checkAppleCollision(){
    if (apple_x === head_x && apple_y === head_y){
        apple_x = Math.floor(Math.random() * tileCount);
        apple_y = Math.floor(Math.random() * tileCount);
        gulp.play()
        tail_length += 1;
        score += 1;
    }
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "15px Arial";
    ctx.fillText("Score " + score, canvas.width - 70, 20)
}

function isGameOver(){
    let gameOver = false;

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if (part.x == head_x && part.y == head_y){
            gameOver = true; break;
        }
    }

    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        var gradient = ctx.createLinearGradient(50,20,canvas.width - 40,20);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}


document.body.addEventListener('keydown', keyDown);

//CONVENTIONS up,left => vel decreases; down,right => vel increases

function keyDown(event){
    //up arrow keycode = 38
    if(event.keyCode == 38){
        if(y_vel == 1){return;}
        y_vel = -1
        x_vel = 0
    } 
    //down arrow keycode = 40
    if(event.keyCode == 40){
        if(y_vel == -1){return;}
        y_vel = 1
        x_vel = 0
    } 
    //left arrow keycode = 37
    if(event.keyCode == 37){
        if(x_vel == 1){return;}
        y_vel = 0
        x_vel = -1
    } 
    //right arrow keycode = 39
    if(event.keyCode == 39){
        if(x_vel == -1){return;}
        y_vel = 0
        x_vel = 1
    } 
}


drawGame();