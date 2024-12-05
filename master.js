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
    console.log('Running script for day ' + day)
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
  console.log(dataInput.split("\n"))
  let sum = 0;
  //seperate rules section from input section - split on empty line
  let unorganisedData = dataInput.split("\n")

  let rules = []
  let update = []
  

  for (let i = 0; i < unorganisedData.length; i += 1) {
    if (unorganisedData[i] === '') {
      rules = unorganisedData.slice(0, i)
      update = unorganisedData.slice(i + 1)
    }
  }

  console.log(rules);
  console.log(update);
  
  //define rules


  //see if input matches rules


  //if it does, find the middle number within set and add to sum

  resultElement.textContent = "Result: " + sum;

}

function day6(){resultElement.textContent  = "Incompleted day"}
function day7(){resultElement.textContent  = "Incompleted day"}
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