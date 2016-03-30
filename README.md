# PrintNode-NodeJS

Cloud Printing wrapper for the [PrintNode](https://www.printnode.com) API.

## Installation

Install nodejs + npm.

Clone repo and install dependencies:

```
  // clone repo
  git clone https://github.com/miketownsend/PrintNode-NodeJS.git 

  // install dependencies
  cd PrintNode-NodeJS && npm install
```

Require and instantiate a client:
```
  var PrintNodeClient = require('~/path/to/printnode-client/index.js');
  var client = new PrintNodeClient({ api_key: "DUMMY_API_KEY", default_printer_id: 123456 });
```

## Usage
### [Account Information](https://www.printnode.com/docs/api/curl/#account_information)

```
  // fetch metadata about account
  client.whoAmI().then(console.log);

  // fetch account credits
  client.credits().then(console.log);
```

### [Computers](https://www.printnode.com/docs/api/curl/#computers)

```
  // fetch computers
  client.fetchComputers().then(...);
```

### [Printers](https://www.printnode.com/docs/api/curl/#printers)

```
  // Fetch printers
  client.fetchPrinters().then(...);

  // Fetch printers for a specific computer
  client.fetchPrinters(computer_id).then(...);

  // Fetch a specific printer (returns array of one)
  client.fetchPrinters(printer_id).then(...);

  // Fetch a specific printer from a computer
  client.fetchPrinters(computer_id, printer_id).then(...);
```

### [PrintJobs](https://www.printnode.com/docs/api/curl/#printjobs)

#### Fetching:
```
  // Fetch all print jobs
  client.fetchPrintJob().then(...);

  // Fetch a specific print jobs (returns array of one)
  client.fetchPrintJob(printjob_id).then(...);

  // Fetch all print jobs for a specific printer
  client.fetchPrintJobsForPrinter(printer_id).then(...);

  // Fetch a specific printer from a printer (returns array of one)
  client.fetchPrintJobForPrinter(printer_id, printjob_id).then(...);
```

#### Creating
Full options for creation of PrintJobs are available in the [API documentation](https://www.printnode.com/docs/api/curl/#printjobs).
```
  // Create a print job
  var options = {
    title: "Printing example 1",
    source: "PrintNode-NodeJS", // defaults to this
    content: "https://app.printnode.com/testpdfs/4x6_combo_vertical_ol829.pdf",
    contentType: "pdf_uri"
  };
  client.createPrintJob(options).then(console.log); // returns printjob id only

  // Create a print job from a local PDF file
  var options = {
    title: "Printing example 2",
    filename: "./test/examples/label.pdf"
  };
  client.createPrintJobFromPDF().then(...);


  // Create a print job from a local raw print file
  var options = {
    title: "Printing example 2",
    filename: "./test/examples/label.pdf"
  };
  client.createPrintJobFromRaw().then(...);

```

### [Scales](https://www.printnode.com/docs/api/curl/#scales)

```
  // Fetch all print jobs
  client.fetchPrintJob().then(...);

  // Fetch a specific print jobs (returns array of one)
  client.fetchPrintJob(printjob_id).then(...);

  // Fetch all print jobs for a specific printer
  client.fetchPrintJobsForPrinter(printer_id).then(...);

  // Fetch a specific printer from a printer (returns array of one)
  client.fetchPrintJobForPrinter(printer_id, printjob_id).then(...);
```

## Testing

The tests in place at the moment are simply testing for positive responses, they are not looking at the detail of the response.

Requirements:
- a live account. This should be setup on [printnode.com](https://printnode.com)
- the printnode client to be installed and logged in on that computer
- at least one active printer to be available on that computer, you can use a pdf printer to avoid printing during testing [CutePDF](http://cutepdf.com/)

Running the tests

  1. Change the API_KEY and ACTIVE_PRINTER_ID in test/live_test.js 
  2. Run `npm test`