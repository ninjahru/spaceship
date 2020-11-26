let player: Sprite = null 
let enemy: Sprite = null 
let projectile: Sprite = null 
info.setLife(10)
info.setScore(0)


player  = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . 5 5 5 . . . . . . . .
    . . . . . a a a . . . . . . . .
    . 5 5 5 . a 8 a a . . . . . . .
    . . . . . a 8 8 a a a . . . . .
    . . . . . a 8 5 8 8 a a . . . .
    . . . . . a 8 5 5 8 8 a a a 3 .
    . 5 5 5 . a 8 5 5 5 5 8 8 a 3 .
    . . . . . a 8 5 5 8 8 8 8 a 3 .
    . . . . . a 8 5 8 8 8 a a . . .
    . . . . . a 8 8 a a a a . . . .
    . 5 5 5 . a a a a . . . . . . .
    . . . . . a a a . . . . . . . .
    . . . . . 5 5 5 . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`,SpriteKind.Player)


controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
   projectile  = sprites.createProjectileFromSprite(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . 5 5 5 5 5 5 . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, player, 50, 0) 
})

player.setPosition(20, 50)

controller.moveSprite(player)

game.onUpdateInterval(2000, function() {
    enemy = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . 2 2 2 . . . . .
    . . . . . . . 2 2 2 2 . . . . .
    . . . . . . 2 2 2 2 2 . . . . .
    . . . . 2 2 2 2 2 2 2 . . . . .
    . . . 4 2 4 2 4 2 4 2 . . . . .
    . . . . 2 2 2 2 2 2 2 . . . . .
    . . . . . 2 2 2 2 2 2 . . . . .
    . . . . . . 2 2 2 2 2 . . . . .
    . . . . . . . . 2 2 2 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`,SpriteKind.Enemy)
    enemy.setPosition(140,Math.randomRange(0, 100))
    enemy.setVelocity(-50, 0)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    
   info.changeLifeBy(-1)
   pause(400)
   if (info.life() == 0) {
       game.over() 
   }

})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    otherSprite.startEffect(effects.fire)
    info.changeScoreBy(1)

    if (info.score() > 5) {
        enemy.setVelocity(-100, 0)
    }
    
})
