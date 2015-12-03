const ones = ['','one','two','three','four','five','six','seven','eight','nine'];
const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const teens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];

function convertMillions(n) {
  if (n >= 1000000)
    return convertMillions(Math.floor(n / 1000000)) + " million " + convertThousands(n % 1000000);

  return convertThousands(n);
}

function convertThousands(n) {
  if (n >= 1000)
    return convertHundreds(Math.floor(n / 1000)) + " thousand " + convertHundreds(n % 1000);

  return convertHundreds(n);
}

function convertHundreds(n) {
  if (n > 99)
    return ones[Math.floor(n / 100)] + " hundred " + convertTens(n % 100);

  return convertTens(n);
}

function convertTens(n) {
  if (n<10)
    return ones[n];

  if (n >= 10 && n < 20)
    return teens[n - 10];

  return tens[Math.floor(n / 10)] + " " + ones[n % 10];
}

function convertNumberToEnglish(n) {
  return n === 0 ? 'zero' : convertMillions(n);
}

export default convertNumberToEnglish;
