import React, { PropTypes } from 'react';
import AddContactForm from './AddContactForm';
import {colors} from '../utils/colors';

const {Menu, MenuItem} = Remote

const Contact = ({contact, active, onClick, removeContact}) => {
  var {id, email} = contact;

  const menu = new Menu()
  menu.append(new MenuItem({label: 'Delete Contact', click: () => {
    removeContact(id);
  }}));

  var contextMenu = (e) => {
    e.preventDefault();
    menu.popup(Remote.getCurrentWindow())
  };

  return (
    <div
      style={{ backgroundColor: active ? colors.blue2 : '' }}
      onClick={ active ? '' : onClick}
      onContextMenu={contextMenu}
    >
    <AccountInfo {...contact} />
    </div>

  )
};

const AccountInfo = ({id, email}) => (
  <div style={{padding: '10px'}}>
    <strong>{email}</strong><br />
    <span style={{color: colors.gray }}>{id}</span>
  </div>
)


const ContactList = (props) => (
  <div style={{display: 'table', height: '100%', width: '100%'}}>
    <div style={{display: 'table-row', height: '100%'}}>
      <div style={{ position: 'relative', height: '100%' }}>
        <h4>Contacts</h4>
        {props.contacts.map(contact =>
          <Contact
            key={contact.id}
            contact={contact}
            active={contact.id === props.activeChat ? true : false}
            onClick={() => props.onSelectContact(contact.id)}
            removeContact={props.removeContact}
          />
        )}
      </div>
    </div>
    <div style={{display: 'table-row'}}>
      <div style={{padding: '10px'}}>
        <AddContactForm
          blockList={props.blockList}
          onSubmit={props.addContact}
        />
        Your Account:<br />
        <AccountInfo
          id={props.profile.username}
          email={props.profile.email}
        />
      </div>
    </div>
  </div>
)

export default ContactList;
