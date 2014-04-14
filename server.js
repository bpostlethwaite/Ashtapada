var ecstatic = require('ecstatic')
  , server = require('http').createServer(
      ecstatic({ root: __dirname + '/visual' })
  ).listen(9999)
  , websocket = require('websocket-stream')
  , WebSocketServer = require('ws').Server
  , emitIO = require('emit.io')()
  , wss =  new WebSocketServer({server: server})
  , EventEmitter = require('events').EventEmitter
  , MuxDemux = require('mux-demux')
var Game = require('./lib/game')
var util = require('./lib/util')
var UserMoves = require('./user/moves')
var UserDistance = require('./user/distance')
var UserAttack = require('./user/attack')

console.log('Listening on :9999');


wss.on('connection', function(ws) {

  var wstream = websocket(ws)
    , mx = MuxDemux(router)


  mx.on('error', function () {
    wstream.destroy()
  })
  wstream.on('error', function () {
    mx.destroy()
  })

  wstream.pipe(mx).pipe(wstream)
})

function router (stream) {

  var gridSize = [20,20]

  var board = Game.newBoard({x:gridSize[0], y:gridSize[1]})

  emitIO(stream, board)
  // link emitter to outgoing stream
  var emitStream = emitIO(board)
  emitStream.pipe(stream)


    //  console.log('grid ready')

  board.emit('init', gridSize)
  board.on('ready', function () {



    //board.init([20,20])

    var saul = Game.newUnit('Person', {name: 'saul'})
    var sally = Game.newUnit('Person', {name: 'sally'})

    saul.joinBoard(board, {x:4, y:5})

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
//      sally.store(target.getLoot())
    })

    saul.on('damage', function () {
      console.log('better call saul!', saul.getHealth())
    })

    saul.on('terminated', function () {
    console.log("ah fuck, i'm dead   --saul")
    })


    saul.on('move', function (status) {
      console.log("saul moved to", saul.getLocation())
    })


  })




}
