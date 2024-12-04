//AoC Master JS File:p

// external.js
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
    execute(fileContentString, day);
    console.log('Running script for day ' + day)
  };
  reader.readAsText(fileInput.files[0]);
});

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

        let uncorruptedFunction = ''
        let uncorruptedFunctionPrefix = 'mul('
        let uncorruptedFunctionSuffix = ')'
        let is_function_corrupted = true
        // each function must be at least 1-3 digit numbers so minimum of 6 spaces needed for numbers.
        
        if (char === uncorruptedFunctionPrefix[0]) {
            if (dataInput.slice(i, i + uncorruptedFunctionPrefix.length) === uncorruptedFunctionPrefix) {
                //console.log(dataInput.slice(i, i + 9))

                let errorFound = false
                let numA = ''
                let numB = ''
                let dividerFound = false // divider is noted as ','

                for (let j = 0; j < 8; j += 1) {
                    const c = dataInput[i + j]
                    if ((numA.length < 3) && !dividerFound) {
                        if (c === ','){dividerFound = true} else if (!isNaN(c)){numA += c} else {errorFound = true}
                    } else if ((numB.length < 3) && dividerFound) {
                        if (c === ')'){dividerFound = true} else if (!isNaN(c)){numB += c} else {errorFound = true}
                    }
                    }
                
                if (errorFound && numA !== '' && numB !== '' && dataInput[i+uncorruptedFunctionPrefix.length+numA.length+numB.length+1] === uncorruptedFunctionSuffix[0]) {
                    sum += (parseInt(numA) * parseInt(numB));
                    amountValid++;
                }

                console.log(amountValid, numA, numB, numA*numB)
                //console.log(dataInput.slice(i, uncorruptedFunctionPrefix.length+ numA.length + numB.length + 2))
                
                }
            }

    }
    resultElement.textContent = "Result: " + sum;
}