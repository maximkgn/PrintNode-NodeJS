var base64_encode = require('./utilities').base64_encode;

/** 
 * Methods for accessing Scales API endpoints.
 */
var PrintJobs = {

  /**
   * Retrieves an array of computers associated with this client / account.
   */
  fetchPrintJobs: function () {
    return this._getJSON('printjobs');
  },

  /* Retrieves the PrintJob for the specified id.
   */
  fetchPrintJob: function (printjob_id) {
    return this._getJSON('printjobs/' + printjob_id);
  },
  
  /**
   * Retrieves all PrintJobs from the specified printer.
   */
  fetchPrintJobsForPrinter: function (printer_id) {
    return this._getJSON('printers/' + printer_id + '/printjobs');
  },

  /* Retrieves an array with single PrintJob from the specified printer.
   */
  fetchPrintJobForPrinter: function (printer_id, printjob_id) {
    return this._getJSON('printers/' + printer_id + '/printjobs/' + printjob_id);
  },

  /**
   * Create a new print job.
   */
  createPrintJob: function (options) {
    if( !options.printerId ) {
      options.printerId = options.printer || this.default_printer_id;
    }

    if( !options.printerId ) {
      throw new Error('Must specify "printer" if default_printer_id is not set on client: { printer: 123456, ... }');
    }

    if( !options.title ) {
      throw new Error('Must provide a "title" for a print job: { title: "Printing label", ... }');
    }

    if( !options.source ) {
      options.source = "PrintNode-NodeJS Client";
    }

    if( !options.content || !options.contentType ) {
      throw new Error('Must provide a "conentType" and "content" to describe what to print.\nSee https://www.printnode.com/docs/api/curl/#printjob-creating');
    }

    return this._postJSON('printjobs', options);
  },

  /**
   * Create a new print job using a local file (in pdf print format) as the content.
   */
  createPrintJobFromPdf: function (options) {
    if( options.filename ) {
      options.content = base64_encode(options.filename);
      options.contentType = "pdf_base64";
      delete options.filename;
    }

    return this.createPrintJob(options);
  },

  /**
   * Create a new print job using a local file (in raw print format) as the content.
   */
  createPrintJobFromRaw: function (options) {
    if( options.filename ) {
      options.content = base64_encode(options.filename);
      options.contentType = "pdf_raw";
      delete options.filename;
    }

    return this.createPrintJob(options);
  }
};

module.exports = PrintJobs;