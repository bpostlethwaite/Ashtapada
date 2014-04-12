var game = require('./lib/game')
var dnode = require('dnode');
var server = dnode(game);
server.listen(5004);