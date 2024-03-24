function getElement(selection) {
  return document.querySelector(selection);
}

// function Counter(element, value) {
//   this.counter = element;
//   this.value = value;
//   this.resetBtn = element.querySelector(".reset");
//   this.incrementBtn = element.querySelector(".increment");
//   this.decrementBtn = element.querySelector(".decrement");

//   this.counterValue = element.querySelector(".value");
//   this.counterValue.textContent = this.value;
//   // bind this to all function
//   this.increment = this.increase.bind(this);
//   this.decrement = this.decrease.bind(this);
//   this.reset = this.reset.bind(this);

//   this.incrementBtn.addEventListener("click", this.increment);
//   this.decrementBtn.addEventListener("click", this.decrement);
//   this.resetBtn.addEventListener("click", this.reset);
// }

// Counter.prototype.increase = function () {
//   console.log(this);
//   console.log(Counter);
//   this.value++;
//   this.counterValue.textContent = this.value;
// };
// Counter.prototype.decrease = function () {
//   this.value--;
//   this.counterValue.textContent = this.value;
// };
// Counter.prototype.reset = function () {
//   this.value = 0;
//   this.counterValue.textContent = this.value;
// };

// const firstCounter = new Counter(getElement(".first-counter"), 100);
// const secondCounter = new Counter(getElement(".second-counter"), 200);

class Counter {
  constructor(element, value) {
    this.counter = element;
    this.value = value;
    this.resetBtn = element.querySelector(".reset");
    this.incrementBtn = element.querySelector(".increment");
    this.decrementBtn = element.querySelector(".decrement");

    this.counterValue = element.querySelector(".value");
    this.counterValue.textContent = this.value;
    // bind this to all function
    this.increment = this.increase.bind(this);
    this.decrement = this.decrease.bind(this);
    this.reset = this.reset.bind(this);

    this.incrementBtn.addEventListener("click", this.increment);
    this.decrementBtn.addEventListener("click", this.decrement);
    this.resetBtn.addEventListener("click", this.reset);
  }
  increase() {
    this.value++;
    this.counterValue.textContent = this.value;
  }
  decrease() {
    this.value--;
    this.counterValue.textContent = this.value;
  }
  reset() {
    this.value = 0;
    this.counterValue.textContent = this.value;
  }
}
const firstCounter = new Counter(getElement(".first-counter"), 100);
const secondCounter = new Counter(getElement(".second-counter"), 200);
