const fs = require('fs');

const repeat = (str, times = 1) => {
  return times < 1 ? '' : new Array(times + 1).join(str);
};

const formatInput = (input) => {
  try {
    const data = fs.readFileSync(input, 'utf-8');
    const lines = data.split(/\r?\n/);

    const dataArray = [];

    lines.forEach((line, i) => {
      dataArray.push(repeat(line, 33));
    });
    return dataArray;
  }
  catch (err) {
    console.error(err);
  }
};

const detectTrees = (input) => {
  let trees = 0;
  let yIndex = 1;
  let xIndex = 0;

  input.forEach((row, i) => {
    if (yIndex === i) {
      xIndex = xIndex + 3;
      yIndex++;
      if (row[xIndex] === '#') {
        trees++;
      }
    }
  });
  return trees;
};

const formattedData = formatInput('/home/karsten/programming/advent-of-code-2020/day-3/raw.txt');

const numTrees = detectTrees(formattedData);
console.log(numTrees);
