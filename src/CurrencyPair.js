import React, { useRef, useState, useEffect } from 'react'
import Chart from 'chart.js/auto'

function CurrencyPair() {
  const [rates, setRates] = useState({})
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState(0)
  const [chartInstance, setChartInstance] = useState(null) // Store the chart instance

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}`)
      .then(response => response.json())
      .then(data => setRates(data.rates))
    getHistoricDates()
  }, [fromCurrency, toCurrency])

  const handleFromCurrencyChange = e => {
    setFromCurrency(e.target.value)
  }

  const handleToCurrencyChange = e => {
    setToCurrency(e.target.value)
  }

  const handleAmountChange = e => {
    setAmount(e.target.value)
  }
  const handleConversion = () => {
    const rate = rates[toCurrency]
    setResult(amount * rate)
  }

  const chartRef = useRef(null)

  const getHistoricDates = async () => {
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(
      new Date().getTime() - 30 * 24 * 6660 * 60 * 1000
    )
      .toISOString()
      .split('T')[0]

    try {
      const response = await fetch(
        `https://api.frankfurter.app/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`
      )
      const data = await response.json()
      const chartLabels = Object.keys(data.rates)
      const chartData = Object.values(data.rates).map(rate => rate[toCurrency])
      const chartLabel = `${fromCurrency}/${toCurrency}`

      const chartConfig = {
        type: 'line',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: chartLabel,
              data: chartData,
              fill: false,
              tension: 0,
            },
          ],
        },
      }

      if (chartInstance) {
        chartInstance.destroy() // Destroy the previous chart instance
      }

      const newChart = new Chart(chartRef.current, chartConfig)
      setChartInstance(newChart)
    } catch (err) {
      console.log('ERR', err)
    }
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
      <canvas ref={chartRef} />
    </div>
  )
}

export default CurrencyPair
