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
 * @providesModule EventCell
 * @flow
 */

'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'

let F8Colors = require('F8Colors');
let {Text} = require('F8Text');
let F8Touchable = require('F8Touchable');

import type {Session} from '../../../reducers/sessions';

class EventCell extends React.Component {
    props: {
        session: Session;
        showTick: boolean;
        showStartEndTime: boolean;
        onPress: ?() => void;
        style: any;
    };

    render() {
        let session = this.props.session;
        let tick;
        if (this.props.showTick) {
            tick =
                <Image style={styles.added} source={require('../../images/added-cell.png')}/>;
        }
        let time = "31/05/2017";
        // if (this.props.showStartEndTime) {
        //     time = formatTime(session.startTime) + ' - ' + formatTime(session.endTime);
        // } else {
        //     time = formatDuration(session.startTime, session.endTime);
        // }
        let location = "location";//session.location && session.location.toUpperCase();
        let locationColor = '#f00';//F8Colors.colorForLocation(location);
        let cell =
            <View style={[styles.cell, this.props.style]}>
                <View style={styles.titleSection}>
                    <Text numberOfLines={2} style={styles.titleText}>
                        {session.title}
                    </Text>
                </View>
                <Text numberOfLines={1} style={styles.duration}>
                    <Text style={[styles.locationText, {color: locationColor}]}>
                        {location}
                    </Text>
                    {location && ' - '}
                    {time}
                </Text>
                {tick}
            </View>;

        if (this.props.onPress) {
            cell =
                <F8Touchable onPress={this.props.onPress}>
                    {cell}
                </F8Touchable>;
        }

        return cell;
    }
}


const styles = StyleSheet.create({
    cell: {
        paddingVertical: 15,
        paddingLeft: 17,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    titleSection: {
        paddingRight: 9,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleAndDuration: {
        justifyContent: 'center',
    },
    titleText: {
        flex: 1,
        fontSize: 17,
        lineHeight: 24,
        color: F8Colors.darkText,
        marginBottom: 4,
        marginRight: 10,
    },
    duration: {
        fontSize: 12,
        color: F8Colors.lightText,
    },
    locationText: {
        fontSize: 12,
    },
    added: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
        top: 0,
    },
});


let {connect} = require('react-redux');


function select(store, props) {
    return {
        showTick: true,
    };
}

module.exports = connect(select)(EventCell);
