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

    renderAddress() {
        const {item} = this.props,
            address = item.address || '',
            rows = address.split(',')

        return (
            <View style={[{
                flexDirection: 'row',
                // backgroundColor: 'red'
            }, {
                paddingTop: 15,
                paddingBottom: 18,
                marginLeft: 8,
            }, {
                borderBottomWidth: 1,
                borderBottomColor: "#ccc"
            }]}>
                <Svg width="24" height="24">
                    <Path fill="#666"
                          d="M12 2C8.13 2 5 5.13 5 9c0 2.61 1.43 4.88 3.54 6.08L12 22l3.46-6.92A6.987 6.987 0 0 0 19 9c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </Svg>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginLeft: 8
                }}>
                    {rows.map((item, index) => {
                        return <Text
                            key={index}
                            style={{
                                fontSize: 14,
                                color: "black"
                            }}>{item}</Text>
                    })}
                </View>

            </View>
        )
    }


    /**
     * layout:
     *    @div: className="clearfix layout-block layout-a event-details_cards-container top-shelf_overlap column--responsive"
     *       @@div: className="event-details_info-card card card--horizontal"
     * @returns {XML}
     */
    render() {
        return (
            <View style={[{
                flex: 1,
                width: width
            }, {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }, {
                backgroundColor: F8Colors.controllerViewColor
            }]}>
                <View style={[ // className="event-details_info-card card card--horizontal"
                    {
                        width: width - 30,
                        backgroundColor: 'white',
                    }, {
                        borderRadius: 4,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#e6e6e6"
                    }, {
                        flexDirection: 'column',
                        alignItems: 'center'
                    }
                ]}>
                    {this.renderAddress()}
                </View>

            </View>
        )
    }

}


module.exports = RLEventListViewHeaderView

