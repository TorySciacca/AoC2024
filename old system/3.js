//AoC Day 3
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