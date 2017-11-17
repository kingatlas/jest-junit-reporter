const Testsuite = require('../Testsuite');
const xml = require('xml');
const { failedCase, pendingCase, passingCase } = require('./fixtures/testcase');
const fs = require('fs');
const testsuiteFixture = fs.readFileSync(__dirname + '/fixtures/testsuite.xml', { encoding: 'utf-8' });

const mockStart = 1484076068090;
const mock = {
  testFilePath: 'src/foo.bar.spec.js',
  numFailingTests: 1,
  numPendingTests: 1,
  numPassingTests: 1,
  perfStats: {
    start: mockStart,
    end: mockStart + 5000
  },
  testResults: [pendingCase, failedCase, passingCase]
};

describe('test-suite', () => {

  const readPkg = require('read-pkg');
  const originalSync = readPkg.sync;

  afterEach(() => {
    readPkg.sync = originalSync;
  });

  it('should produce a <test-suite>', () => {
    
     const result = new Testsuite(1, mock);
     const report = xml(result, {indent: '  '});
     expect(report).toEqual(testsuiteFixture.trim());
   });
   
   it('should use testsuite name prefix', () => {
     readPkg.sync = jest.fn().mockReturnValue({ jestNunitReporter: { testSuiteNamePrefix: 'PREFIX.' }});
     const result = new Testsuite(1, mock);

     expect(result['test-suite'][0]._attr.name).toEqual('PREFIX.src/foo.bar.spec.js');
   })

   it('should use testsuite name from ancestrors titles', () => {
    readPkg.sync = jest.fn().mockReturnValue({ jestNunitReporter: { testSuiteNameFromAncestors: true }});
    const result = new Testsuite(1, mock);

    expect(result['test-suite'][0]._attr.name).toEqual('boo');
  })

})
