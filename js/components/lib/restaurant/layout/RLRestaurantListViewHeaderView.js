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
    ListView,
    Navigator,
    StatusBar,
    Text,
    Platform,
    Dimensions
} from 'react-native'
const {NavBarHeight, TotalNavHeight} = Navigator.NavigationBar.Styles.General
const {width, height} = Dimensions.get('window')

const F8Colors = require('F8Colors')
const F8Button = require('F8Button')

import LinearGradient from 'react-native-linear-gradient'
const IEAStarIcon = require('../../../../common/IEAStarIcon').default
const RestaurantPhotoHorizonView = require('./RestaurantPhotoHorizonView')

import Svg, {
    G,
    Path,
} from 'react-native-svg'

class RLRestaurantListViewHeaderView extends Component {

    constructor(props, context) {
        super(props);
        this.state = this.initialState = {};
    }

    renderTopReviewAction() {
        const reviewPanelWidth = width * 0.9
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: reviewPanelWidth,
                height: 90,
                paddingTop: 15,
                paddingBottom: 18,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                // backgroundColor: 'red'
            }}>
                <IEAStarIcon width={132} height={24}/>
                <Text style={{
                    fontSize: 14,
                    marginTop: 8,
                    color: "#999",
                    height: 32
                }}>{" Tap a star to start your review... "}</Text>

            </View>
        )
    }

    /**
     * className="action-bar clearfix three-up"
     *
     * .action-bar {
     *   display: table;
     *   width: 100%;
     *   padding: 10px 0;
     *   border: 1px solid #ccc;
     *   border-width: 1px 0;
     *   background-color: #fafaf8;
     *   background: -webkit-linear-gradient(#fff, #fafaf8);
     *   background: linear-gradient(#fff, #fafaf8);
     *   font-size: 16px;
     *   line-height: 1.3125em;
     * }
     *
     * @returns {XML}
     */
    renderButtonsAction() {
        const threeButtons = [
            {
                title: 'Share',
                icon: "M23.5 9L18 14.5v-3.93c-3 0-6.466 1.18-8.894 3.152C10.394 10.052 14 7.43 18 7.43V3.5L23.5 9zM5 6v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-2l2-2v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h10v2H6c-.55 0-1 .45-1 1z",
                style: {borderRightWidth: 1, borderRightColor: "#ccc"}
            },
            {
                title: 'Add Photo',
                icon: "M19 20H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h2.184A2.99 2.99 0 0 1 10 4h4a2.99 2.99 0 0 1 2.816 2H19a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3zM12.005 8.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM13 14v1a1 1 0 0 1-2 0v-1h-1a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2h-1z",
                style: {borderRightWidth: 1, borderRightColor: "#ccc"}
            },
            {
                title: 'Bookmark',
                icon: "M16 2H8a3 3 0 0 0-3 3v17l7-5 7 5V5a3 3 0 0 0-3-3zm-1.817 10.45l-2.21-1.357L9.837 12.5l.413-2.42L8.5 8.367l2.42-.353L11.973 5.5l1.107 2.514 2.42.353-1.75 1.713.433 2.37z"
            }
        ]
        return (
            <LinearGradient
                colors={['#fff', '#fafaf8']}
                style={{
                    width: width,
                    height: 64,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                {this.renderButtonItem(threeButtons[0])}
                {this.renderButtonItem(threeButtons[1])}
                {this.renderButtonItem(threeButtons[2])}

            </LinearGradient>
        )
    }

    renderButtonItem(item) {
        return (
            <View style={{
                ...item.style,
                flex: 3,
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Svg width="24" height="24">
                    <Path fill="#666" d={item.icon}/>
                </Svg>
                <Text style={{
                    fontSize: 12,
                    color: '#666',
                    backgroundColor: 'transparent'
                }}>{item.title}</Text>
            </View>
        )
    }


    renderActions() {
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>
                {this.renderTopReviewAction()}
                {this.renderButtonsAction()}
            </View>
        )
    }

    renderSeeAllPhotosButton() {
        return (
            <F8Button
                type="photos"
                style={{
                    marginTop: 10,
                    height: 43,
                    backgroundColor: '#41c532'
                }}
                caption="See all photos"
                captionStyle={{
                    color: '#FFF',
                    fontSize: 12,
                    fontWeight: 'bold'
                }}
                onPress={() => {

                }}
            />
        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                borderTopWidth: 1,
                borderTopColor: "#ccc",
                backgroundColor: F8Colors.controllerViewColor
            }}>
                {this.renderActions()}

                <View style={[{ // className="island island--light"
                    width: width,
                    height: 175,
                    flexDirection: 'column',
                    backgroundColor: 'white'
                }, {// Padding and Margin
                    marginTop: 30,
                    marginBottom: 30,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingBottom: 10
                }, {// shadow
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#ccc"
                }]}>
                    <RestaurantPhotoHorizonView/>
                    {this.renderSeeAllPhotosButton()}
                </View>
            </View>
        )
    }

}


module.exports = RLRestaurantListViewHeaderView

