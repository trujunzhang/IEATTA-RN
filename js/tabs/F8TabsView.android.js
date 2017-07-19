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
 * @providesModule F8TabsView
 */

'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    StyleSheet,
    StatusBar,
    Navigator,
    Dimensions
} from 'react-native'


const F8Colors = require('F8Colors')
const F8DrawerLayout = require('F8DrawerLayout')
const {Text} = require('F8Text')
const MenuItem = require('./MenuItem')

const LoginButton = require('../components/lib/login/LoginButton')
const ProfilePicture = require('../common/ProfilePicture')
const GeneralScheduleView = require('./schedule/GeneralScheduleView')

const {switchTab, logOutWithPrompt} = require('../actions')

const IEANearRestaurantScene = require('./home/IEANearRestaurantScene')
const IEADetailedRestaurant = require('./restaurant/IEADetailedRestaurant')
const IEADetailedEvent = require('./event/IEADetailedEvent')


import type {Tab} from '../reducers/navigation'

class F8TabsView extends React.Component {
    props: {
        tab: Tab;
        onTabSelect: (tab: Tab) => void;
        navigator: Navigator;
    };

    constructor(props) {
        super(props);

        this.renderNavigationView = this.renderNavigationView.bind(this);
        this.openProfileSettings = this.openProfileSettings.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
    }

    getChildContext() {
        return {
            openDrawer: this.openDrawer
        };
    }

    openDrawer() {
        this.refs.drawer.openDrawer();
    }

    onTabSelect(tab: Tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
        this.refs.drawer.closeDrawer();
    }

    openProfileSettings() {
        this.refs.drawer.closeDrawer();
        this.props.navigator.push({shareSettings: true});
    }

    renderNavigationView() {
        let scheduleIcon = this.props.day === 1
            ? require('./schedule/images/schedule-icon-1.png')
            : require('./schedule/images/schedule-icon-2.png');
        let scheduleIconSelected = this.props.day === 1
            ? require('./schedule/images/schedule-icon-1-active.png')
            : require('./schedule/images/schedule-icon-2-active.png');
        let accountItem, myF8Item, loginItem;

        if (this.props.user.isLoggedIn) {
            let name = this.props.user.name || '';
            accountItem = (
                <View>
                    <TouchableOpacity onPress={this.openProfileSettings}>
                        <ProfilePicture userID={this.props.user.id} size={80}/>
                    </TouchableOpacity>
                    <Text style={styles.name}>
                        {name.toUpperCase()}
                    </Text>
                </View>
            );
            myF8Item = (
                <MenuItem
                    title="My F8"
                    selected={this.props.tab === 'main'}
                    onPress={this.onTabSelect.bind(this, 'main')}
                    icon={require('./schedule/images/my-schedule-icon.png')}
                    selectedIcon={require('./schedule/images/my-schedule-icon-active.png')}
                />
            );
        } else {
            accountItem = (
                <View>
                    <Image source={require('./img/logo.png')}/>
                    <Text style={styles.name}>
                        APRIL 12 + 13 / SAN FRANCISCO
                    </Text>
                </View>
            );
            loginItem = (
                <View style={styles.loginPrompt}>
                    <Text style={styles.loginText}>
                        Log in to find your friends at F8.
                    </Text>
                    <LoginButton source="Drawer"/>
                </View>
            );
        }
        return (
            <View style={styles.drawer}>
                <Image
                    style={styles.header}
                    source={require('./img/drawer-header.png')}>
                    {accountItem}
                </Image>
                <MenuItem
                    title="Restaurants"
                    selected={this.props.tab === 'main'}
                    onPress={this.onTabSelect.bind(this, 'main')}
                    icon={scheduleIcon}
                    selectedIcon={scheduleIconSelected}
                />
                {myF8Item}
                <MenuItem
                    title="Info"
                    selected={this.props.tab === 'info'}
                    onPress={this.onTabSelect.bind(this, 'info')}
                />
                {loginItem}
            </View>
        );
    }

    renderContent() {
        switch (this.props.tab) {
            case 'main':
                return (
                    <IEANearRestaurantScene
                        navigator={this.props.navigator}
                    />
                )

            case 'info':
                return <IEADetailedEvent navigator={this.props.navigator}/>
        }
        throw new Error(`Unknown tab ${this.props.tab}`);
    }

    render() {
        return (
            <F8DrawerLayout
                ref="drawer"
                drawerWidth={290}
                drawerPosition="left"
                renderNavigationView={this.renderNavigationView}>
                <View style={styles.content} key={this.props.tab}>
                    {this.renderContent()}
                </View>
            </F8DrawerLayout>
        );
    }
}

F8TabsView.childContextTypes = {
    openDrawer: React.PropTypes.func
}

const {connect} = require('react-redux')

function select(store) {
    return {
        tab: store.navigation.tab,
        day: store.navigation.day,
        user: store.user,
    }
}

function actions(dispatch) {
    return {
        onTabSelect: (tab) => dispatch(switchTab(tab)),
        logOut: () => dispatch(logOutWithPrompt()),
    };
}

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
    },
    header: {
        padding: 20,
        justifyContent: 'flex-end',
    },
    name: {
        marginTop: 10,
        color: 'white',
        fontSize: 12,
    },
    loginPrompt: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    loginText: {
        fontSize: 12,
        color: F8Colors.lightText,
        textAlign: 'center',
        marginBottom: 10,
    },
});

module.exports = connect(select, actions)(F8TabsView)
