import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";

function PaginateData({ items, itemsPerPage = 5, setCurrentItems }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  useEffect(() => {
    setCurrentItems(items.slice(itemOffset, endOffset));
  }, [itemOffset, items]);

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="flex flex-col justify-between h-full">
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

export default PaginateData;
