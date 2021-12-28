import React from "react";

const Select = ({options, valueKey, titleKey, allTitle, value, onSelect}) => {

  const updateAirline = (e) => {
    e.preventDefault()
    onSelect(e.target.value)
  }

  const currentOptions = options.map(option => {
          const value = option[valueKey]
          return (
            <option key={value} value={value} disabled={!option.active}>
              {option[titleKey]}
            </option>
          )
        })

  currentOptions.unshift(<option key='all' value='all'>{allTitle}</option>)

  return (
    <select value={value} onChange={updateAirline}>
      {currentOptions}
    </select>
  )
}


export default Select
