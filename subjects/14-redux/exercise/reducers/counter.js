
export default function (state=0, action) {
  if (action.type === 'INCREMENT_COUNTER')
    return state + 1
  else
    return state
}

