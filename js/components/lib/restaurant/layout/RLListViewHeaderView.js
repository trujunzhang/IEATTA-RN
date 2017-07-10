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
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <IEAStarIcon width={132} height={24}/>
                <Text style={{
                    marginLeft: 4,
                    fontSize: 12,
                    marginTop: 8,
                    color: "#999",
                    height: 32
                }}>{" Tap a star to start your review... "}</Text>

            </View>
        )
    }

    renderButtonsAction() {
        return (
            <View>

            </View>
        )
    }


    renderAction() {
        return (
            <View>
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
                height: 90,
                backgroundColor: 'white'
            }}>
                {this.renderAction()}
            </View>
        )
    }

}


module.exports = RLListViewHeaderView

