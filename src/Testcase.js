const Failure = require('./Failure');

class Testcase {
  constructor (result) {
    let failures = result.failureMessages.map(message => new Failure(message));
    let testCase = [
      {
        _attr: {
          name: `${result.ancestorTitles.join('/')} ${result.title}`,
          executed: result.status !== 'pending' ? 'True' : 'False',
          result: result.status === 'passed' ? 'Success' : 'Failure',
          time: result.duration / 1000
        }
      }
    ];

    this['test-case'] = testCase.concat(failures);
  }
}

module.exports = Testcase;
