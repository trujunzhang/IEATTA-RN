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
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    StatusBar,
    Platform,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')

const Animated = require('Animated')
const F8Colors = require('F8Colors')
const {Text} = require('F8Text')

const F8Button = require('F8Button')
const LoginButton = require('./LoginButton')

const {skipLogin} = require('../../../actions')
const {connect} = require('react-redux')

class LoginScreen extends React.Component {
    state = {
        anim: new Animated.Value(0),
    };

    componentDidMount() {
        Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
    }

    render() {
        return (
            <Image
                style={styles.container}
                source={require('./img/login-background.png')}>
                <StatusBar barStyle="default"/>
                <TouchableOpacity
                    accessibilityLabel="Skip login"
                    accessibilityTraits="button"
                    style={styles.skip}
                    onPress={() => this.props.dispatch(skipLogin())}>
                    <Animated.Image
                        style={this.fadeIn(2800)}
                        source={require('./img/x.png')}
                    />
                </TouchableOpacity>
                <View style={styles.section}>
                    <Animated.Image
                        style={[this.fadeIn(0), {borderRadius: 40}]}
                        source={require('./img/devconf-logo.png')}
                    />
                </View>
                <View style={styles.section}>
                    <Animated.Text style={[styles.h1, this.fadeIn(700, -20)]}>
                        {'Eating Restaurant'}
                    </Animated.Text>
                    <Animated.Text style={[styles.h1, {marginTop: -4}, this.fadeIn(700, 20)]}>
                        {'Tracker'}
                    </Animated.Text>
                    {/*<Animated.Text style={[styles.h2, this.fadeIn(1000, 10)]}>*/}
                    {/*April 12 + 13 / Fort Mason Center*/}
                    {/*</Animated.Text>*/}
                    <Animated.Text style={[styles.h3, this.fadeIn(1200, 10)]}>
                        {'VirtualBreak,LLC'}
                    </Animated.Text>
                </View>

                {this.renderContent()}

            </Image>
        )
    }

    logInViaEmail() {
    }

    renderContent() {
        return (
            <Animated.View style={[styles.section, styles.last, this.fadeIn(2500, 20)]}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <F8Button
                        contentStyle={{
                            flex: 2,
                            marginRight: 8
                        }}
                        backgroundColor="#ccc"
                        caption="Log In"
                        source="Modal"
                    />
                    <F8Button
                        contentStyle={{
                            flex: 2,
                            marginLeft: 8
                        }}
                        caption="Sign Up"
                        source="Modal"
                    />
                </View>
                <F8Button
                    type="secondary"
                    caption="Not Now"
                    source="Modal"
                />
                <Text style={styles.loginComment}>
                    Use Facebook to find your friends.
                </Text>
                <LoginButton source="First screen"/>
            </Animated.View>
        )
    }

    fadeIn(delay, from = 0) {
        const {anim} = this.state;
        return {
            opacity: anim.interpolate({
                inputRange: [delay, Math.min(delay + 500, 3000)],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            }),
            transform: [{
                translateY: anim.interpolate({
                    inputRange: [delay, Math.min(delay + 500, 3000)],
                    outputRange: [from, 0],
                    extrapolate: 'clamp',
                }),
            }],
        };
    }
}

const scale = Dimensions.get('window').width / 375;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 26,
        // Image's source contains explicit size, but we want
        // it to prefer flex: 1
        width: undefined,
        height: undefined,
    },
    section: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    last: {
        justifyContent: 'flex-end',
    },
    h1: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: Math.round(40 * scale),
        color: F8Colors.darkText,
        backgroundColor: 'transparent'
    },
    h2: {
        textAlign: 'center',
        fontSize: 17,
        color: F8Colors.darkText,
        marginVertical: 20,
    },
    h3: {
        fontSize: 12,
        textAlign: 'center',
        color: F8Colors.lightText,
        letterSpacing: 1,
    },
    loginComment: {
        marginBottom: 14,
        fontSize: 12,
        color: F8Colors.darkText,
        textAlign: 'center',
    },
    skip: {
        position: 'absolute',
        right: 0,
        top: 20,
        padding: 15,
    },
});

module.exports = connect()(LoginScreen);