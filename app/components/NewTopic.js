import React, { Component } from 'react';
import MainPage from '../containers/MainPage';
import ContactList from '../containers/ContactList';
import _ from 'lodash';


import Chips, { Chip } from 'react-chips';
import Theme from 'react-chips/lib/theme'

const customTheme = Object.assign({}, Theme, { suggestion: {
  background: '#fff',
  padding: '5px 15px'
}});


import {
  Form, FormGroup, ControlLabel,
  FormControl, HelpBlock, Button, Glyphicon, Image,
  Col
} from 'react-bootstrap';

const TopicForm = React.createClass({
  getInitialState() {
    return {
      to: [],
      subject: '',
      text: ''
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewTopic({...this.state});
  },
  render() {
    var contacts = _.values(this.props.contacts).map((v) => v.email);
    return (
      <div>
      <form style={{padding: '10px'}} onSubmit={this.handleSubmit} >
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>To</ControlLabel>
          <Chips
            suggestions={contacts}
            fromSuggestionsOnly={true}
            theme={customTheme}
            onChange={chips => this.setState({ to: chips })}
          />
        </FormGroup>

        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Subject</ControlLabel>
          <FormControl
            type="text"
            value={this.state.subject}
            placeholder="Enter subject ..."
            onChange={e => this.setState({ subject: e.target.value })}
          />
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Message</ControlLabel>
          <FormControl
            componentClass="textarea"
            rows="15"
            value={this.state.text}
            placeholder="Enter message here ..."
            onChange={e => this.setState({ text: e.target.value })}
          />
        </FormGroup>

        <Button type="submit">
          Create
        </Button>
      </form>
  </div>

    );
  }
})

const NewTopic = (props) => {
  return (
    <MainPage
      SideBar={<ContactList />}
      Title={<h3>Create new Topic</h3>}
      Content={<TopicForm {...props}  />}
    />
  );
}

export default NewTopic;
