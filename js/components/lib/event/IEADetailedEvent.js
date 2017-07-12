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
    ListView,
    Navigator,
    StatusBar,
    Platform,
    Dimensions
} from 'react-native'

const ListContainer = require('../../../common/ListContainer')

const EmptySchedule = require('../../../tabs/schedule/EmptySchedule')
const FilterHeader = require('../../../tabs/schedule/FilterHeader')
const FilterSessions = require('../../../tabs/schedule/filterSessions')
const F8DrawerLayout = require('F8DrawerLayout')
const FilterScreen = require('../../../filter/FilterScreen')

const RLEventParallaxHeader = require('./layout/RLEventParallaxHeader')

const PeopleInEventListView = require('./layout/PeopleInEventListView')

import type {Session} from '../../../reducers/sessions'

// TODO: Move from reselect to memoize?
const {createSelector} = require('reselect')

const data = createSelector(
    (store) => store.sessions,
    (store) => store.filter,
    (sessions, filter) => FilterSessions.byTopics(sessions, filter),
);

type Props = {
    filter: any;
    day: number;
    sessions: Array<Session>;
    navigator: Navigator;
    logOut: () => void;
};

class IEADetailedEvent extends React.Component {
    props: Props;
    _drawer: ?F8DrawerLayout;

    constructor(props) {
        super(props);

        (this: any).openFilterScreen = this.openFilterScreen.bind(this);
        (this: any).renderNavigationView = this.renderNavigationView.bind(this);
    }

    render() {
        const filterItem = {
            title: 'Filter',
            onPress: this.openFilterScreen,
        };

        const filterHeader = Object.keys(this.props.filter).length > 0
            ? <FilterHeader />
            : null;

        // let sessions = this.props.sessions;
        let sessions = [{
            title: "wanghao"
        }];

        const item = {
            displayName: 'Jiangnan Cuisine',
            address: '3420 Balboa St, San Francisco'
        }
        const events = []

        const content = (
                <ListContainer
                item={item}
                title={item.displayName}
                backgroundImage={require('../../../tabs/schedule/img/schedule-background.png')}
                backgroundColor="#5597B8"
                selectedSectionColor="#51CDDA"
                renderParallaxHeader={(e) => {
                    return (<RLEventParallaxHeader item={item}/>)
                }}
                stickyHeader={filterHeader}
                rightItem={filterItem}>
                <PeopleInEventListView
                    events={events}
                    navigator={this.props.navigator}
                />
            </ListContainer>
        );

        if (Platform.OS === 'ios') {
            return content;
        }
        return (
            <F8DrawerLayout
                ref={(drawer) => {
                    this._drawer = drawer;
                }}
                drawerWidth={300}
                drawerPosition="right"
                renderNavigationView={this.renderNavigationView}>
                {content}
            </F8DrawerLayout>
        )
    }

    renderNavigationView() {
        return <FilterScreen onClose={() => this._drawer && this._drawer.closeDrawer()}/>;
    }


    openFilterScreen() {
        if (Platform.OS === 'ios') {
            this.props.navigator.push({filter: 123});
        } else {
            this._drawer && this._drawer.openDrawer();
        }
    }
}

const {connect} = require('react-redux')

function select(store) {
    return {
        day: store.navigation.day,
        filter: store.filter,
        sessions: data(store),
    };
}

module.exports = connect(select)(IEADetailedEvent);
