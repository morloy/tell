import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { HOSTNAME } from '../utils/hostname';
import { connect } from 'react-redux';

function mapStateToProps({profile}) {
  return {
    profile
  };
}

export const NOT_INITIALIZED = 'NOT_INITIALIZED';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';
export const RECONNECTING = 'RECONNECTING';

const INIT_TIMEOUT = 1;
const MAX_TIMEOUT = 32;

const ConnectionManager = React.createClass({
  getInitialState() {
    return {
      online: NOT_INITIALIZED,
      reconnect_timeout: INIT_TIMEOUT
    };
  },
  setup() {
    if (window.onbeforeunload !== null) { return; }

    window.onbeforeunload = (e) => {
      console.log('Shutdown. Disconnecting ...');
      this.disconnect();
      Cryptocat.Storage.sync();
    };
    window.onoffline = (e) => {
      console.log('Offline. Disconnecting ...');
      this.disconnect();
    };
    window.ononline  = (e) => {
      console.log('Online. Reconnecting ...');
      this.reconnect();
    };
    Remote.powerMonitor.on('suspend', () => {
      console.log('Going to sleep. Disconnecting ...');
      this.disconnect();
    });
    Remote.powerMonitor.on('resume', () => {
      console.log('Wake up. Reconnecting ...');
      this.reconnect();
    });
    Cryptocat.Win.main.login = { onAuthFailed: () => this.reconnect() };
  },
  reconnect() {
    const timeout = this.state.reconnect_timeout;
    this.setState({
      online: RECONNECTING,
      reconnect_timeout: 2*timeout > MAX_TIMEOUT ? MAX_TIMEOUT : 2*timeout
    });
    console.log(`Waiting ${timeout} seconds for next reconnect.`);
    setTimeout(this.connect, timeout*1000);
  },
  disconnect() {
    this.setState({ online: DISCONNECTED });
    Cryptocat.XMPP.disconnect(false);
  },
  connect() {
    var { username, password } = this.props.profile;

    if (this.state.online === CONNECTED) {
      return;
    }
    if (!(username && password)) {
      return;
    }

    Cryptocat.XMPP.connect(username, password, (s) => {
      if (s) {
        this.setState({ online: CONNECTED, reconnect_timeout: INIT_TIMEOUT });

        client.subscribeToNode(
  				`${username}@${HOSTNAME}`,
  				'urn:xmpp:omemo:0:devicelist'
  			).then((res) => {
          Cryptocat.XMPP.sendDeviceList(Cryptocat.Me.settings.deviceIds);
          Cryptocat.XMPP.sendBundle();
          this.setup();
        });
      } else if (this.state.online !== DISCONNECTED) {
        console.log('Connection lost. Reconnecting ...');
        this.reconnect();
      }
    });
  },
  componentWillMount() { this.connect(); },
  componentDidUpdate() {
    if (this.state.online === NOT_INITIALIZED) { this.connect(); }
  },
  render() {
    return (
      <Modal
        show={this.state.online !== CONNECTED &&
              this.state.online !== NOT_INITIALIZED}
        animation={false}
      >
        <Modal.Body>
          <h2>Connecting ... </h2>
        </Modal.Body>
      </Modal>
    )
  }
});

export default connect(mapStateToProps)(ConnectionManager);
