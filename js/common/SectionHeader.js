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
    View,
    Image,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native'


const {
    MENU_SECTIONS_MORE,
    MENU_SECTIONS_RESTAURANTS,
    MENU_SECTIONS_EVENTS,
} = require('../lib/constants').default


const SECTION_TITLES = {
    MENU_SECTIONS_MORE: 'More',
    MENU_SECTIONS_RESTAURANTS: 'Restaurants Nearby',
    MENU_SECTIONS_EVENTS: 'Events'
}

class SectionHeader extends React.Component {

    render() {
        return (
            <View
                style={{
                    marginTop: 14,
                    marginBottom: 4,
                    height: 36,
                    // backgroundColor: 'yellow'
                }}>
                <Text style={[
                    {
                        height: 36,
                        fontWeight: "normal",
                        color: "#666",
                        fontSize: 20
                    }, {
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 10,
                        paddingRight: 10
                    }, {
                        marginBottom: 0
                    }
                ]
                }>{SECTION_TITLES[this.props.sectionType]}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30,
        paddingTop: 75,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        marginBottom: 10,
    },
    text: {
        textAlign: 'center',
        marginBottom: 35,
    },
});

module.exports = SectionHeader
