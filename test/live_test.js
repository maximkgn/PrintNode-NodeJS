/* 
 * These tests require a PrintNode account and at least
 * one printer connected and active to test with. 
 */

var API_KEY = null; // <--- Change to your api key
var ACTIVE_PRINTER_ID = null; // <--- Change to the id of the printer you want to use for testing. 

/****************************************/

var PrintNodeClient = require('../index'),
  assert = require('assert'),
  chai = require('chai'),
  chai_as_promised = require('chai-as-promised'),
  path = require('path'),
  fs = require('fs'),
  rootPath = path.normalize(__dirname + '/..');

chai.use(chai_as_promised);
chai.should();

if ( !API_KEY || !ACTIVE_PRINTER_ID ) {
  throw new Error('Cannot test PrintNodeClient as no API_KEY has been provided.\nSet API_KEY and ACTIVE_PRINTER_ID in test/live_account_test.js');
}

function log_error(err, response, body) {
  if( err ) { console.log(err.stack || err); }
  throw err;
};

describe('Error Handling', function () {
  this.timeout(5000);

  it('should fail GET gracefully', function () {  
    var client = new PrintNodeClient({ api_key: "BAD API KEY" });
    return client.whoami().should.be.rejected;
  });

  it('should fail POST gracefully', function () { 
    var client = new PrintNodeClient({ api_key: "BAD API KEY", default_printer_id: "BAD PRINTER" });
    return client.createPrintJob({
      title: "Printing test 1",
      source: "PrintNode-NodeJS",
      content: "https://app.printnode.com/testpdfs/4x6_combo_vertical_ol829.pdf",
      contentType: "pdf_uri"
    }).should.be.rejected;
  });
});

describe('Account', function () {
  this.timeout(5000);

  before(function() {   
    this.client = new PrintNodeClient({ api_key: API_KEY });
  });

  it('should GET whoami', function () { 
    return this.client.whoami().should.eventually.have.property('email');
  });

  it('should GET credits', function () {
    return this.client.credits().should.eventually.be.a('number');
  });
});

describe('Computers', function () {
  this.timeout(5000);

  before(function() {
    this.client = new PrintNodeClient({ api_key: API_KEY });
  });

  it('should GET computers', function () {
    return this.client.fetchComputers().should.eventually.be.instanceOf(Array);
  });
});

describe('Printers', function () {
  this.timeout(5000);

  before(function() {
    this.client = new PrintNodeClient({ api_key: API_KEY });
  });

  it('should GET printers', function () {
    return this.client.fetchPrinters().should.eventually.be.instanceOf(Array);
  });

  it('should GET printer by id', function () {
    return this.client.fetchPrinters()
    .then(function (response) {
      response.should.exist.and.have.length.above(0);
      return response[0].id;
    })
    .then(this.client.fetchPrinter.bind(this.client))
    .then(function (response) {
      response.should.exist.and.be.instanceOf(Array);
    })
    .catch(log_error)
    .should.be.fulfilled;
  });
  
  it('should GET printers by filtered by computer id', function () {
    return this.client.fetchComputers()
    .then(function (response) {
      response.should.exist.and.have.length.above(0);
      return response[0].id;
    })
    .then(this.client.fetchPrintersForComputer.bind(this.client))
    .then(function (response) {
      response.should.exist.and.have.length.above(0);
    })
    .catch(log_error)
    .should.be.fulfilled;
  });
});

describe('Print Jobs', function () {
  this.timeout(10000);

  before(function() {
    this.client = new PrintNodeClient({ api_key: API_KEY, default_printer_id: ACTIVE_PRINTER_ID });
  });

  it('should create PrintJob from url and fetch the specific PrintJob', function () {
    var client = this.client;
    var printjob_id = false;

    return client.createPrintJob({
      title: "Printing test 1",
      source: "PrintNode-NodeJS",
      content: "https://app.printnode.com/testpdfs/4x6_combo_vertical_ol829.pdf",
      contentType: "pdf_uri"
    })
    .then(function (response) {
      printjob_id = response;
      return client.fetchPrintJob(printjob_id);
    })
    .catch(log_error)
    .should.eventually.satisfy(function(printjob) {
      return (!!printjob && printjob.length > 0 && !!printjob[0].state);
    });
  });
  
  it('should fetch existing PrintJobs', function () {
    return this.client.fetchPrintJobs()
      .catch(log_error)
      .should.eventually.be.instanceOf(Array);
  });

  it('should fetch all PrintJobs for specific Printer', function () {
    return this.client.fetchPrintJobsForPrinter(this.client.default_printer_id)
      .should.eventually.be.instanceOf(Array)
      .and.should.eventually.have.length.above(0);
  });
});

describe.only('Scales', function () {
  this.timeout(10000);

  before(function() {
    this.client = new PrintNodeClient({ api_key: API_KEY });
  });
  
  it('should fetch scales for computer', function () {
    var computer_id = 0; // magic computer with scales which are "always" there for testing. 
    return this.client.fetchScalesForComputer(computer_id)
      .catch(log_error)
      .should.eventually.be.instanceOf(Array)
      .should.eventually.have.length.above(0)
      .should.eventually.satisfy(function (scales) { return !!scales[0].measurement; });
  });

  it('should fetch scale for computer by device name', function () {
    var computer_id = 0; // magic computer with scales which are "always" there for testing. 
    var device_name = "PrintNode Test Scale";
    return this.client.fetchScalesForComputerByDeviceName(computer_id, device_name)
      .catch(log_error)
      .should.eventually.be.instanceOf(Array)
      .should.eventually.have.length.above(0)
      .should.eventually.satisfy(function (scales) { return scales[0].deviceName === "PrintNode Test Scale"; });  
  });

  it('should fetch scale for computer by device name and number', function () {
    var computer_id = 0; // magic computer with scales which are "always" there for testing. 
    var device_name = "PrintNode Test Scale";
    var device_number = 0;

    return this.client.fetchScale(computer_id, device_name, device_number)
      .catch(log_error)
      .should.eventually.have.property('measurement')
      .should.eventually.equal({ deviceName: device_name, deviceNumber: device_number })
      .then(console.log);
  });
});