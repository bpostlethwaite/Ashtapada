module.exports = {
  getHealth: function () {
    return this._health
  }
, getLocation: function () {
    return this._location
  }
, joinBoard: function (board) {
    this._board = board
  }
, leaveBoard: function (board) {
    this._board = null
  }
}
