//AoC 2024 Master JS File

/*
This file is the master JavaScript file for the Advent of Code 2024 project. 
It runs the code for the day selected in the HTML file. 
The code is organized into functions, each of which is named after the day it is used for. 

The functions are passed the data from the file as an argument. 
The functions are expected to return a string that is the answer to the day's challenge. 
The answer is then displayed in the 'result' paragraph element in the HTML file. 
The functions are also expected to handle any errors that may occur.
*/

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
    const day = parseInt(document.getElementById('day-select').value, 10);
    const t0 = performance.now();
    if (checkFileName(fileInput.files[0], day)) {execute(fileContentString, day);}
    const t1 = performance.now();
    fileContentElement.textContent = `Execution took ${t1 - t0} milliseconds.\n`
    fileContentElement.textContent += 'Data: ' + fileContentString;
    console.log(`Script Complete for Day ${day}, Execution took ${t1 - t0} milliseconds.`)
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
    case 25:
      day25(dataInput);
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

  /**
   * Takes a string of numbers separated by spaces and applies a series of rules
   * to each number in sequence. The rules are:
   * 1 - If the stone is engraved with the number 0, it is replaced by a stone
   *     engraved with the number 1.
   * 2 -If the stone is engraved with a number that has an even number of digits,
   *     it is replaced by two stones. The left half of the digits are engraved on
   *     the new left stone, and the right half of the digits are engraved on the
   *     new right stone. (The new numbers don't keep extra leading zeroes: 1000
   *     would become stones 10 and 0.)
   * 3 -If none of the other rules apply, the stone is replaced by a new stone; the
   *     old stone's number multiplied by 2024 is engraved on the new stone.
   * The function continues to apply these rules until it has done so 25 times.
   * The result is the total number of stones after all the rules have been applied.
   * @param {string} dataInput - A string of numbers separated by spaces.
   */
function day11(dataInput){

  let stones = dataInput.split(" ")
  let blinks = 25

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
} 
function day12(dataInput){
  
  let cost = 0

  const mappedData = dataInput.split("\n").map(row => row.split(""));
  console.log(mappedData)

  // Disjoint-set data structure
  const parent = {};
  const rank = {};

  // Initialize disjoint-set data structure
  for (let x = 0; x < mappedData.length; x++) {
    for (let y = 0; y < mappedData[x].length; y++) {
      if (mappedData[x][y] !== " ") {
        parent[`${x},${y}`] = `${x},${y}`;
        rank[`${x},${y}`] = 0;
      }
    }
  }

  // Union function
  const union = (x1, y1, x2, y2) => {
    const root1 = find(x1, y1);
    const root2 = find(x2, y2);
    if (root1 !== root2) {
      if (rank[root1] > rank[root2]) {
        parent[root2] = root1;
      } else if (rank[root1] < rank[root2]) {
        parent[root1] = root2;
      } else {
        parent[root2] = root1;
        rank[root1]++;
      }
    }
  }

  // Find function
  const find = (x, y) => {
    if (parent[`${x},${y}`] !== `${x},${y}`) {
      parent[`${x},${y}`] = find(...parent[`${x},${y}`].split(","));
    }
    return parent[`${x},${y}`];
  }

  // Group connected letters together
  for (let x = 0; x < mappedData.length; x++) {
    for (let y = 0; y < mappedData[x].length; y++) {
      if (mappedData[x][y] !== " ") {
        const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
        for (const direction of directions) {
          const newX = x + direction[0];
          const newY = y + direction[1];
          if (mappedData[newX] && mappedData[newX][newY] && mappedData[newX][newY] === mappedData[x][y]) {
            union(x, y, newX, newY);
          }
        }
      }
    }
  }

  // Calculate area and perimeter for each region
  const regions = {};
  for (let x = 0; x < mappedData.length; x++) {
    for (let y = 0; y < mappedData[x].length; y++) {
      if (mappedData[x][y] !== " ") {
        const root = find(x, y);
        if (!regions[root]) {
          regions[root] = { area: 0, perimeter: 0 };
        }
        regions[root].area++;
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const direction of directions) {
          const newX = x + direction[0];
          const newY = y + direction[1];
          if (!mappedData[newX] || !mappedData[newX][newY] || mappedData[newX][newY] !== mappedData[x][y]) {
            regions[root].perimeter++;
          }
        }
      }
    }
  }
  // Calculate cost
  for (const region in regions) {
    cost += regions[region].area * regions[region].perimeter;
  }

  console.log(regions)

  resultElement.textContent = "Result: " + cost
  troubleshoot.textContent = "Expected Result: 1930(a)"
}

function day13(dataInput){
  let sum = 0
  let buttonACost = 3
  let buttonBCost = 1

  //break down input :)
  let clawMachines = dataInput.split('\n\n')

  //
  const solveLinearEquations = (a, b, c, d, e, f) => {
      // Calculate the determinant
      const determinant = (a * e) - (b * d);
    
      // Check if the determinant is zero
      if (determinant === 0) {
        return 0 // "No unique solution exists";
      }
    
      // Calculate x and y
      const x = ((c * e) - (b * f)) / determinant;
      const y = ((a * f) - (c * d)) / determinant;
      
      //check if x and y are integers
      if (!Number.isInteger(x) || !Number.isInteger(y)) {
        return 0 // "No unique solution exists";
      }

      // Check if x and y are under 100
      if (x < 0 || y < 0 || x > 100 || y > 100) {
        return 0 // "No unique solution exists";
      }

      // Calculate cost
      const cost = buttonACost * x + buttonBCost * y
      console.log(x,y,cost)
      return cost ;
  }

  //
  for (let i = 0; i < clawMachines.length; i++){
    let clawMachineData = clawMachines[i].split('\n')
    let buttonA = clawMachineData[0].split(': ')[1].split(', ')
    let buttonB = clawMachineData[1].split(': ')[1].split(', ')
    let prizeLocation = clawMachineData[2].split(': ')[1].split(', ')
    prizeLocation = [parseInt(prizeLocation[0].split('=')[1]),parseInt(prizeLocation[1].split('=')[1])]

    buttonA = {x:parseInt(buttonA[0].split('+')[1]),y:parseInt(buttonA[1].split('+')[1])}
    buttonB = {x:parseInt(buttonB[0].split('+')[1]),y:parseInt(buttonB[1].split('+')[1])}

    console.log(i,buttonA,buttonB)
    console.log(i,prizeLocation)
    sum += solveLinearEquations(buttonA.x,buttonB.x,prizeLocation[0],buttonA.y,buttonB.y,prizeLocation[1])
  }

  
  resultElement.textContent = "Result: " + sum
  troubleshoot.textContent = "Expected Result: 480(a) 35729(b)"

}

function day14(dataInput){
  let sum = 0
  let simulationTime = 100 //seconds
  let gridWidth = 101 //x
  let gridLength = 103 //y
  
  let gridCenterXPath = Math.round(gridWidth/2) -1 
  let gridCenterYPath = Math.round(gridLength/2)- 1
  console.log(gridCenterXPath,gridCenterYPath)

  //break down input 
  let robotMovements = dataInput.split('\n')

  let quadrents = {1:0,2:0,3:0,4:0}

  for (let i = 0; i < robotMovements.length; i++){

    //build robot object from data
    let robotPosition = robotMovements[i].split(' ')[0].split('p=')[1].split(',')
    let robotVelocity = robotMovements[i].split(' ')[1].split('v=')[1].split(',')

    let robot = {
      x: parseInt(robotPosition[0]),
      y: parseInt(robotPosition[1]),
      xVelocity: parseInt(robotVelocity[0]),
      yVelocity: parseInt(robotVelocity[1])
    };

    //run simulation for t

    for (let t = 0; t < simulationTime; t++){
      //check if robot will out of bounds, if so loop around grid

      robot.x = (robot.x + robot.xVelocity + gridWidth) % gridWidth;
      robot.y = (robot.y + robot.yVelocity + gridLength) % gridLength;
    }
    //check final quadrent position (excluding middle *always odd width/length)
    if (robot.x != gridCenterXPath && robot.y != gridCenterYPath) {
      if (robot.x < gridCenterXPath && robot.y < gridCenterYPath) {
        quadrents[1] += 1
        robot['quadrent'] = 1
      } else if (robot.x > gridCenterXPath && robot.y < gridCenterYPath) {
        quadrents[2] += 1
        robot['quadrent'] = 2
      } else if (robot.x > gridCenterXPath && robot.y > gridCenterYPath) {
        quadrents[4] += 1
        robot['quadrent'] = 4
      } else if (robot.x < gridCenterXPath && robot.y > gridCenterYPath) {
        quadrents[3] += 1
        robot['quadrent'] = 3
      }
    }
    console.log(i,robot)

  }
  console.log(quadrents,quadrents[1] + quadrents[2] + quadrents[3] + quadrents[4])
  //get safety factor (all quadrents mutiplied together)
  sum = quadrents[1] * quadrents[2] * quadrents[3] * quadrents[4]

  resultElement.textContent = "Result: " + sum
  troubleshoot.textContent = "Expected Result: 12(a) 216772608(b)"
}
function day15(dataInput){
  //Glossary:
  // @ = Robot, O = Box, # = Wall
  // ^ v < > = up, down, left, right

  //Rules:
  //Robot follows instructions one step at a time
  //However, if this action would cause the robot or a box (0) to 
  //move into a wall (#), nothing moves instead, including the robot.

  //Data Splitting
  let sum = 0
  let mapData = dataInput.split('\n\n')[0].split('\n')
  let instructions = dataInput.split('\n\n')[1]
  let robotPosition = []  //x,y

  //Find robot starting position within map
  for (let x = 0; x < mapData.length; x++){
    for (let y = 0; y < mapData[x].length; y++){
      if (mapData[x][y] == '@'){
        robotPosition = [x,y]
        console.log(robotPosition)
      }
    }
  }

  //convert mapData to array of arrays [[x0y0],[x0y1],...]
  let mapArray = []
  for (let i = 0; i < mapData.length; i++){
    let row = []
    for (let j = 0; j < mapData[i].length; j++){
      row.push(mapData[i][j])
    }
    mapArray.push(row)
  }

  mapArray.forEach(row => console.log(row));

  //Recursive function to ray cast movement and move boxes if needed, only updates when empty space is found
  const rayCastBox = (x, y, direction, character) => {
    const directionMap = {
      '^': [-1, 0],
      'v': [1, 0],
      '>': [0, 1],
      '<': [0, -1]
    };
    console.log(character,direction)
    const [dx, dy] = directionMap[direction];
    const newX = x + dx;
    const newY = y + dy;

    if (newX < 0 || newX >= mapArray.length || newY < 0 || newY >= mapArray[0].length) {return [x, y];}

    if (mapArray[newX][newY] === 'O') {
      rayCastBox(newX, newY, direction, 'O');
    }

    if (mapArray[newX][newY] === '.') {
      mapArray[x][y] = '.';
      mapArray[newX][newY] = character;

    }

    if (mapArray[newX][newY] === '@') {
      robotPosition = [newX, newY];
    }

  };

  //Run instructions
  for (let i = 0; i < instructions.length; i++){
    if (instructions[i] == '\n') {continue}
    const currentPos = robotPosition;
    rayCastBox(currentPos[0], currentPos[1], instructions[i], '@');
  }

  mapArray.forEach(row => console.log(row));

  // Find total sum of GPS values of all boxes ("O")
  // GPS = (100 * yPos) + xPos
  for (let i = 0; i < mapArray.length; i++){ for (let j = 0; j < mapArray[i].length; j++){if (mapArray[i][j] == 'O'){sum += (100 * i) + j}}}

  resultElement.textContent = "Result: " + sum
  troubleshoot.textContent = "Expected Result: 2028(a i) 10092(a ii) 1457740(b)"
}

function day16(dataInput){
  //Map input to 2D array :p

  let mapData = dataInput.split('\n\n')[0].split('\n')
  console.log(mapData)

  let startPos = [mapData[0].length - 2, 1]
  let endPos = [1, mapData[0].length - 2] 

  console.log('Start and End Positions: ',startPos,mapData[startPos[0]][startPos[1]], endPos,mapData[endPos[0]][endPos[1]])

  //Store lowest possible score: moving forward = +1, turning 90° = +1000
  // Initally coded with Recursion but bigger grids took too long, so switched to A* 
  // A* code adapted from https://www.redblobgames.com/pathfinding/a-star/implementation.html

  let lowestScore = Infinity 

  function createNode(x, y, score, previousDirection) {
    const heuristic = (x, y) => Math.abs(x - mapData.length) + Math.abs(y - mapData[0].length);
    return { x, y, score, previousDirection, heuristic: heuristic(x, y) };
  }

  function searchTrail(x, y, pathsVisited, score, previousDirection) {
    const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
  
    const openList = []; // priority queue
    const closedList = new Set(); // keep track of visited nodes
  
    openList.push(createNode(x, y, score, previousDirection));
  
    while (openList.length > 0) {
      const currentNode = openList.shift();
  
      if (closedList.has(`${currentNode.x},${currentNode.y}`)) {
        continue;
      }
  
      closedList.add(`${currentNode.x},${currentNode.y}`);
  
      if (mapData[currentNode.x][currentNode.y] === 'E') {
        if (currentNode.score < lowestScore) {
          lowestScore = currentNode.score;
        }
      } else {
        for (let i = 0; i < directions.length; i += 1) {
          const dx = directions[i][0];
          const dy = directions[i][1];
          const newX = currentNode.x + dx;
          const newY = currentNode.y + dy;
  
          if (newX >= 0 && newX < mapData.length && newY >= 0 && newY < mapData[0].length && mapData[newX][newY] !== '#' && !closedList.has(`${newX},${newY}`)) {
            const directionChangePenalty = currentNode.previousDirection && currentNode.previousDirection[0] * dx + currentNode.previousDirection[1] * dy === 0 ? 1000 : 0;
            const newScore = currentNode.score + 1 + directionChangePenalty;
            const node = createNode(newX, newY, newScore, [dx, dy]);
  
            openList.push(node);
            openList.sort((a, b) => (a.score + a.heuristic) - (b.score + b.heuristic));
          }
        }
      }
    }
  }

  searchTrail(startPos[0], startPos[1],[], 0,[0, -1])

  resultElement.textContent = "Result: " + lowestScore
  troubleshoot.textContent = "Expected Result: 11,048(a) 115,500(b)"
}

function day17(dataInput){

  let registerA = parseInt(dataInput.split('\n\n')[0].split('\n')[0].split(': ')[1])
  let registerB = parseInt(dataInput.split('\n\n')[0].split('\n')[1].split(': ')[1])
  let registerC = parseInt(dataInput.split('\n\n')[0].split('\n')[2].split(': ')[1])

  let instructions = dataInput.split('\n\n')[1].split(': ')[1].split(',')
  let output = []

  console.log(registerA, registerB, registerC, instructions)

  //return oprand value
  const getOperandValue = (operand) => {
    switch (operand) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return parseInt(registerA);
      case 5:
        return parseInt(registerB);
      case 6:
        return parseInt(registerC);
      default:
        console.log('Invalid operand')
        return 0;
    }
  }

  //run opcode
  const runOpcode = (opcode, operand) => {
    switch (opcode){
      case 0: //Performs division. The numerator is the value in the A register. The denominator is found by raising 2 to the power of the instruction's combo operand. The result of the division operation is truncated to an integer and then written to the A register
        registerA = Math.trunc(registerA / (2 ** getOperandValue(operand)));
        break
      case 1: //Calculates the bitwise XOR of register B and the instruction's literal operand, then stores the result in register B.
        registerB = registerB ^ operand;
        break
      case 2: //Calculates the value of its combo operand modulo 8, then writes that value to the B register.
        registerB = getOperandValue(operand) % 8;
        break
      case 3: //does nothing if the A register is 0. However, if the A register is not zero, it jumps by setting the instruction pointer to the value of its literal operand; if this instruction jumps,the instruction pointer is not increased by 2 after this instruction.
        if (registerA === 0){break}  else {return 'opcode 3'}
      case 4: //Calculates the bitwise XOR of register B and register C, then stores the result in register B. (For legacy reasons, this instruction reads an operand but ignores it.)
        registerB = registerB ^ registerC;
        break;
      case 5: //Calculates the value of its combo operand modulo 8, then outputs that value. (If a program outputs multiple values, they are separated by commas.)
        output.push(getOperandValue(operand) % 8);
        break;
      case 6: //Works exactly like the adv instruction except that the result is stored in the B register. (The numerator is still read from the A register.)
        registerB = Math.trunc(registerA / (2 ** getOperandValue(operand)));
        break
      case 7: //Works exactly like the adv instruction except that the result is stored in the C register. (The numerator is still read from the A register.)
        registerC = Math.trunc(registerA / (2 ** getOperandValue(operand)));
        break
      default:
        console.log('Invalid opcode')
        return 0
    }
  }
  let totalLoops = 0;
  let loopMax = 1000; //limit to prevent infinite loop, increase if needed

  //run instructions
  for (let i = 0; i < instructions.length; i+=2){
    totalLoops++
    console.log(totalLoops,'Ran instruction ',i/2,'opcode: ',instructions[i],' oprand: ',instructions[i+1])

    //run opcode and jump if opcode 3
    if (runOpcode(parseInt(instructions[i]), parseInt(instructions[i+1])) === 'opcode 3'){
      if (totalLoops < loopMax) {i = (parseInt(instructions[i+1])- 2)} //jump pointer to literal opcode -2 given +2 at end of loop
    }
    console.log('Register A: ',registerA,' Register B: ',registerB,' Register C: ',registerC)

  }
  console.log(output)
  resultElement.textContent = "Result: " + output.join(',');
  troubleshoot.textContent = "Expected Result: 4,6,3,5,6,3,5,2,1,0(a), 2,3,6,2,1,6,1,2,1(b)"
}
function day18(dataInput){

  let corruptedCoords = dataInput.split('\n').map(row => row.split(','));

  let byteLimit = 1024 //example = 12, actual = 1024
  let validCoords = corruptedCoords.slice(0,byteLimit);

  console.log(corruptedCoords)
  //create X by X array, mapping 'corrupted'/walls to 1 and free spaces to 0
  let arraySize = 71 // example = 7, actual = 71
  let mapArray = Array.from({length: arraySize}, () => Array(arraySize).fill(0));

  for (let i = 0; i < validCoords.length; i++){
    mapArray[validCoords[i][1]][validCoords[i][0]] = 1;
  }

  let startPos = [0,0]
  let endPos = [mapArray.length -1, mapArray[0].length -1]
  console.log(startPos,endPos)

  let shortestPath = aStar(mapArray,startPos, endPos)
  console.log(shortestPath.length - 1)
  console.log(mapArray)
  

  resultElement.textContent = "Result: " + (shortestPath.length - 1);
  troubleshoot.textContent = "Expected Result: 22(a), 308(b) Note: example uses smaller array, actual uses larger array"
}

function day19(dataInput){

  let availableTowels = dataInput.split("\n\n")[0].split(", ")
  console.log(availableTowels)

  let requestedDesigns = dataInput.split("\n\n")[1].split("\n")
  console.log(requestedDesigns)

  let totalPosibleDesigns = 0

  requestedDesigns.forEach(design => {
    let isPossible = true
    let possibleTowels = []

    availableTowels.forEach(towel => {
      if (design.includes(towel)) {
        possibleTowels.push(towel)
        isPossible = true
      }
    });

    console.log(design,possibleTowels) //for troubleshooting
    function buildTempDesign(design, possibleTowels) { //uses Dijkstra's algorithm
      const queue = [{ currentDesign: "", cost: 0 }];
      const visited = new Set();

      while (queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost);
        const { currentDesign, cost } = queue.shift();

        if (currentDesign === design) return true;
        if (visited.has(currentDesign)) continue;
        visited.add(currentDesign);

        for (let towel of possibleTowels) {
          const newDesign = currentDesign + towel;
          if (design.startsWith(newDesign) && !visited.has(newDesign)) {
            queue.push({ currentDesign: newDesign, cost: cost + 1 });
          }
        }
      }
      return false;
    }

    const possibleDesignsSet = new Set(requestedDesigns);
    for (let design of possibleDesignsSet) {
      if (buildTempDesign(design, possibleTowels)) {
        possibleDesignsSet.delete(design);
        totalPosibleDesigns++;
      }
    }
    requestedDesigns = Array.from(possibleDesignsSet);

  });

  resultElement.textContent = "Result: " + totalPosibleDesigns;
  troubleshoot.textContent = "Expected Result: 6(a) 350(b)"
}
  
function day20(dataInput){

  let map = dataInput.split("\n").map(row => row.split(""));

  const createMap = (map, cheatPos) => {
    const newMap = Array.from({length: map.length}, () => Array(map[0].length).fill(0));
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === "#") {
          newMap[i][j] = 1 // walls
        } else if (map[i][j] === "S" || map[i][j] === "E") {
          newMap[i][j] = 0 // empty space
        }
      }
    }
    newMap[cheatPos[0]][cheatPos[1]] = 0
    return newMap;
  }

  let startPos = []
  let endPos = []
  for (i = 0; i < map.length; i++) {for (j = 0; j < map[i].length; j++) {
      if (map[i][j] === "S") {startPos = [i, j]}
      if (map[i][j] === "E") {endPos = [i, j]}
  }}

  let baselineMap = createMap(map, startPos)
  let baselineScore = dijkstra(baselineMap,startPos, endPos)
  baselineScore = baselineScore.length - 1

  let totalCheatsThatSave100Picoseconds = 2

  const findCheats = (map, i, j,baselineUpToCheatScore) => {

    let cheat = dijkstra(createMap(map, [i,j]), [i,j], endPos)

    let cheatScore = cheat.length - 1
    let timeSaved = baselineScore - (cheatScore + baselineUpToCheatScore)
    //Compare the Manhattan distance between both points, to see if the cheat is allowed and how much it saves. 
    if (timeSaved >= 100) {
      totalCheatsThatSave100Picoseconds += 1;
      console.log(`${totalCheatsThatSave100Picoseconds} / 1417`)
    }
  }

  for (let i = 1; i < map.length - 1; i++) {for (let j = 1; j < map[i].length - 1; j++) {
      if (map[i][j] !== "#") {continue}

      if ((map[i-1][j] === "." || map[i-1][j] === "S") && (map[i+1][j] === "." || map[i+1][j] === "E")) {
        findCheats(map, i-1, j, dijkstra(baselineMap, startPos, [i,j]).length)
        findCheats(map, i+1, j, dijkstra(baselineMap, startPos, [i,j]).length)
      }  
      if ((map[i][j-1] === "." || map[i][j-1] === "S") && (map[i][j+1] === "." || map[i][j+1] === "E")) {
        findCheats(map, i, j - 1, dijkstra(baselineMap, startPos, [i,j]).length)
        findCheats(map, i, j + 1, dijkstra(baselineMap, startPos, [i,j]).length)
      }
  }};

  console.log(`There are ${totalCheatsThatSave100Picoseconds} cheats that save at least 100 picoseconds.`)

  resultElement.textContent = "Result: " + totalCheatsThatSave100Picoseconds;
  troubleshoot.textContent = "Expected Result: ?(a) 1417(b)"
}
  
function day21(dataInput){
  //incomplete -- shortest path is either slightly under or over the actual shortest path, 
  //not optimized corectly due to not checking every single possible path's effect on subsequent paths
  let instructionsNeeded = dataInput.split("\n");

  /* 
  FINAL KEYPAD 
    0   1   2
  +---+---+---+
  | 7 | 8 | 9 | 0
  +---+---+---+
  | 4 | 5 | 6 | 1
  +---+---+---+
  | 1 | 2 | 3 | 2
  +---+---+---+
      | 0 | A | 3
      +---+---+
  
  ROBOT KEYPAD

    0   1   2   
      +---+---+
      | ^ | A | 0
  +---+---+---+
  | < | v | > | 1
  +---+---+---+

  NOTE: Starting position is always 'A'

  In summary, there are the following keypads:

    1 directional keypad that you are using.
    2 directional keypads that robots are using.
    1 numeric keypad (on a door) that a robot is using.

  */

  const numericLookup = {
    '7': [0, 0],
    '8': [0, 1],
    '9': [0, 2],
    '4': [1, 0],
    '5': [1, 1],
    '6': [1, 2],
    '1': [2, 0],
    '2': [2, 1],
    '3': [2, 2],
    '0': [3, 1],
    'A': [3, 2]
  };

  let directionalLookup = {
    '^': [0, 1],
    'A': [0, 2],
    '<': [1, 0],
    'v': [1, 1],
    '>': [1, 2]
  };

  const getShortestSequence = (instructionsNeeded) => {

    let totalCommands = [instructionsNeeded]
    let shortestSequence = ''

    let numericKeypadIndex = numericLookup['A']

    for (let i = 0; i < instructionsNeeded.length; i++) {
      shortestSequence += directionalToNumeric(instructionsNeeded[i], numericKeypadIndex)
      numericKeypadIndex = numericLookup[instructionsNeeded[i]];
    }
    totalCommands.push(shortestSequence)

    for (let j = 0; j < 2; j++) {
      let directionalKeypadIndex = directionalLookup['A'] //reset
      shortestSequence = ''
      for (let i = 0; i < totalCommands[j+1].length; i++) {
        shortestSequence += directionalToDirectional(totalCommands[j+1][i], directionalKeypadIndex)
        directionalKeypadIndex = directionalLookup[totalCommands[j+1][i]];
      }
      totalCommands.push(shortestSequence)
    }

    console.log(totalCommands)
    return totalCommands[3].length
  }

  const directionalToNumeric = (resultNeeded, numericKeypadIndex) => {
    //eg: resultNeeded = '0', output = ',A' (given directionalKeypadIndex = [0,2] -> [0,1] then 'A' to confirm)
    let indexNeeded = numericLookup[resultNeeded]
  
    let indexDiff = [indexNeeded[0] - numericKeypadIndex[0], indexNeeded[1] - numericKeypadIndex[1]]
    let path = indexDiff.map((diff, i) => {
      let direction = diff > 0 ? (i === 0 ? 'v' : '>') : (i === 0 ? '^' : '<')
      return direction.repeat(Math.abs(diff))
    }).join('')

    return  path + 'A'
  }

  const directionalToDirectional = (resultNeeded, directionalKeypadIndex) => {

    const indexNeeded = directionalLookup[resultNeeded];
    const indexDiff = [indexNeeded[0] - directionalKeypadIndex[0], indexNeeded[1] - directionalKeypadIndex[1]];

    let path = '';
    for (let i = 0; i < 2; i++) {
      if (indexDiff[i] !== 0) {
        path += (i === 0 ? (indexDiff[i] > 0 ? 'v' : '^') : (indexDiff[i] > 0 ? '>' : '<')).repeat(Math.abs(indexDiff[i]));
      }
    }

    let pathArray = path.split('');
    pathArray.sort((a,b) => ['v','<','>','^'].indexOf(a) - ['v','<','>','^'].indexOf(b));
    path = pathArray.join('');

    return path + 'A';
    //console.log(directionalKeypadIndex,indexNeeded,path,'A', resultNeeded)
  }

  //The sum of the complexities of the five codes on your list
  let totalComplexity = 0

  for (let i = 0; i < instructionsNeeded.length; i++) {
    let shortestSequence = getShortestSequence(instructionsNeeded[i])
    console.log(`Shortest sequence of button presses for instructions to run ${instructionsNeeded[i]}: ${shortestSequence}`)
    
    let numericPart = parseInt(instructionsNeeded[i].replace(/[A]/g, ''));
    let complexity = shortestSequence * numericPart

    totalComplexity += complexity
    console.log(`Complexity of code ${instructionsNeeded[i]}: ${complexity} (${shortestSequence} * ${numericPart})`)
    //break
  }
  //379A: <v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A

  //      <A>A<AA<vAA>>^AvAA^A<vAAA>^A
  //379A: <<vA>>^AvA^A<<vA>>^AA<<vA>A>^AAvAA<^A>A<vA>^AA<A>A<<vA>A>^AAAvA<^A>A
  console.log(`Total complexity: ${totalComplexity}`)
  resultElement.textContent =  totalComplexity;
  troubleshoot.textContent = "Expected Result: 126384(a) 215374(b)"
}
  
function day22(dataInput){

  const intialSecretNumbers = dataInput.split("\n")
  let finalSecretNumbers = []
  let sumTotal = 0
  
  for (let i = 0; i < intialSecretNumbers.length; i++) {
    let initalSecretNumber = parseInt(intialSecretNumbers[i])

    let secretNumber = initalSecretNumber
    for (let j = 0; j < 2000; j++) { //
      // (If the secret number is 42 and you were to mix 15 into the secret number, the secret number would become 37.)
      //To mix a value into the secret number, calculate the bitwise XOR of the given value and the secret number.
      const mixAndPrune = (secret, mixValue) => {
        return ((secret ^ mixValue) % 16777216 + 16777216) % 16777216;
      };
      secretNumber = mixAndPrune(secretNumber, secretNumber * 64); //Step 1
      secretNumber = mixAndPrune(secretNumber, Math.floor(secretNumber / 32)); //Step 2
      secretNumber = mixAndPrune(secretNumber, secretNumber * 2048); //Step 3
    }
    finalSecretNumbers.push(secretNumber)
    finalSecretNumbers[i]
    sumTotal += secretNumber
    //console.log(initalSecretNumber,secretNumber) //expected: 123 -> 15887950
    //break //for testing purposes
  }

  console.log(`Expected results:\n\n1: 8685429\n10: 4700978\n100: 15273692\n2024: 8667524`)
  console.log(`Total: ${sumTotal}`)

  resultElement.textContent = `Result: ${sumTotal}`;
  troubleshoot.textContent = "Expected Result: "
}
  
function day23(dataInput){

  /* LAN PARTY NETWORK SEARCH

  Find all the sets of three inter-connected computers. 
  How many contain at least one computer with a name that starts with t?
  */

  const totalConnections = dataInput.split("\n")

  let totalUniqueConnections = {} 
  let totalInterConnections = []
  let totalConnectionsWithT = 0

  // Map all connections between computers as sets of 3
  totalConnections.forEach(connection => {
    const [computer1, computer2] = connection.split("-");

    if (!totalUniqueConnections[computer1]) totalUniqueConnections[computer1] = new Set();
    if (!totalUniqueConnections[computer2]) totalUniqueConnections[computer2] = new Set();
    totalUniqueConnections[computer1].add(computer2);
    totalUniqueConnections[computer2].add(computer1);
  });

  for (const computer1 in totalUniqueConnections) {
    totalUniqueConnections[computer1].forEach(computer2 => {
      totalUniqueConnections[computer2].forEach(computer3 => {
        if (totalUniqueConnections[computer3].has(computer1) && computer1 !== computer2 && computer1 !== computer3 && computer2 !== computer3) {
          const sortedConnection = [computer1, computer2, computer3].sort().join(',');
          if (!totalInterConnections.includes(sortedConnection)) {
            totalInterConnections.push(sortedConnection);
          }
        }
      });
    });
  }

  // Filter totalInterConnections to ensure all nodes are unique connections
  const uniqueInterConnections = new Set();

  totalInterConnections.forEach(connection => {
    const nodes = connection.split(',');
    const sortedNodes = nodes.sort((a, b) => a.localeCompare(b)).join(',');
    uniqueInterConnections.add(sortedNodes);
  });

  const filteredConnections = Array.from(uniqueInterConnections).filter(connection => {
    const nodes = connection.split(',');
    return new Set(nodes).size === 3;
  });

  console.log(filteredConnections)

  //How many contain at least one computer with a name that starts with t?
  for (let i = 0; i < filteredConnections.length; i++) {
    const connection = filteredConnections[i];
    const [node1, node2, node3] = connection.split(',');
    if (node1.startsWith('t') || node2.startsWith('t') || node3.startsWith('t')) {
      totalConnectionsWithT++;
      console.log(connection)
    }
  }

  resultElement.textContent = `Result: ${totalConnectionsWithT}`;
  troubleshoot.textContent = "Expected Result: 7(a) 1314(b)"
}
  
function day24(dataInput){
  //Simulate the system of gates and wires. 
  let wires = dataInput.split('\n\n')[0].split('\n')
  wires = wires.reduce((acc, wire) => {
    const [key, value] = wire.split(': ');
    acc[key] = parseInt(value);
    return acc;
  }, {});

  let zWires = {}

  let instructions = dataInput.split('\n\n')[1].split('\n')

  for (let i = 0; i < instructions.length; i++) {
    const components = instructions[i].split(' '); //eg:[x00,AND,y00,->,z00]
    const [a, opperation, b, to, c] = components

    if (!(a in wires) || !(b in wires)) {
      instructions.push(instructions.splice(i, 1)[0]);
      i--;
      continue;
    } else {
      switch (opperation) {
        case 'AND':
          wires[c] = wires[a] & wires[b];
          break;
        case 'OR':
          wires[c] = wires[a] | wires[b];
          break;
        case 'XOR':
          wires[c] = wires[a] ^ wires[b];
          break;
      }
      if (c[0] == 'z') zWires[c] = wires[c]
    }
  }

  console.log(wires,instructions)

  //What decimal number does it output on the wires starting with z?
  //construct binary Z number
  let zBinary = ''
  Object.keys(zWires).sort().forEach(key => {
    zBinary = zWires[key] + zBinary
  })
  let zInt = parseInt(zBinary, 2)
  console.log(zWires,zBinary,zInt)

  resultElement.textContent = `Result: ${zInt}`;
  troubleshoot.textContent = "Expected Result: "
}
  
function day25(dataInput){

  //Analyze your lock and key schematics. 

  const locksAndKeys = dataInput.split('\n\n')
  let locks = []
  let keys = []

  for (i = 0; i < locksAndKeys.length; i++) {
    //input eg: "#####\n.####\n.####\n.####\n.#.#.\n.#...\n....."
    let input = locksAndKeys[i].split('\n')
    let output = [0,0,0,0,0]

    //map into array of heights, output eg:[1,2,5,3]
    for (let col = 0; col < input[0].length; col++) {
      let height = 0;
      for (let row = 0; row < input.length; row++) {
        if (input[row][col] == '#') {
          height++;
        }
      }
      output[col] = height -1 ;
    }

    if (input[0][0] == '#') {
      locks.push(output) 
    } else {
      keys.push(output)
    }
  }

  console.log(locks,keys)

  //How many unique lock/key pairs fit together without overlapping in any column?

  let uniquePairs = 0

  for (const lock of locks) {
    for (const key of keys) {
      const overlap = lock.every((height, index) => (height + key[index]) <= 5);
      if (overlap) {
        console.log(lock, key);
        uniquePairs++;
      }
    }
  }

  resultElement.textContent = `Result: ${uniquePairs} `;
  troubleshoot.textContent = "Expected Result:  3(a) 3360(b)"
}

//Sorting Algorithms
function aStar(map, start, end) {
  let openList = [start];
  let closedList = new Set();
  let cameFrom = {};
  let gScore = {};
  let fScore = {};

  gScore[start] = 0;
  fScore[start] = heuristic(start, end);

  const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  const validNeighbors = (node) => directions.map(d => [node[0] + d[0], node[1] + d[1]]).filter(n => n[0] >= 0 && n[0] < map[0].length && n[1] >= 0 && n[1] < map.length && map[n[1]][n[0]] !== 1);

  while (openList.length > 0) {
    let current = openList[0];
    for (let i = 1; i < openList.length; i++) {
      if (fScore[openList[i]] < fScore[current]) {
        current = openList[i];
      }
    }
    if (current[0] === end[0] && current[1] === end[1]) {
      let path = [current];
      while (current in cameFrom) {
        current = cameFrom[current];
        path.unshift(current);
      }
      return path;
    }
    openList.splice(openList.indexOf(current), 1);
    closedList.add(current);
    for (let n of validNeighbors(current)) {
      let tentativeGScore = gScore[current] + 1;
      if (!gScore.hasOwnProperty(n) || tentativeGScore < gScore[n]) {
        cameFrom[n] = current;
        gScore[n] = tentativeGScore;
        fScore[n] = gScore[n] + heuristic(n, end);
        if (!openList.includes(n)) {
          openList.push(n);
        }
      }
    }
  }
  return [];
}

function heuristic(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function dijkstra(map, start, end) {
  let queue = [start]
  let distances = Array.from({length: map.length}, () => Array(map[0].length).fill(Infinity))
  distances[start[0]][start[1]] = 0
  let directions = [[-1,0], [1,0], [0,-1], [0,1]]

  while (queue.length > 0) {
    let pos = queue.shift()
    if (pos[0] === end[0] && pos[1] === end[1]) {
      break
    }
    for (let dir of directions) {
      let newPos = [pos[0] + dir[0], pos[1] + dir[1]]
      if (newPos[0] >= 0 && newPos[0] < map.length && newPos[1] >= 0 && newPos[1] < map[0].length && map[newPos[0]][newPos[1]] !== 1) {
        let newDist = distances[pos[0]][pos[1]] + 1
        if (newDist < distances[newPos[0]][newPos[1]]) {
          distances[newPos[0]][newPos[1]] = newDist
          queue.push(newPos)
        }
      }
    }
  }
  let path = []
  let currPos = end
  while (currPos[0] !== start[0] || currPos[1] !== start[1]) {
    path.push(currPos)
    let minDist = Infinity
    let nextPos = null
    for (let dir of directions) {
      let newPos = [currPos[0] + dir[0], currPos[1] + dir[1]]
      if (newPos[0] >= 0 && newPos[0] < map.length && newPos[1] >= 0 && newPos[1] < map[0].length && distances[newPos[0]][newPos[1]] < minDist) {
        minDist = distances[newPos[0]][newPos[1]]
        nextPos = newPos
      }
    }
    currPos = nextPos
  }
  path.push(start)
  path.reverse()
  return path
}

