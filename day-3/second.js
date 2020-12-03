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
const dataInput = formatInput('/home/karsten/programming/advent-of-code-2020/day-3/raw.txt', 77);
const oneOneTrees = detectTrees(dataInput, { x: 1, y: 1 });
const threeOneTrees = detectTrees(dataInput, { x: 3, y: 1 });
const fiveOneTrees = detectTrees(dataInput, { x: 5, y: 1 });
const sevenOneTrees = detectTrees(dataInput, { x: 7, y: 1 });
const oneTwoTrees = detectTrees(dataInput, { x: 1, y: 2 });
const answer = oneOneTrees * threeOneTrees * fiveOneTrees * sevenOneTrees * oneTwoTrees;
console.log(answer);
