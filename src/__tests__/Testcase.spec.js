const Testcase = require('../Testcase');
const xml = require('xml');

it('should produce a <testcase>', () => {
  const testcase = {
    title: 'should foo bar',
    status: 'passed',
    ancestorTitles: ['boo', 'foo'],
    failureMessages: [],
    duration: 100
  };
  const result = new Testcase(testcase);
  const report = xml(result);
  const expected = `<test-case name="boo/foo should foo bar" executed="True" result="Success" time="0.1"></test-case>`;
  expect(report).toEqual(expected);
});

it('should produce a <failure>', () => {
  const testcase = {
    title: 'should foo bar',
    status: 'failed',
    ancestorTitles: ['boo', 'foo'],
    failureMessages: ['Assertion error'],
    duration: 0
  };
  const result = new Testcase(testcase);
  const report = xml(result);
  const expected = `<test-case name="boo/foo should foo bar" executed="True" result="Failure" time="0"><failure><message>Assertion error</message><stack-trace></stack-trace></failure></test-case>`;
  expect(report).toEqual(expected);
});
