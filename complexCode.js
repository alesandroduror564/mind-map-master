/* filename: complexCode.js */

// Fibonacci Sequence Generator
function fibonacci(length) {
  var fibSequence = [0, 1];
  for (var i = 2; i < length; i++) {
    fibSequence[i] = fibSequence[i - 1] + fibSequence[i - 2];
  }
  return fibSequence;
}

// Evaluate prime numbers within a given range
function getPrimes(start, end) {
  var primes = [];
  for (var number = start; number <= end; number++) {
    var isPrime = true;
    for (var i = 2; i < number; i++) {
      if (number % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime && number > 1) {
      primes.push(number);
    }
  }
  return primes;
}

// Calculate factorial of a given number
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Create a class to represent a car
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.started = false;
  }

  startEngine() {
    this.started = true;
    console.log("Engine started.");
  }

  stopEngine() {
    this.started = false;
    console.log("Engine stopped.");
  }

  static numberOfWheels() {
    return 4;
  }
}

// Create an instance of the Car class
var myCar = new Car("Tesla", "Model S", 2022);
console.log(myCar);

// Animate an element with CSS keyframes
var element = document.getElementById("myElement");
element.style.animation = "myAnimation 2s linear infinite";

console.log(fibonacci(10));
console.log(getPrimes(1, 100));
console.log(factorial(5));
console.log(Car.numberOfWheels());