const inputField = document.getElementById("temperatureInput");
const fromButton = document.getElementById("from");
const toButton = document.getElementById("to");
const fromList = document.getElementById("from_list");
const toList = document.getElementById("to_list");
const convertButton = document.getElementById("convertButton");
const resultString = document.getElementById("resultString");

const minWidth = 50;

//Поле ввода проверка и расширение по ширине текста
inputField.addEventListener("input", () => {
   const length = inputField.value.length || inputField.placeholder.length;
   inputField.style.width = Math.max(length * 10 + 20, minWidth) + "px";
})

convertButton.style.transition = "all 0.3s ease";


//Проверка на условия активации кнопки Convert + сама активация стилями
function checkReady () {
  const inputValue = parseFloat(inputField.value);
  convertButton.disabled = isNaN(inputValue) || !fromButton.value || !toButton.value;

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

//Выбор из дропдауна
function setupDrowdown (button, list) {
  const items = list.querySelectorAll("li");

  items.forEach(li => {
    li.addEventListener("click", () => {
      button.textContent = li.textContent;
      button.value = li.getAttribute("value");

      checkReady();
    })
  });
}

setupDrowdown(fromButton, fromList)
setupDrowdown(toButton, toList)

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

convertButton.addEventListener("click", () => {
  const value = parseFloat(inputField.value);
  const from = fromButton.value;
  const to = toButton.value;

  const fromText = fromButton.textContent;
  const toText = toButton.textContent;

  const result = convertTemperature(value, from, to);
  resultString.textContent = `${inputField.value}
    ${fromText} is ${result} ${toText}`;
})
