import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";

const UserTable = ({ users, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to display per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = users.length;

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  // Generate pagination items
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(totalItems / itemsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handleChangePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <BootstrapTable keyField="id" data={currentItems} columns={columns} />
      <div style={{ marginLeft: "1300px", width: "100px" }}>
        <Pagination>
          <Pagination.Item onClick={handlePrevPage}>Previous</Pagination.Item>
          {items}
          <Pagination.Item onClick={handleNextPage}>Next</Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
};

export default UserTable;
