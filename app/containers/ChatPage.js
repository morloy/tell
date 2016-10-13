import React, { Component } from 'react';
import Chat from '../components/Chat';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChatActions from '../actions/chat';


function mapStateToProps(state) {
  var messages = [];
  var otherId = state.chat.activeChat;

  if (otherId !== '' && state.chat.messages.hasOwnProperty(otherId) > 0) {
    var otherEmail = state.contacts[otherId].email;
    var myEmail = state.settings.profile.email;

    var mergeTime = 5 * 60 * 1000;

    state.chat.messages[otherId].forEach((msg, i, array) => {
      if (i > 0 &&
          msg.fromMe == array[i-1].fromMe &&
          msg.stamp - array[i-1].stamp < mergeTime) {
            var oldMsg = messages[messages.length-1];
            oldMsg.stamp = msg.stamp;
            oldMsg.contents.push(msg);
          }
      else {
        messages.push({
          id: msg.id,
          fromMe: msg.fromMe,
          username: msg.fromMe ? myEmail : otherEmail,
          stamp: msg.stamp,
          contents: [
            {...msg}
          ]
        });
      }
    });
  }

  return {
    messages,
    chat: state.chat,
    contacts: state.contacts,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChatActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
