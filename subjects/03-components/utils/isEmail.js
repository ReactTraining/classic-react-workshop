const EmailFormat = /^.+@.+\..+$/

export default function isEmail(value) {
  return typeof value === 'string' && EmailFormat.test(value)
}
