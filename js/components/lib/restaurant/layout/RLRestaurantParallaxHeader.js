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

const {NavBarHeight, TotalNavHeight} = Navigator.NavigationBar.Styles.General


const IEAStarIcon = require('../../../../common/IEAStarIcon').default

class RLRestaurantParallaxHeader extends Component {

    constructor(props, context) {
        super(props);
        this.state = this.initialState = {};
    }

    /**
     * className:'biz-rating biz-rating-large clearfix'
     * @returns {XML}
     */
    renderMiddle() {
        return (
            <View style={{
                height: 28,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <IEAStarIcon/>
                <Text style={{
                    marginLeft: 4,
                    fontSize: 12,
                    color: "#666"
                }}>{"30 reviews"}</Text>
            </View>
        )
    }

    renderBottom() {
        const {item} = this.props
        return (
            <Text>
                {item.address}
            </Text>
        )
    }

    render() {
        const {item} = this.props
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                width: width,
                // backgroundColor: 'red',
                paddingLeft: 10,
                paddingRight: 10,
                justifyContent: 'flex-end',
                paddingBottom: 80
            }}>
                <Text style={{
                    width: width,
                    height: 36,
                    fontSize: 24,
                    fontWeight: 'bold',
                    letterSpacing: -1,
                    color: '#333'
                }}>{item.displayName}</Text>
                {this.renderMiddle()}
                {this.renderBottom()}
            </View>
        )
    }


}


module.exports = RLRestaurantParallaxHeader

