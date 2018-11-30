[![Build Status](https://travis-ci.org/kingatlas/jest-nunit-reporter.svg?branch=master)](https://travis-ci.org/kingatlas/jest-nunit-reporter)
[![npm](https://img.shields.io/npm/v/jest-nunit-reporter.svg)](https://www.npmjs.com/package/jest-nunit-reporter)

# jest-nunit-reporter
A NUnit test reporter for Jest.

## Installation
```shell
$ npm i -D jest-nunit-reporter
```

## Usage
In your `package.json` file include a `"jest"` config section and specify the `"testResultsProcessor"`:
```json
{
  "jest": {
    "testResultsProcessor": "jest-nunit-reporter"
  }
}
```

For your Continuous Integration you can simply do:
```shell
jest --ci --testResultsProcessor=jest-nunit-reporter
```

The reporter will generate a `test-report.xml` file in the project root. If you need to specify a different location(e.g., for a CI server) then set the paths in the `package.json` `jestNunitReporter` property:

```json
"jestNunitReporter": {
  "outputPath": "reports/",
  "outputFilename": "custom-report.xml",
}
```

There are other options for naming test suites:   
* `testSuiteNamePrefix`: Add prefix to test-suites names
* `testSuiteNameFromAncestors`: Use ancestors root title (`describe`)

## LICENSE
[MIT](LICENSE)
