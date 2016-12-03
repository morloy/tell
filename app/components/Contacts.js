import React, { PropTypes } from 'react';
import AddContactForm from './AddContactForm';
import AccountInfo from './AccountInfo';
import colors from '../utils/colors';

const {Menu, MenuItem} = Remote

const Contact = ({contact, active, onClick, deleteContact}) => {
  var {id, email} = contact;

  const menu = new Menu()
  menu.append(new MenuItem({label: 'Delete Contact', click: () => {
    deleteContact(id);
  }}));

  var contextMenu = (e) => {
    e.preventDefault();
    menu.popup(Remote.getCurrentWindow())
  };

  return (
    <div
      style={{ backgroundColor: active ? colors.blue2 : '' }}
      onClick={() => window.To.addChip(contact.email)}
      // onContextMenu={contextMenu}
    >
    <AccountInfo {...contact} />
    </div>

  )
};

const Contacts = (props) => (
  <div style={{display: 'table', height: '100%', width: '100%'}}>
    <div style={{display: 'table-row', height: '100%'}}>
      <div style={{ position: 'relative', height: '100%' }}>
        <h4 style={{paddingLeft: '10px'}}>Contacts</h4>
        {props.contacts.map(contact =>
          <Contact
            key={contact.id}
            contact={contact}
            deleteContact={props.deleteContact}
          />
        )}
      </div>
    </div>
    <div style={{display: 'table-row'}}>
      <div style={{padding: '10px'}}>
        <AddContactForm
          blockList={props.blockList}
          createContact={props.createContact}
        />
      </div>
    </div>
  </div>
)

export default Contacts;
