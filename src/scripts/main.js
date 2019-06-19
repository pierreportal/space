let regularizer = 1e3;
let gameIsOver = false;

let score;
let destroyed = 0,
    nDestroyed = 0,
    nInvadersDestroyed = 0;
let constantSpeed = 3,
    speed = constantSpeed,
    speedY = constantSpeed;

let objects = {
    planets: [],
    meteors: [],
    bacterias: [],
    invaders: [],
    fire: [],
    lazer: []
}
let invaderPopulate, planetPopulate, meteorPopulate, bacteriaPopulate;
let hue = 0;

const ship = new Ship();

document.body.style.backgroundColor = "hsl(" + hue % 360 + ", 90%, 60%)";
restartButton.addEventListener("click", () => location.reload())

//------GENERATE-MAP-----------------------------------------------------
setInterval(changeBgColor, 500);

function startInterval(_interval) {
    invaderPopulate = setInterval(goInvaders, _interval * 6);
    planetPopulate = setInterval(goPlanets, _interval * 5);
    meteorPopulate = setInterval(goMeteors, _interval * .5);
    bacteriaPopulate = setInterval(goBacterias, _interval * 1);
}
startInterval(regularizer)

if (hardMode && !gameIsOver) {
    setInterval(function () {
        regularizer *= .9;
        clearInterval(invaderPopulate);
        clearInterval(planetPopulate);
        clearInterval(meteorPopulate);
        clearInterval(bacteriaPopulate);
        startInterval(regularizer)
    }, 30000);
}
//---------------SETUP------------------------------
function setup() {
    rectMode(CENTER)
    angleMode(DEGREES)
    createCanvas(WIDTH, HEIGHT)
    ship.setup();
}
//---------------DRAW-LOOP--------------------------
function draw() {
    clear()
    score = hue + destroyed
    scoreDisplay.innerHTML = "🚀 " + score.toFixed(2) + " 👾 " + nDestroyed + " 🛸 " + nInvadersDestroyed;
    ship.draw();
    Object.keys(objects).forEach(function (o) { // DRAW EVERY OBJECTS
        objects[o].forEach(function (x) {
            x.draw();
            if (o === 'invaders') {
                objects.fire.push(new Fires(x.x, x.y)); // CREATE INVADERS SHOOTINGS
            }
            if (checkCollistion(ship, x)) { // CHECK COLLISION BETWEEN PLAYER AND OBJECTS
                console.log("COLLISTION")
                ship.y += 5;
                document.body.style.backgroundColor = "hsl(0, 90%, 60%)";
            }
        })
        if (o === 'invaders') { // CLEAR ARRAYS OF OBJECTS WHEN OUT OF SCREEN
            objects[o] = objects[o].filter(x => x.x < WIDTH && x.x > 0)
        } else objects[o] = objects[o].filter(x => x.y < HEIGHT && x.y > 0)
    })
    Object.keys(objects).filter(x => x !== 'lazer' && x !== 'meteors' && x !== 'fire').forEach(function (obj) {
        objects[obj].forEach(function (x) {
            if (objects.lazer.length > 0) {
                objects.lazer.forEach(function (l) {
                    if (checkCollistion(l, x)) { // CHECK COLLISION FOR SHOOTINGS
                        console.log("SHOOT")
                        if (obj === 'invaders') {
                            nInvadersDestroyed += 1;
                        }
                        else if (obj === 'planets') {
                            destroyed = 0;
                            document.body.style.backgroundColor = "hsl(0, 90%, 60%)";
                        }
                        else if (obj === 'bacterias') {
                            destroyed += 5;
                            nDestroyed += 1;
                        }
                        objects[obj].splice(objects[obj].indexOf(x), 1) // IF SHOOT, CLEAR OBJECT
                    }
                })
            }
        })
    })

    if (keyIsDown(DOWN_ARROW) && !gameIsOver) {
        objects.lazer.push(new Lazer(ship.x, ship.y));
        objects.lazer.forEach(x => x.draw());
    } else {
        lazer = null;
    }
}