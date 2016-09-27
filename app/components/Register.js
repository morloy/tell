import React, { Component } from 'react';
import { HOSTNAME } from '../utils/Config';

import { hashHistory, Link } from 'react-router';
import bs58 from 'bs58';

import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

const REGISTRATION_URL = `https://${HOSTNAME}/registration`;


const RegistrationForm = React.createClass({
  getInitialState() {
    return {
      email: '',
    };
  },
  handleChange(e) {
    this.setState({ email: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.register(this.state.email);
  },

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} >
          <h2>Register</h2>
            <FormGroup>
              <ControlLabel>Please enter your e-mail address</ControlLabel>
              <FormControl
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="mail@example.org"
              />
              <Button type="submit">Submit</Button>
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
      pubkey: '',
      password: bs58.encode(ProScript.crypto.random16Bytes('o0')),
      submitted: false,
    };
  },

  componentDidMount () {
    Cryptocat.OMEMO.onAddDevice('master', '');
  },

  post(url, data) {
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
  },

  register(email) {
    var data = {
      'email': email,
      'pubkey': bs58.encode(Cryptocat.Me.settings.identityKey.pub),
      'password': this.state.password,
    }
    console.log(data);
    this.setState({ pubkey: data.pubkey });

    this.post(REGISTRATION_URL, data).then(function(response) {
      this.setState({ submitted: true });
      this.checkRegistration();
    }.bind(this)).catch(function(err) {
    	console.log(err)
    });
  },

  checkRegistration () {
    fetch(`${REGISTRATION_URL}/check/${this.state.pubkey}`).then(function (response) {
      if (response.status == 201) {
        console.log('Account created');
        hashHistory.push('/');
      } else {
        setTimeout(this.checkRegistration, 3000);
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
      <Link to="/">home</Link>
      </div>
    );
  }
})
