import React, { Component } from 'react';
import {
  Form, FormGroup, InputGroup,
  FormControl, Button
} from 'react-bootstrap';
import { Feedback } from 'react-bootstrap/lib/FormControl';

import { ACCOUNTS_URL, lookupHash } from '../utils';

const AddContactForm = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      id: undefined,
    };
  },

  handleChange: function(e) {
    var email = e.target.value;
    this.setState({ email });

    if (email.length < 8 || this.props.blockList.indexOf(email) >= 0)
      return;

    fetch(`${ACCOUNTS_URL}/lookup/${lookupHash(email)}`).then((response) => {
      if (response.status == 200) {
        response.json().then((user) => {
          this.setState({id: user.id});
        });
      } else {
        this.setState({id: undefined});
      }
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    if (this.state.id !== undefined) {
      this.props.createContact(this.state.id, {email: this.state.email});
      this.setState(this.getInitialState());
    }
  },


  render: function() {
    return (
      <div>
         <Form onSubmit={this.handleSubmit}>
          <p>Add Contact</p>
            <FormGroup validationState={this.state.id ? 'success' : 'warning'}>
            <InputGroup>
              <FormControl
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="mail@example.org"
              />
              <InputGroup.Button>
                <Button
                  type="submit"
                  bsStyle="primary"
                  disabled={!this.state.id}
                >+</Button>
              </InputGroup.Button>
            </InputGroup>
            <FormControl.Feedback style={{ marginRight: '35px' }} />
          </FormGroup>
        </Form>
      </div>
    );
  }
});

export default AddContactForm;
