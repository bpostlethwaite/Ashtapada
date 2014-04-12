var dnode = require('dnode');

var d = dnode.connect(5004);
d.on('remote', function (remote) {
    module.exports = d
});
