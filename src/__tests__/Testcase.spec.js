const Testcase = require('../Testcase');
const xml = require('xml');

it('should produce a <testcase>', () => {
  const testcase = {
    title: 'should foo bar',
    status: 'passed',
    ancestorTitles: ['boo', 'foo'],
    failureMessages: []
  };
  const result = new Testcase(testcase);
  const report = xml(result);
  const expected = `<test-case classname="foo" name="should foo bar" time="0"></test-case>`;
  expect(report).toEqual(expected);
});

it('should produce a <failure>', () => {
  const testcase = {
    title: 'should foo bar',
    status: 'failed',
    ancestorTitles: ['boo', 'foo'],
    failureMessages: ['Assertion error']
  };
  const result = new Testcase(testcase);
  const report = xml(result);
  const expected = `<test-case classname="foo" name="should foo bar" time="0"><failure message="Assertion error" type="AssertionError"></failure></test-case>`;
  expect(report).toEqual(expected);
});
