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
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')
const {NavBarHeight, TotalNavHeight} = Navigator.NavigationBar.Styles.General;


const {
    MENU_ITEM_ADD_A_RESTAURANT,
    MENU_ITEM_SEARCH_RESTAURANTS,
    MENU_ITEM_MANAGE_FRIENDS,
    MENU_ITEM_READ_REVIEWS
} = require('../lib/constants').default

const RestaurantItem = require('./RestaurantItem')
const RestaurantHomeListItem = require('./RestaurantHomeListItem')

// debugger

let foodSections =
    {
        "categories": [
            {
                title: "Add a Restaurant",
                tag: MENU_ITEM_ADD_A_RESTAURANT,
                icon: "M17.22 22a1.78 1.78 0 0 1-1.74-2.167l1.298-4.98L14 13l1.756-9.657A1.635 1.635 0 0 1 19 3.635V20.22A1.78 1.78 0 0 1 17.22 22zm-7.138-9.156l.697 7.168a1.79 1.79 0 1 1-3.56 0l.7-7.178A3.985 3.985 0 0 1 5 9V3a1 1 0 0 1 2 0v5.5c0 .28.22.5.5.5s.5-.22.5-.5V3a1 1 0 0 1 2 0v5.5c0 .28.22.5.5.5s.5-.22.5-.5V3a1 1 0 0 1 2 0v5.83c0 1.85-1.2 3.518-2.918 4.014z"
            },
            {
                title: "Search Restaurants",
                tag: MENU_ITEM_SEARCH_RESTAURANTS,
                icon: "M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-5.634 7.723L12 18l-1.366-2.277a3.5 3.5 0 1 1 2.732 0zM12 11.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"
            },
            {
                title: "Manage Friends",
                tag: MENU_ITEM_MANAGE_FRIENDS,
                icon: ''
            },
            {
                title: "Read Reviews",
                tag: MENU_ITEM_READ_REVIEWS,
                icon: "M21 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6zm-5.88 10.428l-3.16-1.938-3.05 2.01.59-3.457L7 10.596l3.457-.505L11.96 6.5l1.582 3.59 3.458.506-2.5 2.447.62 3.385z"
            }
        ],
        'Hot New Businesses Nearby': [
            {name: "Lettuce", category: "Vegetable"},
            {name: "Lettuce", category: "Vegetable"},
            {name: "Lettuce", category: "Vegetable"},
            {name: "Potato", category: "Vegetable"}
        ]
    }


class NearRestaurantScene extends Component {

    constructor(props) {
        super(props);

        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(foodSections)
        }
    }

    renderRow = (item: Object,
                 sectionID: number | string,
                 rowID: number | string,
                 highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void) => {

        if (sectionID === 'categories') {
            return (<RestaurantHomeListItem item={item}/>)
        }
        return (<RestaurantItem item={item}/>)
    }

    renderSectionHeader(sectionData, sectionTitle) {
        if (sectionTitle === 'categories') {
            return (<View style={{height: 24}}/>)
        }
        return (
            <View style={{marginTop: 25, height: 36}}>
                <Text style={
                    {
                        height: 36,
                        fontWeight: "normal",
                        color: "#666",
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginBottom: 0,
                        fontSize: 21,
                    }
                }>{sectionTitle}</Text>
            </View>
        )
    }

    renderFooter() {
        return (
            <View></View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{backgroundColor: 'transparent', height: 44}}/>
                <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderFooter={this.renderFooter.bind(this)}
                        renderSectionHeader={this.renderSectionHeader}
                    />
                </View>
            </View>
        )
    }
}

module.exports = NearRestaurantScene
