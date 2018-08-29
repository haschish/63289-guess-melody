class Life {
  constructor(count) {
    count = parseInt(count, 10);
    count = (isNaN(count) || count < 0) ? 0 : count;

    this.count = count;
  }

  decrease() {
    if (this.count > 0) {
      this.count--;
    }

    return this.count;
  }
}

export default Life;
