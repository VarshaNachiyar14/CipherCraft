// Get DOM elements
const controls = {
  result: document.getElementById("result"),
  length: document.getElementById("length"),
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols"),
  generate: document.getElementById("generate"),
  clipboard: document.getElementById("clipboard")
};

// Random functions
const randomFuncs = {
  lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  symbol: () => {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
};

// Clipboard functionality
controls.clipboard.addEventListener("click", () => {
  const password = controls.result.innerText;
  if (!password) return;
  const textarea = document.createElement("textarea");
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  createNotification("Password copied to clipboard!");
});

// Password generation
controls.generate.addEventListener("click", () => {
  const length = +controls.length.value;
  const hasLower = controls.lowercase.checked;
  const hasUpper = controls.uppercase.checked;
  const hasNumber = controls.numbers.checked;
  const hasSymbol = controls.symbols.checked;
  controls.result.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Password generation logic
const generatePassword = (lower, upper, number, symbol, length) => {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
  if (typesCount === 0) return "";
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFuncs[funcName]();
    });
  }
  return generatedPassword.slice(0, length);
};

// Notification creation function
const createNotification = (message) => {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  notif.innerText = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
};

