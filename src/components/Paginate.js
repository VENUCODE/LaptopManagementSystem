import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";

function PaginatedTable({ items, itemsPerPage, columns, action }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="flex flex-col justify-between h-full">
      <table className="w-full text-sm text-left rtl:text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className={`px-6 py-3 ${column === "email" ? "hidden sm:block" : ""}`}
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 ${column === "email" ? "hidden sm:block" : ""} py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                >
                  {item[column] !== undefined ? item[column] : "-"}
                </td>
              ))}
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <button className="action-btn" onClick={() => action(item._id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaChevronRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<FaChevronLeft />}
        renderOnZeroPageCount={null}
        className="pagination mt-4 flex flex-row  justify-center"
        activeClassName="bg-blue-500 dark:bg-blue-400/80  dark:text-white text-white "
        pageClassName="paginate-btn mx-2  px-3 py-2"
        previousClassName="paginate-btn"
        nextClassName="paginate-btn"
      />
    </div>
  );
}

export default PaginatedTable;
