//AoC Day 2
const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const fileContentElement = document.querySelector('#file-content');
const resultElement = document.querySelector('#result');
const reader = new FileReader(); // declare reader here

uploadButton.addEventListener('click', (e) => {
  let fileContentString;
  reader.onload = (event) => {
    fileContentString = event.target.result;
    fileContentElement.textContent = 'Data:\n' + fileContentString.split('\n').map(line => '  ' + line).numoin('\n');
    execute(fileContentString)
  };
  reader.readAsText(fileInput.files[0]);
});

function execute(dataInput){

  let sum = 0

  //1. iterate through data, line by line
  for (let i = 0; i < dataInput.split("\n").length; i++) {
    let level = dataInput.split("\n")[i].split(" ")
    let is_safe = true
    let is_increasing = true
    
    //2. check that: the levels are either all increasing or all decreasing.
    for (let num = 1; num < level.length; num++) {
      if (level[num] < level[num - 1]) {
        is_increasing = false
      }
      if (level[num] > level[num - 1]) {
        is_increasing = false
      }
      if (level[num] - level[num - 1] > 3) {
        is_safe = false
      }
    }
    //3. check that: any two adnumacent levels differ by at least one and at most three.
    if (is_increasing) {
      for (let num = 1; num < level.length; num++) {
        if (level[num] - level[num - 1] > 3) {
          is_safe = false
        }
      }
    }
    
    else {
      for (let num = 1; num < level.length; num++) {
        if (level[num] - level[num - 1] < -3) {
          is_safe = false
        }
      }
    }

    //4.If level is safe, add to sum
    if (is_safe) {
      sum++
    }
  }

  //5. print result
  resultElement.textContent = "Result: " + sum

}