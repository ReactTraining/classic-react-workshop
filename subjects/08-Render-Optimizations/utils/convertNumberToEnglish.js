const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];

const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety"
];

const teens = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen"
];

function convertTens(n) {
  return n < 10
    ? ones[n]
    : n >= 10 && n < 20
      ? teens[n - 10]
      : tens[Math.floor(n / 10)] + " " + ones[n % 10];
}

function convertHundreds(n) {
  return n > 99
    ? ones[Math.floor(n / 100)] + " hundred " + convertTens(n % 100)
    : convertTens(n);
}

function convertThousands(n) {
  return n >= 1000
    ? convertHundreds(Math.floor(n / 1000)) +
        " thousand " +
        convertHundreds(n % 1000)
    : convertHundreds(n);
}

function convertMillions(n) {
  return n >= 1000000
    ? convertMillions(Math.floor(n / 1000000)) +
        " million " +
        convertThousands(n % 1000000)
    : convertThousands(n);
}

function convertNumberToEnglish(n) {
  return n === 0 ? "zero" : convertMillions(n);
}

export default convertNumberToEnglish;
