import React, { Component } from 'react';

import { browserHistory, Link } from 'react-router'


import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';


const RegisterForm = React.createClass({
  render() {
    return (
      <div>
        <Form
          onSubmit={this.props.register}
          >
          <h2>Verify</h2>
            <FormGroup>
              <ControlLabel>Please enter the verification code</ControlLabel>
              <FormControl
                type="text"
                value={this.state.code}
                onChange={this.handleChange}
                placeholder="mail@example.org"
              />
              <Button
                type="submit"
              >
                Submit
              </Button>
          </FormGroup>
        </Form>
        <Link to="/register">register</Link>
      </div>
    );
  }
);


export default React.createClass({
  getInitialState() {
    return {
      code: ''
    };
  },
  handleChange(e) {
    this.setState({ code: e.target.value });
  },
  register(e) {
    e.preventDefault();
    console.log(this.state.code);
  },
  render() {
    return (
      <div>
        <Form
          onSubmit={this.register}
          >
          <h2>Verify</h2>
            <FormGroup>
              <ControlLabel>Please enter the verification code</ControlLabel>
              <FormControl
                type="text"
                value={this.state.code}
                onChange={this.handleChange}
                placeholder="mail@example.org"
              />
              <Button
                type="submit"
              >
                Submit
              </Button>
          </FormGroup>
        </Form>
        <Link to="/register">register</Link>
      </div>
    );
  }
})
