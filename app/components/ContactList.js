import React, { PropTypes } from 'react';
import AddContactForm from './AddContactForm'

const Contact = ({contact, active, onClick}) => (
  <li
    onClick={ active ? '' : onClick}
    style={{ fontWeight: active ? 'bold' : '' }}
  >{contact.email} ({contact.id})</li>
)

const ContactList = (props) => (
  <div>
    <ul>
      {props.contacts.map(contact =>
        <Contact
          key={contact.id}
          contact={contact}
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
