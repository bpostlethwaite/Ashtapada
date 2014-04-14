var util = require('./util')

module.exports = {
  /**
   * {Public}
   */
  getHealth: function () {
    return this._health
  }
, getLocation: function () {
    return this._location
  }
, visibleUnits: function () {
    var board = this._game.getBoard(this._board.getId())
    return board.visibleUnits(this)
  }
, joinBoard: function (virtual, location) {
    var board = this._game.getBoard(virtual.getId())
    this._board = board.addUnit(this, location)
  }
, leaveBoard: function (virtual) {
    var board = this._game.getBoard(virtual.getId())
    this._board = board.removeUnit(this)
  }
, getBoard: function () {
    return this._board
  }
, getType: function () {
    return this._type
  }
/**
 * {Private}
 */
, damage: function (damage) {
    var unit = this._self
    unit.emit('damage', damage)
    this._health -= damage
    if (this._health < 1) {
      this._type = 'terminated Person'
      util.noopMethods(unit, ['attack','move'])
      unit.emit('terminated')
    }
  }
}
