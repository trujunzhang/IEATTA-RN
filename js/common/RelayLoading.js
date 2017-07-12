'use strict';


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
    Platform,
    Dimensions
} from 'react-native'

const Relay = require('react-relay')
const RelayRenderer = require('react-relay/lib/RelayRenderer.js')

const RLParallaxHeader = require('./layout/RLParallaxHeader')

class MainRoute extends Relay.Route {
}
MainRoute.queries = {viewer: () => Relay.QL`query { viewer }`};
MainRoute.routeName = 'MainRoute';


class RelayLoading extends React.Component {
    render() {
        const child = React.Children.only(this.props.children);
        if (!child.type.getFragmentNames) {
            return child;
        }
        return (
            <RelayRenderer
                Container={child.type}
                queryConfig={new MainRoute()}
                environment={Relay.Store}
                render={({props}) => this.renderChild(child, props)}
            />
        );
    }

    renderChild(child, props) {
        if (!props) {
            return (
                <View style={{height: 400}}>
                    {child.props.renderHeader && child.props.renderHeader()}
                    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator />
                    </View>
                </View>
            );
        }
        return React.cloneElement(child, {...this.props, ...props});
    }
}