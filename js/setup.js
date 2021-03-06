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
 * ### Translations
 */
let I18n = require('react-native-i18n')

// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true

import Translations from './lib/Translations'
I18n.translations = Translations

let F8App = require('F8App');
// let FacebookSDK = require('./FacebookSDK');
let Parse = require('parse/react-native');
let React = require('React');
let Relay = require('react-relay');

let {Provider} = require('react-redux');
let configureStore = require('./store/configureStore');

let {serverURL} = require('./env');


function setup(): ReactClass<{}> {
    console.disableYellowBox = true;

    Parse.initialize('YJ60VCiTAD01YOA3LJtHQlhaLjxiHSsv4mkxKvVM', '3S9VZj8y9g0Tj1WS64dl19eDJrEVpvckG7uhcXIi', '87rxX8J0JwaaPSBxY9DdKJEqWXByqE7sShRsX4vg')
    Parse.serverURL = 'https://parseapi.back4app.com/'


    // FacebookSDK.init();
    // Parse.FacebookUtils.init();
    Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(`${serverURL}/graphql`, {
            fetchTimeout: 30000,
            retryDelays: [5000, 10000],
        })
    );


    class Root extends React.Component {
        state: {
            isLoading: boolean;
            store: any;
        };

        constructor() {
            super();
            this.state = {
                isLoading: true,
                store: configureStore(() => this.setState({isLoading: false})),
            };
        }

        render() {
            if (this.state.isLoading) {
                return null;
            }
            return (
                <Provider store={this.state.store}>
                    <F8App />
                </Provider>
            );
        }
    }

    return Root;
}

global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};

module.exports = setup;
