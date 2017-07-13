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
const {width, height} = Dimensions.get('window')

const F8Colors = require('F8Colors')
const F8Button = require('F8Button')

import LinearGradient from 'react-native-linear-gradient'
const IEAStarIcon = require('../../../../common/IEAStarIcon').default

import Svg, {
    G,
    Path,
} from 'react-native-svg'

class RLEventListViewHeaderView extends Component {

    constructor(props, context) {
        super(props);
        this.state = this.initialState = {};
    }

    renderTopReviewAction() {
        const {item} = this.props
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
                <Text style={{
                    fontSize: 14,
                    marginTop: 8,
                    color: "#999",
                    height: 32
                }}>{item.address}</Text>

            </View>
        )
    }

    renderAddress() {
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>
                {this.renderTopReviewAction()}
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
                {this.renderAddress()}

            </View>
        )
    }

}


module.exports = RLEventListViewHeaderView

