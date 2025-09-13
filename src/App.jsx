import React from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import BinaryPage from './pages/BinaryPage.jsx'
import OctalPage from './pages/OctalPage.jsx'
import HexPage from './pages/HexPage.jsx'

export default function App() {
  return (
    <div className="container">
      <header>
        <div className="brand">binary-octal-hex-calc</div>
        <nav>
          <NavLink to="/" className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Home</NavLink>
          <NavLink to="/binary" className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Binary</NavLink>
          <NavLink to="/octal" className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Octal</NavLink>
          <NavLink to="/hex" className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Hexadecimal</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/binary" element={<BinaryPage />} />
        <Route path="/octal" element={<OctalPage />} />
        <Route path="/hex" element={<HexPage />} />
      </Routes>

      <footer>© 2025 • Built with React + Redux • Vite</footer>
    </div>
  )
}
