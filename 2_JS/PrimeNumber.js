var isPrime;
n = 6;
if (n === 1) {
    isPrime = false;
} else if (n === 2) {
    isPrime = true;
} else {
    for (var x = 2; x < n; x++) {
        if (n % x === 0) {
            isPrime = false;
            break;
        } else {
            isPrime = true;
        }
    }
}
console.log(`${n} is a prime number? ${isPrime}`);