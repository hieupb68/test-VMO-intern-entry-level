const readline = require('readline');

class ArrIntManager {
  constructor(arrInt) {
    this.arrInt = arrInt;
  }

  sumAll() {
    return this.arrInt.reduce((sum, num) => sum + num, 0);
  }

  isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
      i += 6;
    }
    return true;
  }

  sumPrimeNumbers() {
    return this.arrInt.reduce((sum, num) => this.isPrime(num) ? sum + num : sum, 0);
  }

  findConsecutiveTriple() {
    const result = [];
    for (let i = 0; i < this.arrInt.length - 2; i++) {
      if (this.arrInt[i] + this.arrInt[i + 1] === this.arrInt[i + 2]) {
        result.push([this.arrInt[i], this.arrInt[i + 1], this.arrInt[i + 2]]);
      }
    }
    console.log("Các bộ 3 liên tiếp thỏa mãn điều kiện arrInt[i] + arrInt[i+1] = arrInt[i+2]:");
    result.forEach(triple => {
      console.log(triple);
    });
    return result;
  }

  findLongestSubarrayWithSum(S) {
    let maxLength = 0;
    let startIndex = -1;
    let currentSum = 0;
    let currentLength = 0;

    for (let i = 0; i < this.arrInt.length; i++) {
      currentSum += this.arrInt[i];
      currentLength++;

      while (currentSum > S) {
        currentSum -= this.arrInt[i - currentLength + 1];
        currentLength--;
      }

      if (currentSum === S && currentLength > maxLength) {
        maxLength = currentLength;
        startIndex = i - currentLength + 1;
      }
    }

    if (startIndex !== -1) {
      console.log(`Dãy con dài nhất có tổng ${S} là: ${this.arrInt.slice(startIndex, startIndex + maxLength)}`);
      return this.arrInt.slice(startIndex, startIndex + maxLength);
    } else {
      console.log(`Không tìm thấy dãy con có tổng ${S}`);
      return [];
    }
  }

  findLongestBitonicSubarray() {
    let maxLength = 1;
    let maxIndex = 0;
    let start = 0;
    let currentLength = 1;
    let increasing = true;

    for (let i = 1; i < this.arrInt.length; i++) {
      if (this.arrInt[i] > this.arrInt[i - 1]) {
        if (!increasing) {
          currentLength = 1;
          start = i;
        }
        increasing = true;
        currentLength++;
      } else if (this.arrInt[i] < this.arrInt[i - 1]) {
        currentLength++;
        increasing = false;
        if (currentLength > maxLength) {
          maxLength = currentLength;
          maxIndex = start;
        }
      } else {
        currentLength = 1;
        start = i;
      }
    }

    console.log(`Dãy tăng giảm ổn định dài nhất có độ dài là ${maxLength}: ${this.arrInt.slice(maxIndex, maxIndex + maxLength)}`);
    return this.arrInt.slice(maxIndex, maxIndex + maxLength);
  }
}

function testArrIntManager(arr) {
  const arrIntManager = new ArrIntManager(arr);

  // Tính và in ra tổng các số trong mảng
  console.log(`Tổng các số trong mảng là: ${arrIntManager.sumAll()}`);

  // Tính và in ra tổng các số nguyên tố trong mảng
  console.log(`Tổng các số nguyên tố trong mảng là: ${arrIntManager.sumPrimeNumbers()}`);

  // Tìm và in ra các bộ 3 liên tiếp thỏa mãn arrInt[i] + arrInt[i+1] = arrInt[i+2]
  arrIntManager.findConsecutiveTriple();

  // Tìm và in ra dãy con dài nhất có tổng = S
  let S = 15;
  arrIntManager.findLongestSubarrayWithSum(S);

  // Tìm và in ra dãy tăng giảm ổn định dài nhất
  arrIntManager.findLongestBitonicSubarray();
}

// Sử dụng readline để nhập mảng từ người dùng
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Nhập mảng số nguyên, cách nhau bằng dấu phẩy: ', (input) => {
  let arr = input.split(',').map(num => parseInt(num.trim()));
  testArrIntManager(arr);
  rl.close();
});
