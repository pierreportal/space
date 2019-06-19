class Ship {
    constructor() {
        this.x = WIDTH / 2;
        this.y = HEIGHT / 1.5;
        this.angle = 0.0;
        this.size = [30, 30];
        this.collistionBoxe = [];
    }
    setup() {
        this.upIcon = loadImage("assets/ship_up-01.png")
        this.leftIcon = loadImage("assets/ship_left-01-01.png")
        this.rightIcon = loadImage("assets/ship_right-01-01.png")
        this.icon = this.upIcon
    }
    draw() {
        push()

        translate(this.x, this.y)
        this.y += .3;
        rotate(this.angle % 360)
        image(this.icon, 0, 0, this.size[0], this.size[1] + (speedY / 2) ** 2)
        this.collistionBoxe = getCollistionBoxe(this)
        handleKey(this)
        if (ship.y > HEIGHT - 30) {
            gameOver()
        }
        pop()
    }
}
class Planet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rot = Math.random() * 5;
        this.angle = 0.0;
        this.size = [20, 20];
        this.collistionBoxe = [];
    }
    draw() {
        push()
        noFill()
        translate(this.x, this.y)
        circle(0, 0, this.size[0], this.size[1])
        this.y += speedY * 0.95;
        rotate(this.angle)
        circle(30, 30, 3, 3)
        this.angle += this.rot;
        this.collistionBoxe = getCollistionBoxe(this);
        pop()
    }
    destroy() {
        console.log("destroy")
    }
}
class Meteor {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rand = 5 + Math.random() * 10;
        this.size = [this.rand, this.rand]
        this.angle = 0.0;
        this.collistionBoxe = [];

    }
    draw() {
        push()
        translate(this.x, this.y)
        noFill()
        rotate(this.size)
        circle(0, 0, this.size[0], this.size[1])
        this.y += speedY * 1.2;
        this.collistionBoxe = getCollistionBoxe(this);
        pop()
    }
}
class Bacteria {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rot = 1 + Math.random() * 5;
        this.angle = 0.0;
        this.icon = loadImage("assets/bacteria2-01.png")
        this.randX = Math.random() - .5
        this.size = [20, 20]
        this.collistionBoxe = [];
    }
    draw() {
        push()
        translate(this.x, this.y)
        rotate(this.angle)
        image(this.icon, -10, -10, this.size[0], this.size[1])
        this.y += speedY;
        this.angle += this.rot
        this.x += this.randX;
        this.collistionBoxe = getCollistionBoxe(this);
        pop()
    }
    destroy() {
        console.log("destroy")
    }
}
class Invader {
    constructor(y, dir) {
        this.y = y;
        this.angle = 0.0;
        if (dir === 1) {
            this.direction = 1;
            this.x = 0;
        } else {
            this.direction = -1;
            this.x = WIDTH;
        }
        this.icon = loadImage("assets/invader-01.png")
        this.lives = 5;
        this.size = [45, 30]
        this.collistionBoxe = [];
    }
    draw() {
        push()
        translate(this.x, this.y)
        rectMode(CENTER)
        noFill()
        rotate(this.angle)
        image(this.icon, 0, 0, this.size[0], this.size[1])
        this.y += constantSpeed * 0.2 * speedY;
        this.x += this.direction * constantSpeed;
        this.angle = this.direction;
        this.collistionBoxe = getCollistionBoxe(this)
        pop()
    }
}
class Fires {
    constructor(invaderX, invaderY) {
        this.x = invaderX + 22;
        this.y = invaderY + 30;
        this.size = [2, 1]
        this.collistionBoxe = [];
    }
    draw() {
        push()
        translate(this.x, this.y)
        noFill()
        if (colorInOn) {
            colorMode(HSB)
            stroke((hue + 180), 100, 80)
        }
        strokeWeight(2)
        line(0, 0, 0, 1)
        stroke(color("black"))
        this.y += 4 + speedY;
        this.collistionBoxe = getCollistionBoxe(this)
        pop()
    }
}
class Lazer {
    constructor(shipX, shipY) {
        this.x = shipX + 15;
        this.y = shipY;
        this.size = [2, 10];
        this.collistionBoxe = [];
    }
    draw() {
        push()
        translate(this.x, this.y)
        noFill()
        this.y -= 10;
        // strokeWeight(50)
        if (colorInOn) {
            colorMode(HSB)
            stroke((hue + 180), 100, 80)
        }
        line(0, 0, 0, -this.size[1])
        this.collistionBoxe = getCollistionBoxe(this)

        pop()
    }
}