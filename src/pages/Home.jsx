import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
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
        </div>
      </section>
    </div>
  )
}
