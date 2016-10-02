import React, { Component } from 'react';

import { hashHistory, Link } from 'react-router';
import basex from 'base-x';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

const REGISTRATION_URL = `https://${Cryptocat.Hostname}:5281/registration`;

var bs36 = basex('0123456789abcdefghijklmnopqrstuvwxyz');

const getFingerprint = (key) => (
  bs36.encode(
    ProScript.encoding.hexStringTo16ByteArray(
      ProScript.crypto.SHA256(
        ProScript.encoding.byteArrayToHexString(key)
      ).substr(0,32)
)));

const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const post = (url, data) => {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
  })
};


const RegistrationForm = React.createClass({
  getInitialState() {
    return {
      email: '',
    };
  },
  getValidationState() {
    if (validateEmail(this.state.email))
      return 'success';
    else
      return 'error';
  },
  handleChange(e) {
    this.setState({ email: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();

    if (this.getValidationState() === 'success')
      this.props.register(this.state.email);
  },
  render() {
    return (
      <div>
         <Form onSubmit={this.handleSubmit}>
          <h2>Register</h2>
            <FormGroup validationState={this.getValidationState()}>
              <ControlLabel>Please enter your e-mail address</ControlLabel>
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
})


export default React.createClass({
  getInitialState() {
    return {
      email: '',
      fingerprint: getFingerprint(Cryptocat.Me.settings.identityKey.pub),
      password: bs36.encode(ProScript.crypto.random16Bytes('o0')),
      submitted: false,
    };
  },
  componentWillMount () {
    Cryptocat.OMEMO.onAddDevice('master', 0);
  },
  register(email) {
    var data = {
      'fingerprint': this.state.fingerprint,
      'email': email,
      'password': this.state.password,
    }
    console.log(data);
    this.setState({ email });

    post(REGISTRATION_URL, data).then(function(response) {
      this.setState({ submitted: true });
      this.checkRegistration();
    }.bind(this)).catch(function(err) {
    	console.log(err)
    });
  },

  checkRegistration () {
    fetch(`${REGISTRATION_URL}/check/${this.state.fingerprint}`).then(function (response) {
      if (response.status != 201) {
        setTimeout(this.checkRegistration, 3000);
      } else {
        console.log('Account created');

        this.props.initializeProfile({
          username: this.state.fingerprint,
          password: this.state.password,
          email: this.state.email
        });
        Cryptocat.Storage.sync();
      }
    }.bind(this));
  },

  render() {
    return (
      <div>
      {
        this.state.submitted
        ? <h2>Waiting for verification ...</h2>
        : <RegistrationForm register={this.register} />
      }
      </div>
    );
  }
})
