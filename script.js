const myCanvas = document.getElementById('myGameCanvas');
const myContext = myCanvas.getContext('2d');
myCanvas.width = 800;
myCanvas.height = 600;

let myScore = 0;
let myFruits = [];
const myFruitTypes = ['🍎', '🍌', '🍉', '🍓', '🍇'];
const myFruitSpawnInterval = 1000;
const myFruitFallSpeed = 2;

function mySpawnFruit() {
    const myFruit = {
        type: myFruitTypes[Math.floor(Math.random() * myFruitTypes.length)],
        x: Math.random() * myCanvas.width,
        y: -50,
        isSliced: false
    };
    myFruits.push(myFruit);
}

function myUpdateGame() {
    myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);

    myFruits.forEach((myFruit, myIndex) => {
        if (!myFruit.isSliced) {
            myContext.font = '48px serif';
            myContext.fillText(myFruit.type, myFruit.x, myFruit.y += myFruitFallSpeed);

            if (myFruit.y > myCanvas.height) {
                myFruits.splice(myIndex, 1); 
            }
        }
    });

    requestAnimationFrame(myUpdateGame);
}

function myCheckSlice(event) {
    const myMouseX = event.clientX - myCanvas.getBoundingClientRect().left;
    const myMouseY = event.clientY - myCanvas.getBoundingClientRect().top;

    myFruits.forEach((myFruit, myIndex) => {
        if (
            !myFruit.isSliced &&
            myMouseX > myFruit.x && myMouseX < myFruit.x + 40 &&
            myMouseY > myFruit.y - 40 && myMouseY < myFruit.y
        ) {
            myFruit.isSliced = true;
            myScore += 10;
            document.getElementById('myScore').innerText = myScore;
        }
    });
}

setInterval(mySpawnFruit, myFruitSpawnInterval);
myCanvas.addEventListener('click', myCheckSlice);
myUpdateGame();
