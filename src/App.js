import React from 'react'
import react, { useState, useEffect } from 'react'
import './App.css'
import AllCurrency from './AllCurrency'

function App() {
  const [allCurrency, setAllCurrency] = useState([])
  const [firstCurrency, setFirstCurrency] = useState('')
  const [secondCurrency, setSecondCurrency] = useState('')
  const [amount, setAmount] = useState(1)

  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAllCurrency([data.base, ...Object.keys(data.rates)])
        setFirstCurrency(data.base)
        setSecondCurrency(Object.keys(data.rates)[0])
      })
  }, [])

  return (
    <React.Fragment>
      <div className="layout">
        <div className="container-fluid header p-3">
          <nav>
            <h1>Currency Exchange Project</h1>
          </nav>
        </div>
        {/* end of header */}
        <div className="container pt-4 d-flex flex-column justify-content-center">
          <div className="title text-center">
            <h2>Currency Converter</h2>
            <p>View the latest currency exchange rates</p>
            <div className="row row-container">
              <div className="col-4 col-xs-12">
                <form className="form-group d-flex flex-column align-items-center">
                  <label id="currency-name">Initial Currency</label>
                  <select className="form-control">
                    {allCurrency.map(option => {
                      return (
                        <option
                          key={option}
                          onChange={e => setFirstCurrency(e.target.value)}
                          value={option}
                        >
                          {option}
                        </option>
                      )
                    })}
                  </select>
                  <small>US dollar</small>
                  <input
                    className="currency-input text-center"
                    type="number"
                    placeholder="2"
                  />
                </form>
              </div>
              <div className="col-4 col-xs-12">
                <h2 className="equal">=</h2>
                <button className="btn btn-secondary reverse-btn">
                  Reverse
                </button>
              </div>
              <div className="col-4 col-xs-12">
                <form className="form-group d-flex flex-column align-items-center justify-content-center">
                  <label id="currency-name">Target Currency</label>
                  <select className="form-control">
                    {allCurrency.map(option => {
                      return (
                        <option
                          key={option}
                          onChange={e => setSecondCurrency(e.target.value)}
                          value={option}
                        >
                          {option}
                        </option>
                      )
                    })}
                  </select>
                  <input
                    className="currency-input text-center"
                    type="number"
                    placeholder="1"
                  />
                </form>
              </div>
              <div className="currency-result">
                <h5>1 USD is </h5>
                <span className="h2">=</span>
                <h5 className="pt-3">1 EURO</h5>
              </div>
            </div>
          </div>
        </div>
        <AllCurrency />
      </div>
    </React.Fragment>
  )
}

export default App
