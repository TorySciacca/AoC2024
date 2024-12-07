//AoC Master JS File

const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const fileContentElement = document.querySelector('#file-content');
const resultElement = document.querySelector('#result');
const reader = new FileReader(); // declare reader here

uploadButton.addEventListener('click', (e) => {
  let fileContentString;
  reader.onload = (event) => {
    fileContentString = event.target.result;
    fileContentElement.textContent = 'Data: ' + fileContentString;
    const day = parseInt(document.getElementById('day-select').value, 10);
    if (checkFileName(fileInput.files[0], day)) {execute(fileContentString, day);}
    console.log('Script Complete for Day ' + day)
  };
  reader.readAsText(fileInput.files[0]);
});

function checkFileName(file, day) {
  const fileName = file.name;
  if(fileName !== `${day}a.txt` && fileName !== `${day}b.txt`) {
    resultElement.textContent = `Error: File must be for day ${day} (a = test, b = actual)`;
    return false;
  }
  return true;
}

function execute(dataInput, day) {
  switch(day) {
    case 1:
      day1(dataInput);
      break;
    case 2:
      day2(dataInput);
      break;
    case 3:
      day3(dataInput);
      break;
    case 4:
      day4(dataInput);
      break;
    case 5:
      day5(dataInput);
      break;
    case 6:
      day6(dataInput);
      break;
    case 7:
      day7(dataInput);
      break;
    case 8:
      day8(dataInput);
      break;
    case 9:
      day9(dataInput);
      break;
    case 10:
      day10(dataInput);
      break;
    case 11:
      day11(dataInput);
      break;
    case 12:
      day12(dataInput);
      break;
    case 13:
      day13(dataInput);
      break;
    case 14:
      day14(dataInput);
      break;
    case 15:
      day15(dataInput);
      break;
    case 16:
      day16(dataInput);
      break;
    case 17:
      day17(dataInput);
      break;
    case 18:
      day18(dataInput);
      break;
    case 19:
      day19(dataInput);
      break;
    case 20:
      day20(dataInput);
      break;
    case 21:
      day21(dataInput);
      break;
    case 22:
      day22(dataInput);
      break;
    case 23:
      day23(dataInput);
      break;
    case 24:
      day24(dataInput);
      break;
    default:
      console.log("Invalid day");
  }
}

function day1(dataInput){
    //1. Load data into arrays

    let leftColumn = []
    let rightColumn = []
    let intialColumn = []

    //1a. Load data into inital array
    dataInput.split("\n").forEach(element => {
        element.split(" ").forEach(e => {
            if (e !== "") {
                intialColumn.push(e)
            }
        });
    });

    //1b. Split into left and right columns
    for (let i = 0; i < intialColumn.length; i += 2) {
        leftColumn.push(intialColumn[i])
        rightColumn.push(intialColumn[i + 1])
    }

    //2.sort arrays
    leftColumn.sort((a, b) => a - b);
    rightColumn.sort((a, b) => a - b);


    //3. iterate through arrays and compare distance storing sum
    let sum = 0
    for (let i = 0; i < leftColumn.length; i++) {
        sum += Math.abs(leftColumn[i] - rightColumn[i])
    }

    //4. print result
    console.log(leftColumn, rightColumn)
    resultElement.textContent = "Result: " + sum
}

function day2(dataInput){
    let sum = 0;
  let loggedUnsafe = [];
  let levelNum = 0;

  dataInput.split("\n").forEach(line => {
    let levels = line.split(" ").map(Number);
    levelNum++;
    let isSafe = true;

    const isIncreasing = levels[0] < levels[1];

    for (let i = 1; i < levels.length; i++) {
      if ((levels[i] > levels[i - 1] && !isIncreasing) || (levels[i] < levels[i - 1] && isIncreasing)) {
        isSafe = false;
        console.log(levelNum, 'Reason: levels increase and decrease.');
        break;
      }
    }

    for (let i = 1; i < levels.length; i++) {
      const diff = Math.abs(levels[i] - levels[i - 1]);
      if (diff > 3 || diff === 0) {
        isSafe = false;
        console.log(levelNum, 'Reason: numbers in levels differ by more than three or do not differ.');
        break;
      }
    }

    if (isSafe) {
      sum++;
    } else {
      loggedUnsafe.push(levelNum);
    }
  });

  resultElement.textContent = "Result: " + sum + " \n(unsafe: " + loggedUnsafe.join(", ") + ")";
}

function day3(dataInput){
    let sum = 0;
    let amountValid = 0;

    for (let i = 0; i < dataInput.length; i += 1) {
        let char = dataInput[i];
        const uncorruptedFunctionPrefix = 'mul(' // function must follow mul(x,y)
        const uncorruptedFunctionSuffix = ')'
        const MAX_NUM_SPACES = 12 // mul(XXX,YYY) // each function must be at least 1-3 digit numbers so max chars is 12
        
        if (char === uncorruptedFunctionPrefix[0]) { // start of function found

            if (dataInput.slice(i, i + uncorruptedFunctionPrefix.length) === uncorruptedFunctionPrefix) {
                console.log(dataInput.slice(i, i + MAX_NUM_SPACES))
                
                let numA = ''
                let numB = ''
                let dividerFound = false // divider is noted as ','
                let errorFound = false // functions could start correct but have incorrect numbers/symbols

                let suffixFound = false //suffix is noted as ')'

                for (let j = 0; j < MAX_NUM_SPACES; j += 1) { //find numA and numB
                    const c = dataInput[i + j]
                    
                    if ((numA.length <= 3) && !dividerFound) {
                        if (c === ',' && numA.length > 0){dividerFound = true} 
                        else if (!isNaN(c)){numA += c} 

                    } else if ((numB.length < 3) && dividerFound && !suffixFound) { 
                        if (c === ')' && numB.length > 0){suffixFound = true} 
                        else if (!isNaN(c)){numB += c} 
                    } else {break} // end of numA and numB, stop searching
                }
                const COMPLETE_FUNCTION_LENGTH = numA.length+numB.length + 'mul(,)'.length - 1
                
                if (numA !== '' && numB !== '' && dataInput[i + COMPLETE_FUNCTION_LENGTH] === uncorruptedFunctionSuffix) {
                    sum += (parseInt(numA) * parseInt(numB));
                    amountValid++;
                } 
                //console.log(amountValid, numA, numB) 
            }
        }
    }
    resultElement.textContent = "Result: " + sum;
}

function day4(dataInput){

  let sum = 0;
  // Map puzzle input into 2D array
  const mappedData = dataInput.split("\n").map(row => row.split(""));
  console.log(mappedData)
  //given js treats strings like arrays, this already maps into a 2D array


  // Search for acceptable input (XMAS in any direction)
  for (let x = 0; x < mappedData.length; x += 1) {
    for (let y = 0; y < mappedData[x].length; y += 1) {
      if (mappedData[x][y] == 'X'){
        const directions = [
          [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];

        directions.forEach(([dx, dy]) => {
          let found = true;
          const word = 'XMAS'; 

          for (let k = 1; k < word.length; k++) {
            const nx = x + k * dx;
            const ny = y + k * dy;
            if (!mappedData[nx] || mappedData[nx][ny] !== word[k]) {
              found = false;
              break;
            }
          }
          if (found) {
            sum += 1;
          }
        });
      }
    }
  }

  resultElement.textContent = "Result: " + sum;
}

function day5(dataInput){
  let sum = 0;

  //seperate rules section from input section - split on empty line
  let unorganisedData = dataInput.split("\n")

  let rules = []
  let updates = []

  for (let i = 0; i < unorganisedData.length; i += 1) {
    if (unorganisedData[i] === '') {
      rules = unorganisedData.slice(0, i)
      updates = unorganisedData.slice(i + 1)
    }
  }
  //Loop through each update to check if update matches rules
  for (let i = 0; i < updates.length; i += 1) { 
    const UPDATE = updates[i].split(',')
    let valid = true //if update breaks a rule, valid = false and not added to sum

    //Loop through each number in update
    for (let j = 0; j < UPDATE.length; j += 1) { 
      //console.log(UPDATE[j])

      //Loop through each rule according to number
      for (let k = 0; k < rules.length; k += 1) { //loop through rules for preceding number

        const RULE = rules[k].split('|')
        const PRECEDING_NUM = RULE[0] //This number MUST be before successing number
        const SUCCEEDING_NUM = RULE[1]
        
        if (UPDATE[j] === PRECEDING_NUM ){ 
          
          //loop through update again backwards and check that succeeding number is after preceding within update
          for (let l = UPDATE.length - 1; l >= 0; l -= 1) {
            if (UPDATE[l] === SUCCEEDING_NUM) { // if succeeding number is found, check if preceding number is before succeeding number
              if (l < j) {
                console.log("Invalid line: ", i);
                console.log("Reason: ", PRECEDING_NUM, "is before", SUCCEEDING_NUM);
                valid = false;
                break;
              }
            }
          }
        }
      }
    }
    
    if (valid) { //add middle number within update line to sum (rounding up)
      sum += Math.ceil(UPDATE[Math.floor(UPDATE.length / 2)]);
      console.log("Valid line: ",i)
    }
  }
  resultElement.textContent = "Result: " + sum;
}

function day6(dataInput){
  let sum = 0;

  // Map puzzle input into 2D array
  const mappedData = dataInput.split("\n").map(row => row.split(""));
  console.log(mappedData)

  // Find guard starting position 
  let guardPosition = []

  for (let x = 0; x < mappedData.length; x += 1) {
    if (!mappedData[x]) {
      console.log('Error: Mapped data at index', x, 'is null');
      throw new Error('Mapped data at index ' + x + ' is null');
    }
    for (let y = 0; y < mappedData[x].length; y += 1) {
      if (!mappedData[x][y]) {
        console.log('Error: Mapped data at index', x, ',', y, 'is null');
        throw new Error('Mapped data at index ' + x + ', ' + y + ' is null');
      }
      if (mappedData[x][y] == '^'){
        guardPosition = [x, y]
        console.log('Guard found at position:',guardPosition)   
        break
      }
    }
  }

  if (!guardPosition.length) {
    throw new Error('Guard not found in mapped data');
  }

  // Follow guard until they leave the map
  // Count how many distinct positions will the guard visit before leaving the mapped area

  const directions = {'N': [-1, 0], 'S': [1, 0], 'E': [0, 1], 'W': [0, -1]};
  let guardFacing = directions['N'] //Always starts facing north

  // RULES:
    // guard moves one step at a time, forward until there is an object infront
    // then they will turn 90 degrees clockwise untill the path is clear

  let visitedPositions = [guardPosition]

  while (true) {
    // Move guard forward
    console.log('Guard moving forward, facing', Object.keys(directions).find(key => directions[key][0] === guardFacing[0] && directions[key][1] === guardFacing[1]))
    let nextPosition = [guardPosition[0] + guardFacing[0], guardPosition[1] + guardFacing[1]];
    
    if (!mappedData[nextPosition[0]] || mappedData[nextPosition[0]][nextPosition[1]] == '#') {
        console.log('Guard found wall at position:', nextPosition);

        // Turn 90 degrees clockwise until clear path is found
        if (guardFacing == directions['N']) {
            guardFacing = directions['E'];
        } else if (guardFacing == directions['E']) {
            guardFacing = directions['S'];
        } else if (guardFacing == directions['S']) {
            guardFacing = directions['W'];
        } else if (guardFacing == directions['W']) {
            guardFacing = directions['N'];
        }
        console.log('Guard turned to face:', guardFacing);

    } else if (mappedData[nextPosition[0]][nextPosition[1]] == '.' || mappedData[nextPosition[0]][nextPosition[1]] == '^') {
        guardPosition = nextPosition;
        console.log('Guard moved to position:', guardPosition);
        visitedPositions.push(guardPosition);
        sum++;
    } else{ break }
  }
  // clear visited positions of duplicates
  console.log(visitedPositions.length)
  const uniqueArr = Array.from(new Set(visitedPositions.map(JSON.stringify)), JSON.parse);

  sum = uniqueArr.length
  resultElement.textContent  = "Result: " + sum
}

function day7(dataInput){
  let sum = 0

  // Separate input into line of operations
  let operations = dataInput.split("\n")

  for (let i = 0; i < operations.length; i+= 1){

    // Separate operations into sum and equation
    let operationTotal = operations[i].split(": ")[0]
    let equation = operations[i].split(": ")[1].split(' ')

    // Try all possible combinations of + and * (from left to right) to see if equation matches sum
    const tryOperations = (equation, operationTotal) => { 
      // Recursively generates all possible combinations of + and *
      // in the equation and checks if the result of the equation matches the operation total

      // It does this by splicing in a + or * at each index of the equation and then recursively 
      // calling itself with the new equation. If the result of the equation matches the total it returns true
      // otherwise it returns false and backtracks to try a different combination

      // If no combinations are found it returns false, which is valid in this case
      const evaluate = (expr) => {
        let result = parseInt(expr[0]);
        for (let i = 1; i < expr.length; i += 2) {
          const operator = expr[i];
          const nextNumber = parseInt(expr[i + 1]);
          if (operator === '+') {
            result += nextNumber;
          } else if (operator === '*') {
            result *= nextNumber;
          }
        }
        return result;
      };

      const generateCombinations = (expr, index = 1) => { 
        if (index >= expr.length) {
          return evaluate(expr) === parseInt(operationTotal);
        }

        // Try addition
        expr.splice(index, 0, '+');
        if (generateCombinations(expr, index + 2)) return true;
        expr.splice(index, 1);

        // Try multiplication
        expr.splice(index, 0, '*');
        if (generateCombinations(expr, index + 2)) return true;
        expr.splice(index, 1);

        return false;
      };

      return generateCombinations([...equation]);
    }

    if (tryOperations(equation, operationTotal)) {
      sum += parseInt(operationTotal)
    }
  }
  resultElement.textContent  = "Result: " + sum
}

function day8(){resultElement.textContent  = "Incompleted day"}
function day9(){resultElement.textContent  = "Incompleted day"}
function day10(){resultElement.textContent = "Incompleted day"}
function day11(){resultElement.textContent = "Incompleted day"}
function day12(){resultElement.textContent = "Incompleted day"}
function day13(){resultElement.textContent = "Incompleted day"}
function day14(){resultElement.textContent = "Incompleted day"}
function day15(){resultElement.textContent = "Incompleted day"}
function day16(){resultElement.textContent = "Incompleted day"}
function day17(){resultElement.textContent = "Incompleted day"}
function day18(){resultElement.textContent = "Incompleted day"}
function day19(){resultElement.textContent = "Incompleted day"}
function day20(){resultElement.textContent = "Incompleted day"}
function day21(){resultElement.textContent = "Incompleted day"}
function day22(){resultElement.textContent = "Incompleted day"}
function day23(){resultElement.textContent = "Incompleted day"}
function day24(){resultElement.textContent = "Incompleted day"}