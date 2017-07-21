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
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'

const ListContainer = require('../../common/ListContainer')

const F8DrawerLayout = require('F8DrawerLayout')
const FilterScreen = require('../../filter/FilterScreen')

const RLRestaurantParallaxHeader = require('./layout/RLRestaurantParallaxHeader')

const EventsListView = require('./layout/EventsListView')

const {getLocalImagePath} = require('../../parse/fsApi')
const {Event} = require('../../parse/parseModels')

const {queryEventsForRestaurant} = require('../../actions')

/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../../lib/constants').default

// TODO: Move from reselect to memoize?
const {createSelector} = require('reselect')


const {
    MENU_ITEM_ADD_A_RESTAURANT,
    MENU_ITEM_SEARCH_RESTAURANTS,
    MENU_ITEM_MANAGE_FRIENDS,
    MENU_ITEM_READ_REVIEWS,
    MENU_SECTIONS_MORE,
    MENU_SECTIONS_EVENTS,
} = require('../../lib/constants').default

const data = createSelector(
    (store) => store.events,
);

type Props = {
    filter: any;
    events: Array<Event>;
    navigator: Navigator;
    logOut: () => void;
};

class IEADetailedRestaurant extends React.Component {
    props: Props;
    _drawer: ?F8DrawerLayout;

    constructor(props) {
        super(props);

        (this: any).openFilterScreen = this.openFilterScreen.bind(this);
        (this: any).renderNavigationView = this.renderNavigationView.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            sections: {
                MENU_SECTIONS_MORE: TOP_MENUS,
                MENU_SECTIONS_EVENTS: nextProps.appModel.restaurants
            }
        })
    }

    componentDidMount() {
        this.props.dispatch(queryEventsForRestaurant(this.props.item.objectId))
    }

    render() {
        const {item} = this.props,
            {localPhotoStatus} = item
        const localImagePath = getLocalImagePath(item.listPhotoId, PARSE_THUMBNAIL_IMAGES)

        const events = []

        const leftItem = {
            icon: require('../../common/img/back_white.png'),
            onPress: () => {
                this.props.navigator.pop()
            }
        }

        const content = (
            <ListContainer
                item={item}
                title={item.displayName}
                backgroundImage={{isLocal: true, path: localImagePath, width: 348}}
                renderParallaxHeader={(e) => {
                    return (<RLRestaurantParallaxHeader item={item}/>)
                }}
                leftItem={leftItem}
                backgroundColor="#5597B8"
                selectedSectionColor="#51CDDA">
                <EventsListView
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
        );
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
        appModel: store.appModel
    };
}

module.exports = connect(select)(IEADetailedRestaurant);
