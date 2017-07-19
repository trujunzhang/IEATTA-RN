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
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TabBarIOS
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

const F8Colors = require('F8Colors')

const IEANearRestaurantScene = require('./home/IEANearRestaurantScene')
const IEADetailedRestaurant = require('./restaurant/IEADetailedRestaurant')
const IEADetailedEvent = require('./event/IEADetailedEvent')

const {switchTab} = require('../actions')

import type {Tab} from '../reducers/navigation'


class F8TabsView extends React.Component {
    props: {
        tab: Tab;
        onTabSelect: (tab: Tab) => void;
        navigator: Navigator;
    };

    onTabSelect(tab: Tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
    }

    render() {
        return (
            <TabBarIOS tintColor={F8Colors.darkText}>
                <Icon.TabBarItem
                    title="Schedule"
                    iconName="ios-home-outline"
                    selected={this.props.tab === 'main'}
                    onPress={this.onTabSelect.bind(this, 'main')}
                    selectedIconName="ios-home">
                    <IEANearRestaurantScene
                        navigator={this.props.navigator}
                    />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Home"
                    iconName="ios-home-outline"
                    selected={this.props.tab === 'info'}
                    onPress={this.onTabSelect.bind(this, 'info')}
                    selectedIconName="ios-home">
                    <IEADetailedEvent
                        navigator={this.props.navigator}
                    />
                </Icon.TabBarItem>
            </TabBarIOS>
        )
    }

}

const {connect} = require('react-redux')

function select(store) {
    return {
        tab: store.navigation.tab,
        day: store.navigation.day,
    }
}

function actions(dispatch) {
    return {
        onTabSelect: (tab) => dispatch(switchTab(tab)),
    }
}

module.exports = connect(select, actions)(F8TabsView)
