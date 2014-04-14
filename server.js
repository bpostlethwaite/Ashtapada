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
var attackRole = require('./user/role-attack')


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

  var gridSize = {x:20, y:20}
  var boardStatus = {_boardSize: gridSize}

  var board = Game.newUnit('Board', null, boardStatus)

  emitIO(stream, board)
  // link emitter to outgoing stream
  var emitStream = emitIO(board)
  emitStream.pipe(stream)

  board.emit('init', gridSize)
  board.on('ready', function () {

    var saul = Game.newUnit('Person', {name: 'saul'})
    var sally = Game.newUnit('Person', {name: 'sally'})

    saul.joinBoard(board, {x:4, y:5})

    // pipe sally into control stream
    sally.joinBoard(board)

    attackRole(sally)

    sally.attackRole()

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
