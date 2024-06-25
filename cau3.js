const readline = require('readline');

class MyString {
  constructor(inputString) {
    this.inputString = inputString;
  }

  sumAscii() {
    let sum = 0;
    for (let i = 0; i < this.inputString.length; i++) {
      sum += this.inputString.charCodeAt(i);
    }
    return sum;
  }

  sumAsciiUpperCase() {
    let sum = 0;
    for (let i = 0; i < this.inputString.length; i++) {
      if (this.inputString[i] >= 'A' && this.inputString[i] <= 'Z') {
        sum += this.inputString.charCodeAt(i);
      }
    }
    return sum;
  }

  listCharactersWithFrequencyGreaterThan(n, caseSensitive = true) {
    let charMap = new Map();
    let normalizedString = this.inputString;

    if (!caseSensitive) {
      normalizedString = normalizedString.toLowerCase();
    }

    for (let char of normalizedString) {
      if (char !== ' ') {
        if (charMap.has(char)) {
          charMap.set(char, charMap.get(char) + 1);
        } else {
          charMap.set(char, 1);
        }
      }
    }

    let result = {};
    charMap.forEach((count, char) => {
      if (count > n) {
        if (!result[count]) {
          result[count] = [];
        }
        result[count].push(char);
      }
    });

    console.log(`Các ký tự có số lần xuất hiện lớn hơn ${n}:`);
    for (let count in result) {
      if (result.hasOwnProperty(count)) {
        console.log(`${result[count].map(char => `'${char}'`).join(', ')}: ${count}`);
      }
    }

    return result;
  }

  longestCommonSubstring(s2) {
    let s1 = this.inputString;
    let longest = '';
    let currentSubstring = '';

    let dp = Array.from(Array(s1.length + 1), () => Array(s2.length + 1).fill(0));
    let maxLength = 0;
    let endIndex = 0;

    for (let i = 1; i <= s1.length; i++) {
      for (let j = 1; j <= s2.length; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          if (dp[i][j] > maxLength) {
            maxLength = dp[i][j];
            endIndex = i - 1;
          }
        } else {
          dp[i][j] = 0;
        }
      }
    }

    if (maxLength > 0) {
      longest = s1.substring(endIndex - maxLength + 1, endIndex + 1);
    }

    console.log(`Chuỗi con dài nhất có trong ${s1} và ${s2} là: '${longest}'`);
    return longest;
  }
}

function testMyString(inputString) {
  const myString = new MyString(inputString);

  // Tính và in tổng bảng mã ASCII của các ký tự trong chuỗi
  console.log(`Tổng bảng mã ASCII của chuỗi '${inputString}' là: ${myString.sumAscii()}`);

  // Tính và in tổng bảng mã ASCII của các ký tự in hoa trong chuỗi
  console.log(`Tổng bảng mã ASCII của các ký tự in hoa trong chuỗi '${inputString}' là: ${myString.sumAsciiUpperCase()}`);

  // Liệt kê các ký tự có trong chuỗi có cùng số lần xuất hiện và số lần xuất hiện đó nhiều hơn 2 lần
  myString.listCharactersWithFrequencyGreaterThan(2, true); // true để phân biệt hoa thường

  // Tìm và in ra chuỗi con dài nhất có trong chuỗi hiện tại và chuỗi 's2'
  let s2 = 'Developers are awesome';
  myString.longestCommonSubstring(s2);
}

// Sử dụng readline để nhập chuỗi từ người dùng
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Nhập chuỗi cần kiểm tra: ', (inputString) => {
  testMyString(inputString);
  rl.close();
});
