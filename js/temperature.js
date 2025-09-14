//Input Field
const temperatureInput = document.getElementById("temperatureInput");
//Buttons
const fromTemperatureButton = document.getElementById("fromTemperatureButton");
const toTemperatureButton = document.getElementById("toTemperatureButton");
//ul Fields
const fromTemperatureList = document.getElementById("fromTemperatureList");
const toTemperatureList = document.getElementById("toTemperatureList");
//Result
const temperatureConvertButton = document.getElementById("temperatureConvertButton");
const temperatureResultString = document.getElementById("temperatureResultString");

inputResizing(temperatureInput)
temperatureConvertButton.style.transition = "all 0.3s ease";

//Проверка на условия активации кнопки Convert + сама активация стилями
function checkTemperatureReady () {
  const inputValue = parseFloat(temperatureInput.value);
  temperatureConvertButton.disabled = isNaN(inputValue) || !fromTemperatureButton.value || !toTemperatureButton.value;
  isButtonDisabled (temperatureConvertButton);
}

setupDrowdown(fromTemperatureButton, fromTemperatureList, checkTemperatureReady);
setupDrowdown(toTemperatureButton, toTemperatureList, checkTemperatureReady);
temperatureInput.addEventListener("input", checkTemperatureReady);

function convertTemperature (value, from, to) {
  let celsius;

  if (from === "Cel") celsius = value;
  if (from === "Fah") celsius = (value - 32) * (5 / 9);
  if (from === "Kel") celsius = value - 273.15;

  if (to === "Cel") return celsius;
  if (to === "Fah") return (celsius * 9) / 5 + 32;
  if (to === "Kel") return celsius + 273.15;
}

temperatureConvertButton.addEventListener("click", () => {
  const value = parseFloat(temperatureInput.value);
  const from = fromTemperatureButton.value;
  const to = toTemperatureButton.value;

  const fromText = fromTemperatureButton.textContent;
  const toText = toTemperatureButton.textContent;

  const result = convertTemperature(value, from, to);
  temperatureResultString.textContent = `${temperatureInput.value}
    ${fromText} is ${result} ${toText}`;
})

//При спорных ситуациях раскомментить строчку ниже и проверить
// test(fromTemperatureButton)
