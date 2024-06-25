const readline = require('readline');

function sumSeriesWithLoop(x, n) {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += Math.pow(x, i);
  }
  return sum;
}

function sumSeriesFormula(x, n) {
  if (x === 1) {
    return n + 1;
  } else {
    return (Math.pow(x, n + 1) - 1) / (x - 1);
  }
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Nhập giá trị x: ", function(xStr) {
    rl.question("Nhập giá trị n: ", function(nStr) {
      rl.close();

      let x = parseInt(xStr);
      let n = parseInt(nStr);

      // Tính tổng và hiển thị kết quả sử dụng vòng lặp
      let resultLoop = sumSeriesWithLoop(x, n);
      console.log(`S(${x},${n}) (tính bằng vòng lặp) = ${resultLoop}`);

      // Tính tổng và hiển thị kết quả sử dụng công thức tổng quát
      let resultFormula = sumSeriesFormula(x, n);
      console.log(`S(${x},${n}) (tính bằng công thức tổng quát) = ${resultFormula}`);
    });
  });
}

// Gọi hàm main để chạy chương trình
main();
