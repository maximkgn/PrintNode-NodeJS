var request = require('request');
var _ = require('lodash');

/**
 * Instantiate a client
 *
 * @class PrintNodeClient
 * @mixes Account
 * @mixes Computers
 * @mixes Printers
 * @mixes PrintJobs
 * @mixes Scales
 */
var PrintNodeClient = function (options) {
  if( !options || !options.api_key ) {
    throw new Error('Must instantiate PrintNodeClient with minimum of: { api_key: "#API-KEY#" }');
  }

  this.api_key = options.api_key;
  this.default_printer_id = options.default_printer_id;
  this.version = "~3";
  this.base_url = "https://" + this.api_key + ":@api.printnode.com/";
};

PrintNodeClient.prototype._getJSON = function (path) {
  return this._makeRequest(path);
};

PrintNodeClient.prototype._postJSON = function (path, body) {
  return this._makeRequest(path, {
    method: "POST",
    body: body
  });
};

PrintNodeClient.prototype._makeRequest = function (path, options) {
  var defaults = { 
    url: this.base_url + path,
    json: true
  };

  var xhr_options = _.defaults(options || {}, defaults);

  return new Promise(function (resolve, reject) {
    request(xhr_options, function (err, response, body) {
      if (err) {
        reject(err);
      } else if (!(/^2/.test('' + response.statusCode))) { // Status Codes other than 2xx
        var message = body && body.message ? body.message : body;
        reject(new Error(response.statusCode + " - " + message));
      } else {
        resolve(body);
      }
    });
  });
};

module.exports = PrintNodeClient;