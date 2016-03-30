var _ = require('lodash');

var client = require('./lib/client');

_.assign(client.prototype, require('./lib/account-information'));
// _.assign(client.prototype, require('./lib/account-management'));
_.assign(client.prototype, require('./lib/computers'));
_.assign(client.prototype, require('./lib/printers'));
_.assign(client.prototype, require('./lib/printjobs'));
_.assign(client.prototype, require('./lib/scales'));

module.exports = client;
