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

const {logInWithPassword} = require('../actions');

class AppLogin extends React.Component {
    props: {
        style: any;
        dispatch: (action: any) => Promise;
        onLoggedIn: ?() => void;
    };

    async onButtonPress() {
        const {dispatch} = this.props;

        let username = this.props.auth.form.fields.username;
        let password = this.props.auth.form.fields.password;

        this.props.actions.loginRequest();

        try {
            await Promise.race([
                dispatch(logInWithPassword(username, password)),
                timeout(15000),
            ]);
        } catch (e) {
            this.props.actions.loginFailure(e);
            const message = e.message || e;
            if (message !== 'Timed out' && message !== 'Canceled by user') {
                // alert(message);
                // console.warn(e);
            }
            return;
        } finally {
            this.props.actions.loginSuccess();
            this._isMounted && this.setState({isLoading: false});
        }
    }

    render() {
        let buttonText = I18n.t('Login.login');

        return (
            <LoginRender
                formType={LOGIN}
                loginButtonText={buttonText}
                onButtonPress={this.onButtonPress.bind(this)}
                leftMessageType={REGISTER}
                rightMessageType={FORGOT_PASSWORD}
                displayPasswordCheckbox
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


export default connect(select)(AppLogin)
module.exports = connect(select)(AppLogin);
