import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import EditUserModel from "./EditUserModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); // Add userToEdit state

  // Fetch user data (you can replace this with your API call)
  useEffect(() => {
    fetch("http://localhost:3001/get") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) {
      return;
    }

    const apiUrl = `http://localhost:3001/delete?id=${users[0]._id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE", // Adjust the HTTP method as needed (e.g., POST, PUT)
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
        },
      });

      if (response.ok) {
        const data = await response.json();
        window.location.reload();
        console.log(data);
      } else {
        console.error("Failed to add user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      formatter: (cell, row, rowIndex) => {
        const id = rowIndex + 1;
        return (
          <div>
            <button className="btn btn-sm btn-primary">{id}</button>
          </div>
        );
      },
    },
    { dataField: "fullName", text: "Full Name" },
    { dataField: "email", text: "Email" },
    { dataField: "country", text: "Country Name" },
    { dataField: "state", text: "State Name" },
    { dataField: "city", text: "City Name" },
    { dataField: "language", text: "Language" },
    { dataField: "createdAt", text: "Created Date" },
    { dataField: "updatedAt", text: "Updated Date" },

    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => {
        return (
          <div>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleEdit(row._id)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(row._id)} // Pass the userId to handleDelete
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  // const handleEdit = () => {
  //   console.log("hi");
  //   setShowEditModal(true); // Open the EditUserModel
  // };

  const handleEdit = async (userId) => {
    console.log(userId);
    try {
      const apiUrl = `http://localhost:3001/getUserById?id=${userId}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const userData = await response.json();
        setUserToEdit(userData); // Set the userToEdit state with the fetched user data
        setShowEditModal(true); // Open the EditUserModel
      } else {
        console.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(users);

  return (
    <div>
      <h2>User List</h2>
      <UserTable users={users} columns={columns} />
      {/* Render the EditUserModel when showEditModal is true */}
      {showEditModal && (
        <EditUserModel
          userToEdit={userToEdit[0]}
          onClose={() => {
            setShowEditModal(false);
            // setSelectedUser(null); // Clear the selected user data
          }}
        />
      )}
    </div>
  );
};

export default UserList;
