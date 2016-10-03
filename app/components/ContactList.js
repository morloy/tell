import React, { PropTypes } from 'react';
import AddContactForm from './AddContactForm'

const Contact = ({name, active, onClick}) => (
  <li
    onClick={ active ? '' : onClick}
    style={{ fontWeight: active ? 'bold' : '' }}
  >{name}</li>
)

const ContactList = (props) => (
  <div>
    <ul>
      {props.contacts.map(contact =>
        <Contact
          key={contact.id}
          name={contact.email}
          active={contact.id === props.activeChat ? true : false}
          onClick={() => props.onSelectContact(contact.id)} />
      )}
    </ul>
    <AddContactForm
      blockedEmails={props.blockedEmails}
      onSubmit={props.addContact}
    />
  </div>
)

export default ContactList;
