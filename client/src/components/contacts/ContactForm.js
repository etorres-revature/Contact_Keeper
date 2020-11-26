import React, { useState, useContext } from "react";
import ContactContext from "../../context/contacts/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact } = contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "professional",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addContact(contact);
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">ADD CONTACT</h2>
      <input
        type="text"
        placeholder="Input name here... "
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Input email here... "
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Input phone here... "
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type: </h5>
      <input
        className="m p"
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />
      Personal{"   "}
      <input
        className="m p"
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-dark btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
