var Ashtapada = require('./lib/ashtapada')
var Person = require('./lib/person')

var board = Ashtapada()

var saul = Person({name:'saul'})
var sally = Person({name:'sally'})

saul.joinBoard(board)
sally.joinBoard(board)

sally.move('n')
saul.move('w')
saul.move('s')
sally.move('e')
saul.move('w')
sally.move('e')

console.log('sally loc', sally.getLocation())
console.log('saul loc', saul.getLocation())