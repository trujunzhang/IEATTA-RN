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

const IEAStarIcon = require('../../../../common/IEAStarIcon').default

class RLListViewHeaderView extends Component {

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

    renderButtonsAction() {
        return (
            <View style={{
                height: 300
            }}>

            </View>
        )
    }


    renderAction() {
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {this.renderTopReviewAction()}
                {this.renderButtonsAction()}
            </View>
        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                borderTopWidth: 1,
                borderTopColor: "#ccc",
                height: 300,
                backgroundColor: 'white'
            }}>
                {this.renderAction()}
            </View>
        )
    }

}


module.exports = RLListViewHeaderView

