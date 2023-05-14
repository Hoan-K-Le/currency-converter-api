import React, { useState, useEffect } from 'react'

function CurrencyPair() {
  const [rates, setRates] = useState({})
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState(0)

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}`)
      .then(response => response.json())
      .then(data => setRates(data.rates))
  }, [fromCurrency])

  const handleFromCurrencyChange = e => setFromCurrency(e.target.value)
  const handleToCurrencyChange = e => setToCurrency(e.target.value)
  const handleAmountChange = e => setAmount(e.target.value)

  const handleConversion = () => {
    const rate = rates[toCurrency]
    setResult(amount * rate)
  }

  return (
    <div className="currency-converter d-flex justify-content-center flex-column align-items-center">
      <h1>Currency Converter</h1>
      <div>
        <label>From:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value={fromCurrency}>{fromCurrency}</option>
          {Object.keys(rates).map(currency => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>
        <label>To:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {Object.keys(rates).map(currency => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
        <button className="btn btn-primary m-2" onClick={handleConversion}>
          Convert
        </button>
      </div>
      <h2>Result: {result}</h2>
    </div>
  )
}

export default CurrencyPair
