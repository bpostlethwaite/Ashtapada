module.exports = {
  getHealth: function () {
    return this._health
  }
, getLocation: function () {
    return this._location
  }
, visibleUnits: function () {
    var board = this._game.getBoard(this._board)
    return board.visibleUnits(this)
  }
, joinBoard: function (id, location) {
    var board = this._game.getBoard(id)
    this._board = board.addUnit(this, location)
  }
, leaveBoard: function (board) {
    this._board = board.removeUnit(this)
  }
, getBoard: function () {
    return this._board
  }
, getType: function () {
    return this._type
  }
}
