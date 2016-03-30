var _ = require('lodash');

/** @mixin Printers */
var Printers = {

  /**
   * Retrieves an array of computers associated with this client / account.
   */
  fetchPrinters: function () {
    return this._getJSON('printers');
  },

  /** 
   * Retrieves the printer for the specified id.
   */
  fetchPrinter: function (printer_id) {
    return this._getJSON('printers/' + printer_id);
  },
  
  /**
   * Retrieves all printers for a single computer.
   */
  fetchPrintersForComputer: function (computer_id) {
    return this._getJSON('computers/' + computer_id + '/printers');
  },

  /**
   * Retrieves a single printer from the specified computer.
   */
  fetchPrinterForComputer: function (computer_id, printer_id) {
    return this._getJSON('computers/' + computer_id + '/printers/' + printer_id);
  }
};

module.exports = Printers;