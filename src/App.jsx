// src/App.jsx
import React from 'react'
import { NavLink, Routes, Route, Navigate, Link } from 'react-router-dom'
import BinaryPage from './pages/BinaryPage.jsx'
import OctalPage from './pages/OctalPage.jsx'
import HexPage from './pages/HexPage.jsx'

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
              </div>
            </section>
          </div>
        } />
        {/* Kalkulator */}
        <Route path="/binary" element={<BinaryPage />} />
        <Route path="/octal"  element={<OctalPage />} />
        <Route path="/hex"    element={<HexPage />} />
        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer>© 2025 • Built with React + Redux • Vite</footer>
    </div>
  )
}