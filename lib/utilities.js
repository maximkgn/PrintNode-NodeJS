var fs = require('fs');

module.exports = {
  base64_encode: function (file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
  }
};
