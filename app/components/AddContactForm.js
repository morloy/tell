import React, { Component } from 'react';
import {
  Form, FormGroup, ControlLabel,
  FormControl, HelpBlock, Button
} from 'react-bootstrap';


const ACCOUNTS_URL = `https://${Cryptocat.Hostname}:5281/accounts`;

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

    if (email.length < 8 || this.props.blockedEmails.indexOf(email) >= 0)
      return;

    fetch(`${ACCOUNTS_URL}/lookup/${email}`).then((response) => {
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
      this.props.onSubmit({
        id: this.state.id,
        email: this.state.email
      });
      this.setState(this.getInitialState());
    }
  },


  render: function() {
    return (
      <div>
         <Form onSubmit={this.handleSubmit}>
          <p>Add Contact</p>
            <FormGroup validationState={this.state.id ? 'success' : 'warning'}>
              <FormControl
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="mail@example.org"
              />
            <FormControl.Feedback />
          </FormGroup>
        </Form>
      </div>
    );
  }
});

export default AddContactForm;
