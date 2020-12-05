const fs = require('fs');
const repeat = (str, times = 1) => {
  return times < 1 ? '' : new Array(times + 1).join(str);
};
const formatInput = (input, numRepeats = 1) => {
  try {
    const data = fs.readFileSync(input, 'utf-8');
    const lines = data.split(/\r?\n/);
    const dataArray = [];
    lines.forEach((line, i) => {
      dataArray.push(repeat(line, numRepeats));
    });
    return dataArray;
  }
  catch (err) {
    console.error(err);
  }
};
const detectTrees = (input, slope) => {
  let trees = 0;
  let yIndex = slope.y;
  let xIndex = 0;
  input.forEach((row, i) => {
    if (yIndex === i) {
      xIndex = xIndex + slope.x;
      yIndex += slope.y;
      if (row[xIndex] === '#') {
        trees++;
      }
    }
  });
  return trees;
};
const slopes = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 }
];
const dataInput = formatInput('/home/karsten/programming/advent-of-code-2020/day-3/raw.txt', 77);
let answer = 1;
slopes.forEach((slope, i) => {
  answer = answer * detectTrees(dataInput, slope);
});
console.log(answer);