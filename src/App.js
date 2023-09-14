import React, { useState } from "react";
import AddUserModal from "./component/AddUserModel";
import UserList from "./component/UserList";
import { Button } from "react-bootstrap";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button
        style={{
          display: "flex",
          border: "2px solid black",
          textAlign: "end",
          position: "revert-layer",
          marginLeft: "1400px",
          marginTop: "25px",
        }}
        onClick={handleShowModal}
      >
        Add New
      </Button>
      <AddUserModal show={showModal} onHide={handleCloseModal} />
      <UserList />
    </div>
  );
};

export default App;
