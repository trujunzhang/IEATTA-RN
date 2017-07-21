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

const logError = require('logError');
const InteractionManager = require('InteractionManager');

import type {Action, ThunkAction} from './types'

const {RestaurantService, EventService} = require('../parse/realmApi').default
const {getLocalImageUri} = require('../parse/fsApi')

/**
 * The states were interested in
 */
const {
    QUERY_NEAR_RESTAURANTS,
    QUERY_EVENTS_FOR_RESTAURANT,
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../lib/constants').default


async function _queryNearRestaurant(): Promise<Array<Action>> {

    const results = RestaurantService.findAll()
    for (let i = 0; i < results.length; i++) {
        if (results[i].localPhotoStatus === true) {
            continue
        }
        const imageUri = await getLocalImageUri(results[i].listPhotoId, PARSE_THUMBNAIL_IMAGES)
        if (imageUri !== '') {
            RestaurantService.updateImageUri(results[i], true, function () {
            })
        }
    }

    const action = {
        type: QUERY_NEAR_RESTAURANTS,
        payload: results
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}

function queryNearRestaurant(): ThunkAction {
    return (dispatch) => {
        const action = _queryNearRestaurant()

        // Loading friends schedules shouldn't block the login process
        action.then(
            ([result]) => {
                dispatch(result)
            }
        )
        return action
    }
}


async function _queryEventsForRestaurant(restaurantId: string): Promise<Array<Action>> {

    const results = EventService.findAll()

    debugger

    const action = {
        type: QUERY_EVENTS_FOR_RESTAURANT,
        payload: results
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}

function queryEventsForRestaurant(restaurantId: string): ThunkAction {
    return (dispatch) => {
        const action = _queryEventsForRestaurant(restaurantId)

        // Loading friends schedules shouldn't block the login process
        action.then(
            ([result]) => {
                dispatch(result)
            }
        )
        return action
    }
}

export default {
    queryNearRestaurant,
    queryEventsForRestaurant,
}
