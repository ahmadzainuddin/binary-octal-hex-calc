// src/App.jsx
import React, { useState } from 'react'
import { NavLink, Routes, Route, Navigate, Link } from 'react-router-dom'
import BinaryPage from './pages/BinaryPage.jsx'
import OctalPage from './pages/OctalPage.jsx'
import HexPage from './pages/HexPage.jsx'

// Inline ConversionPage component
function ConversionPage() {
  const [kind, setKind] = useState('dec2bin1')
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const DIGITS = '0123456789abcdef'

  const conversions = [
    { value: 'dec2bin1', label: 'Decimal → Binary', from: 10, to: 2 },
    { value: 'hex2bin',  label: 'Hexadecimal → Binary', from: 16, to: 2 },
    { value: 'oct2bin',  label: 'Octal → Binary', from: 8,  to: 2 },
    { value: 'bin2oct',  label: 'Binary → Octal', from: 2,  to: 8 },
    { value: 'bin2hex',  label: 'Binary → Hexadecimal', from: 2,  to: 16 },
    { value: 'hex2dec',  label: 'Hexadecimal → Decimal', from: 16, to: 10 },
    { value: 'dec2hex',  label: 'Decimal → Hexadecimal', from: 10, to: 16 },
    { value: 'oct2dec',  label: 'Octal → Decimal', from: 8,  to: 10 },
    { value: 'bin2dec',  label: 'Binary → Decimal', from: 2,  to: 10 },
    { value: 'dec2bin2', label: 'Decimal → Binary (2)', from: 10, to: 2 } // duplicate by request
  ]

  function isValidForBase(str, base) {
    if (typeof str !== 'string') return false
    const s = str.trim()
    if (s === '') return false
    let pattern
    if (base === 2) pattern = /^-?[01]+$/
    else if (base === 8) pattern = /^-?[0-7]+$/
    else if (base === 10) pattern = /^-?[0-9]+$/
    else if (base === 16) pattern = /^-?[0-9a-fA-F]+$/
    else return false
    return pattern.test(s)
  }

  function parseToBigInt(str, base) {
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

  function toBaseString(num, base, upperHex=false) {
    if (num === 0n) return '0'
    let n = num
    let sign = ''
    if (n < 0n) { sign = '-'; n = -n }
    let out = ''
    while (n > 0n) {
      const rem = Number(n % BigInt(base))
      const ch = DIGITS[rem]
      out = (upperHex ? ch.toUpperCase() : ch) + out
      n = n / BigInt(base)
    }
    return sign + out
  }

  function handleConvert() {
    setError('')
    setResult('')
    const conf = conversions.find(c => c.value === kind)
    if (!conf) { setError('Unknown conversion'); return }
    if (!isValidForBase(input, conf.from)) {
      setError(`Invalid input for base ${conf.from}`)
      return
    }
    try {
      const n = parseToBigInt(input, conf.from)
      const upper = conf.to === 16
      const out = toBaseString(n, conf.to, upper)
      setResult(out)
    } catch (e) {
      setError('Failed to convert: ' + e.message)
    }
  }

  function placeholderFor(base) {
    if (base === 2) return 'e.g. 101101'
    if (base === 8) return 'e.g. 127'
    if (base === 10) return 'e.g. 3456'
    if (base === 16) return 'e.g. 1AF3'
    return ''
  }

  const conf = conversions.find(c => c.value === kind) || conversions[0]

  return (
    <div className="row" style={{gap:16}}>
      <section className="card">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}>
          <h2 style={{marginTop:0}}>Conversions</h2>
          <span className="badge"><strong>NEW</strong> Base Converter</span>
        </div>

        <div className="grid" style={{marginTop:12}}>
          <div>
            <label>Conversion Type</label>
            <select value={kind} onChange={e => setKind(e.target.value)}>
              {conversions.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Input (base {conf.from})</label>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder={placeholderFor(conf.from)} />
          </div>
        </div>

        <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
          <button className="btn primary" onClick={handleConvert}>Convert</button>
          <button className="btn" onClick={() => { setInput(''); setResult(''); setError('') }}>Clear</button>
        </div>

        {error ? <div className="error" style={{marginTop:8}}>⚠ {error}</div> : null}

        <div className="row" style={{marginTop:8}}>
          <label>Result (base {conf.to})</label>
          <div className="result">{result || '—'}</div>
        </div>

        <p className="muted" style={{marginTop:4}}>
          Tip: Negative numbers are supported, e.g. <code>-1011</code> (binary) or <code>-1A</code> (hex).
        </p>
      </section>
    </div>
  )
}

export default function App() {
  return (
    <div className="container">
      <header>
        <div className="brand">binary-octal-hex-calc</div>
        <nav>
          <NavLink to="/"      className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Home</NavLink>
          <NavLink to="/binary" className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Binary</NavLink>
          <NavLink to="/octal"  className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Octal</NavLink>
          <NavLink to="/hex"    className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Hexadecimal</NavLink>
          <NavLink to="/conversion" className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Conversion</NavLink>
        </nav>
      </header>

      <Routes>
        {/* Halaman utama */}
        <Route path="/" element={
          <div className="row" style={{gap:16}}>
            <section className="card">
              <h2 style={{marginTop:0}}>Welcome 👋</h2>
              <p>
                This app performs <strong>addition</strong> and <strong>subtraction</strong> for numbers in
                <strong> Binary</strong>, <strong>Octal</strong>, and <strong>Hexadecimal</strong> bases.
              </p>
              <div className="grid" style={{marginTop:12}}>
                <div className="card">
                  <h3 style={{marginTop:0}}>Binary</h3>
                  <p className="muted">Work with 0s and 1s.</p>
                  <Link className="btn" to="/binary">Open Binary Calculator →</Link>
                </div>
                <div className="card">
                  <h3 style={{marginTop:0}}>Octal</h3>
                  <p className="muted">Digits 0—7.</p>
                  <Link className="btn" to="/octal">Open Octal Calculator →</Link>
                </div>
                <div className="card">
                  <h3 style={{marginTop:0}}>Hexadecimal</h3>
                  <p className="muted">Digits 0—9 and A—F.</p>
                  <Link className="btn" to="/hex">Open Hex Calculator →</Link>
                </div>
                <div className="card">
                  <h3 style={{marginTop:0}}>Conversation</h3>
                  <p className="muted"></p>
                  <Link className="btn" to="/conversion">Open Conversation →</Link>
                </div>                
              </div>
            </section>
          </div>
        } />
        {/* Kalkulator */}
        <Route path="/binary" element={<BinaryPage />} />
        <Route path="/octal"  element={<OctalPage />} />
        <Route path="/hex"    element={<HexPage />} />
        <Route path="/conversion" element={<ConversionPage />} />
        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer>© 2025 • Built with React + Redux • Vite</footer>
    </div>
  )
}