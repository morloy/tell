import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import {
  FormGroup, ControlLabel,
  FormControl, Button, ButtonToolbar,
  Jumbotron
} from 'react-bootstrap';
import Chips from 'react-chips';
import Theme from 'react-chips/lib/theme';
import MainPage from '../containers/MainPage';
import ContactList from '../containers/ContactList';

const customTheme = Object.assign({}, Theme, { suggestion: {
  background: '#fff',
  padding: '5px 15px'
} });


const TopicForm = React.createClass({
  getInitialState() {
    return {
      to: [],
      subject: '',
      text: ''
    };
  },
  valid() {
    const { to, subject, text } = this.state;
    return (subject !== '' && text !== '' && to.length > 0);
  },
  handleSubmit(e) {
    e.preventDefault();
    if (!this.valid()) return;

    this.props.createNewTopic({ ...this.state });
  },
  render() {
    const contacts = _.values(this.props.contacts).map((v) => v.email);
    return (
      <div style={{ padding: '20px' }}>
        <form onSubmit={this.handleSubmit} >
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>To</ControlLabel>
            <Chips
              suggestions={contacts}
              fromSuggestionsOnly
              placeholder={this.state.to.length ? '' : 'Select contacts ...'}
              theme={customTheme}
              onChange={chips => this.setState({ to: chips })}
              ref={(To) => { window.To = To; }}
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
              rows="21"
              value={this.state.text}
              placeholder="Type your message here ..."
              onChange={e => this.setState({ text: e.target.value })}
            />
          </FormGroup>

          <ButtonToolbar className="pull-right">
            <Link to="/">
              <Button>Cancel</Button>
            </Link>
            <Button
              bsStyle="primary"
              type="submit"
              disabled={this.valid() === false}
            >Send</Button>
          </ButtonToolbar>
        </form>
      </div>

    );
  }
});

const Welcome = () => (
  <MainPage
    SideBar={<ContactList />}
    Content={
      <Jumbotron style={{ height: '100%', margin: 0 }}>
        <h1 style={{ padding: '20px 0px' }}>Welcome!</h1>
        <p>
          Your contact list looks a bit empty.<br />
          To add new contacts, simply enter their e-mail address in the form on the left.
        </p>
      </Jumbotron>
    }
  />
);

const Compose = (props) => {
  if (Object.keys(props.contacts).length > 0) {
    return (
      <MainPage
        SideBar={<ContactList />}
        Title={<h3>Create new Topic</h3>}
        Content={<TopicForm {...props} />}
      />
    );
  }
  return <Welcome />;
};

export default Compose;
