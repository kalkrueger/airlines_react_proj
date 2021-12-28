import React from 'react'

const Table = ({columns, format, routes}) => {

  const tableBody = () => {
    return routes.map((route, i) => {
      return (
        <tr key={`rt${i}`}>
          {columns.map((column, i) => {
            return <td key={i}>{format(column.property, route[column.property])}</td>
          })}
        </tr>
      )
    })
  }


  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(column => <td key={column.name}>{column.name}</td>)}
          </tr>
        </thead>
          <tbody>
            {tableBody()}
          </tbody>
      </table>
    </div>
  )
}

export default Table
