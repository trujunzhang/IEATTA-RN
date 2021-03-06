/**
 * # Login.js
 *
 *  The container to display the Login form
 *
 */
'use strict'
/**
 * ## Imports
 *
 * Redux
 */
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


/**
 *   LoginRender
 */
import LoginRender from './LoginRender'

/**
 * The necessary React components
 */
import React from 'react'

/**
 * ### Translations
 */
let I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

const {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
} = require('../lib/constants').default


const {signUpWithPassword} = require('../actions');

class AppRegistry extends React.Component {
    async onButtonPress() {
        const {dispatch} = this.props;

        let username = this.props.auth.form.fields.username;
        let email = this.props.auth.form.fields.email;
        let password = this.props.auth.form.fields.password;
        let loginType = this.props.loginType;

        this.props.actions.signupRequest();

        try {
            await Promise.race([
                dispatch(signUpWithPassword(username, email, password, loginType)),
                timeout(15000),
            ]);
        } catch (e) {
            this.props.actions.signupFailure(e);
            const message = e.message || e;
            if (message !== 'Timed out' && message !== 'Canceled by user') {
                // alert(message);
                // console.warn(e);
            }
            return;
        } finally {
            this.props.actions.signupSuccess();
            this._isMounted && this.setState({isLoading: false});
        }
    }

    render() {
        let buttonText = I18n.t('Register.register')

        // console.log("loginType: " + this.props.loginType);

        return (
            <LoginRender
                formType={REGISTER}
                loginButtonText={buttonText}
                onButtonPress={this.onButtonPress.bind(this)}
                displayPasswordCheckbox
                leftMessageType={FORGOT_PASSWORD}
                rightMessageType={LOGIN}
                auth={this.props.auth}
                toggleEvent={this.props.toggleEvent}
            />
        )
    }
}


async function timeout(ms: number): Promise {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Timed out')), ms);
    });
}

function select(store) {
    return {
        auth: store.auth
    };
}


export default connect(select)(AppRegistry)
module.exports = connect(select)(AppRegistry);

