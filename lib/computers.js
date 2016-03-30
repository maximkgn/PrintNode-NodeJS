/** @mixin Computers */
var Computers = {
  /**
   * Retrieves an array of computers associated with this client / account.
   * 
   * ```
   * @for PrintNodeClient
   * @return {promise} response - promise which fulfils with an array of computers:
   *
   *  [{
   *    "id": 11,
   *    "name": "AnalyticalEngine",
   *    "inet": null,
   *    "inet6": null,
   *    "hostname": null,
   *    "version": null,
   *    "jre": null,
   *    "createTimestamp": "2015-06-28T18:29:19.871Z",
   *    "state": "disconnected"
   *  }]
   * ``` 
   */
  fetchComputers: function () {
    return this._getJSON('computers');
  },
};

module.exports = Computers;