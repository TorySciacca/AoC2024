//AoC Day 2
const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const fileContentElement = document.querySelector('#file-content');
const resultElement = document.querySelector('#result');
const reader = new FileReader();

uploadButton.addEventListener('click', () => {
  let fileContentString;
  reader.onload = (event) => {
    fileContentString = event.target.result;
    fileContentElement.textContent = 'Data:\n' + fileContentString.split('\n').map(line => '  ' + line).join('\n');
    execute(fileContentString);
  };
  reader.readAsText(fileInput.files[0]);
});

function execute(dataInput) {
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