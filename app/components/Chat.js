import React, { Component } from 'react';
import { Link } from 'react-router';


import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';



const Chat = React.createClass({
  componentDidMount () {
    if (Cryptocat.Me.connected === true)
      return;

    Cryptocat.Me.username = 'timo';
    Cryptocat.XMPP.connect(Cryptocat.Me.username, 'test', function () {
                             console.log('connected');
                            //  Cryptocat.Win.main = {};
                            //  Cryptocat.Win.main.roster = {};
                            //  Cryptocat.Win.main.roster.state = {};
                            //  Cryptocat.Win.main.roster.state.buddies = {bob: true};
                            //  Cryptocat.Win.main.roster.updateBuddyStatus = (a,b,c) => {}
                            //  Cryptocat.XMPP.sendBuddyRequest('timoho');
                            //  Cryptocat.OMEMO.sendMessage('bob', 'Hallo');
                            // Cryptocat.XMPP.disconnect(false);
                          }
    );
  },

  getInitialState() {
    return {
      text: '',
    };
  },
  handleChange(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.text);

    var stamp = Date.now();
		var deviceName = Cryptocat.Me.settings.deviceName;
    Cryptocat.OMEMO.sendMessage('timoho', {
      message: this.state.text,
			internalId: `${deviceName}_${stamp}`
    });
    this.setState({ text: '' });

  },
  render() {
    return (
      <div>
        <div>
          <h2>Chat</h2>

              <Form onSubmit={this.handleSubmit} >
                  <FormGroup>
                    <FormControl
                      type="text"
                      value={this.state.text}
                      onChange={this.handleChange}
                      placeholder="Type your message here ..."
                    />
                    <Button type="submit">Submit</Button>
                </FormGroup>
              </Form>
          <Link to="/">home</Link>
        </div>
      </div>
    );
  }
});

export default Chat;
