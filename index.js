const Testresults = require('./src/Testresults');
const xml = require('xml');
const fs = require('fs');
const readPkg = require('read-pkg');
const path = require('path');

module.exports = (results) => {
  const packagedData = readPkg.sync(process.cwd());
  const config = packagedData.jestNunitReporter || {};

  const out = config.outputPath || process.cwd();
  const filename = config.outputFilename || 'test-report.xml';
  const testresults = new Testresults(results);
  const data = xml(testresults, { declaration: true, indent: '  ' });
  fs.writeFileSync(path.join(out, filename), data);
  return results;
};
