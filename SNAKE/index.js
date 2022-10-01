const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let speed = 100;

function drawGame(){
    console.log('draw game');
    setTimeout(drawGame, 1000 / speed);
  
}

drawGame();