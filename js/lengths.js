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

//Префиксы
const prefixPowers = {
  "micro": { power: -6, name: "Micrometers" },
  "milli": { power: -3, name: "Millimeters" },
  "santi": { power: -2, name: "Centimeters" },
  "deci":  { power: -1, name: "Decimeters" },
  "kilo":  { power:  3, name: "Kilometers" }
};
//Получение степеней
function getUnitInfo(unitValue) {
  if (unitValue === "Met")  return { power: 1, name: "Meters" };
  if (unitValue === "Met2") return { power: 2, name: "Square meters" };
  if (unitValue === "Met3") return { power: 3, name: "Cubic meters" };
  return { power: 1, name: "Meters" };
}

//Формат вывода
function formatNumber(num) {
  if (Math.abs(num) >= 1e6 || Math.abs(num) < 1e-3) {
    const exp = num.toExponential(2);
    const [coeff, power] = exp.split("e");
    return `${coeff}·10^${parseInt(power, 10)}`;
  }
  return num.toFixed(3).replace(/\.?0+$/, "");
}


function convertMeasurements(value, fromPrefix, fromUnit, toPrefix, toUnit) {
  const fromPrefixPower = prefixPowers[fromPrefix]?.power || 0;
  const toPrefixPower = prefixPowers[toPrefix]?.power || 0;

  const fromUnitInfo = getUnitInfo(fromUnit);
  const valueInBase = value * Math.pow(10, fromPrefixPower * fromUnitInfo.power);
  const convertedValue = valueInBase / Math.pow(10, toPrefixPower * fromUnitInfo.power);

  return convertedValue;
}

//Подключаем к кнопке
lengthConvertButton.addEventListener("click", () => {
  const value = parseFloat(sourceLengthInputField.value);
  const fromPrefix = fromLengthPrefixButton.value;
  const fromUnit = fromLengthUnitButton.value;
  const toPrefix = toLengthPrefixButton.value;
  const toUnit = toLengthUnitButton.value;

  const result = convertMeasurements(value, fromPrefix, fromUnit, toPrefix, toUnit);

  const fromUnitInfo = getUnitInfo(fromUnit);
  const toUnitInfo = getUnitInfo(toUnit);

  const fromName = prefixPowers[fromPrefix]?.name || fromUnitInfo.name;
  const toName = prefixPowers[toPrefix]?.name || toUnitInfo.name;

  lengthResultString.textContent = `${value} ${fromName} is ${formatNumber(result)} ${toName}`;
});




//При спорных ситуациях раскомментить строчку ниже и проверить
// test(fromLengthPrefixButton)
