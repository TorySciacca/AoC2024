//AoC Master JS File

const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const fileContentElement = document.querySelector('#file-content');
const resultElement = document.querySelector('#result');
const troubleshoot = document.querySelector('#troubleshoot');
const daySelect = document.getElementById('day-select');
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

const fileNameDisplay = document.getElementById('file-name-display');

window.addEventListener('load', () => {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    fileNameDisplay.textContent = 'File: ' + selectedFile.name;
  } else {
    fileNameDisplay.textContent = 'No file selected';
  }
});

fileInput.addEventListener('change', (e) => {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    fileNameDisplay.textContent = 'File: ' + selectedFile.name;
  } else {
    fileNameDisplay.textContent = 'No file selected';
  }
});

/**
 * Checks that the uploaded file is named according to the following convention:
 * Day X (Test) -> Xa.txt
 * Day X (Actual) -> Xb.txt
 * @param {File} file - The uploaded file object
 * @param {number} day - The day of the Advent of Code challenge, should be an integer between 1 and 25
 * @returns {boolean} - True if the file name is valid, false if not
 */
function checkFileName(file, day) {
  const fileName = file.name;
  if(fileName !== `${day}a.txt` && fileName !== `${day}b.txt`) {
    resultElement.textContent = `Error: File must be for day ${day} (a = test, b = actual)`;
    return false;
  }
  return true;
}

/**
 * Runs the solution for a given day.
 * @param {string} dataInput The input data for the day
 * @param {number} day The day to run the solution for
 * @throws {Error} If the day is invalid
 */
function execute(dataInput, day) {
  resultElement.textContent = "";
  troubleshoot.textContent = "";
  //fileContentElement.textContent = "";

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

/**
 * Day 1 of the Advent of Code challenge
 *
 * Takes a string of newline separated pairs of numbers and
 * returns the sum of the absolute differences between the two numbers in each pair
 *
 * @param {string} dataInput - The string of newline separated pairs of numbers
 */
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

  /**
   * Day 2 of the Advent of Code challenge
   *
   * Takes a string of newline separated levels and
   * returns the number of levels that are safe
   *
   * A level is safe if it is either strictly increasing or strictly decreasing
   * and the difference between consecutive numbers is at most 3
   *
   * @param {string} dataInput - The string of newline separated levels
   */
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

    /**
     * Day 3 of the Advent of Code challenge
     * 
     * Takes a string of mul(x,y) functions and returns the sum of the product of x and y in each function.
     * @param {string} dataInput - string of functions
     * @returns {number} - sum of the product of x and y in each function
     */
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

  /**
   * Day 4 of the Advent of Code challenge
   * 
   * Takes a 2D array of strings and returns the count of 'XMAS' in any direction.
   * @param {string} dataInput - string of 2D array separated by newlines
   * @returns {number} - count of 'XMAS' in any direction
   */
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

  /**
   * Day 5 of the Advent of Code challenge
   * 
   * Takes a string of newline separated lines and
   * returns the sum of the middle number of each valid line
   * 
   * A line is valid if it does not break any of the rules
   * 
   * The rules are given as a string of newline separated lines
   * Each line of the rules contains a preceding number and a succeeding number
   * separated by a '|' character
   * 
   * The rules are applied by looping through each number in the update line
   * and checking if the number breaks any of the rules
   * If a number breaks a rule, the line is not added to the sum
   * 
   * @param {string} dataInput - The string of newline separated lines
   */
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

/**
 * Day 6 of the Advent of Code challenge
 *
 * This function processes a given puzzle input to simulate the movement of a guard
 * on a grid map. The guard starts facing north and will navigate the map based on
 * set rules until they exit the map. It calculates the number of distinct positions
 * visited by the guard before leaving the mapped area.
 *
 * @param {string} dataInput - A string representing the grid map, with each row
 * separated by a newline. The guard's starting position is marked by '^', and
 * obstacles are marked by '#'.
 * @throws {Error} If the guard's starting position is not found or if any mapped
 * data is null.
 */
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

/**
 * Day 7 of the Advent of Code challenge
 * 
 * Takes a string of newline separated lines, each line in the format "sum: equation"
 * and returns the sum of all sums that can be reached by trying all possible combinations
 * of + and * in the equation
 * 
 * @param {string} dataInput - string of newline separated lines
 */
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

  /**
   * Day 8 of the Advent of Code challenge
   * 
   * Finds all antennas (single lowercase letter, uppercase letter or digit) in a given 2D grid
   * and calculates the number of antinodes in the grid. An antinode is a point in the grid that
   * is directly between two antennas, but only if one of the two antennas is twice as far away
   * as the other. The antinode is only counted if it is inside the grid.
   * 
   * @param {string} dataInput - a string of newline separated lines representing the 2D grid
   * @returns {number} - the number of antinodes in the grid
   */
function day8(dataInput){
  let sum = 0;

  // Map puzzle input into 2D array
  const mappedData = dataInput.split("\n").map(row => row.split(""));
  console.log(mappedData)

  //Find all unque anntennas and note their position (a single lower case letter, uppercase letter or digit)
  let foundAntennas = {};
  for (let x = 0; x < mappedData.length; x += 1) {
    for (let y = 0; y < mappedData[x].length; y += 1) {
      if (mappedData[x][y] != '.') {
        //add pos and char to dict
        if (!(mappedData[x][y] in foundAntennas)) {
          foundAntennas[mappedData[x][y]] = [[x, y]];
        } else {
          foundAntennas[mappedData[x][y]].push([x, y]);
        }
      } 
  }}
  console.log(foundAntennas)

  //Loop through dict and compare antennas to determine antinodes

  //Antinodes are occur in a stright plotted line with matching anntenna but only when one of the antennas is twice as far away as the other
  //Cound pos towards sum if on map (if pos is outside map do NOT add to sum)
  //Only need to know unique locations so double up is fine (see day 6)
  let antinodes = []

  for (let i = 0; i < Object.keys(foundAntennas).length; i += 1) { 
    for (let j = 0; j < foundAntennas[Object.keys(foundAntennas)[i]].length; j += 1) {
      for (let k = 0; k < foundAntennas[Object.keys(foundAntennas)[i]].length; k += 1) {
        if (j != k) {
          let pos1 = foundAntennas[Object.keys(foundAntennas)[i]][j]
          let pos2 = foundAntennas[Object.keys(foundAntennas)[i]][k]
          let distanceBetweenAntennas = [(pos1[0] - pos2[0]), pos1[1] - pos2[1]]

          pos1 = [pos1[0] + distanceBetweenAntennas[0], pos1[1] + distanceBetweenAntennas[1]]
          pos2 = [pos2[0] - distanceBetweenAntennas[0], pos2[1] - distanceBetweenAntennas[1]]

          //check if antinode 1 and 2 are inside map
          if (pos1[0] >= 0 && pos1[0] < mappedData.length && pos1[1] >= 0 && pos1[1] < mappedData[pos1[0]].length) {
            antinodes.push(pos1) 
            console.log('Found antinode: ',pos1)
          }
          if (pos2[0] >= 0 && pos2[0] < mappedData.length && pos2[1] >= 0 && pos2[1] < mappedData[pos2[0]].length){
            antinodes.push(pos2) 
            console.log('Found antinode: ',pos2)}
        }
      }
    }
  }

  //Make antinodes positions un
  const uniqueArr = Array.from(new Set(antinodes.map(JSON.stringify)), JSON.parse);

  sum = uniqueArr.length
  resultElement.textContent  = "Result: " + sum
}

function day9(dataInput){
  let sum = 0;
  let diskMap = []

  //map puzzle input to disk map
  for (let i = 0; i < dataInput.length; i += 2) {
    diskMap.push({file: dataInput[i], freeSpace: dataInput[i + 1]}) 
    //files:free space - index being placement inside array
  }

  //map diskmap to stripped back array of data (either used or unused)
  let diskMapData = []
  for (let i = 0; i < diskMap.length; i += 1) {
    for (let usedSpace = 0; usedSpace < diskMap[i].file; usedSpace += 1) {
      diskMapData.push(i)
    }
    for (let freeSpace = 0; freeSpace < diskMap[i].freeSpace; freeSpace += 1) {
      diskMapData.push(".")
    }
  }

  /*The amphipod would like to move file blocks one at a time from the 
  end of the disk to the leftmost free space block (until there are no
  gaps remaining between file blocks). */

  let spacelessDiskMap = [] //remove spaces so it just has file blocks, important to replace spaces with in next loop.
  for (let i = 0; i < diskMapData.length; i += 1) {
    if (diskMapData[i] != ".") {
      spacelessDiskMap.push(diskMapData[i])
  }}
  
  let  condensedDataMap = []

  const amountOfSpaces = diskMapData.length - spacelessDiskMap.length

  for (let i = 0; i < diskMapData.length; i += 1) {
    if (diskMapData[i] !== ".") {
      condensedDataMap.push(diskMapData[i]);
    } else {
      condensedDataMap.push(spacelessDiskMap.pop());
    }

    if (condensedDataMap.length + amountOfSpaces === diskMapData.length) { //note: spacelessDiskMap is now empty
      for (let i = 0; i < amountOfSpaces; i += 1) {
        condensedDataMap.push(".")
      }
      break;
    }
  }

  /*The final step of this file-compacting process is to update the filesystem checksum. 
  To calculate the checksum, add up the result of multiplying each of these blocks' position 
  with the file ID number it contains. The leftmost block is in position 0. If a block contains
  free space, skip it instead. */

  for (let i = 0; i < condensedDataMap.length; i += 1) {
    if (condensedDataMap[i] !== ".") {
      sum += (i * Number(condensedDataMap[i]));
    }
  }
  //troubleshoot.textContent += '\nDiskmap Data: ' + diskMapData
  troubleshoot.textContent += "\nCondensed Disk Map: " + condensedDataMap
  //troubleshoot.textContent += "\nExpected Condensed Disk Map: 0099811188827773336446555566.............."

  resultElement.textContent  = "Result: " + sum
}
  
  function day10(dataInput){
    let sum = 0;

    // Map puzzle input into 2D array
    const mappedData = dataInput.split("\n").map(row => row.split(""));

    //Main recursive search function, loops till every PEAK
    const searchTrail = function (x,y,level) {

      const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
      for (let i = 0; i < directions.length; i += 1) {

          let newX = (parseInt(x) + directions[i][0])
          let newY = (parseInt(y) + directions[i][1])

          if (newX >= 0 && newX < mappedData.length && newY >= 0 && newY < mappedData[newX].length) {
            if (mappedData[newX][newY] == (level + 1)) {
              let newLevel = level + 1;
              console.log(mappedData[newX][newY], newLevel);
              if (newLevel == PEAK) {
                peaksFound.push([newX,newY])
              } else {
                searchTrail(newX, newY, newLevel);
              }
            }
          }
      }
    }

    //Loop through puzzle input to find trails
    const TRAILHEAD = 0
    const PEAK = 9
    let peaksFound = [] 
    for (let x = 0; x < mappedData.length; x += 1) {
      for (let y = 0; y < mappedData[x].length; y += 1){
        if (mappedData[x][y] == TRAILHEAD) {
          peaksFound = []  // reset peaksFound
          searchTrail(x,y,0)
          const uniqueArr = Array.from(new Set(peaksFound.map(JSON.stringify)), JSON.parse);
          sum += uniqueArr.length
        }
      }
    }
    troubleshoot.textContent = "Expected Result: 36(a), 550 (b)"
    resultElement.textContent = "Result: " + sum
  }

function day11(dataInput){

  let stones = dataInput.split(" ")
  let blinks = 25

  /* RULES
    1 - If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.

    2 -If the stone is engraved with a number that has an even number of digits, 
        it is replaced by two stones. The left half of the digits are engraved on the new left stone, 
        and the right half of the digits are engraved on the new right stone. (The new numbers don't 
        keep extra leading zeroes: 1000 would become stones 10 and 0.)

    3 -If none of the other rules apply, the stone is replaced by a new stone; 
    the old stone's number multiplied by 2024 is engraved on the new stone.
 */

    const splitStoneWithEvenNumberOfDigits = (index) => {
      const number = stones[index];
      const stringifiedNumber = number.toString();
      const halfLength = stringifiedNumber.length / 2;
      const leftHalf = parseInt(stringifiedNumber.slice(0, halfLength), 10);
      const rightHalf = parseInt(stringifiedNumber.slice(halfLength), 10);
      stones.splice(index, 1, leftHalf, rightHalf);
    };

    for (let blinksComplete = 0; blinksComplete < blinks; blinksComplete++) {
      let i = 0;
      while (i < stones.length) {
        if (parseInt(stones[i], 10) === 0) {
          stones[i] = 1; // RULE 1
        } else if (stones[i].toString().length % 2 === 0) {
          splitStoneWithEvenNumberOfDigits(i); // RULE 2
          i++; // Skip the next stone as it has just been added
        } else {
          stones[i] = parseInt(stones[i], 10) * 2024; // RULE 3
        }
        i++;
      }
      console.log(blinksComplete, stones);
    }

  resultElement.textContent = "Result: " + stones.length
  //troubleshoot.textContent = "Stone Data: " + stones
  troubleshoot.textContent = "\nExpected Result: 55312(a), 209412(b)"
} //ERROR - does not produce correct result, need to address

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