const inputField = document.getElementById("temperatureInput");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const convertButton = document.getElementById("convertButton");
const resultString = document.getElementById("resultString");

const minWidth = 50;

inputField.addEventListener("input", () => {
   const length = inputField.value.length || inputField.placeholder.length;
   inputField.style.width = Math.max(length * 10 + 20, minWidth) + "px";
})

convertButton.style.transition = "all 0.3s ease";

function checkReady () {
  const inputValue = parseFloat(inputField.value);
  convertButton.disabled = isNaN(inputValue) || !fromSelect.value || !toSelect.value;

  if (!convertButton.disabled) {
    convertButton.style.backgroundColor = "#000000";
    convertButton.style.color = "#FFFFFF";
    convertButton.style.cursor = "pointer";
  } else {
    convertButton.style.backgroundColor = "#F2F2F2";
    convertButton.style.color = "#7D7D7D";
    convertButton.style.border = "thin solid #ADADAD";
    convertButton.style.cursor = "default";
  }
}

function convertTemperature (value, from, to) {
  let celsius;

  if (from === "Cel") celsius = value;
  if (from === "Fah") celsius = (value - 32) * (5 / 9);
  if (from === "Kel") celsius = value - 273.15;

  if (to === "Cel") return celsius;
  if (to === "Fah") return (celsius * 9) / 5 + 32;
  if (to === "Kel") return celsius + 273.15;
}

inputField.addEventListener("input", checkReady);
fromSelect.addEventListener("change", checkReady);
toSelect.addEventListener("change", checkReady);

convertButton.addEventListener("click", () => {
  const value = parseFloat(inputField.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  const fromText = fromSelect.options[fromSelect.selectedIndex].text;
  const toText = toSelect.options[toSelect.selectedIndex].text;

  const result = convertTemperature(value, from, to);
  resultString.textContent = `${inputField.value}
    ${fromText} is ${result} ${toText}`;
})
