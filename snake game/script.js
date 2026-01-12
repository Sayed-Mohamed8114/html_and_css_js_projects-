// dom elements 
const board = document.querySelector(".container");
let snake=[{x:5 , y:5}];
let direction = "right";
let food = {x:8 , y:8};
let score=0;
const gridsize=20;
const speed=150;

// the keys move 
const directions={
    ArrowUp:"up",
    ArrowDown:"down",
    ArrowRight:"right",
    ArrowLeft:"left"
};

function handleKeyPress(e){
    const newDirection=directions[e.key];
    if(!newDirection)return;
    const opposite={
        up:"down",
        down:"up",
        right:"left",
        left:"right"
    };

    if(newDirection !== opposite[direction]){
        direction=newDirection;
    }
}
document.addEventListener("keydown",handleKeyPress);

// the random generate of the food
function generateFood(){
    let newFood;
    do{
        newFood={
            x:Math.floor(Math.random()*gridsize),
            y:Math.floor(Math.random()*gridsize)
        };
    }while(snake.some(segment=>segment.x===newFood.x&&segment.y===newFood.y));
    food=newFood;
}

//snake movement 
function movesnake(){
    const head = {...snake[0]};
    if(direction==="up") head.y--;
    if(direction==="down") head.y++;
    if(direction==="right") head.x++;
    if(direction==="left") head.x--;

    //check for collisions with walls if true will end the game 
    if(head.x<0 || head.x >=gridsize || head.y<0 || head.y>=gridsize){
        return endgame();
    }

    // check for collision with itself 
    for(let segment of snake){
        if(head.x===segment.x && head.y==segment.y){
            return endgame();
        }
    }

    snake.unshift(head);

    if(head.x === food.x && head.y === food.y){
        score++;
        document.getElementById("score").innerText = score;
        generateFood();
    }else{
        snake.pop(); // remove tail if no food eaten
    }
}

// draw snake and food 
function draw(){
    board.innerHTML="";
    // draw Food
    const foodElement = document.createElement("div");
    foodElement.style.gridColumnStart=food.x+1;
    foodElement.style.gridRowStart=food.y+1;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

    //draw snake
    snake.forEach(segment=>{
        const snakeElement=document.createElement("div");
        snakeElement.style.gridColumnStart=segment.x+1;
        snakeElement.style.gridRowStart=segment.y+1;
        snakeElement.classList.add("snake");
        board.appendChild(snakeElement);
    })
}

// game loop 
function gameloop(){
    movesnake();
    draw();
}

const gameInterval = setInterval(gameloop,speed);

function endgame(){
    clearInterval(gameInterval);
    let scoreBar=document.getElementById('score-bar');
    scoreBar.innerText="";
    scoreBar.innerText="game over! your score is: "+score;
}