const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const xsd = require('libxml-xsd');
const cwd = process.cwd();
const reporter = require('../../index');
const { failedCase, pendingCase, passingCase } = require('./fixtures/testcase');
const nunitXsd = fs.readFileSync(`${__dirname}/fixtures/nunit.xsd`, {encoding: 'utf-8'});
const mock = {
  "success": true,
  "startTime": Date.now(),
  "numTotalTestSuites": 1,
  "numPassedTestSuites": 0,
  "numFailedTestSuites": 1,
  "numRuntimeErrorTestSuites": 0,
  "numTotalTests": 3,
  "numPassedTests": 1,
  "numFailedTests": 1,
  "numPendingTests": 1,
  "testResults": [
    {
      "numFailingTests": 1,
      "numPendingTests": 1,
      "numPassingTests": 1,
      "testResults": [failedCase, pendingCase, passingCase],
      "perfStats": {
        "start": Date.now(),
        "end": Date.now() + 5000
      },
      "testFilePath": "src/__tests__/index.spec.js"
    }
  ]
};

function unlink(filename) {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }
}

it('should produce a valid NUnit XML report', () => {
  reporter(mock);
  const report = fs.readFileSync(`${cwd}/test-report.xml`, { encoding: 'utf-8' });
  const schema = xsd.parse(nunitXsd);
  const errors = schema.validate(report);
  expect(errors).toBeNull();
});

it('should return given test results', () => {
  const returnedResults = reporter(mock);
  expect(returnedResults).toEqual(mock);
});

describe('reporter file name', () => {
  const filename = 'another-report.xml';
  const readPkg = require('read-pkg');
  const originalSync = readPkg.sync;

  beforeEach(() => {
    // remove default and possible test report file if they exist.
    unlink(`${cwd}/test-report.xml`);
    unlink(`${cwd}/${filename}`);
    readPkg.sync = jest.fn().mockReturnValue({ jestNunitReporter: { outputFilename: filename} });
  });

  afterEach(() => {
    unlink(`${cwd}/${filename}`);
    readPkg.sync = originalSync;
  });

  it('should produce a report with desired file name', () => {
    reporter(mock);
    expect(fs.existsSync(`${cwd}/test-report.xml`)).toBeFalsy();
    expect(fs.existsSync(`${cwd}/${filename}`)).toBeTruthy();
  });

  it('should create directory for output file is it does not exist', () => {
    readPkg.sync = jest.fn().mockReturnValue({ jestNunitReporter: { outputPath: path.resolve(cwd, 'missing/dir') }});
    reporter(mock);
    expect(fs.existsSync(`${cwd}/missing/dir/test-report.xml`)).toBeTruthy();
    rimraf.sync(`${cwd}/missing`);
  });
});
