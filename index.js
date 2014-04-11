var Game = require('./lib/game')

var board = Game.newBoard()
//var saul = Game.newUnit('Person', {name:'saul'})
var sally = Game.newUnit('Person', {name:'sally'})


//saul.joinBoard(board)
sally.joinBoard(board)

sally.on('move', function (status) {
    console.log(sally.getLocation())
})


sally.move('n')
//saul.move('w')
//saul.move('s')
sally.move('e')
//saul.move('w')
sally.move('e')

console.log(sally)