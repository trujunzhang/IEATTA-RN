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

class RLParallaxHeader extends Component {

    constructor(props, context) {
        super(props);
        this.state = this.initialState = {};
    }

    render() {
        const {item} = this.props

        return (
            <Text style={styles.parallaxText}>
                {item.displayName}
            </Text>
        )
    }
}


const styles = StyleSheet.create({
    parallaxText: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        letterSpacing: -1,
    },
});

module.exports = RLParallaxHeader

