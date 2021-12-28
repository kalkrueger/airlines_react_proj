import React, { useState } from "react";

const Table = ({columns, format, rows, perPage}) => {
  const [page, setPage] = useState(0);
  const start = page * perPage

  const nextPage = () => {setPage(page + 1)}
  const prevPage = () => {setPage(page - 1)}

  const tableBody = () => {
    return rows.slice(start, (start + perPage)).map((route, i) => {
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
      <p> Showing {start + 1}-{start + 25} of {rows.length} rows</p>
      <button key="prev"
              disabled={page === 0}
              onClick={prevPage}>
        Previous Page
      </button>
      <button key="next"
              disabled={start + perPage >= rows.length}
              onClick={nextPage}>
        Next Page
      </button>
    </div>
  )
}

export default Table
