const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to draw the shape based on height
function drawShape(height) {
  let n = height * 2 + 1;

  // Upper half
  for (let i = 0; i <= height; i++) {
    let line = '';
    for (let j = 0; j < n; j++) {
      if (j === height - i || j === height + i) {
        line += '*';
      } else {
        line += ' ';
      }
    }
    console.log(line);
  }

  // Lower half
  for (let i = height - 1; i >= 0; i--) {
    let line = '';
    for (let j = 0; j < n; j++) {
      if (j === height - i || j === height + i) {
        line += '*';
      } else {
        line += ' ';
      }
    }
    console.log(line);
  }
}

// Function to handle user input using readline
function getUserInput() {
  rl.question('Enter height: ', (input) => {
    let height = parseInt(input);
    drawShape(height);
    rl.close();
  });
}

// Main execution starts here
getUserInput();
