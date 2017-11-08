const Failure = require('../Failure');
const xml = require('xml');

it('should render a <failure> with message', () => {
  const mock = `expected 1 to be 1
at toto.js`;
  const result = new Failure(mock);
  const report = xml(result);
  expect(report).toEqual(`<failure><message>expected 1 to be 1</message><stack-trace>at toto.js</stack-trace></failure>`);
});
