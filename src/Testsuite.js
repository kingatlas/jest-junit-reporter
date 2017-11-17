const readPkg = require('read-pkg');
const path = require('path');
const Testcase = require('./Testcase');

class Testsuite {
  constructor (id, result) {
    const packagedData = readPkg.sync(process.cwd());
    const config = packagedData.jestNunitReporter || {};
    const testSuiteNamePrefix = config.testSuiteNamePrefix || '';
    
    let testcases = result.testResults
      .filter(result => (result.status !== 'pending'))
      .map(result => new Testcase(result));

    let suiteName = result.testFilePath;
    
    if (config.testSuiteNameFromAncestors) {
        const commonTitle = result.testResults.map(r => r.ancestorTitles.length > 0 ? r.ancestorTitles[0] : undefined)
                                              .reduce((a, b) => a == b ? a : undefined);
        if (commonTitle) {
          suiteName = commonTitle;
        }
    }

    let suite = {
      _attr: {
        name: testSuiteNamePrefix + suiteName,
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
