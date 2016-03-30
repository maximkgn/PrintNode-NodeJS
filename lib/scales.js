var base64_encode = require('./utilities').base64_encode;

/** 
 * Methods for accessing Scales API endpoints.
 * 
 * @mixin Scales
 */
var Scales = {

  /** 
   * Retrieves a single scale by computer_id, device_name and device_number.
   */
  fetchScale: function (computer_id, device_name, device_number) {
    return this._getJSON('computer/' + computer_id + '/scales/' + device_name + "/" + device_number);
  },

  /**
   * Retrieves an array of scales attched to a specific computer.
   */
  fetchScalesForComputer: function (computer_id) {
    return this._getJSON('computer/' + computer_id + '/scales');
  },

  /** 
   * Retrieves an array of all scales attached to a specific computer with a specific device name
   */
  fetchScalesForComputerByDeviceName: function (computer_id, device_name) {
    return this._getJSON('computer/' + computer_id + '/scales/' + device_name);
  },
};

module.exports = Scales;