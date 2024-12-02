//AoC Day 0

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

    //X. print result
    console.log(leftColumn, rightColumn)
    resultElement.textContent = "Result: " + sum
}