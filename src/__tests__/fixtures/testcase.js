module.exports = {
  failedCase: {
    title: 'should foo the bar',
    status: 'failed',
    ancestorTitles: ['boo', 'foo'],
    failureMessages: [`Assertion error
  at Object.shallow (file.js:5:15)
  at ReactShallowRenderer._mountClassComponent (file2.js:182:37)`],
    duration: 0
  },
  pendingCase: {
    title: 'should foobar the baz',
    status: 'pending',
    ancestorTitles: ['boo', 'foo'],
    failureMessages: [],
    duration: 0
  },
  passingCase: {
    title: 'should foofoo the baz',
    status: 'passed',
    ancestorTitles: ['boo', 'foo'],
    failureMessages: [],
    duration: 0
  }
};
