import React, { useState } from "react";
import './App.css';
import Table from './components/Table'
import Select from './components/Select'
import DATA from './data.js'

const App = () => {
  const [airline, setAirline] = useState('all')
  const [airport, setAirport] = useState('all')

  const defaultsSelected = airline === "all" && airport === "all";

  const formatValue = (property, value) => {
    if (property === 'airline') return DATA.getAirlineById(value);
    return DATA.getAirportByCode(value);
  }

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ]

  const filteredRoutes = () => {
    let routes = DATA.routes
    if (defaultsSelected) return routes
    if (airline !== 'all') routes = routes.filter(route => route.airline === Number(airline))
    if (airport !== 'all') routes = routes.filter(route => [route.src, route.dest].includes(airport))
    return routes
  }

  const filteredAirlines = () => {
    let airlines = DATA.airlines
    let activeRoutes = filteredRoutes().map(route => route.airline)
    airlines.forEach(airline => airline.active = activeRoutes.includes(airline.id))
    return airlines
  }

  const filteredAirPorts = () => {
    let airports = DATA.airports
    let activeRoutes = []
    filteredRoutes().forEach(route => activeRoutes.push(route.src, route.dest))
    airports.forEach(airport => airport.active = activeRoutes.includes(airport.code))
    return airports
  }

  const resetFilter = () => {
    setAirline('all');
    setAirport('all');
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Show flights on:
          < Select options={filteredAirlines()} valueKey="id" titleKey="name"
            allTitle="All Airlines" value={airline} onSelect={setAirline}/>
          Show flight to/from:
          < Select options={filteredAirPorts()} valueKey="code" titleKey="name"
            allTitle="All Airports" value={airport} onSelect={setAirport}/>
          <button onClick={resetFilter} disabled={defaultsSelected}>
            Show All Results
          </button>
        </p>
          < Table className="routes-table" columns={columns} rows={filteredRoutes()}
            format={formatValue} perPage={25}/>
      </section>
    </div>
  )
}

export default App;
