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

const {fromParseUser} = require('../reducers/parseModels')

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


async function _loadUsersPaginationDashboard(listTask: Any, listId: string, terms: Any): Promise<Array<Action>> {
  const {pageIndex, limit} = listTask
  const skipCount = (pageIndex - 1) * limit

  let dashboardQuery = getQueryByType(PARSE_USERS)
  let objectsQuery = getUsersParameters(terms)

  let totalCount = await  new Parse.Query(ParseUser).count()

  let allCount = totalCount
  let adminCount = await  new Parse.Query(ParseUser).equalTo("isAdmin", true).count()
  let twitterCount = await  new Parse.Query(ParseUser).equalTo("loginType", Users.config.TYPE_TITLES[Users.config.TYPE_TWITTER]).count()
  let facebookCount = await  new Parse.Query(ParseUser).equalTo("loginType", Users.config.TYPE_TITLES[Users.config.TYPE_FACEBOOK]).count()
  let emailCount = await  new Parse.Query(ParseUser).equalTo("loginType", Users.config.TYPE_TITLES[Users.config.TYPE_EMAIL]).count()

  let tableCount = await  objectsQuery.count()

  let countKeys = {
    allCount,
    tableCount,
    adminCount,
    twitterCount,
    facebookCount,
    emailCount
  }

  let results = await objectsQuery.skip(skipCount).limit(limit).find({
    success: (list) => {
      // debugger
      // Flow can't guarantee {type, list} is a valid action
    },
    error: (error) => {
      debugger
    }
  })


  const payload = {
    list: (results || []).map(fromParseUser),
    listTask,
    listId,
    limit,
    countKeys,
    totalCount
  }

  const action = {
    type: DASHBOARD_LOADED_PAGINATION,
    payload: payload
  }

  return Promise.all([
    Promise.resolve(action)
  ])
}

function loadUsersPaginationDashboard(listTask: Any, listId: string, terms: Any): ThunkAction {
  return (dispatch) => {
    const action = _loadUsersPaginationDashboard(listTask, listId, terms)

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
  loadUsersPaginationDashboard
}
