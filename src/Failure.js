class Failure {
  constructor (message) {
    const lines = message.split('\n');
    const msg = lines.filter(l => !l.startsWith('at ')).join('\n');
    const stackTrace = lines.filter(l => l.startsWith('at ')).join('\n');

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
