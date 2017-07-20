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
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')
const RestaurantRowHeight = 84
const RestaurantAvatorWidth = 80

const {getLocalImageUri} = require('../../parse/fsApi')

const IEAStarIcon = require('../../common/IEAStarIcon').default

/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../../lib/constants').default

class RestaurantItem extends Component {

    constructor(props) {
        super(props);

    }

    renderLeft() {
        const {item} = this.props
        const imageSource = getLocalImageUri(item.listPhotoId, PARSE_THUMBNAIL_IMAGES)
        return (
            <View style={{
                marginRight: 10,
                width: 60,
                height: 60
            }}>
                <Image style={{
                    flex: 1,
                    borderRadius: 4
                }}
                       source={{url: 'https://s3-media4.fl.yelpcdn.com/bphoto/oBdw4OSzt2CpuOnpOGw4Ow/60s.jpg'}}/>
            </View>
        )
    }

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

    renderRight() {
        const {item} = this.props
        // debugger
        // const itemx = {
        //     displayName: 'Jiangnan Cuisine',
        //     address: '3420 Balboa St, San Francisco'
        // }
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                // backgroundColor: 'blue'
            }}>
                <Text style={{
                    height: 17,
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#333"
                }}>{item.displayName}</Text>
                {this.renderMiddle()}
                <Text style={{
                    height: 17,
                    fontSize: 14,
                    color: "#333"
                }}>{item.address}</Text>
            </View>
        )
    }

    render() {
        const {item} = this.props
        return (
            <View
                key={item.id}
                style={{
                    paddingLeft: 10,
                    marginRight: 10,
                    backgroundColor: "white",
                    width: width,
                    height: RestaurantRowHeight,
                }}>
                <View style={{// .action-list .action
                    flex: 1,
                    marginLeft: -10,
                    marginRight: -10,
                    padding: 10,
                    flexDirection: 'row',
                }}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </View>
            </View>
        )
    }

}

module.exports = RestaurantItem
