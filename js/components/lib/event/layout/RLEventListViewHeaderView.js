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
                                color: F8Colors.appTextColor
                            }}>{item}</Text>
                    })}
                </View>

            </View>
        )
    }

    renderFrom() {
        return (
            <View style={[{
                flexDirection: 'row',
                alignItems: 'center'
            }]}>
                <Text style={[{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "black"
                }, {
                    marginRight: 6
                }]}>{"From:"}</Text>
                <Text style={{
                    fontSize: 14,
                    color: F8Colors.appTextColor
                }}>{"Monday, May 18, 7:00 pm"}</Text>
            </View>
        )
    }

    renderEnd() {
        return (
            <View style={[{
                flexDirection: 'row',
                alignItems: 'center'
            }]}>
                <Text style={[{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "black"
                }, {
                    marginRight: 6
                }]}>{"To:"}</Text>
                <Text style={{
                    fontSize: 14,
                    color: F8Colors.appTextColor
                }}>{"Monday, May 18, 7:00 pm"}</Text>
            </View>
        )
    }

    renderEventDate() {
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
                          d="M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-6 5h4v4h-4v-4z"/>
                </Svg>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginLeft: 8
                }}>
                    {this.renderFrom()}
                    {this.renderEnd()}
                </View>

            </View>
        )
    }


    renderWhat() {
        const {item} = this.props,
            address = item.address || '',
            rows = address.split(',')

        return (
            <View style={[{
                flexDirection: 'column',
                // backgroundColor: 'red'
            }, {
                paddingTop: 15,
                paddingBottom: 18,
                marginLeft: 8,
            }]}>
                <Text style={[
                    {
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: "#d32323"
                    }
                ]}>{'What/Why:'}</Text>
                <Text style={[
                    {
                        fontSize: 14,
                        color: F8Colors.appTextColor
                    }, {
                        marginTop: 4,
                        marginBottom: 4,
                    }
                ]}>{'If you DID NOT receive a Confirmation message from Donna T, we apologize for not being able to accommodate your RSVP. Hope you can come to the next future local gig. Thanks for all your excitement and support!'}</Text>

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
                width: width,
                paddingBottom: 15
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
                        borderColor: "#e6e6e6"
                    }, {
                        flexDirection: 'column',
                    }
                ]}>
                    {this.renderAddress()}
                    {this.renderEventDate()}
                    {this.renderWhat()}
                </View>

            </View>
        )
    }

}


module.exports = RLEventListViewHeaderView

