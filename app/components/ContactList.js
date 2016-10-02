import React, { PropTypes } from 'react'

const Contact = ({name, active, onClick}) => (
  <li
    onClick={ active ? '' : onClick}
    style={{ fontWeight: active ? 'bold' : '' }}
  >{name}</li>
)

const ContactList = ({contacts, activeChat, selectChat}) => (
  <ul>
    {contacts.map(contact =>
      <Contact
        key={contact}
        name={contact}
        active={contact === activeChat ? true : false}
        onClick={() => selectChat(contact)} />
    )}
  </ul>
)

export default ContactList;
