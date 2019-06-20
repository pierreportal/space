console.log("constants.js connected")


const WIDTH = document.body.offsetWidth;
const HEIGHT = document.body.offsetHeight;

const debugMOde = false;
const colorInOn = false;
const hardMode = true;
const createInvaders = true;

const infoDisplay = document.querySelector(".info");
const scoreDisplay = document.querySelector("#score_display");
const restartButton = document.querySelector(".restrat_game");

// CALL BACK FUNCTIONS :
function hideInfos() {
    infoDisplay.style.display = 'none';
}

function changeConstantSpeed() {
    constantSpeed += .2;
}
function changeBgColor() {
    if (!gameIsOver) hue += .05 * speedY;
    document.body.style.backgroundColor = "hsl(" + hue % 360 + ", 90%, 60%)";
}
function goInvaders() {
    if (createInvaders) {
        let binaryRand = Math.round(Math.random())
        objects.invaders.push(new Invader(100, binaryRand));
    }
}
function goPlanets() {
    let randx = Math.random() * WIDTH
    objects.planets.push(new Planet(randx, 0));
}
function goMeteors() {
    let randx = Math.random() * WIDTH
    objects.meteors.push(new Meteor(randx, 0));
}
function goBacterias() {
    let randx = Math.random() * WIDTH
    objects.bacterias.push(new Bacteria(randx, 0));
}

// COLLISTION CHECKING HELPER FUNCTIONS :
function getCollistionBoxe(o) {
    let width = o.size[0];
    let height = o.size[1];
    let boxe;
    if (objects.invaders.includes(o) || o === ship) {
        boxe = {
            x0: o.x + width / 2, x1: o.x + width / 2 + width,
            y0: o.y + height / 2, y1: o.y + height + height / 2,
        }
    }
    //  else if (o === lazer) {
    //     console.log("lazer")
    // }
    else {
        boxe = {
            x0: o.x, x1: o.x + width,
            y0: o.y, y1: o.y + height,
        }
    }
    // coordinates: [
    //     [o.x, o.y], [o.x + width, o.y],
    //     [o.x, o.y + height], [o.x + width, o.y + height]
    // ]
    return boxe
}
function distance(a, b) {
    let widthA = a.x1 - a.x0,
        heightA = a.y1 - a.y0,
        widthB = b.x1 - b.x0,
        heightB = b.y1 - b.y0;
    let radiusA = Math.sqrt(widthA / 2 ** 2 + heightA / 2 ** 2),
        radiusB = Math.sqrt(widthB / 2 ** 2 + heightB / 2 ** 2);
    return Math.sqrt((a.x0 - b.x0) ** 2 + (a.y0 - b.y0) ** 2) - (radiusA + radiusB)
}
function checkCollistion(shooter, cible) {
    if (!shooter) {
        return false
    }
    let a = shooter.collistionBoxe;
    let b = cible.collistionBoxe;
    if (debugMOde) {
        noFill()
        stroke(color("aqua"))
        rect(b.x0, b.y0, (b.x1 - b.x0), (b.y1 - b.y0))
        rect(a.x0, a.y0, (a.x1 - a.x0), (a.y1 - a.y0))
        stroke(color("black"))
    }
    if (distance(a, b) < 10) {
        if (debugMOde) {
            line(a.x0, a.y0, b.x0, b.y0)
        }
        return true
    }
    return false
}
// GAME PLAY FUNCTIONS :
function handleKey(p) {
    if (keyIsDown(LEFT_ARROW) && !gameIsOver) {
        objects.meteors.forEach(m => m.x += 0.3)
        p.icon = p.leftIcon;
        speed += .2;
        p.x -= speed;
        if (p.x < 0) p.x = WIDTH;
    } else if (keyIsDown(RIGHT_ARROW) && !gameIsOver) {
        objects.meteors.forEach(m => m.x -= 0.3)
        p.icon = p.rightIcon;
        speed += .2;
        p.x += speed;
        if (p.x > WIDTH) p.x = 0;
    } else {
        p.icon = p.upIcon;
        if (speed > constantSpeed) speed -= .3;
    }
    if (keyIsDown(UP_ARROW) && !gameIsOver) {
        speedY += .2;
        if (p.y > HEIGHT / 1.5) {
            p.y -= 2;
        }
    } else {
        if (speedY > constantSpeed) speedY -= .3;
    }
}

function gameOver() {
    let totalScore = (score) * nInvadersDestroyed + nDestroyed
    gameIsOver = true
    document.querySelector(".title_end").style.display = "block";
    document.querySelector("#total_score_display").innerHTML = "🛸 " + totalScore.toFixed(2);
    clearInterval(invaderPopulate);
    clearInterval(planetPopulate);
    clearInterval(meteorPopulate);
    clearInterval(bacteriaPopulate);
    setInterval(function () {
        document.querySelector(".restrat_game").style.display = 'block';
    }, 500);
}