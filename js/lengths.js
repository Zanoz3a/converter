//Input Field
const sourceLengthInputField = document.getElementById("sourceLengthValueInput");
//Buttons Prefixes
const fromLengthPrefixButton = document.getElementById("fromLengthPrefixButton");
const toLengthPrefixButton = document.getElementById("toLengthPrefixButton");
//Buttons Units
const fromLengthUnitButton = document.getElementById("fromLengthUnitButton");
const toLengthUnitButton = document.getElementById("toLengthUnitButton");
//ul Fields Prefixes
const fromLengthPrefixList = document.getElementById("fromLengthPrefixList");
const toLengthPrefixList = document.getElementById("toLengthPrefixList");
//ul Fields Units
const fromLengthUnitList = document.getElementById("fromLengthUnitList");
const toLengthUnitList = document.getElementById("toLengthUnitList");
//Result
const lengthConvertButton = document.getElementById("lengthConvertButton");
const lengthResultString = document.getElementById("lengthResultString");
//initial button content for fromToTransparter funcion
const startLengthFromButtonValue = fromLengthUnitButton.textContent;

inputResizing(sourceLengthInputField);
lengthConvertButton.style.transition = "all 0.3s ease";

//Проверка на разблокировку кнопки
function checkLengthReady() {
  const inputValue = parseFloat(sourceLengthInputField.value);
  lengthConvertButton.disabled = isNaN(inputValue) ||
    !fromLengthUnitButton.value ||
    !toLengthPrefixButton.value ||
    !fromLengthPrefixButton.value;

  //Перенос unit из from в to
  fromToTransparter(fromLengthUnitButton, toLengthUnitButton, startLengthFromButtonValue);
  isButtonDisabled (lengthConvertButton);
}


setupDrowdown(fromLengthPrefixButton, fromLengthPrefixList, checkLengthReady);
setupDrowdown(toLengthPrefixButton, toLengthPrefixList, checkLengthReady);
setupDrowdown(fromLengthUnitButton, fromLengthUnitList, checkLengthReady);
sourceLengthInputField.addEventListener("input", checkLengthReady);


// function checkMeasurementsReady () {
//
// }

// setupDrowdown(, , checkPowerReady);


//Логика вычислений

// function convertMeasurements(value, from, to, unit) {
//
// }




//При спорных ситуациях раскомментить строчку ниже и проверить
// test(fromLengthPrefixButton)
