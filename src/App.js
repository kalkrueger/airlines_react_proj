import React, { useState } from "react";

import './App.css';
import Table from './components/Table'
import DATA from './data.js'

const App = () => {

  const formatValue = (property, value) => {
    if (property === 'airline') return DATA.getAirlineById(value);
    return DATA.getAirportByCode(value);
  }

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ]

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        < Table className="routes-table" columns={columns} rows=""
          format={formatValue} routes={DATA.routes} perPage={25}/>
      </section>
    </div>
  )
}

export default App;
