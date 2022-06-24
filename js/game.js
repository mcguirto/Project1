const game = document.getElementById('canvas')

const movementDisplay = document.getElementById('movement')

const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

// console.log('this is the canvas width', game.width)
// console.log('this is the canvas height', game.height)

class SpaceShip {
    constructor(x, y, color, width, height){
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.render = function(){
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

class Projectile {
    constructor(x, y, color, width, height){
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.speed = 20,
        this.render = function(){
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        this.move = function () {
            this.x += this.speed
            if (this.x > ctx.width){
                this.x = player.x
            }
        } 
    }
}

let player = new SpaceShip(10, 200, 'azure', 16, 16)
let enemy = new SpaceShip(450, 200, 'red', 16, 16)
let laser = new Projectile(player.x + player.width, player.y + player.width/2, 'white', 5, 5)

const gameLoop= () =>{
    if (enemy.alive){
        detectHit()
    }
    //console.log('running')
    ctx.clearRect(0, 0, game.width, game.height)

    //movementDisplay.textContent = player.x + ', ' + player.y
    player.render()
    laser.render()

    if (enemy.alive){
        enemy.render()
    }
}



document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', movementHandler)
    setInterval(gameLoop, 60)
})

const movementHandler = (e) => {
    switch (e.keyCode) {
        case (87):
            player.y -= 10
            laser.y -= 10
            break
        case (83):
            player.y += 10
            laser.y += 10
            break
        case (32):
            laser.move()
            // const projectile = new Projectile (
            //     (10, 200, 'white', 5, 5, null)
            // )
            break
    }
}

// const movementHandler = (e) => {
//     if (e.keyCode = 87){
//         player.y -= 10
//     }else if (e.keyCode = 83){
//         player.y += 10
//     }else if (e.keyCode = 32){
//         laser.move()
//     }
// }

// const projectile 

const detectHit = () => {
    if (laser.x < enemy.x + enemy.width
        && laser.x +laser.width > enemy.x
        && laser.y < enemy.y + enemy.height
        && laser.y + laser.height > enemy.y){
            enemy.alive = false
            document.getElementById('status').textContent = 'You Win!'
        }
}

// const shoot = (e) => {
//     //press spacebar to shoot the projectile
    
// }