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
      text: '',
      sending: false
    };
  },
  valid() {
    const { to, subject, text } = this.state;
    return (text !== '' && to.length > 0);
  },
  handleSubmit(e) {
    e.preventDefault();
    if (!this.valid()) return;

    this.setState({ sending: true });
    setTimeout(() => this.props.createNewTopic({...this.state}), 100);
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
              placeholder={this.state.to.length ? '' : 'Type contact name or select on the left ...'}
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
              placeholder="Can be left blank ..."
              onChange={e => this.setState({ subject: e.target.value })}
            />
          </FormGroup>

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Message</ControlLabel>
            <FormControl
              componentClass="textarea"
              rows="15"
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
              disabled={!this.valid() || this.state.sending}
            >{this.state.sending ? 'Sending ...' : 'Send'}</Button>
          </ButtonToolbar>
        </form>
      </div>

    );
  }
});

const Welcome = () => (
  <Jumbotron style={{ height: '100%', margin: 0 }}>
    <p>
      Before your can write a message, you need to add some contacts.<br />
      Simply enter an e-mail address into the form on the left and a check mark (✓) will appear,
      when they are already using Tell! <br />
      Once you have your first contact, the message form will appear here and you can start composing a new message.
    </p>
  </Jumbotron>
);

const Compose = (props) => {
  const hasContacts = Object.keys(props.contacts).length !== 0;
  return (
    <MainPage
      SideBar={<ContactList />}
      Title={<h3>Create new Topic</h3>}
      Content={hasContacts ? <TopicForm {...props} /> : <Welcome />}
    />
  );
}

export default Compose;
