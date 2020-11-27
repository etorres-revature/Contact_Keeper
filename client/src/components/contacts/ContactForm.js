import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contacts/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, current, clearCurrent } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "professional",
      });
    }
  }, [contactContext, current]);

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
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    addContact(contact);
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Update Contact" : "Add Contact"}
      </h2>
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
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-dark btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light block" onClick={clearAll}>
            Clear Fields
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
