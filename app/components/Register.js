import React, { Component } from 'react';

import colors from '../utils/colors';

import basex from 'base-x';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { Feedback } from 'react-bootstrap/lib/FormControl';

import { ACCOUNTS_URL, lookupHash } from '../utils';

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
      state: 'error'
    };
  },
  handleChange(e) {
    const email = e.target.value;
    this.setState({ email, state: 'error' });

    if (!validateEmail(email)) { return; }

    fetch(`${ACCOUNTS_URL}/lookup/${lookupHash(email)}`).then((response) => {
      if (response.status === 204) {
        this.setState({ state: 'success' });
      }
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.state === 'success') {
      this.props.register(this.state.email);
    }
  },
  render() {
    return (
      <div>
         <Form onSubmit={this.handleSubmit}>
          <h1 style={{
              paddingBottom: '30px'
            }}>Create Account</h1>
            <FormGroup validationState={this.state.state }>
              <ControlLabel style={{color: colors.blue3
              }}>
                Please enter your e-mail address
              </ControlLabel>
              <FormControl
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="mail@example.org"
              />
            <Feedback />
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
      fingerprint: '',
      password: bs36.encode(ProScript.crypto.random16Bytes('o0')),
      submitted: false,
    };
  },
  register(email) {
    var fingerprint = getFingerprint(Cryptocat.Me.settings.identityKey.pub);
    var data = {
      fingerprint,
      email,
      password: this.state.password,
    }
    console.log(data);
    this.setState({ email, fingerprint, submitted: true });

    post(`${ACCOUNTS_URL}/register`, data).then(function(response) {
      this.checkRegistration();
    }.bind(this)).catch(function(err) {
    	console.log(err)
    });
  },

  checkRegistration () {
    fetch(`${ACCOUNTS_URL}/lookup/${lookupHash(this.state.email)}`).then((response) => {
      if (response.status != 200) {
        setTimeout(this.checkRegistration, 3000);
      } else {
        console.log('Account created');

        Cryptocat.Storage.sync();
        this.props.initializeProfile({
          username: this.state.fingerprint,
          password: this.state.password,
          email: this.state.email
        });
      }
    });
  },

  render() {
    return (
      <div style={{
          width: '500px',
          paddingTop: '100px',
          margin: 'auto',
        }}>
      {
        this.state.submitted
        ? <div>
            <p>We have sent you an e-mail.<br />
            Please click on the included link to finish your registration.</p>
            <h2>Waiting for verification ...</h2>
          </div>
        : <RegistrationForm register={this.register} />
      }
      </div>
    );
  }
})
