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


const Parse = require('parse/react-native')

import type {ThunkAction} from './types'

let {ParseFolder, ParseUser} = require('../parse/objects').default
let {getUsersParameters, getQueryByType} = require('../parse/parseUtiles').default


const {fromParseUser} = require('../parse/parseModels')

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_POSTS,
  DASHBOARD_LOADED_PAGINATION,
  OVERLAY_LOADED_POSTS_PAGE,
  USERPROFILE_LOADED,
  PARSE_USERS,
  PARSE_TOPICS,
  PARSE_POSTS,
  PARSE_REVIEWS,
} = require('../lib/constants').default


function loadParseObject(type: string, query: Parse.Query, objectId: string): ThunkAction {
  return (dispatch) => {
    return query.get(objectId, {
      success: (object) => {
        // Flow can't guarantee {type, list} is a valid action
        const payload = {
          objectId: objectId,
          object: object
        }
        dispatch({type, payload})
      },
      error: (error) => {
        debugger
      }
    })

  }

}

export default {
  loadUserProfile: (userId: string, slug: string): ThunkAction => {
    let pageQuery = new Parse.Query(ParseUser).equalTo('objectId', userId)

    return loadParseObject(USERPROFILE_LOADED, pageQuery, userId)
  },

  loadPostPage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_POSTS_PAGE, getQueryByType(), objectId)
  }

}
