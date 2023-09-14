import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const EditUserModal = ({ onClose, userToEdit }) => {
  const [formData, setFormData] = useState({ ...userToEdit });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLanguagesChange = (selectedLanguages) => {
    setFormData({ ...formData, languages: selectedLanguages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `http://localhost:3001/update?id=${formData._id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onClose();
        window.location.reload();
      } else {
        console.error("Failed to edit user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal centered show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
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
              options={["English", "Hindi", "Spanish", "French", "German"]}
              selected={formData.language}
              onChange={handleLanguagesChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
