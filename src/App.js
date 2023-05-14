import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import AllCurrency from './AllCurrency'
import Header from './Header'
import CurrencyPair from './CurrencyPair'

function App() {
  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <CurrencyPair />
        <AllCurrency />
      </div>
    </React.Fragment>
  )
}

export default App
