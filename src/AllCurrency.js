import React, { useState, useEffect } from 'react'

function AllCurrency() {
  const [currencies, setCurrencies] = useState([])
  const [base, setBase] = useState('USD')
  useEffect(() => {
    getRate('USD')
  }, [])

  const getRate = base => {
    let rateTemp = []
    fetch(`https://api.frankfurter.app/latest?from=${base}`)
      .then(res => res.json())
      .then(data => {
        for (const [symbol, rate] of Object.entries(data.rates)) {
          rateTemp.push({ symbol, rate })
        }
        setCurrencies(rateTemp)
      })
  }

  // getting the target base value whenever we change the base currency
  const handleBaseChange = e => {
    e.preventDefault()
    setBase(e.target.value)
    getRate(e.target.value)
  }

  return (
    <React.Fragment>
      <div className="all-currency">
        <select value={base} onChange={handleBaseChange}>
          {currencies.length > 0 &&
            currencies.map(currency => (
              <option value={currency.symbol} key={currency.symbol}>
                {currency.symbol}
              </option>
            ))}
        </select>
        <ul>
          {currencies.map(currency => (
            <li>
              {currency.symbol} - {currency.rate}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default AllCurrency
