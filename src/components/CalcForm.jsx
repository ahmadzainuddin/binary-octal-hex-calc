import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInput, setOperation, compute, clear } from '../store/calcSlice'
import BaseBadge from './BaseBadge'

const placeholders = {
  binary: { a: 'e.g. 1011', b: 'e.g. 0110' },
  octal:  { a: 'e.g. 17', b: 'e.g. 25' },
  hex:    { a: 'e.g. 1A3', b: 'e.g. FF' },
}

export default function CalcForm({ baseKey, title }) {
  const dispatch = useDispatch()
  const state = useSelector(s => s.calc[baseKey])

  const onChange = (field) => (e) => {
    dispatch(setInput({ baseKey, field, value: e.target.value }))
  }

  const onOp = (op) => () => dispatch(setOperation({ baseKey, op }))
  const onCompute = () => dispatch(compute({ baseKey }))
  const onClear = () => dispatch(clear({ baseKey }))

  return (
    <div className="card row" style={{gap:16}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}>
        <h2 style={{margin:0}}>{title}</h2>
        <BaseBadge baseKey={baseKey} />
      </div>

      <div className="grid">
        <div className="row">
          <label>First Number (A)</label>
          <input value={state.a} onChange={onChange('a')} placeholder={placeholders[baseKey].a} />
        </div>
        <div className="row">
          <label>Second Number (B)</label>
          <input value={state.b} onChange={onChange('b')} placeholder={placeholders[baseKey].b} />
        </div>
      </div>

      <div className="row">
        <label>Operation</label>
        <div className="ops">
          <button className={'btn op' + (state.op === '+' ? ' primary' : '')} onClick={onOp('+')}>+</button>
          <button className={'btn op' + (state.op === '-' ? ' primary' : '')} onClick={onOp('-')}>-</button>
        </div>
      </div>

      <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
        <button className="btn primary" onClick={onCompute}>Calculate</button>
        <button className="btn" onClick={onClear}>Clear</button>
      </div>

      {state.error ? <div className="error">⚠ {state.error}</div> : null}

      <div className="row">
        <label>Result ({baseKey})</label>
        <div className="result">{state.result || '—'}</div>
      </div>

      <p className="muted" style={{marginTop:4}}>
        Tip: You can include a leading minus sign, e.g. <code>-101</code>.
      </p>
    </div>
  )
}
