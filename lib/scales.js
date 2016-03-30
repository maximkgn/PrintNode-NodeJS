var base64_encode = require('./utilities').base64_encode;

/** 
 * Methods for accessing Scales API endpoints.
 * 
 * @mixin Scales
 */
var Scales = {

  /**
   * Retrieves an array of scales attched to a specific computer.
   */
  fetchScalesForComputer: function (computer_id) {
    return this._getJSON('computer/' + computer_id + '/scales');
  },

  /** 
   * Retrieves a single scale attched to a specific computer by device name.
   */
  fetchScalesForComputerByDeviceName: function (computer_id, device_name) {
    return this._getJSON('computer/' + computer_id + '/scales/' + device_name);
  }
};

module.exports = Scales;