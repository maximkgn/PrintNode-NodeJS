/** @mixin Account */
var Account = {

  /** Fetch metadata about PrintNode account */
  whoami: function () {
    return this._getJSON('whoami');
  },

  /** Fetch print credits available to PrintNode account */
  credits: function () {
    return this._getJSON('credits');
  }
  
};

module.exports = Account;
  