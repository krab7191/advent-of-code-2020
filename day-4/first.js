const fs = require('fs');

// Take input file and return array of ids
const formatInput = (input) => {
  try {
    const data = fs.readFileSync(input, 'utf-8');
    const lines = data.split(/\r?\n/);
    const dataArray = [];
    let currentId = '';
    lines.forEach((line, i) => {
      if (line !== '') {
        currentId = currentId + line + ' ';
      } else {
        dataArray.push(currentId);
        currentId = '';
      }
    });
    return dataArray;
  }
  catch (err) {
    console.error(err);
  }
};

const validateId = (idArray) => {
  let numValid = 0;
  idArray.forEach(id => {
    const numFields = id.match(/ /g).length - 1;
    // Not enough fields
    if (numFields < 6) {
      return;
    } else if (numFields < 7) {
      // If 7 fields and no cid, valid
      if ((id.match(/cid/g) || '').length !== 1) {
        numValid++
      }
    } else numValid++;
  });
  return numValid;
};

const idArray = formatInput('/home/karsten/programming/advent-of-code-2020/day-4/raw.txt');
const validIds = validateId(idArray);
console.log(validIds);
