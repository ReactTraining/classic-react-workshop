const EmailFormat = /^.+@.+\..+$/

export default function isEmail(value) {
  return typeof value === 'string' && EmailFormat.test(value)
}

/*
:s/( ?/(?/g
:s/?  :/?:/g
:s/\\0 /\\0/g
:s/\\/\\\\/g
*/
