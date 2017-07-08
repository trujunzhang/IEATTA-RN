/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8NotificationsView
 * @flow
 */
'use strict';

let EmptySchedule = require('../schedule/EmptySchedule');
let Linking = require('Linking');
let PushNUXModal = require('./PushNUXModal');
let PureListView = require('../../common/PureListView');
let React = require('React');
let Platform = require('Platform');
let ActionSheetIOS = require('ActionSheetIOS');
let ListContainer = require('ListContainer');
let NotificationCell = require('./NotificationCell');
let RateSessionsCell = require('./RateSessionsCell');
let allNotifications = require('./allNotifications');
let View = require('View');
let findSessionByURI = require('findSessionByURI');
let { connect } = require('react-redux');
let {
  turnOnPushNotifications,
  skipPushNotifications,
  TEST_MENU,
} = require('../../actions');
let {testMenuEnabled, version} = require('../../env');

let { createSelector } = require('reselect');

const data = createSelector(
  allNotifications,
  (store) => store.surveys,
  (store) => store.notifications.enabled,
  (notifications, surveys, enabled) => {
    const extra: Array<any> = [];
    if (surveys.length > 0) {
      extra.push({surveysCount: surveys.length});
    }
    return [...extra, ...notifications];
  }
);

class F8NotificationsView extends React.Component {

  constructor(props) {
    super(props);

    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).openNotification = this.openNotification.bind(this);
    (this: any).openReview = this.openReview.bind(this);
  }

  render() {
    let modal;
    if (this.props.nux) {
      modal = (
        <PushNUXModal
          onTurnOnNotifications={this.props.onTurnOnNotifications}
          onSkipNotifications={this.props.onSkipNotifications}
        />
      );
    }

    return (
      <View style={{flex: 1}}>
        <ListContainer
          title="Notifications"
          backgroundImage={require('./img/notifications-background.png')}
          backgroundColor={'#E78196'}
          {...this.renderTestItems()}>
          <PureListView
            data={this.props.notifications}
            renderEmptyList={this.renderEmptyList}
            renderRow={this.renderRow}
          />
        </ListContainer>
        {modal}
      </View>
    );
  }

  renderRow(notification) {
    if (notification.surveysCount) {
      return (
        <RateSessionsCell
          numberOfSessions={notification.surveysCount}
          onPress={this.openReview}
        />
      );
    }
    return (
      <NotificationCell
        key={notification.id}
        notification={notification}
        onPress={() => this.openNotification(notification)}
      />
    );
  }

  renderEmptyList() {
    return (
      <EmptySchedule
        title="No Notifications Yet"
        text="Important updates and announcements will appear here"
      />
    );
  }

  openNotification(notification) {
    if (notification.url) {
      let session = findSessionByURI(this.props.sessions, notification.url);
      if (session) {
        this.props.navigator.push({session});
      } else {
        Linking.openURL(notification.url);
      }
    }
  }

  openReview() {
    this.props.navigator.push({
      rate: 1,
      surveys: this.props.surveys,
    });
  }

  renderTestItems() {
    if (!testMenuEnabled) {
      return {};
    }

    if (Platform.OS === 'ios') {
      return {
        rightItem: {
          title: 'Test',
          onPress: () => this.showTestMenu(),
        },
      };
    }

    if (Platform.OS === 'android') {
      return {
        extraItems: Object.keys(TEST_MENU).map((title) => ({
          title,
          onPress: () => this.props.dispatch(TEST_MENU[title]()),
        })),
      };
    }
  }

  showTestMenu() {
    const itemTitles = Object.keys(TEST_MENU);
    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Testing F8 app v' + version,
      options: ['Cancel', ...itemTitles],
      cancelButtonIndex: 0,
    }, (idx) => {
        if (idx === 0) {
          return;
        }

        const action: any = TEST_MENU[itemTitles[idx - 1]];
        this.props.dispatch(action());
      }
    );
  }
}

function select(state) {
  return {
    nux: state.notifications.enabled === null,
    notifications: data(state),
    sessions: state.sessions,
    surveys: state.surveys,
  };
}

function actions(dispatch) {
  return {
    onTurnOnNotifications: () => dispatch(turnOnPushNotifications()),
    onSkipNotifications: () => dispatch(skipPushNotifications()),
    dispatch,
  };
}

module.exports = connect(select, actions)(F8NotificationsView);
