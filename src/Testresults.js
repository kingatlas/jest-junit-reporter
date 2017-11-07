const Testsuite = require('./Testsuite');
const Environment = require('./Environment');

Array.prototype.sum = function (selector) { return this.map(selector).reduce((a,b) => a+b); }

class Testresults {
  constructor (results) {
    var d = new Date();
    var date = d.toISOString().substr(0, 10);
    var time = d.toISOString().substr(11, 8);

    const total = results.testResults.sum(result => result.numPendingTests + result.numFailingTests + result.numPassingTests);
    const failures = results.testResults.sum(result => result.numFailingTests);
    const skipped = results.testResults.sum(result => result.numPendingTests);

    this['test-results'] = [new Environment()].concat(results.testResults.map((result, i) => new Testsuite(i, result)).concat({
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
