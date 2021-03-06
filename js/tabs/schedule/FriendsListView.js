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
 * @flow
 */
'use strict';

/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')

let EmptySchedule = require('./EmptySchedule');
let Navigator = require('Navigator');
let SessionsSectionHeader = require('./SessionsSectionHeader');
let InviteFriendsButton = require('./InviteFriendsButton');
let PureListView = require('../../common/PureListView');
let FriendCell = require('./FriendCell');

type Friend = any;

type Props = {
    friends: Array<Friend>;
    navigator: Navigator;
};

class FriendsListView extends React.Component {
    props: Props;
    _innerRef: ?PureListView;

    constructor(props: Props) {
        super(props);

        this._innerRef = null;

        // (this: any).renderCompanyHeader = this.renderCompanyHeader.bind(this);
        // (this: any).renderRow = this.renderRow.bind(this);
        // (this: any).renderFooter = this.renderFooter.bind(this);
        // (this: any).renderEmptyList = this.renderEmptyList.bind(this);
        // (this: any).storeInnerRef = this.storeInnerRef.bind(this);
    }

    renderCompanyHeader() {
        return <View/>
    }

    render() {
        return (
            <PureListView
                ref={this.storeInnerRef.bind(this)}
                data={this.props.friends}
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderCompanyHeader.bind(this)}
                renderEmptyList={this.renderEmptyList.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
                {...(this.props: any /* flow can't guarantee the shape of props */)}
            />
        );
    }

    renderSectionHeader() {
        return <SessionsSectionHeader title="See a friend's schedule"/>;
    }

    renderRow(friend: Friend) {
        return (
            <FriendCell
                friend={friend}
                onPress={() => this.openFriendsSchedule(friend)}
            />
        );
    }

    renderEmptyList(): ?ReactElement {
        return (
            <EmptySchedule
                image={require('./img/no-friends-found.png')}
                text={'Friends using the F8 app\nwill appear here.'}>
                <InviteFriendsButton />
            </EmptySchedule>
        );
    }

    renderFooter() {
        return <InviteFriendsButton style={{margin: 20}}/>;
    }

    openFriendsSchedule(friend: Friend) {
        this.props.navigator.push({friend});
    }

    storeInnerRef(ref: ?PureListView) {
        this._innerRef = ref;
    }

    scrollTo(...args: Array<any>) {
        this._innerRef && this._innerRef.scrollTo(...args);
    }

    getScrollResponder(): any {
        return this._innerRef && this._innerRef.getScrollResponder();
    }
}

module.exports = FriendsListView;
