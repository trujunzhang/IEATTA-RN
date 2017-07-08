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
 * @providesModule F8MapView
 * @flow
 */
'use strict';

let ActionSheetIOS = require('ActionSheetIOS');
let F8Button = require('F8Button');
let PureListView = require('../../common/PureListView');
let Linking = require('Linking');
let Platform = require('Platform');
let ListContainer = require('ListContainer');
let MapView = require('../../common/MapView');
let React = require('React');
let StyleSheet = require('F8StyleSheet');
let View = require('View');
let {connect} = require('react-redux');

let VENUE_ADDRESS = '2 Marina Blvd, San Francisco, CA 94123';

class F8MapView extends React.Component {
    constructor() {
        super();

        (this: any).handleGetDirections = this.handleGetDirections.bind(this);
        (this: any).openMaps = this.openMaps.bind(this);
    }

    render() {
        const {map1, map2} = this.props;

        return (
            <View style={styles.container}>
                <ListContainer
                    title="Maps"
                    backgroundImage={require('./img/maps-background.png')}
                    backgroundColor={'#9176D2'}>
                    <PureListView
                        title="Overview"
                        renderEmptyList={() => <MapView map={map1}/>}
                    />
                    <PureListView
                        title="Developer Garage"
                        renderEmptyList={() => <MapView map={map2}/>}
                    />
                </ListContainer>
                <F8Button
                    type="secondary"
                    icon={require('./img/directions.png')}
                    caption="Directions to Fort Mason Center"
                    onPress={this.handleGetDirections}
                    style={styles.directionsButton}
                />
            </View>
        );
    }

    handleGetDirections() {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    title: VENUE_ADDRESS,
                    options: ['Open in Apple Maps', 'Open in Google Maps', 'Cancel'],
                    destructiveButtonIndex: -1,
                    cancelButtonIndex: 2,
                },
                this.openMaps
            );
        } else if (Platform.OS === 'android') {
            let address = encodeURIComponent(VENUE_ADDRESS);
            Linking.openURL('http://maps.google.com/maps?&q=' + address);
        }
    }

    openMaps(option) {
        let address = encodeURIComponent(VENUE_ADDRESS);
        switch (option) {
            case 0:
                Linking.openURL('http://maps.apple.com/?q=' + address);
                break;

            case 1:
                let nativeGoogleUrl = 'comgooglemaps-x-callback://?q=' +
                    address + '&x-success=f8://&x-source=F8';
                Linking.canOpenURL(nativeGoogleUrl).then((supported) => {
                    let url = supported ? nativeGoogleUrl : 'http://maps.google.com/?q=' + address;
                    Linking.openURL(url);
                });
                break;
        }
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    directionsButton: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        ios: {
            bottom: 49,
        },
        android: {
            bottom: 0,
        },
    },
});

function select(store) {
    return {
        map1: store.maps.find((map) => map.name === 'Overview'),
        map2: store.maps.find((map) => map.name === 'Developer Garage'),
    };
}

module.exports = connect(select)(F8MapView);
