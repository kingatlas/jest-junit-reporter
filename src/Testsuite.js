const Testcase = require('./Testcase');

class Testsuite {
  constructor (id, result) {
    let testcases = result.testResults
      .filter(result => (result.status !== 'pending'))
      .map(result => new Testcase(result));

    let suite = {
      _attr: {
        name: result.testFilePath,
        time: (result.perfStats.end - result.perfStats.start) / 1000,
        executed: ((result.numFailingTests+result.numPassingTests) > 0) ? 'True' : 'False',
        success: (result.numFailingTests === 0) ? 'True' : 'False',
        result: (result.numFailingTests === 0) ? 'Success' : 'Failure',
        type: 'TestFixture'
      }
    };

    this['test-suite'] = [suite, { results: testcases }];
  }
}

module.exports = Testsuite;
