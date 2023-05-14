import React, { useState, useEffect } from 'react'

function AllCurrency() {
  const [currencies, setCurrencies] = useState([])
  const [base, setBase] = useState('USD')

  useEffect(() => {
    const fetchCurrencies = async base => {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?from=${base}`
        )
        const data = await response.json()
        const currenciesData = Object.keys(data.rates).map(acc => ({
          rate: data.rates[acc],
          name: acc,
        }))

        setCurrencies(currenciesData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCurrencies(base)
  }, [base])

  const handleBaseChange = e => {
    setBase(e.target.value)
  }
  return (
    <React.Fragment>
      <div className="all-currency">
        <select value={base} onChange={handleBaseChange}>
          <option value="">Select Base Currency</option>
          {!!base && <option value={base}>{base}</option>}
          {currencies.length > 0 &&
            currencies.map(curr => (
              <option value={curr.name} key={curr.name}>
                {curr.name}
              </option>
            ))}
        </select>
        <ul className="row m-4">
          {currencies.map(currency => (
            <li className="col-4" key={currency.name}>
              <span className="col-md-4">{currency.name}</span>{' '}
              <span className="h3 col-4">-</span>{' '}
              <span className="col-4">{currency.rate}</span>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default AllCurrency
