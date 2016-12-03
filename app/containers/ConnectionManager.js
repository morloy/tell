import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { HOSTNAME } from '../utils/hostname';
import { connect } from 'react-redux';

function mapStateToProps({profile}) {
  return {
    profile
  };
}

const ConnectionManager = React.createClass({
  getInitialState() {
    return {
      online: undefined
    };
  },
  connect() {
    var { username, password } = this.props.profile;

    if (this.state.online === true) {
      return;
    }
    if (!(username && password)) {
      return;
    }

    Cryptocat.XMPP.connect(username, password, (s) => {
      if (s) {
        this.setState({ online: true });

        client.subscribeToNode(
  				`${username}@${HOSTNAME}`,
  				'urn:xmpp:omemo:0:devicelist'
  			).then((res) => {
          Cryptocat.XMPP.sendDeviceList(Cryptocat.Me.settings.deviceIds);
          Cryptocat.XMPP.sendBundle();

          window.onbeforeunload = (e) => {
            Cryptocat.XMPP.disconnect(false);
            Cryptocat.Storage.sync();
          }

          window.onoffline = (e) => {
            Cryptocat.XMPP.disconnect(false);
            this.setState({ online: false });
           };
          window.ononline  = (e) => { this.connect(); };
        });
      } else {
        this.setState({ online: false });
        setTimeout(this.connect, 10000);
      }
    });
  },
  componentWillMount() { this.connect(); },
  componentDidUpdate() {
    if (this.state.online === undefined) { this.connect(); }
  },
  render() {
    return (
      <Modal
        show={this.state.online === false}
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
