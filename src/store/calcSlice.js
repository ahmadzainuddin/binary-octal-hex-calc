import { createSlice } from '@reduxjs/toolkit'

const BASES = { binary: 2, octal: 8, hex: 16 }
const DIGITS = '0123456789abcdef'

function isValidForBase(str, base) {
  if (typeof str !== 'string') return false
  const s = str.trim()
  if (s === '') return false
  let pattern
  if (base === 2) pattern = /^-?[01]+$/
  else if (base === 8) pattern = /^-?[0-7]+$/
  else if (base === 16) pattern = /^-?[0-9a-fA-F]+$/
  else return false
  return pattern.test(s)
}

function parseToBigInt(str, base) {
  // Manual parse to BigInt to avoid precision issues
  let s = str.trim()
  let sign = 1n
  if (s[0] === '-') { sign = -1n; s = s.slice(1) }
  let val = 0n
  const lower = s.toLowerCase()
  for (const ch of lower) {
    const d = DIGITS.indexOf(ch)
    if (d < 0 || d >= base) throw new Error('Invalid digit')
    val = val * BigInt(base) + BigInt(d)
  }
  return val * sign
}

function toBaseString(num, base) {
  if (num === 0n) return '0'
  let n = num
  let sign = ''
  if (n < 0n) { sign = '-'; n = -n }
  let out = ''
  while (n > 0n) {
    const rem = Number(n % BigInt(base))
    out = (base === 16 ? DIGITS[rem].toUpperCase() : DIGITS[rem]) + out
    n = n / BigInt(base)
  }
  return sign + out
}

function computeResult(a, b, op, base) {
  if (!isValidForBase(a, base) || !isValidForBase(b, base)) {
    return { error: 'Invalid input for base ' + base, result: '' }
  }
  try {
    const A = parseToBigInt(a, base)
    const B = parseToBigInt(b, base)
    const R = op === '+' ? (A + B) : (A - B)
    return { error: '', result: toBaseString(R, base) }
  } catch (e) {
    return { error: 'Failed to compute: ' + e.message, result: '' }
  }
}

const makeBaseState = () => ({
  a: '',
  b: '',
  op: '+',
  result: '',
  error: '',
})

const initialState = {
  binary: makeBaseState(),
  octal: makeBaseState(),
  hex: makeBaseState(),
}

const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    setInput(state, action) {
      const { baseKey, field, value } = action.payload
      state[baseKey][field] = value
    },
    setOperation(state, action) {
      const { baseKey, op } = action.payload
      state[baseKey].op = op
    },
    compute(state, action) {
      const { baseKey } = action.payload
      const base = BASES[baseKey]
      const { a, b, op } = state[baseKey]
      const { error, result } = computeResult(a, b, op, base)
      state[baseKey].error = error
      state[baseKey].result = result
    },
    clear(state, action) {
      const { baseKey } = action.payload
      state[baseKey] = makeBaseState()
    }
  }
})

export const { setInput, setOperation, compute, clear } = calcSlice.actions
export default calcSlice.reducer
