import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import Popup from 'react-native-popup';
import { dangerColor } from './../constants';

const mapStateToProps = (state) => {
  const { showPopup, title, message, confirmCallback, cancelCallback } = state.confirmPopup;
  return {
    showPopup, title, message, confirmCallback, cancelCallback
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCancelPurchaserSelect: () => {
      dispatch(cancelPurchasersSelect());
    }
  };
};

class ConfirmPopupView extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.showPopup && !this.props.showPopup) {
      this.popup.confirm({
        title: newProps.title,
        content: [newProps.message],
        ok: {
          text: 'Yes',
          style: {
              color: dangerColor
          },
          callback: () => {
            newProps.confirmCallback();
          },
        },
        cancel: {
          text: 'Cancel',
          callback: () => {
            newProps.cancelCallback();
          }
        }
      });
    }
  }

  render() {
    return <Popup ref={popup => this.popup = popup }/>;
  }
}

const ConfirmPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ showPopup, title, message, confirmCallback, cancelCallback }) => {
  return (
    <ConfirmPopupView
      showPopup={showPopup}
      title={title}
      message={message}
      confirmCallback={confirmCallback}
      cancelCallback={cancelCallback}
    />
  );
});

AppRegistry.registerComponent('ConfirmPopup', () => ConfirmPopup);

export default ConfirmPopup;
