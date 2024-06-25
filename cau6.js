const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function findMedianSortedArrays() {
  rl.question('Enter sorted array ar1 (comma-separated): ', (input1) => {
    let ar1 = input1.split(',').map(Number);
    rl.question('Enter sorted array ar2 (comma-separated): ', (input2) => {
      let ar2 = input2.split(',').map(Number);

      // Sorting arrays (if not already sorted)
      ar1.sort((a, b) => a - b);
      ar2.sort((a, b) => a - b);

      // Proceed to find median
      let m = ar1.length;
      let n = ar2.length;
      let totalLength = m + n;
      let left = 0, right = 0;
      let median = 0, prevMedian = 0;

      for (let count = 0; count <= totalLength / 2; count++) {
        prevMedian = median;
        if (left < m && (right >= n || ar1[left] <= ar2[right])) {
          median = ar1[left];
          left++;
        } else {
          median = ar2[right];
          right++;
        }
      }

      // Determine median based on totalLength parity
      if (totalLength % 2 === 0) {
        median = (median + prevMedian) / 2;
      }

      console.log(`Median of the merged sorted arrays is: ${median}`);

      rl.close();
    });
  });
}

// Usage example
findMedianSortedArrays();
