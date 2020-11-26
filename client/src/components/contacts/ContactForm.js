import React, { useState } from "react";

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  return (
    <form>
      <h2 className="text-primary">ADD CONTACT</h2>
      <input
        type="text"
        placholder="Input name here... "
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placholder="Input email here... "
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placholder="Input phone here... "
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type: </h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
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
