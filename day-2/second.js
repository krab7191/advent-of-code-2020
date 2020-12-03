const fs = require('fs');

const formatInput = (input) => {
  try {
    const data = fs.readFileSync(input, 'utf-8');
    const lines = data.split(/\r?\n/);

    const jsonArray = [];

    lines.forEach((line, i) => {
      const spaceIndex = line.indexOf(' ');
      const letterIndex = line.indexOf(': ');
      jsonArray.push({
        amount: line.substring(0, spaceIndex),
        letter: line.substring(spaceIndex + 1, letterIndex),
        password: line.substring(letterIndex + 2, line.length)
      });
    });
    return jsonArray;
  }
  catch (err) {
    console.error(err);
  }
};

const countValid = (input) => {
  let numValid = 0;

  input.forEach(obj => {
    const amt = obj.amount;
    const firstIndex = parseInt(amt.substring(0, amt.indexOf('-')));
    const secondIndex = parseInt(amt.substring(amt.indexOf('-') + 1, amt.length));

    const pass = obj.password;
    if (pass.charAt(firstIndex - 1) === obj.letter) {
      if (pass.charAt(secondIndex - 1) !== obj.letter) {
        numValid++;
      }
    }
    if (pass.charAt(secondIndex - 1) === obj.letter) {
      if (pass.charAt(firstIndex - 1) !== obj.letter) {
        numValid++;
      }
    }
  });

  return numValid;
};

const jsonInput = formatInput('/home/karsten/programming/advent-of-code-2020/day-2/raw.txt');

const validPasswords = countValid(jsonInput);
console.log(validPasswords);
