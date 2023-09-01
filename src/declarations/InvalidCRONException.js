class InvalidCRONException extends Error {

  constructor(value, message) {
    super(message);

    this.value = value;
  }


  getInnerMessage() {
    let errMessage = this.message;
    errMessage = `Error the CRON value '${this.value}' isn't a valid configuration.`;

    return errMessage;
  }

}

module.exports = InvalidCRONException;