//AoC Day 1

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
    execute(fileContentString)
  };
  reader.readAsText(fileInput.files[0]);
});

 
function execute(dataInput){

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