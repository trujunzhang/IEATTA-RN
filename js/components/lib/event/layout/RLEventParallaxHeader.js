/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Text,
    Platform,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')

const IEAStarIcon = require('../../../../common/IEAStarIcon').default

class RLEventParallaxHeader extends Component {

    constructor(props, context) {
        super(props);
        this.state = this.initialState = {};
    }

    /**
     * className:'biz-rating biz-rating-large clearfix'
     * @returns {XML}
     */
    renderLeft() {
        return (
            <Image style={{
                width: 60,
                height: 60,
                borderRadius: 4,
                marginRight: 16,
            }}
                   source={{url: 'https://s3-media4.fl.yelpcdn.com/bphoto/oBdw4OSzt2CpuOnpOGw4Ow/60s.jpg'}}/>
        )
    }

    renderRight() {
        const {item} = this.props
        // const item = {
        //     displayName: "UYE: Boba Princess' VIP Affair @ Tea Lyfe",
        //     address: "Carl's Jr"
        // }
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 24,
                    fontWeight: 'bold'
                }}>
                    {item.displayName}
                </Text>
                <Text style={{
                    marginTop: 8,
                    color: '#0073bb',
                    height: 24,
                    fontSize: 14
                }}>
                    {item.restaurantName}
                </Text>
            </View>
        )
    }

    /**
     * className="event-details_header ysection"
     * @returns {XML}
     */
    render() {
        return (
            <View style={[// className="arrange arrange--12"
                {
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    // backgroundColor: 'red',
                }, {
                    width: width,
                    paddingLeft: 12,
                    paddingRight: 12,
                    // paddingBottom: 80
                }
            ]}>
                <View style={{height: 100, flexDirection: 'row'}}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </View>
            </View>
        )
    }
}


module.exports = RLEventParallaxHeader

