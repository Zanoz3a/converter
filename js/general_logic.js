//for futures, do not pay much attention
const unitPrefix = {
  "-12": "pico",
  "-9": "nano",
  "-6": "micro",
  "-3": "milli",
  "-2": "santi",
  "-1": "deci",
  "1": "deca",
  "2": "hecto",
  "3": "kilo",
  "6": "mega",
  "9": "giga",
  "12": "tera",
  "15": "peta"
};

//Проверка на возможность активации кнопки
function isButtonDisabled (convertButton) {
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
function setupDrowdown (button, list, checkFunc) {
  const items = list.querySelectorAll("li");
  items.forEach(li => {
    li.addEventListener("click", () => {
      button.textContent = li.textContent;
      button.value = li.getAttribute("value");
      if (checkFunc) checkFunc();
    })
  });
}

//Поле ввода проверка и расширение по ширине текста
const minWidth = 50;
function inputResizing(field) {
  field.addEventListener("input", () => {
     const length = field.value.length || field.placeholder.length;
     field.style.width = Math.max(length * 10 + 20, minWidth) + "px";
  })
}

//Перенос значения из from в to
function fromToTransparter(fromFieldButton, toFieldButton, initialButtonContent) {
  if (fromFieldButton.textContent !== initialButtonContent){
    toFieldButton.textContent = fromFieldButton.textContent;
  }
}


//При спорных ситуациях раскомментить строчки ниже и проверить
// function test(test_button) {
//   const testa = "df12";
//   test_button.textContent = testa;
// }
