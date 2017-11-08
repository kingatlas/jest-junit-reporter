class Failure {
  constructor (message) {
    const lines = message.split('\n');
    const msg = lines.filter(l => !/^\s*at /.test(l)).join('\n');
    const stackTrace = lines.filter(l => /^\s*at /.test(l)).join('\n');

    this.failure = [
      {
        message: msg
      },
      {
        'stack-trace': stackTrace
      }
    ];
  }
}

module.exports = Failure;
