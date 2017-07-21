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

jest.dontMock('../user')
const User = require('../user')

/**
 * The states were interested in
 */
const {
    LOGGED_IN,
    LOGGED_OUT,
    SKIPPED_LOGIN,
    SET_SYNC_UPDATEDAT,
    SET_SHARING,
} = require('../../lib/constants').default

const emptyUser = {
    id: null,
    name: null,
    slug: null,
    email: null,
    loginType: null
}
const loggedUser = {
    id: '1212',
    name: 'test',
    slug: '12-12',
    loginType: 'email',
    email: 'test@gmail.com'
}

const initialTestState = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    ...emptyUser
}
const initialTestStateWithUser = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    ...loggedUser
}
const initialTestStateWithSyncDate = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    ...emptyUser
}
const initialTestStateWithSyncDateAndUser = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    ...loggedUser
}

describe('user reducer', () => {

    it('is empty by default', () => {
        expect(User(undefined, ({}: any))).toEqual(initialTestState);
    })

    /**
     * type is "SET_SYNC_UPDATEDAT"
     */
    it('set last sync updatedAt when user not login', () => {
        expect(
            User(initialTestState, {type: SET_SYNC_UPDATEDAT, payload: '2017-07-01T04:30:30.306Z'})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: false,
            ...emptyUser
        })
    })

    it('set last sync updatedAt when user have login', () => {
        expect(
            User(initialTestStateWithUser, {type: SET_SYNC_UPDATEDAT, payload: '2017-07-01T04:30:30.306Z'})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: false,
            ...loggedUser
        })
    })

    it('set last sync updatedAt when user have login and had sync tasks', () => {
        expect(
            User(initialTestStateWithSyncDateAndUser, {type: SET_SYNC_UPDATEDAT, payload: '2017-07-01T04:30:30.306Z'})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: false,
            ...loggedUser
        })
    })

    /**
     * type is "LOGGED_OUT"
     */
    it('user logged out after had some sync tasks.', () => {
        expect(
            User(initialTestState, {type: LOGGED_OUT})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: false,
            ...emptyUser
        })
    })

    it('user logged out after had some sync tasks.', () => {
        expect(
            User(initialTestStateWithSyncDate, {type: LOGGED_OUT})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: false,
            ...emptyUser
        })
    })

    /**
     * type is "SKIPPED_LOGIN"
     */
    it('skip login run the app at first time', () => {
        expect(
            User(initialTestState, {type: SKIPPED_LOGIN})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: true,
            ...emptyUser
        })
    })

    it('skip login run the app at first time after had some sync tasks.', () => {
        expect(
            User(initialTestStateWithSyncDate, {type: SKIPPED_LOGIN})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: true,
            ...emptyUser
        })
    })

    /**
     * type is "LOGGED_IN"
     */
    it('user has logged in', () => {
        expect(
            User(initialTestState, {type: LOGGED_IN, payload: loggedUser})
        ).toEqual({
            isLoggedIn: true,
            hasSkippedLogin: false,
            ...loggedUser,
            lastRecordUpdatedAt: null,
        })
    })

    it('user has logged in after had some sync tasks.', () => {
        expect(
            User(initialTestStateWithSyncDate, {type: LOGGED_IN, payload: loggedUser})
        ).toEqual({
            isLoggedIn: true,
            hasSkippedLogin: false,
            ...loggedUser,
            lastRecordUpdatedAt: '2017-07-05T04:30:30.406Z'
        })
    })

});
