import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const AddUserModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    state: "",
    city: "",
    language: [],
  });

  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLanguagesChange = (selectedLanguages) => {
    setFormData({ ...formData, language: selectedLanguages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:3001/save";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onHide();
        window.location.reload();
      } else {
        console.error("Failed to add user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="language">
            <Form.Label>Languages</Form.Label>
            <Typeahead
              id="language"
              name="language"
              labelKey="name"
              multiple
              options={["English", "Hinid", "Spanish", "French", "German"]}
              selected={formData.language}
              onChange={handleLanguagesChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
