class Failure {
  constructor (message) {
    this.failure = [
      {
        message
      },
      {
        'stack-trace': message
      }
    ];
  }
}

module.exports = Failure;
