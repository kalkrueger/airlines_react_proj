import React, { useState } from "react";

const Table = ({columns, format, routes, perPage}) => {
  const [page, setPage] = useState(0);
  const start = page * perPage
  perPage = Number(perPage)
  const nextPage = () => {setPage(page + 1)}
  const prevPage = () => {setPage(page - 1)}

  const tableBody = () => {
    return routes.slice(start, (start + perPage)).map((route, i) => {
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
      <p> Showing {start + 1}-{start + 25} of {routes.length} routes</p>
      <button key="prev"
              disabled={page === 0}
              onClick={prevPage}>
        Previous Page
      </button>
      <button key="next"
              disabled={start + perPage >= routes.length}
              onClick={nextPage}>
        Next Page
      </button>
    </div>
  )
}

export default Table
