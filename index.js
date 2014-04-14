var Game = require('./lib/game')
var util = require('./lib/util')
var UserMoves = require('./user/moves')
var UserDistance = require('./user/distance')
var UserAttack = require('./user/attack')

var board = Game.newBoard()

var saul = Game.newUnit('Person', {name: 'saul'})
var sally = Game.newUnit('Person', {name: 'sally'})

// pipe saul into control stream
saul.joinBoard(board, {x:4, y:5})

saul.on('damage', function () {
  console.log('better call saul!', saul.getHealth())
})

saul.on('terminated', function () {
  console.log("ah fuck, i'm dead   --saul")
})

// pipe sally into control stream
sally.joinBoard(board)

util.extend(sally, UserMoves)
util.extend(sally, UserDistance)
util.extend(sally, UserAttack)

var target = sally.visibleUnits()[0]

sally.moveToAttack(target, 1)

sally.on('inRange', function () {
  console.log('sally in Range')
  sally.attackWhileInRange(target, 1)
})


sally.on('hit', function (damage) {
  console.log('sally landed blow for', damage, 'damage')
})

sally.on('target-destroyed', function (target) {
  //sally.store(target.getLoot())
})

saul.on('move', function (status) {
    console.log("saul moved to", saul.getLocation())
})
