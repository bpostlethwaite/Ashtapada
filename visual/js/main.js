var MuxDemux = require('mux-demux')
var emitIO = require('emit.io')()
var websocket = require('websocket-stream')
var wstream = websocket('ws://localhost:9999')
var mx = MuxDemux()
var controller = require('./controller')(View)
wstream.pipe(mx).pipe(wstream)

$(document).ready(function() {
    if (!Raphael.svg) {
        window.location = './notsupported.html';
    }

    // suppress select events
    $(window).bind('selectstart', function(event) {
        event.preventDefault();
    });

    // initialize visualization
    Panel.init();

    var controlStream = mx.createStream()
    // link controller to controlStream
    emitIO(controlStream, controller)
    // create an outgoing emit stream
    var emitOut = emitIO(controller)

    emitOut.pipe(controlStream)


});
