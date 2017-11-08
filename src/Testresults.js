const Testsuite = require('./Testsuite');
const Environment = require('./Environment');
const CultureInfo = require('./CultureInfo');

class Testresults {
  constructor (results) {
    var d = new Date();
    var date = d.toISOString().substr(0, 10);
    var time = d.toISOString().substr(11, 8);

    const total = results.numTotalTests;
    const failures = results.numFailedTests;
    const skipped = results.numPendingTests;

    this['test-results'] = [new Environment(), new CultureInfo()].concat(results.testResults.map((result, i) => new Testsuite(i, result)).concat({
      _attr: {
        name: "jest results",
        date,
        time,
        invalid: 0,
        ignored: 0,
        inconclusive: 0,
        'not-run': 0,
        errors: 0,
        total,
        failures,
        skipped
      }
    }));
  }
}

module.exports = Testresults;
